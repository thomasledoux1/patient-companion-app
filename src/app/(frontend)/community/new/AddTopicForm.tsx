'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { createCommunityMessage } from '../actions'
import type { CreateCommunityMessageResult } from '../actions'

export function AddTopicForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(createCommunityMessage, null as CreateCommunityMessageResult | null)

  useEffect(() => {
    if (state?.ok === true) {
      router.push(`/community/${state.id}`)
      router.refresh()
    }
  }, [state, router])

  if (state?.ok === false && 'authRequired' in state && state.authRequired) {
    return (
      <div className="rounded-xl border border-white/20 bg-card p-6">
        <p className="text-white/90">
          You must be logged in to add a topic.
        </p>
        <Link
          href={`/login?redirect=${encodeURIComponent('/community/new')}`}
          className="mt-4 inline-block rounded bg-white/20 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-white/30"
        >
          Log in
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="topic-title" className="mb-1 block text-sm font-medium text-white/90">
          Title
        </label>
        <input
          id="topic-title"
          name="title"
          type="text"
          placeholder="e.g. My experience with..."
          required
          maxLength={200}
          className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>
      <div>
        <label htmlFor="topic-message" className="mb-1 block text-sm font-medium text-white/90">
          Message
        </label>
        <textarea
          id="topic-message"
          name="message"
          placeholder="Share your story or question..."
          required
          rows={6}
          className="w-full resize-y rounded border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>
      {state?.ok === false && 'error' in state && state.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded bg-[var(--color-accent-alt)] py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? 'Sending…' : 'Send'}
    </button>
  )
}
