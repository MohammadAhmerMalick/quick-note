'use server'

import { getFirestore } from 'firebase-admin/firestore'

const deleteNoteAction = async (
  id: string
): Promise<{
  status: 'success' | 'error'
}> => {
  try {
    const db = getFirestore()
    await db.collection('notes').doc(id).delete()

    console.log({ deleteNoteAction: 'Note deleted' })
    return { status: 'success' }
  } catch (error) {
    console.log({ deleteNoteAction: error })
    return { status: 'error' }
  }
}

export default deleteNoteAction
