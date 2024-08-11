import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ElementType } from 'react'

import { classnames } from '@/utils'
import logoutAction from '@/actions/logoutAction'
import { FiHomeIcon, FiLogInIcon, FiFolderIcon } from '@/components/icons'

interface Links {
  text: string
  link: string
  onClick: () => void
  icon: ElementType
}

const NavLInks = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const getAuthNavAction = () =>
    isLoggedIn
      ? {
          text: 'Logout',
          link: '/logout',
          onClick: () => logoutAction(),
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

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('token'))
  }, [])

  return (
    <div className="flex sm:gap-3 gap-0.5">
      {links.map((link) => (
        <button
          key={link.text}
          onClick={link.onClick}
          className={classnames(
            link.link === pathname
              ? 'shadow border-transparent dark:border-neutral-600 bg-white dark:bg-neutral-800 z-10'
              : 'border-transparent',
            'inline-flex items-center gap-2',
            'px-3',
            'px-3 h-8',
            'outline-0 rounded-full border',
            'text-neutral-600 dark:text-neutral-50 text-sm',
            'hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:bg-neutral-100 dark:focus:bg-neutral-600'
          )}
        >
          <link.icon /> {link.text}
        </button>
      ))}
    </div>
  )
}

export default NavLInks
