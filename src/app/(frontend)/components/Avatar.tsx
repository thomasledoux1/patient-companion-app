import React from 'react'

function getInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return '?'
  const parts = trimmed.split(/\s+/)
  if (parts.length >= 2) {
    const first = parts[0]?.charAt(0) ?? ''
    const last = parts[parts.length - 1]?.charAt(0) ?? ''
    return (first + last).toUpperCase().slice(0, 2)
  }
  return trimmed.slice(0, 2).toUpperCase()
}

type AvatarProps = {
  /** Image URL; when set, the image is shown. */
  src?: string | null
  /** Display name for initials when no image. */
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-16 text-lg',
  xl: 'size-24 text-xl',
} as const

export function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  const sizeClass = sizeClasses[size]
  const initials = getInitials(name)

  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={`shrink-0 rounded-full object-cover ${sizeClass} ${className}`}
      />
    )
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-alt)] font-semibold text-white ${sizeClass} ${className}`}
      aria-hidden
    >
      {initials}
    </span>
  )
}
