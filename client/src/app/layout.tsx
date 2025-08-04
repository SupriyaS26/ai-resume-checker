// src/app/layout.tsx


import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '../redux/provider'  // <-- You will create this file

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Resume Checker',
  description: 'Upload your resume and get feedback',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
