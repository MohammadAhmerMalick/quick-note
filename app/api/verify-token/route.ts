import verifyTokenAction from '@/actions/verifyTokenAction'

export const GET = () => {}

export const POST = async (request: Request) => {
  const { token } = await request.json()

  const isVerified = await verifyTokenAction(token)

  if (isVerified)
    return Response.json({
      isVerified,
      status: 'success',
      message: 'Verified user',
    })

  return Response.json({
    isVerified,
    status: 'success',
    message: 'Not verified',
  })
}
