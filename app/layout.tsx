import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

import { classnames } from '@/utils'
import Firebase from '@/lib/firebase'
import Toast from '@/components/Toast'
import NavLInks from '@/components/NavLInks'
import ThemeSelector from '@/components/ThemeSelector'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// initialize Firebase
Firebase.initialize()

export const metadata: Metadata = {
  title: 'Quick Note',
  description: 'Quick Note By Mohammad Ahmer Malick',
  icons: [
    { rel: 'apple-touch-icon', url: './favicon.svg' },
    { rel: 'icon', url: './favicon.svg' },
  ],
  authors: [
    {
      name: 'Mohammad Ahmer Malick',
      url: 'https://www.mohammadahmermalick.com/',
    },
  ],

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
      <body className={(inter.className, 'p-3')}>
        <header className="flex justify-between items-center gap-1 flex-wrap mb-3">
          <NavLInks />
          <ThemeSelector />
        </header>

        {children}
        <Toast />
      </body>
    </html>
  )
}
