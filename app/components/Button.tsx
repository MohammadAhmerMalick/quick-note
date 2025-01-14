'use client'

import { Button as AriaButton, type ButtonProps } from 'react-aria-components'

import { classnames } from '@/utils'

const Button = ({
  children,
  className,
  type = 'submit',
  ...props
}: ButtonProps) => {
  return (
    <AriaButton
      {...props}
      type={type}
      className={classnames(
        'dark:bg-primaborder-primary block w-full rounded-md bg-primary px-5 py-2.5 text-center text-xs font-semibold text-neutral-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-yellow-800 active:border-primary active:outline-none active:ring-1 active:ring-yellow-800 disabled:bg-neutral-200 disabled:text-neutral-400 dark:disabled:bg-neutral-700',
        className
      )}
    >
      {children}
    </AriaButton>
  )
}

export default Button
