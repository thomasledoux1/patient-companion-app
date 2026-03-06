import Link from 'next/link'
import React from 'react'
import { AddTopicForm } from './AddTopicForm'

export default function NewCommunityMessagePage() {
  return (
    <div className="min-h-screen bg-background p-4 text-white">
      <div className="mx-auto max-w-xl space-y-6">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-white/80 no-underline hover:text-white"
        >
          ← Back to community
        </Link>
        <header>
          <h1 className="font-bold text-[34px] leading-[40px] tracking-[-0.82px]">
            Add a topic
          </h1>
          <p className="subtitle mt-1 opacity-70">
            Share something with the community. You must be logged in to post.
          </p>
        </header>
        <AddTopicForm />
      </div>
    </div>
  )
}
