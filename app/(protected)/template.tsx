'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import varifyToken from '@/actions/varifyToken'

interface Template {
  children: React.ReactNode
}

const Template = async ({ children }: Template) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  const isVarified = await varifyToken(token)

  if (!isVarified) redirect(`/login`)
  return children
}

export default Template
