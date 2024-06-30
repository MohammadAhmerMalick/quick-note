'use server'

import Firebase from '@/lib/firebase'

const initializeFirebaseAdminAction = async () => {
  console.log({
    initializeFirebaseAdminAction: 'Initializing Firebase Admin',
  })

  try {
    const res = await Firebase.initialize()
    return res
  } catch (error) {
    console.log(error)
  }

  return { status: 'error' }
}

export default initializeFirebaseAdminAction
