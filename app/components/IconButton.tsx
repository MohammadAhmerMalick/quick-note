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
          ? 'shadow border-yellow-500 ring-yellow-200 dark:ring-yellow-950 ring-1 bg-white dark:bg-neutral-850 z-10'
          : 'border-neutral-300 dark:border-neutral-600',
        'text-neutral-900 p-2 outline-0 rounded-md border',
        'hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:bg-neutral-100 dark:focus:bg-neutral-850',
        className
      )}
    >
      {children}
    </button>
  )
}

export default IconButton
