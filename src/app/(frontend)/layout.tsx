import React from 'react'
import { Lato } from 'next/font/google'
import { BottomNav } from './components/BottomNav'
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
      <body className={`${lato.variable} ${lato.className} min-h-screen bg-background text-white`}>
        <div className="lg:flex lg:min-h-screen">
          <BottomNav />
          <main className="min-h-screen pb-20 lg:flex-1 lg:pb-8 lg:pl-56">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
