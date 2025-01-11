'use server'

import { getStorage } from 'firebase-admin/storage'
import { getFirestore } from 'firebase-admin/firestore'
import { NOTE_FILES_FOLDER_NAME } from '@/config/constants'
import type { DocumentReference, DocumentData } from 'firebase-admin/firestore'

interface Return {
  status: 'success' | 'error'
}

const deleteFile = async (
  doc: DocumentReference<DocumentData, DocumentData>
) => {
  const data = await (await doc.get()).data()
  const fileName = data?.files[0]?.name

  if (fileName)
    await getStorage()
      .bucket()
      .file(`${NOTE_FILES_FOLDER_NAME}/${fileName}`)
      .delete()
}

const deleteNoteAction = async (id: string): Promise<Return> => {
  try {
    const doc = await getFirestore().collection('notes').doc(id)

    // dete associated file
    deleteFile(doc)

    // delete record
    await doc.delete()

    console.log({ deleteNoteAction: 'Note deleted' })
    return { status: 'success' }
  } catch (error) {
    console.log({ deleteNoteAction: error })
    return { status: 'error' }
  }
}

export default deleteNoteAction
