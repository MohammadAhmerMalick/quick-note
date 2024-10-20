'use server'

import { Timestamp, getFirestore } from 'firebase-admin/firestore'

const updateNotesCountLimitAction = async (noteCount: number = 0) => {
  try {
    const db = getFirestore()
    await db
      .collection('notesCounter')
      .doc(new Date().toLocaleDateString().replaceAll('/', '-'))
      .set({
        noteCount,
        date: Timestamp.now(),
      })

    console.log({ updateNotesCountLimitAction: `count update to ${noteCount}` })
    return true
  } catch (error) {
    console.log({ updateNotesCountLimitAction: error })
    return false
  }
}

export default updateNotesCountLimitAction
