import type { MouseEventHandler, ReactNode } from 'react'
import { classnames } from '@/utils'

interface IconButtonProps {
  bgColor?: string
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
  bgColor = '',
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
          ? `shadow border-${bgColor || 'yellow'}-500 ring-${bgColor || 'yellow'}-200 dark:ring-${bgColor || 'yellow'}-950 ring-1 bg-white dark:bg-neutral-850 z-10`
          : 'border-neutral-300 dark:border-neutral-600',
        'md:p-2 p-2 outline-0 rounded-md border',
        bgColor
          ? `bg-${bgColor}-500 hover:bg-${bgColor}-500 focus:bg-${bgColor}-500 dark:bg-${bgColor}-500 hover:dark:bg-${bgColor}-500 focus:dark:bg-${bgColor}-500`
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:bg-neutral-100 dark:focus:bg-neutral-850',
        className
      )}
    >
      {children}
    </button>
  )
}

export default IconButton
