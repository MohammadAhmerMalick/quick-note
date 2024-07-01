'use server'

import Firebase from '@/lib/firebase'

const terminateFirebaseAdminAction = async () => {
  console.log({ terminateFirebaseAdminAction: 'Terminating Firebase Admin' })
  const res = await Firebase.terminate()
  return res
}

export default terminateFirebaseAdminAction
