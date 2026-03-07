'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsPending(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: name || undefined }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const msg = (data as { errors?: Array<{ message?: string }> })?.errors?.[0]?.message
          ?? (data as { message?: string })?.message
          ?? 'Registration failed. This email may already be in use.'
        setError(msg)
        setIsPending(false)
        return
      }
      router.push('/login?registered=1')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/10 bg-card p-6">
      <div>
        <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-white/90">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>
      <div>
        <label htmlFor="register-name" className="mb-1 block text-sm font-medium text-white/90">
          Name <span className="text-white/50">(optional)</span>
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="Display name"
          className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>
      <div>
        <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-white/90">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          minLength={8}
          className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-[var(--color-accent-alt)] py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Creating account…' : 'Create account'}
      </button>
      <p className="text-center text-sm text-white/70">
        Already have an account?{' '}
        <Link href="/login" className="text-white/90 underline hover:text-white">
          Log in
        </Link>
      </p>
    </form>
  )
}
