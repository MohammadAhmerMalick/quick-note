import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import { getStorage } from 'firebase-admin/storage'
import { Timestamp, getFirestore } from 'firebase-admin/firestore'
import { NOTE_FILES_FOLDER_NAME } from '@/config/constants'

// get data from the request
const getFormData = async (request: Request) => {
  const formData = await request.formData()
  const title = formData.get('title')
  const file = formData.get('file') as File
  const description = formData.get('description')

  return { title, file, description }
}

// store file locally
const storeFileLocally = async (file: File, destinationFileName: string) => {
  const directory = `public/assets/${NOTE_FILES_FOLDER_NAME}`

  // create directory if it does not exist
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true })

  const fileLocalPath = path.join(
    process.cwd(),
    `${directory}/${destinationFileName}`
  )

  // upload file to local
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(fileLocalPath, buffer)

  return fileLocalPath
}

const post = async (request: Request) => {
  // get data from the request
  const { title, file, description } = await getFormData(request)

  // set unique name for file to upload to prevent file name conflict
  const destinationFileName = `${randomUUID()}_${file.name}`

  // new note data
  const newNote = {
    title,
    description,
    files: [
      {
        size: file.size,
        type: file.type,
        name: destinationFileName,
      },
    ],
    created: Timestamp.now(),
    deletedAt: null,
  }

  // store file locally
  const fileLocalPath = await storeFileLocally(file, destinationFileName)

  // upload file to firebase bucket
  const uploadedFile = await getStorage()
    .bucket()
    .upload(fileLocalPath, {
      destination: `${NOTE_FILES_FOLDER_NAME}/${destinationFileName}`,
    })

  // push the new note to firebase
  const db = getFirestore()
  const res = await db.collection('note').doc(randomUUID()).set(newNote)

  // Response on success
  if (res)
    return Response.json(
      { message: 'Note create Successfully', status: 'success' },
      { status: 200 }
    )

  // Response on error
  return Response.json(
    { message: 'Unable to create note', status: 'error' },
    { status: 400 }
  )
}

export default post
