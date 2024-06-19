'use server'

import { cookies } from 'next/headers'
import { getAuth, signOut } from 'firebase/auth'

const logoutAction = async (): Promise<{
  status: 'success' | 'error'
  messages: string[]
}> => {
  try {
    cookies().delete('token')

    const auth = getAuth()
    await signOut(auth)

    return {
      status: 'success',
      messages: ['Logged out'],
    }
  } catch (error) {
    console.log({ error })
    return {
      status: 'error',
      messages: ['unable to logout'],
    }
  }
}
export default logoutAction
