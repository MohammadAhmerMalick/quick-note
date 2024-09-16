import storeNoteAction from '@/app/actions/storeNoteAction'

const post = async (request: Request) => {
  const formData = await request.formData()
  const res = await storeNoteAction(formData)

  return Response.json(res)
}

export default post
