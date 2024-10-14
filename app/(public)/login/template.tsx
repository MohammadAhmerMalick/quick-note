'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import verifyTokenAction from '@/actions/verifyTokenAction'

interface Template {
  children: React.ReactNode
}

const Template = async ({ children }: Template) => {
  // check the cookie stored firebaes token and verify the user
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const isVerified = await verifyTokenAction(token)

  // redirects the user to the notes page if the user already have a valid token
  if (isVerified) redirect(`/notes`)

  return children
}

export default Template
