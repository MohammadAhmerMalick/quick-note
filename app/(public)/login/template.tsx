import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import varifyTokenAction from '@/actions/varifyTokenAction'

interface Template {
  children: React.ReactNode
}

const Template = async ({ children }: Template) => {
  // check the cookie stored firebaes token and varify the user
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const isVarified = await varifyTokenAction(token)

  // redirects the user to the notes page if the user already have a valid token
  if (isVarified) redirect(`/notes`)

  return children
}

export default Template
