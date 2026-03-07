'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export type PrepForList = {
  id: number
  concerns: string
  createdAt: string
  questions: { question: string }[]
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str
  return str.slice(0, max).trim() + '…'
}

type PrepareClientProps = {
  initialPreps: PrepForList[]
}

export function PrepareClient({ initialPreps }: PrepareClientProps) {
  const router = useRouter()
  const [concerns, setConcerns] = useState('')
  const [questions, setQuestions] = useState<string[]>([])
  const [savedId, setSavedId] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = concerns.trim()
    if (!text) return
    setStatus('loading')
    setError(null)
    setQuestions([])
    setSavedId(null)
    try {
      const res = await fetch('/api/appointment-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concerns: text }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }
      setQuestions(data.questions ?? [])
      setSavedId(data.id ?? null)
      setStatus('done')
      if (data.id) router.refresh()
    } catch {
      setError('Could not reach the server.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-2xl px-4 py-6 pb-24 md:max-w-3xl md:px-6 md:py-8 lg:max-w-4xl lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Prepare for your appointment</h1>
          <p className="mt-2 text-white/70">
            Share what’s on your mind—symptoms, worries, or goals for the visit. We’ll generate a
            list of questions you can bring to your doctor.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="concerns" className="block font-bold text-white">
            What should we focus on?
          </label>
          <textarea
            id="concerns"
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            placeholder="e.g. I've been tired for weeks, I want to ask about my blood pressure..."
            rows={5}
            className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={!concerns.trim() || status === 'loading'}
            className="rounded-xl bg-primary px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === 'loading' ? 'Generating…' : 'Generate questions'}
          </button>
        </form>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
            {error}
          </div>
        )}

        {status === 'done' && questions.length > 0 && (
          <section className="mt-8 rounded-xl border border-white/10 bg-card p-6">
            <h2 className="text-lg font-bold text-white">Questions to bring</h2>
            <p className="mt-1 text-sm text-white/70">
              You can copy these or save them in the app{typeof savedId === 'number' ? ' (saved).' : '.'}
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-5">
              {questions.map((q, i) => (
                <li key={i} className="text-white/95 leading-snug">
                  {q}
                </li>
              ))}
            </ol>
          </section>
        )}

        {initialPreps.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-white">Previous preps</h2>
            <p className="mt-1 text-sm text-white/70">
              Your saved appointment question lists
            </p>
            <ul className="mt-4 list-none space-y-3 p-0">
              {initialPreps.map((prep) => (
                <li key={prep.id}>
                  <Link
                    href={`/prepare/${prep.id}`}
                    className="block rounded-xl border border-white/10 bg-card p-4 no-underline text-white transition-opacity hover:opacity-90"
                  >
                    <p className="text-sm text-white/70">{formatDate(prep.createdAt)}</p>
                    <p className="mt-1 font-medium text-white">
                      {truncate(prep.concerns, 80)}
                    </p>
                    <p className="mt-1 text-sm text-white/60">
                      {prep.questions.length} question{prep.questions.length !== 1 ? 's' : ''}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
