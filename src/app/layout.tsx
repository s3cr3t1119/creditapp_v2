import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Credit Application',
  description: 'Modern credit application form built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Suspense fallback={<div>...</div>}>
        {children}
      </Suspense>
      </body>
    </html>
  )
}