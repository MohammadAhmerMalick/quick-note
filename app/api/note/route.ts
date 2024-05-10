import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getDownloadURL, getStorage } from 'firebase-admin/storage'

import serviceAccount from '@/config/firebaseConfig.json'
import post from './post'

const firebaseApp = getApps()

// prevents the firebase to initialize twice
if (firebaseApp.length === 0)
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `gs://${serviceAccount.projectId}.appspot.com`,
  })

// ////////////
// POST REQUEST
export const POST = post

export const GET = async () => {}
