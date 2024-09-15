import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import varifyToken from '@/actions/varifyToken'

interface Template {
  children: React.ReactNode
}

const Template = async ({ children }: Template) => {
  // check the cookie stored firebaes token and varify the user
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const isVarified = await varifyToken(token)

  // redirects the user to the notes page if the user already have a valid token
  if (isVarified) redirect(`/notes`)

  return children
}

export default Template
