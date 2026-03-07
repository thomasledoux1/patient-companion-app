'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CommunityIcon, HomeIcon, PrepareIcon, ProfileIcon, TipsIcon } from './Icons'

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/tips', label: 'Tips', icon: TipsIcon },
  { href: '/community', label: 'Community', icon: CommunityIcon },
  { href: '/prepare', label: 'Prepare', icon: PrepareIcon },
  { href: '/profile', label: 'Profile', icon: ProfileIcon },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-card lg:bottom-auto lg:left-0 lg:top-0 lg:h-screen lg:right-auto lg:w-56 lg:shrink-0 lg:flex lg:flex-col lg:border-t-0 lg:border-r lg:border-white/10"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2 lg:mx-0 lg:mt-6 lg:max-w-none lg:flex-col lg:items-stretch lg:gap-1 lg:px-3 lg:py-0">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/'
              ? pathname === '/'
              : pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors lg:flex-row lg:gap-3 lg:px-4 lg:py-3 lg:text-sm ${
                isActive
                  ? 'text-surface-elevated'
                  : 'text-white/70 hover:text-white/90'
              }`}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon />
              <span className="hidden lg:inline" aria-hidden>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
