import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { getApps, initializeApp, cert } from 'firebase-admin/app'
import type { Metadata } from 'next'

import { classnames } from '@/utils'
import Toast from '@/components/Toast'
import serviceAccount from '@/config/firebaseConfig.json'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const firebaseApp = getApps()

// prevents the firebase to initialize twice
if (firebaseApp.length === 0)
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `gs://${serviceAccount.projectId}.appspot.com`,
  })

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
