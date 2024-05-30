import { type ReactNode } from 'react'

import { classnames } from '@/utils'

interface Button {
  disabled?: boolean
  children: ReactNode
  type?: 'submit' | 'button'
}

const Button = ({ type = 'submit', disabled, children }: Button) => {
  return (
    <button
      type={type}
      aria-disabled={disabled}
      disabled={disabled}
      className={classnames(
        'block',
        'w-full',
        'px-5',
        'py-2.5',
        'rounded-md',

        'focus:ring-1',
        'active:ring-1',
        'focus:ring-yellow-200',
        'active:ring-yellow-200',
        'focus:border-yellow-500',
        'active:border-yellow-500',
        'focus:outline-none',
        'active:outline-none',

        'bg-yellow-400',
        'dark:bg-yellow-500',
        'disabled:bg-neutral-200',
        'dark:disabled:bg-neutral-700',

        'text-xs',
        'text-center',
        'font-semibold',
        'text-neutral-900',
        'disabled:text-neutral-400'
      )}
    >
      {children}
    </button>
  )
}

export default Button
