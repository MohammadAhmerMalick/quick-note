import { headers } from 'next/headers'

import getNotesAction from '@/actions/getNotesAction'
import verifyTokenAction from '@/actions/verifyTokenAction'
import restoreNoteAction from '@/actions/restoreNoteAction'
import softDeleteNoteAction from '@/actions/softDeleteNoteAction'

const authenticate = async () => {
  const headersList = headers()
  const bearer = headersList.get('authorization')

  const token = bearer?.split('Bearer ')[1]

  if (token) {
    const isVarified = await verifyTokenAction(token)
    return isVarified
  }

  return false
}

export const GET = async () => {
  const isVarified = await authenticate()

  if (isVarified) {
    const res = await getNotesAction()

    return Response.json(res)
  }

  return Response.json({
    status: 'error',
    message: 'Not authorized',
  })
}

export const DELETE = async (request: Request) => {
  const isVarified = await authenticate()

  const { id } = await request.json()
  if (isVarified) {
    const { status } = await softDeleteNoteAction(id)

    return Response.json({ status })
  }

  return Response.json({
    status: 'error',
    message: 'Not authorized',
  })
}

export const PUT = async (request: Request) => {
  const isVarified = await authenticate()

  const { id } = await request.json()
  if (isVarified) {
    const { status } = await restoreNoteAction(id)

    return Response.json({ status })
  }

  return Response.json({
    status: 'error',
    message: 'Not authorized',
  })
}

export const POST = async (request: Request) => {}
