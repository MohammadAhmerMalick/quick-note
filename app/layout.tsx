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
  icons: './favicon.svg',
  authors: [
    {
      name: 'Mohammad Ahmer Malick',
      url: 'https://www.mohammadahmermalick.com/',
    },
  ],
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
