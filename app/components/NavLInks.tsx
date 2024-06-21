import Link from 'next/link'
import { type ElementType } from 'react'
import { usePathname } from 'next/navigation'

import { classnames } from '@/utils'
import { FiHomeIcon, FiLogInIcon, FiFolderIcon } from '@/components/icons'

interface Links {
  text: string
  link: string
  icon: ElementType
}

// Theme Options
const links: Links[] = [
  { text: 'Home', link: '/', icon: FiHomeIcon },
  { text: 'Notes', link: '/notes', icon: FiFolderIcon },
  { text: 'Login', link: '/login', icon: FiLogInIcon },
]

const NavLInks = () => {
  const pathname = usePathname()

  return (
    <div className="flex gap-3">
      {links.map((link) => (
        <Link
          href={link.link}
          key={link.link}
          type="button"
          aria-label="theme"
          className={classnames(
            link.link === pathname
              ? 'shadow border-transparent dark:border-neutral-700 bg-white dark:bg-neutral-800 z-10'
              : 'border-transparent',
            'inline-flex items-center gap-2',
            'px-3',
            'px-3 h-8',
            'outline-0 rounded-full border',
            'text-neutral-600 dark:text-neutral-50 text-sm',
            'hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700'
          )}
        >
          <link.icon /> {link.text}
        </Link>
      ))}
    </div>
  )
}

export default NavLInks
