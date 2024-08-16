import { useEffect, useRef } from 'react'

import { classnames } from '@/utils'

interface Input {
  id: string
  value: string
  labelText?: string
  placeholder: string
  isRequired?: boolean
  labelClassName?: string
  type?: 'text' | 'password' | 'email'
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const Input = ({
  id,
  value,
  labelText,
  isRequired,
  placeholder,
  type = 'text',
  labelClassName,
  onChange,
}: Input) => {
  const TITLE_INPUT = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: EventTarget & HTMLInputElement) => {
    TITLE_INPUT.current?.focus()
    onChange(e)
  }

  useEffect(() => {
    TITLE_INPUT.current?.focus()
  }, [])

  return (
    <label
      htmlFor={id}
      className={classnames(
        'block text-sm font-medium text-neutral-900 dark:text-white',
        labelClassName
      )}
    >
      {labelText}
      <input
        id={id}
        type={type}
        value={value}
        ref={TITLE_INPUT}
        required={isRequired}
        placeholder={placeholder}
        className={classnames(
          labelText && 'mt-3',
          'border border-neutral-300 dark:border-neutral-600 focus:border-yellow-500 dark:focus:border-yellow-500',
          'bg-neutral-50 text-neutral-900 text-xs rounded-md focus:ring-1 focus:ring-yellow-200 block w-full p-2.5 dark:bg-neutral-850 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-1 dark:focus:ring-yellow-950 focus-visible:outline-0'
        )}
        onChange={({ currentTarget }) => handleChange(currentTarget)}
      />
    </label>
  )
}

export default Input
