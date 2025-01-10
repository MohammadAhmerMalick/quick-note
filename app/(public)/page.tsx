'use client'

import { toast } from 'react-toastify'
import { type FormEvent, useEffect, useRef, useState } from 'react'

import Input from '@/components/Input'
import Button from '@/components/Button'
import Textarea from '@/components/Textarea'
import FileDropAera from '@/components/FileDropAera'
import storeNoteAction from '@/actions/storeNoteAction'

export default function Home() {
  const TITLE_INPUT = useRef<HTMLInputElement | null>(null)

  const [title, setTitle] = useState('')
  const [fileValue, setFileValue] = useState('')
  const [file, setFile] = useState<File | ''>('')
  const [description, setDescription] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setFile('')
    setTitle('')
    setFileValue('')
    setDescription('')
  }

  const onFileChange = (fileTarget: EventTarget & HTMLInputElement) => {
    setFileValue(fileTarget.value)
    setFile(fileTarget.files?.[0] || '')
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      // set form data
      const formdata = new FormData()
      formdata.append('title', title)
      formdata.append('description', description)
      if (file) formdata.append('file', file)

      const response = await storeNoteAction(formdata)

      // on success
      if (response.status === 'success') {
        toast.success(response.message)
        resetForm()
        TITLE_INPUT.current?.focus()
      }

      // on reject
      else if (response.status === 'error')
        response.messages.forEach((message) => toast.error(message))
    } catch (error) {
      console.log(error)
      toast.error('Unable to create note')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    TITLE_INPUT.current?.focus()
  }, [])

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-6 rounded-lg bg-white p-6 shadow md:mt-0 md:p-8 dark:border dark:border-neutral-800 dark:bg-neutral-850"
    >
      <Input
        id="title"
        isRequired
        value={title}
        labelText="Title"
        placeholder="Title"
        inputRef={TITLE_INPUT}
        onChange={({ value }) => setTitle(value)}
      />
      <Textarea
        id="description"
        value={description}
        labelText="Description"
        placeholder="Description"
        onChange={({ value }) => setDescription(value)}
      />

      <FileDropAera id="file" value={fileValue} onChange={onFileChange} />

      <Button disabled={isSubmitting}>
        {isSubmitting ? 'Submitting' : 'Submit'}
      </Button>
    </form>
  )
}
