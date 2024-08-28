import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import { classnames } from '@/utils'
import Firebase from '@/lib/firebase'
import Toast from '@/components/Toast'

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
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
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
      <body className={inter.className}>
        {children}
        <Toast />
      </body>
    </html>
  )
}
