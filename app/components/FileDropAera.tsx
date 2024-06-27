import Image from 'next/image'
import { type ChangeEvent, useState, useEffect } from 'react'

import { classnames } from '@/utils'
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
    <>
      <span className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">
        Upload File
      </span>
      <label
        htmlFor={id}
        className={classnames(
          'relative',
          'flex justify-center',
          'w-full',
          'md:border-2 border border-neutral-300 hover:border-yellow-500 border-dashed rounded-lg dark:border-neutral-600 dark:hover:border-yellow-500 focus:border-yellow-500',
          'px-4 py-6 md:py-12 mt-3',
          'bg-neutral-50 dark:hover:bg-bray-800 dark:bg-neutral-800',
          'cursor-pointer'
        )}
      >
        {image && (
          <Image
            src={image}
            width="510"
            height="140"
            alt="Selected File"
            className={classnames(
              'absolute top-0 bottom-0 right-0 left-0',
              'w-full h-full ',
              'opacity-20',
              'object-cover'
            )}
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
    </>
  )
}

export default FileDropAera
