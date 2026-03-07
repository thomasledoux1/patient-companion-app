import Link from 'next/link'
import React from 'react'
import type { CommunityMessageForList } from '../community/actions'
import { Avatar } from './Avatar'

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
      <Avatar src={message.authorAvatarUrl} name={message.authorName} size="md" />
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
