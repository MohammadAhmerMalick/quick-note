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

    console.log({ logoutAction: 'Logged Out' })
    return {
      status: 'success',
      messages: ['Logged out'],
    }
  } catch (error) {
    console.log({ logoutAction: error })
    return {
      status: 'error',
      messages: ['Unable to logout'],
    }
  }
}
export default logoutAction
