import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import Toast from '@/components/Toast'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
  return (
    <html lang="en" className="bg-neutral-50 dark:bg-neutral-950">
      <body className={inter.className}>
        {children}
        <Toast />
      </body>
    </html>
  )
}
