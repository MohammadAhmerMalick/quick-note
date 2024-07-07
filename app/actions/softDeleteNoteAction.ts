'use server'

import { getFirestore, Timestamp } from 'firebase-admin/firestore'

const softDeleteNoteAction = async (
  id: string
): Promise<{
  status: 'success' | 'error'
}> => {
  try {
    const db = getFirestore()
    await db
      .collection('notes')
      .doc(id)
      .update({ deletedAt: Timestamp.fromDate(new Date()) })

    console.log({ softDeleteNoteAction: 'Note deleted' })
    return { status: 'success' }
  } catch (error) {
    console.log({ softDeleteNoteAction: error })
    return { status: 'error' }
  }
}

export default softDeleteNoteAction
