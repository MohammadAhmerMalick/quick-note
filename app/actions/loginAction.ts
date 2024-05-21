'use server'

import { cookies } from 'next/headers'
import { FirebaseError } from 'firebase/app'
import { z as validate, ZodError } from 'zod'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { firebaseClientAuth } from '@/config/firebaseClientConfig'

const validateInputFields = (email: string, password: string) => {
  // set rules for input validation
  const schema = validate.object({
    email: validate
      .string({ required_error: 'The Email is required' })
      .email({ message: 'Invalid email address' }),
    password: validate.string().min(1, 'The Password field is required'),
  })

  // validate in input fiellds
  // it will throw error on failure
  schema.parse({ email, password })
}

const firebaseLogin = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(
    firebaseClientAuth,
    email,
    password
  )
  const token = await res.user.getIdToken()

  // set token in cookies
  cookies().set('token', token, { secure: true })
}

const loginAction = async (
  email: string,
  password: string
): Promise<{
  status: 'success' | 'error'
  messages: string[]
}> => {
  try {
    // validate the input fiellds
    validateInputFields(email, password)

    // firebase login
    await firebaseLogin(email, password)

    return {
      status: 'success',
      messages: ['Logged in successfully'],
    }
  } catch (error: any) {
    let messages = ['Something went wrong']

    if (error instanceof ZodError)
      messages = Object.values(error.flatten().fieldErrors).map((error) =>
        error ? error[0] : ''
      )

    if (error instanceof FirebaseError)
      messages = [error.code.split('/')[1].replaceAll('-', ' ')]

    return { messages, status: 'error' }
  }
}

export default loginAction
