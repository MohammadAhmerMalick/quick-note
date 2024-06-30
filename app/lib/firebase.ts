'use server'

import {
  cert,
  getApp,
  getApps,
  deleteApp,
  initializeApp,
} from 'firebase-admin/app'
import serviceAccount from '@/config/firebaseAdminConfig'

class Firebase {
  static initialize = () => {
    try {
      // prevents the firebase to initialize twice
      if (!getApps().length) {
        const credential = cert(serviceAccount)
        const storageBucket = `gs://${serviceAccount.projectId}.appspot.com`
        initializeApp({ credential, storageBucket })
      }
      return { status: 'success' }
    } catch (error) {
      console.log(error)
      return { status: 'error' }
    }
  }

  static terminate = async () => {
    if (getApps().length) {
      await deleteApp(getApp())
      return { status: 'success' }
    }
    return { status: 'error' }
  }
}

export default Firebase
