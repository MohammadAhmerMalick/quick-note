'use server'

import { getAuth } from 'firebase-admin/auth'
import initializeFirebaseAdminAction from '@/actions/initializeFirebaseAdminAction'

const verifyTokenAction = async (token: string = '') => {
  try {
    if (!token) return false

    const user = await getAuth().verifyIdToken(token)

    console.log({ verifyToken: !!user.user_id })
    return !!user.user_id
  } catch (error: any) {
    if (error.code === 'app/no-app') initializeFirebaseAdminAction()

    console.log({ verifyToken: error })
    return false
  }
}

export default verifyTokenAction
