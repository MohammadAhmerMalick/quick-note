import path from 'path'
import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { Timestamp, getFirestore } from 'firebase-admin/firestore'
import { getDownloadURL, getStorage } from 'firebase-admin/storage'

import serviceAccount from '@/config/firebaseConfig.json'

const firebaseApp = getApps()

// prevents the firebase to initialize twice
if (firebaseApp.length === 0)
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `gs://${serviceAccount.projectId}.appspot.com`,
  })

// ////////////
// POST REQUEST
export const POST = async (request: Request) => {
  // get data from the request
  const formData = await request.formData()
  const title = formData.get('title')
  const file = formData.get('file') as File
  const description = formData.get('description')

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
    cretedAt: Timestamp.now(),
    deletedAt: null,
  }

  const fileLocalPath = path.join(
    process.cwd(),
    `public/assets/${destinationFileName}`
  )

  // upload file to local
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(fileLocalPath, buffer)

  // upload file to firebase bucket
  const uploadedFile = await getStorage()
    .bucket()
    .upload(fileLocalPath, { destination: destinationFileName })

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

export const GET = async () => {}
