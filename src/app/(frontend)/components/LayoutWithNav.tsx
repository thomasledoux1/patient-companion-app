'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { BottomNav } from './BottomNav'

export function LayoutWithNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isOnboarding = pathname?.startsWith('/onboarding') ?? false
  const isRegister = pathname === '/register'
  const isLogin = pathname === '/login'

  if (isOnboarding || isRegister || isLogin) {
    return <>{children}</>
  }

  return (
    <div className="lg:flex lg:min-h-screen">
      <BottomNav />
      <main className="lg:min-h-screen pb-20 lg:flex-1 lg:pb-8 lg:pl-56">{children}</main>
    </div>
  )
}
