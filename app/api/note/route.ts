import { randomUUID } from 'crypto'
import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { Timestamp, getFirestore } from 'firebase-admin/firestore'

import serviceAccount from '@/config/firebaseConfig.json'

const createdApps = getApps()

const App =
  createdApps.length === 0
    ? initializeApp({ credential: cert(serviceAccount) })
    : createdApps[0]

export const POST = async (request: Request) => {
  const formData = await request.formData()

  const title = formData.get('title')
  const description = formData.get('description')

  const db = getFirestore()

  const data = {
    title,
    description,
    files: [
      // { url: '/', name: 'file name' }
    ],
    cretedAt: Timestamp.now(),
    deletedAt: null,
  }

  // Add a new document in collection "cities" with ID 'LA'
  const res = await db.collection('note').doc(randomUUID()).set(data)

  return Response.json({ res })
}

export const GET = async () => {}
