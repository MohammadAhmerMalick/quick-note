'use client'

import { type FormEvent, useState } from 'react'

import Input from '@/components/Input'
import Button from '@/components/Button'
import Textarea from '@/components/Textarea'
import FileDropAera from '@/components/FileDropAera'

export default function Home() {
  const [file, setFile] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({
      title,
      description,
      file,
    })
  }
  return (
    <main>
      <h1 className="md:text-4xl text-xl font-semibold text-neutral-950 dark:text-neutral-50 text-center md:mt-0 mt-4 md:mb-8 mb-2">
        Quick Note
      </h1>
      <form
        onSubmit={onSubmit}
        className="max-w-xl md:p-8 p-6 mx-auto bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-neutral-850 dark:border-neutral-800"
      >
        <div className="mb-6">
          <Input
            id="title"
            value={title}
            labelText="Title"
            placeholder="Title"
            onChange={({ value }) => setTitle(value)}
          />
        </div>
        <div className="mb-6">
          <Textarea
            id="description"
            value={description}
            labelText="Description"
            placeholder="Description"
            onChange={({ value }) => setDescription(value)}
          />
        </div>

        <div className="mb-6">
          <FileDropAera
            id="file"
            value={file}
            onChange={({ value }) => setFile(value)}
          />
        </div>
        <Button>Submit</Button>
      </form>
      <p className="max-w-xl text-xs text-neutral-600 dark:text-neutral-500 mx-auto text-center p-2 mt-1">
        Powered by:{' '}
        <a
          href="https://www.mohammadahmermalick.com"
          className="text-neutral-950 dark:text-neutral-400 border-b border-neutral-500"
        >
          Mohammad Ahmer Malick
        </a>
      </p>
    </main>
  )
}
