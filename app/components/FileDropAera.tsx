import Image from 'next/image'
import { type ChangeEvent, useState, useEffect } from 'react'

import { CloudUploadIcon } from '@/components/icons'

interface FileDropAera {
  id: string
  value: string
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const FileDropAera = ({ id, value, onChange }: FileDropAera) => {
  const [image, setImage] = useState('')

  const handleFileChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    const file = currentTarget?.files?.[0]
      ? URL.createObjectURL(currentTarget.files[0])
      : ''

    setImage(file)
    onChange(currentTarget)
  }

  useEffect(() => {
    // if value is null rest the display image
    if (!value) setImage('')
  }, [value])

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white">
        Upload File
      </span>
      <label
        htmlFor={id}
        className="dark:hover:bg-bray-800 relative mt-3 flex w-full cursor-pointer justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 hover:border-yellow-500 focus:border-yellow-500 md:border-2 md:py-12 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:border-yellow-500"
      >
        {image && (
          <Image
            src={image}
            width="510"
            height="140"
            alt="Selected File"
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover opacity-20"
          />
        )}
        <div className="flex items-center gap-5">
          <CloudUploadIcon />
          <div>
            <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        </div>
        <input
          id={id}
          type="file"
          value={value}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

export default FileDropAera
