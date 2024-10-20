'use server'

import { cookies } from 'next/headers'
import { signOut } from 'firebase/auth'

import Firebase from '@/lib/firebase'

const logoutAction = async (): Promise<{
  status: 'success' | 'error'
  messages: string[]
}> => {
  try {
    cookies().delete('token')

    const { app } = Firebase
    if (app) await signOut(app)
    else throw Error

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
