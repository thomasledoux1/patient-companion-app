'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type LoginFormProps = {
  redirectTo: string
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsPending(true)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError((data as { message?: string })?.message ?? 'Invalid email or password.')
        setIsPending(false)
        return
      }
      router.push(redirectTo)
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/10 bg-card p-6">
      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-white/90">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-white/90">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-[var(--color-accent-alt)] py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="text-center text-sm text-white/70">
        <Link href="/" className="text-white/90 underline hover:text-white">
          Back to home
        </Link>
      </p>
    </form>
  )
}
