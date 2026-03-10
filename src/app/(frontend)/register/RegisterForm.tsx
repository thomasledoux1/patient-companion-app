'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const inputClass = 'w-full rounded-2xl text-white bg-white/29 py-4 px-6 text-lg'

export function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [diagnosedWithMG, setDiagnosedWithMG] = useState(true)
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
        body: JSON.stringify({
          email,
          password,
          name: name || undefined,
          diagnosedWithMG,
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          errors?: Array<{ message?: string }>
          message?: string
        }
        const msg =
          data.errors?.[0]?.message ??
          data.message ??
          'Registration failed. This email may already be in use.'
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
    <form onSubmit={handleSubmit} className="mt-8 flex flex-1 flex-col gap-6">
      <div>
        <label htmlFor="register-name" className="sr-only">
          Name
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="register-email" className="sr-only">
          Email address
        </label>
        <input
          id="register-email"
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
        <label htmlFor="register-password" className="sr-only">
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
          placeholder="password"
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between gap-4 flex-col-reverse">
        <label htmlFor="register-mg" className="cursor-pointer text-base text-white/70">
          I am diagnosed with MG
        </label>
        <button
          type="button"
          role="switch"
          id="register-mg"
          aria-checked={diagnosedWithMG}
          onClick={() => setDiagnosedWithMG((v) => !v)}
          className="relative h-8 w-14 shrink-0 rounded-full border-2 border-white bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          <span
            className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-primary transition-transform ${
              diagnosedWithMG ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-auto w-full rounded-xl bg-primary py-4 text-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Creating account…' : 'Get started'}
      </button>

      <p className="text-center text-sm text-white/70">
        Already have an account?{' '}
        <Link href="/login" className="text-white/90 underline hover:text-white">
          Sign in
        </Link>
      </p>
    </form>
  )
}
