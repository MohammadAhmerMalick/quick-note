import { randomUUID } from 'crypto'
import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { Timestamp, getFirestore } from 'firebase-admin/firestore'

import serviceAccount from '@/config/firebaseConfig.json'

const firebaseApp = getApps()

// prevents the firebase to initialize twice
if (firebaseApp.length === 0)
  initializeApp({ credential: cert(serviceAccount) })

// ////////////
// Post Request
export const POST = async (request: Request) => {
  // get data from the request
  const formData = await request.formData()
  const title = formData.get('title')
  const description = formData.get('description')

  const db = getFirestore()

  // new note data
  const newNote = {
    title,
    description,
    files: [
      // { url: '/', name: 'file name' }
    ],
    cretedAt: Timestamp.now(),
    deletedAt: null,
  }

  // push the new not to firebase
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

export const GET = async () => {}
