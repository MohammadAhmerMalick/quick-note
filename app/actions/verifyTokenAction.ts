'use server'

import { getAuth } from 'firebase-admin/auth'

const verifyTokenAction = async (token: string = '') => {
  try {
    if (!token) return false

    const user = await getAuth().verifyIdToken(token)

    console.log({ verifyToken: !!user.user_id })
    return !!user.user_id
  } catch (error) {
    console.log({ verifyToken: error })
    return false
  }
}

export default verifyTokenAction
