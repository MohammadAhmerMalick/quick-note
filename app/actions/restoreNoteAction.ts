'use server'

import { getFirestore } from 'firebase-admin/firestore'

const restoreNoteAction = async (
  id: string
): Promise<{
  status: 'success' | 'error'
}> => {
  try {
    const db = getFirestore()
    await db.collection('notes').doc(id).update({ deletedAt: null })

    console.log({ restoreNoteAction: 'Note restored' })
    return { status: 'success' }
  } catch (error) {
    console.log({ restoreNoteAction: error })
    return { status: 'error' }
  }
}

export default restoreNoteAction
