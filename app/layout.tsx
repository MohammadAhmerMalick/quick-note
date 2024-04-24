import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import Toast from '@/components/Toast'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quick Note',
  description: 'Quick Note By Mohammad Ahmer Malick',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-neutral-50 dark:bg-slate-950">
      <body className={inter.className}>
        {children}
        <Toast />
      </body>
    </html>
  )
}
