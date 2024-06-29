'use server'

import { getAuth } from 'firebase-admin/auth'

const varifyToken = async (token: string = '') => {
  try {
    const user = await getAuth().verifyIdToken(token)

    console.log({ varifyToken: !!user.user_id })
    return !!user.user_id
  } catch (error) {
    console.log({ varifyToken: error })
    return false
  }
}

export default varifyToken
