import logoutAction from '@/actions/logoutAction'

export const GET = () => {}

export const POST = async (request: Request) => {
  const res = await logoutAction()
  return Response.json(res)
}
