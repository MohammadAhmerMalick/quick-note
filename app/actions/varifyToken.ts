'use server'

import { getAuth } from 'firebase-admin/auth'

const varifyToken = async (token: string = '') => {
  try {
    const user = await getAuth().verifyIdToken(token)

    return !!user.user_id
  } catch (error) {
    console.log({ error })
    return false
  }
}

export default varifyToken
