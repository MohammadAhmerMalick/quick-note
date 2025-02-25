'use server'

import { join } from 'path'
import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import { z as validate, ZodError } from 'zod'
import { getStorage } from 'firebase-admin/storage'
import { Timestamp, getFirestore } from 'firebase-admin/firestore'

import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  NOTE_FILES_FOLDER_NAME,
  NUMBER_OF_ALLWOED_NOTES_PAR_DAY,
} from '@/config/constants'
import updateNotesCountLimitAction from '@/actions/updateNotesCountLimitAction'
import initializeFirebaseAdminAction from '@/actions/initializeFirebaseAdminAction'

const db = getFirestore()

const validateInputFields = (
  title: string,
  description: string,
  file: File
) => {
  // set rules for input validation
  const schema = validate.object({
    title: validate.string().min(1, { message: 'Title is required' }),
    description: validate.string(),
    file: validate.preprocess(
      (file) => file || undefined,
      validate.optional(
        validate
          .any()
          .refine(
            (files) => files?.size <= MAX_FILE_SIZE,
            `Max image size is ${MAX_FILE_SIZE / 1000000}MB.`
          )
          .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.'
          )
      )
    ),
  })

  // validate in input fiellds
  // it will throw error on failure
  schema.parse({ title, description, file })
}

// store file locally
const storeFileLocally = async (file: File) => {
  // set unique name for file to upload to prevent file name conflict
  const name = `${randomUUID()}_${file.name}`

  // check if mkdir folder locally exists
  if (process.env.NODE_ENV === 'development')
    await mkdir('./tmp', { recursive: true })

  // local file path
  const localFilePath =
    process.env.NODE_ENV === 'production'
      ? join('/tmp', name) // on production vercel alredy have tmp folder
      : join(process.cwd(), '/tmp', name)

  // upload file to local
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(localFilePath, buffer)

  return { localFilePath, name }
}

/**
 * @returns [is note limit reached, number of existing notes this day]
 */
const checkifLimitReached = async () => {
  // push the new note to firebase

  const doc = db
    .collection('notesCounter')
    .doc(new Date().toLocaleDateString().replaceAll('/', '-'))
  const res = await doc.get()
  const data = await res.data()

  const isLimitReached = data?.noteCount >= NUMBER_OF_ALLWOED_NOTES_PAR_DAY
  return [isLimitReached, data?.noteCount]
}

interface SuccessRes {
  message: string
  status: 'success'
}

interface RejectRes {
  status: 'error'
  messages: string[]
}

const storeNoteAction = async (
  formData: FormData
): Promise<SuccessRes | RejectRes> => {
  let fileData: {
    size: number
    type: string
    name: string
  }[] = []

  try {
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    validateInputFields(title, description, file)

    if (file) {
      // store file locally
      const { name, localFilePath } = await storeFileLocally(file)

      // upload file to firebase bucket
      await getStorage()
        .bucket()
        .upload(localFilePath, {
          destination: `${NOTE_FILES_FOLDER_NAME}/${name}`,
        })

      fileData = [{ size: file.size, type: file.type, name }]
    }

    // new note data
    const newNote = {
      title,
      description,
      files: fileData,
      deletedAt: null,
      createdAt: Timestamp.now(),
    }

    // push the new note to firebase
    const [isLimitReached, noteCount] = await checkifLimitReached()
    if (isLimitReached)
      throw new Error('Limit reached', { cause: 'limit-reached' })

    const res = await db.collection('notes').doc(randomUUID()).set(newNote)

    updateNotesCountLimitAction((noteCount || 0) + 1)

    // Response on success
    console.log({ storeNoteAction: 'Note created' })
    if (res) return { message: 'Note create Successfully', status: 'success' }

    // Response on error
    throw new Error()
  } catch (error: any) {
    let messages = ['Unable to create note']
    if (error?.cause === 'limit-reached') messages.push(error.toString())

    if (error instanceof ZodError)
      messages = Object.values(error.flatten().fieldErrors).map((error) =>
        error ? error[0] : ''
      )
    else if (error.code === 'app/no-app') initializeFirebaseAdminAction()

    console.log({ storeNoteAction: error, messages })
    return { messages, status: 'error' }
  }
}

export default storeNoteAction
