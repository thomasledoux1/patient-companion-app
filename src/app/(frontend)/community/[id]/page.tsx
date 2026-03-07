import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Avatar } from '../../components/Avatar'
import { CommentForm } from './CommentForm'

function getRelativeTime(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 1) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`
}

export default async function CommunityMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })
  const messageId = Number(id)

  const [message, authResult] = await Promise.all([
    payload
      .findByID({
        collection: 'community-messages',
        id: messageId,
        depth: 2,
      })
      .catch(() => null),
    payload.auth({ headers: (await headers()) as Headers, canSetHeaders: false }),
  ])

  if (!message) notFound()

  const isLoggedIn = Boolean(authResult.user)

  const author =
    message.author && typeof message.author === 'object' ? message.author : null
  const authorName = author?.name ?? author?.email ?? 'Someone'
  const profilePicture = author?.profilePicture
  const authorAvatarUrl =
    profilePicture && typeof profilePicture === 'object' && profilePicture?.url
      ? profilePicture.url
      : null

  const comments = message.comments ?? []
  const likesCount = Array.isArray(message.likes) ? message.likes.length : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 pb-12 pt-4 text-white md:max-w-3xl md:px-6 lg:px-8">
        <Link
          href="/community"
          className="mb-6 inline-flex items-center gap-2 text-white/80 no-underline hover:text-white"
          aria-label="Back to community"
        >
          ← Back to community
        </Link>

        <header className="mb-8 flex gap-4">
          <Avatar src={authorAvatarUrl} name={authorName} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white/70">
              {getRelativeTime(message.createdAt)}
              <span className="mx-1.5 inline-block size-1 rounded-full bg-white/50" aria-hidden />
              {authorName}
            </p>
            <h1 className="mt-2 font-bold text-2xl leading-tight text-white sm:text-3xl">
              {message.title}
            </h1>
          </div>
        </header>

        <section className="rounded-xl border border-white/10 bg-card p-6">
          <p className="whitespace-pre-wrap text-base leading-relaxed text-white/95">
            {message.message}
          </p>
        </section>

        {(likesCount > 0 || comments.length > 0) && (
          <section className="mt-8 rounded-xl border border-white/10 bg-card p-6">
            {likesCount > 0 && (
              <p className="text-sm text-white/80">
                {likesCount} like{likesCount !== 1 ? 's' : ''}
              </p>
            )}
            {comments.length > 0 && (
              <div className={likesCount > 0 ? 'mt-4' : ''}>
                <h2 className="text-lg font-semibold text-white">
                  Comments ({comments.length})
                </h2>
                <ul className="mt-3 list-none space-y-3 p-0">
                  {comments.map((comment, i) => {
                    const commentAuthor =
                      comment.author && typeof comment.author === 'object'
                        ? comment.author
                        : null
                    const commentAuthorName =
                      commentAuthor?.name ?? commentAuthor?.email ?? 'Someone'
                    return (
                      <li
                        key={comment.id ?? i}
                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <p className="text-sm font-medium text-white/90">
                          {commentAuthorName}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/85">
                          {comment.body}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </section>
        )}

        {isLoggedIn && (
          <section className="mt-8 rounded-xl border border-white/10 bg-card p-6">
            <CommentForm messageId={messageId} />
          </section>
        )}
      </div>
    </div>
  )
}
