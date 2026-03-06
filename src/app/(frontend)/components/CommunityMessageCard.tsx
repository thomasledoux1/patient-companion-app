import Link from 'next/link'
import React from 'react'
import type { CommunityMessageForList } from '../community/actions'

function getRelativeTime(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 1) return 'posted just now'
  if (diffMinutes < 60) return `posted ${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `posted ${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays === 1) return 'posted 1 day ago'
  if (diffDays < 7) return `posted ${diffDays} days ago`
  if (diffDays < 30)
    return `posted ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`
  return `posted ${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`
}

function TopicIcon({ id }: { id: number }) {
  const clipId = `community-card-icon-${id}`
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-10 shrink-0"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="20" cy="20" r="20" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path d="M0 0H20V20H0V0Z" fill="#EB498A" />
        <path d="M20 0H40V20H20V0Z" fill="#E8E8E8" />
        <path d="M0 20H20V40H0V20Z" fill="#63B3B9" />
        <path d="M20 20H40V40H20V20Z" fill="#7BC9A4" />
        <path d="M20 12L28 28H12L20 12Z" fill="white" fillOpacity="0.95" />
      </g>
    </svg>
  )
}

type CommunityMessageCardProps = {
  message: CommunityMessageForList
  href: string
}

export function CommunityMessageCard({ message, href }: CommunityMessageCardProps) {
  return (
    <Link
      href={href}
      className="flex gap-3 rounded-xl border border-white/10 bg-card px-4 py-4 text-left no-underline transition-colors hover:bg-card/90 hover:border-white/20"
    >
      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
        <TopicIcon id={message.id} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-white/70">
          {getRelativeTime(message.createdAt)}
          <span className="mx-1.5 inline-block size-1 rounded-full bg-white/50" aria-hidden />
          {message.authorName}
        </p>
        <h3 className="mt-1 text-base font-bold leading-tight text-white">{message.title}</h3>
        {message.message && (
          <p className="mt-2 line-clamp-7 text-sm leading-[1.4] text-white/90">
            {message.message}
          </p>
        )}
      </div>
    </Link>
  )
}
