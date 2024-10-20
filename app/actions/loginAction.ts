'use server'

import { cookies } from 'next/headers'
import { FirebaseError } from 'firebase/app'
import { z as validate, ZodError } from 'zod'
import { signInWithEmailAndPassword } from 'firebase/auth'

import Firebase from '@/lib/firebase'
import '@/config/firebaseClientConfig'

const validateInputFields = (email: string, password: string) => {
  // set rules for input validation
  const schema = validate.object({
    email: validate
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: validate.string().min(1, 'Password field is required'),
  })

  // validate in input fiellds
  // it will throw error on failure
  schema.parse({ email, password })
}

const firebaseLogin = async (email: string, password: string) => {
  const app = Firebase.initializeClient()
  const res = await signInWithEmailAndPassword(app, email, password)
  const token = await res.user.getIdToken()

  // set token in cookies
  cookies().set('token', token, { secure: true })
  return token
}

const loginAction = async (
  email: string,
  password: string
): Promise<{
  token: string
  status: 'success' | 'error'
  messages: string[]
}> => {
  try {
    // validate the input fiellds
    validateInputFields(email, password)

    // firebase login
    const token = await firebaseLogin(email, password)

    console.log({ loginAction: 'Logged in successfully' })
    return {
      status: 'success',
      messages: ['Logged in successfully'],
      token,
    }
  } catch (error: any) {
    let messages = ['Something went wrong']

    if (error instanceof ZodError)
      messages = Object.values(error.flatten().fieldErrors).map((error) =>
        error ? error[0] : ''
      )

    if (error instanceof FirebaseError)
      messages = [error.code.split('/')[1].replaceAll('-', ' ')]

    console.log({ loginAction: error })
    return { messages, status: 'error', token: '' }
  }
}

export default loginAction
