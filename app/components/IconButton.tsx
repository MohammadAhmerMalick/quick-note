import type { MouseEventHandler, ReactNode } from 'react'
import { classnames } from '@/utils'

interface IconButtonProps {
  isActive?: boolean
  disabled?: boolean
  ariaLabel?: string
  className?: string
  children: ReactNode
  type?: 'submit' | 'button'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({
  children,
  ariaLabel,
  className,
  type = 'button',
  isActive = false,
  disabled = false,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={classnames(
        isActive
          ? 'z-10 border-yellow-400 bg-neutral-50 shadow dark:border-yellow-500 dark:bg-neutral-850'
          : 'border-neutral-300 dark:border-neutral-600',
        'rounded-md border p-2 text-neutral-900 outline-0 hover:bg-neutral-100 focus:bg-neutral-100 md:p-2 dark:hover:bg-neutral-600 dark:focus:bg-neutral-850',
        className
      )}
    >
      {children}
    </button>
  )
}

export default IconButton
