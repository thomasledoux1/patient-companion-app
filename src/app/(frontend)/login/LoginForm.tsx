'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-lg text-white placeholder:text-white/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30'

export function LoginForm({ redirectTo }: { redirectTo: string }) {
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
        setError(
          (data as { message?: string })?.message ?? 'Invalid email or password.'
        )
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
    <form onSubmit={handleSubmit} className="mt-8 flex flex-1 flex-col gap-6">
      <div>
        <label htmlFor="login-email" className="sr-only">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="email"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="login-password" className="sr-only">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="password"
          className={inputClass}
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-auto w-full rounded-xl bg-primary py-4 text-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>

      <p className="text-center text-sm text-white/70">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-white/90 underline hover:text-white">
          Create one
        </Link>
      </p>
    </form>
  )
}
