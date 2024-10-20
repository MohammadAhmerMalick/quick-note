import loginAction from '@/actions/loginAction'

export const GET = () => {}

export const POST = async (request: Request) => {
  const formData = await request.formData()

  const email = formData.get('email') || ''
  const password = formData.get('password') || ''

  if (typeof email === 'string' && typeof password === 'string') {
    const res = await loginAction(email, password)
    return Response.json(res)
  }

  return Response.json({
    token: '',
    status: 'error',
    messages: 'Invalid username or password',
  })
}
