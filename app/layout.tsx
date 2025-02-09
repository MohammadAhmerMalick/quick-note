import { cookies } from 'next/headers'
import { Montserrat } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

import { classnames } from '@/utils'
import Firebase from '@/lib/firebase'
import Toast from '@/components/Toast'
import NavLInks from '@/components/NavLInks'
import ThemeSelector from '@/components/ThemeSelector'

import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], preload: true })

// initialize Firebase
Firebase.initialize()

const metaTitle = 'Quick Note'
const metaFavicon = '/icon?<generated>'
const metaDescription = 'Quick Note By Mohammad Ahmer Malick'

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  authors: [
    {
      name: 'Mohammad Ahmer Malick',
      url: 'https://www.mohammadahmermalick.com/',
    },
  ],
  appleWebApp: {
    capable: true,
    title: metaTitle,
    statusBarStyle: 'default',
    startupImage: metaFavicon,
  },
  openGraph: {
    title: metaTitle,
    images: metaFavicon,
    description: metaDescription,
    url: 'https://quick-note.mohammadahmermalick.com/',
  },

  twitter: {
    title: metaTitle,
    images: metaFavicon,
    description: metaDescription,
  },

  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
}

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#eab308' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')?.value || 'dark'

  return (
    <html
      lang="en"
      className={classnames(
        'bg-neutral-50 dark:bg-neutral-950',
        theme.toLowerCase()
      )}
    >
      <body className={classnames(montserrat.className, 'p-3')}>
        <header className="mb-3 flex flex-wrap items-center justify-between gap-1">
          <NavLInks />
          <ThemeSelector />
        </header>

        {children}
        <Toast />
      </body>
    </html>
  )
}
