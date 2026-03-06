'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CommunityIcon, HomeIcon, TipsIcon } from './Icons'

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/tips', label: 'Tips', icon: TipsIcon },
  { href: '/community', label: 'Community', icon: CommunityIcon },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-card"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/'
              ? pathname === '/'
              : pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-surface-elevated'
                  : 'text-white/70 hover:text-white/90'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
