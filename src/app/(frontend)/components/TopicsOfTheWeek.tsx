import Link from 'next/link'
import React from 'react'

export type TopicItem = {
  id: number
  title: string
  message: string
  authorName: string
  createdAt: string
}

type TopicsOfTheWeekProps = {
  topics: TopicItem[]
}

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
  const clipId = `topic-icon-${id}`
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

export function TopicsOfTheWeek({ topics }: TopicsOfTheWeekProps) {
  if (topics.length === 0) return null

  return (
    <article className="overflow-hidden rounded-xl bg-card shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: 'var(--color-accent-alt)' }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.4472 0C4.99966 0 -0.91909 6.40875 0.11841 13.9062C0.77966 18.6838 4.40341 22.695 9.14966 23.96C10.9172 24.4312 12.7422 24.5312 14.5747 24.215C16.1047 23.95 17.6747 24.0688 19.1734 24.4438L20.9947 24.8988V24.8988C23.3559 25.49 25.5009 23.3887 24.8972 21.0737C24.8972 21.0737 24.5597 19.7787 24.5497 19.7375C24.1722 18.2875 24.0909 16.7563 24.4809 15.31C24.9634 13.5275 25.0447 11.5862 24.6109 9.575C23.4634 4.26875 18.5909 0 12.4472 0M12.4472 2.5C17.3872 2.5 21.2559 5.8875 22.1672 10.1038C22.5009 11.6488 22.4672 13.18 22.0684 14.6575C20.3809 20.8975 25.3147 23.4025 19.7797 22.0175C17.9384 21.5575 16.0197 21.4275 14.1484 21.7513C12.7047 22.0013 11.2422 21.93 9.79341 21.545C6.00966 20.5363 3.11591 17.3287 2.59466 13.5637C1.75591 7.49625 6.58591 2.5 12.4472 2.5V2.5"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-white">Topics of the week</span>
      </div>

      <ul className="bg-card-dark p-4 overflow-scroll flex gap-2 md:overflow-visible md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-1">
        {topics.map((topic) => (
          <li key={topic.id} className="min-w-[290px] md:min-w-0">
            <Link
              href={`/community/${topic.id}`}
              className="flex gap-3 p-4 h-full rounded-sm bg-card no-underline text-inherit transition-opacity hover:opacity-90"
            >
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <TopicIcon id={topic.id} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white/70">
                  {getRelativeTime(topic.createdAt)}
                  <span
                    className="mx-1.5 inline-block size-1 rounded-full bg-white/50"
                    aria-hidden
                  />
                  {topic.authorName}
                </p>
                <h3 className="mt-1 text-base font-bold leading-tight text-white">{topic.title}</h3>
                {topic.message && (
                  <p className="mt-2 line-clamp-7 text-sm leading-[1.4] text-white/90">
                    {topic.message}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 border-t border-white/10">
        <Link
          href="/community"
          className="flex items-center justify-center py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          See all
        </Link>
        <Link
          href="/community/new"
          className="flex items-center justify-center border-l border-white/10 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          Add topic
        </Link>
      </div>
    </article>
  )
}
