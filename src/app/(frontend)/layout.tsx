import React from 'react'
import { Lato } from 'next/font/google'
import { LayoutWithNav } from './components/LayoutWithNav'
import './styles.css'

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata = {
  description: 'Patient Companion – your care overview, appointments, and health.',
  title: 'Patient Companion',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${lato.className} lg:min-h-screen bg-background text-white`}
      >
        <LayoutWithNav>{children}</LayoutWithNav>
      </body>
    </html>
  )
}
