import { type ReactNode } from 'react'

interface Button {
  type?: 'submit' | 'button'
  children: ReactNode
}

const Button = ({ type = 'submit', children }: Button) => {
  return (
    <button
      type={type}
      className="text-neutral-900 text-xs text-center font-semibold bg-PrimaryYellow bg-yellow-400 hover:bg-yellow-400 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:border-yellow-500 focus:outline-none rounded-md focus:ring-1 focus:ring-yellow-200 px-5 py-2.5 w-full block"
    >
      {children}
    </button>
  )
}

export default Button
