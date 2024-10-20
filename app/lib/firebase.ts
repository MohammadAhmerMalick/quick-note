import {
  cert,
  getApp,
  getApps,
  deleteApp,
  initializeApp,
} from 'firebase-admin/app'
import { getAuth, type Auth } from 'firebase/auth'
import serviceAccount from '@/config/firebaseAdminConfig'
import firebaseConfig from '@/config/firebaseClientConfig'
import { initializeApp as initializeAppClient } from 'firebase/app'

class Firebase {
  static app: Auth | null = null

  static initializeClient = () => {
    initializeAppClient(firebaseConfig())

    const app = getAuth()
    this.app = app
    return app
  }

  static initialize = (): {
    status: 'success' | 'error'
  } => {
    try {
      // prevents the firebase to initialize twice
      if (!getApps().length) {
        const credentials = serviceAccount()
        const credential = cert(credentials)
        const storageBucket = `gs://${credentials.projectId}.appspot.com`
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
