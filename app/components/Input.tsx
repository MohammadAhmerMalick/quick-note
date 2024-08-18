import { useEffect, useRef } from 'react'

import { classnames } from '@/utils'

interface Input {
  id: string
  value: string
  inputRef?: any
  labelText?: string
  placeholder: string
  isFocused?: boolean
  isRequired?: boolean
  labelClassName?: string
  type?: 'text' | 'password' | 'email'
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const Input = ({
  id,
  value,
  inputRef,
  labelText,
  isFocused,
  isRequired,
  placeholder,
  type = 'text',
  labelClassName,
  onChange,
}: Input) => {
  const TITLE_INPUT = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isFocused) TITLE_INPUT.current?.focus()
  }, [isFocused])

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
        required={isRequired}
        placeholder={placeholder}
        ref={inputRef || TITLE_INPUT}
        className={classnames(
          labelText && 'mt-3',
          'border border-neutral-300 dark:border-neutral-600 focus:border-yellow-500 dark:focus:border-yellow-500',
          'bg-neutral-50 text-neutral-900 text-xs rounded-md focus:ring-1 focus:ring-yellow-200 block w-full p-2.5 dark:bg-neutral-800 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-1 dark:focus:ring-yellow-950 focus-visible:outline-0'
        )}
        onChange={({ currentTarget }) => onChange(currentTarget)}
      />
    </label>
  )
}

export default Input
