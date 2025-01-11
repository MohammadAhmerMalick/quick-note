'use client'

import type { ElementType } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { classnames } from '@/utils'
import useIsLoggedIn from '@/hooks/useAuth'
import { FiHomeIcon, FiLogInIcon, FiFolderIcon } from '@/components/icons'

interface Links {
  text: string
  link: string
  icon: ElementType
  onClick: () => void
}

const NavLInks = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { isLoggedIn, logOut } = useIsLoggedIn()

  const getAuthNavAction = () =>
    isLoggedIn
      ? {
          text: 'Logout',
          link: '/logout',
          onClick: logOut,
          icon: FiLogInIcon,
        }
      : {
          text: 'Login',
          link: '/login',
          onClick: () => router.push('/login'),
          icon: FiLogInIcon,
        }

  const links: Links[] = [
    {
      text: 'Home',
      link: '/',
      onClick: () => router.push('/'),
      icon: FiHomeIcon,
    },
    {
      text: 'Notes',
      link: '/notes',
      onClick: () => router.push('/notes'),
      icon: FiFolderIcon,
    },
    getAuthNavAction(),
  ]

  return (
    <div className="flex gap-0.5 sm:gap-3">
      {links.map((link) => (
        <button
          key={link.text}
          onClick={link.onClick}
          className={classnames(
            link.link === pathname
              ? 'z-10 border-transparent bg-white shadow dark:border-neutral-600 dark:bg-neutral-800'
              : 'border-transparent',
            'inline-flex h-8 items-center gap-2 rounded-full border px-3 text-sm text-neutral-600 outline-0 hover:bg-neutral-100 focus:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600'
          )}
        >
          <link.icon /> {link.text}
        </button>
      ))}
    </div>
  )
}

export default NavLInks
