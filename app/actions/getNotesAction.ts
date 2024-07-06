'use server'

import { getFirestore } from 'firebase-admin/firestore'
import { getDownloadURL, getStorage } from 'firebase-admin/storage'
import { NOTE_FILES_FOLDER_NAME } from '@/config/constants'

export interface GetNotesActionReutrn {
  id: string
  files: {
    link: string
    name: string
    size: number
    type: string
  }[]
  title: string
  description: string
  deletedAt: null | string
  created: { _seconds: number; _nanoseconds: number }
}

interface SuccessRes {
  status: 'success'
  data: GetNotesActionReutrn[]
}

interface RejectRes {
  status: 'error'
  message: string
}

const getNotesAction = async (): Promise<SuccessRes | RejectRes> => {
  try {
    const db = getFirestore() // get db
    const notes = db.collection('notes') // get notes collection
    const doc = await notes.get() // get all notes

    const bucket = getStorage().bucket() // get bucket

    const docs = await Promise.all(
      doc.docs.map(async (doc) => {
        const data = doc.data()

        const files = await Promise.all(
          // add downloadable link in each file
          data.files.map(
            async (file: { size: number; type: string; name: string }) => {
              const filePath = `${NOTE_FILES_FOLDER_NAME}/${file.name}`
              const fileRef = bucket.file(filePath)
              const downloadURL = await getDownloadURL(fileRef)

              return { ...file, link: downloadURL }
            }
          )
        )

        return { ...data, files, id: doc.id }
      })
    )
    const data = JSON.parse(JSON.stringify(docs))

    console.log({ getNotesAction: 'notes fetched' })
    return { status: 'success', data }
  } catch (error) {
    console.log({ getNotesAction: error })
    return {
      message: 'Unable to get notes',
      status: 'error',
    }
  }
}

export default getNotesAction
