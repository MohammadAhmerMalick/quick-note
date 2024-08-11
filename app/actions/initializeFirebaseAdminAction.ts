'use server'

import Firebase from '@/lib/firebase'

const initializeFirebaseAdminAction = async () => {
  try {
    const { status } = await Firebase.initialize()
    if (status === 'error') throw Error

    console.log({ initializeFirebaseAdminAction: 'Firebsae admin initialized' })
    return { status: 'success' }
  } catch (error) {
    console.log({ initializeFirebaseAdminAction: error })
    return { status: 'error' }
  }
}

export default initializeFirebaseAdminAction
