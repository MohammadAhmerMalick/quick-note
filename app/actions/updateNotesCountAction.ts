'useServer'

import { Timestamp, getFirestore } from 'firebase-admin/firestore'

const updateNotesCountAction = (noteCount: number = 0) => {
  const db = getFirestore()

  db.collection('notesCounter')
    .doc(new Date().toLocaleDateString().replaceAll('/', '-'))
    .set({
      noteCount,
      date: Timestamp.now(),
    })
}

export default updateNotesCountAction
