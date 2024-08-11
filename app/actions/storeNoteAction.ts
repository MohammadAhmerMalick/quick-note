'use server'

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import { z as validate, ZodError } from 'zod'
import { getStorage } from 'firebase-admin/storage'
import { Timestamp, getFirestore } from 'firebase-admin/firestore'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  NOTE_FILES_FOLDER_NAME,
} from '@/config/constants'

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
const storeFileLocally = async (file: File, destinationFileName: string) => {
  const directory = `public/assets/${NOTE_FILES_FOLDER_NAME}`

  // create directory if it does not exist
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true })

  const fileLocalPath = path.join(
    process.cwd(),
    `${directory}/${destinationFileName}`
  )

  // upload file to local
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(fileLocalPath, buffer)

  return fileLocalPath
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
      // set unique name for file to upload to prevent file name conflict
      const destinationFileName = `${randomUUID()}_${file.name}`

      // store file locally
      const fileLocalPath = await storeFileLocally(file, destinationFileName)

      // upload file to firebase bucket
      const uploadedFile = await getStorage()
        .bucket()
        .upload(fileLocalPath, {
          destination: `${NOTE_FILES_FOLDER_NAME}/${destinationFileName}`,
        })

      fileData = [
        {
          size: file.size,
          type: file.type,
          name: destinationFileName,
        },
      ]
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
    const db = getFirestore()
    const res = await db.collection('notes').doc(randomUUID()).set(newNote)

    // Response on success
    console.log({ storeNoteAction: 'Note created' })
    if (res) return { message: 'Note create Successfully', status: 'success' }

    // Response on error
    throw new Error()
  } catch (error) {
    let messages = ['Unable to create note']

    if (error instanceof ZodError)
      messages = Object.values(error.flatten().fieldErrors).map((error) =>
        error ? error[0] : ''
      )

    console.log({ storeNoteAction: error })
    return { messages, status: 'error' }
  }
}

export default storeNoteAction
