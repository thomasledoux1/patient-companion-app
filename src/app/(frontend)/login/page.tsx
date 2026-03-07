import React from 'react'
import { LoginForm } from './LoginForm'

type Props = {
  searchParams: Promise<{ redirect?: string; registered?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirect, registered } = await searchParams
  const redirectTo = redirect && redirect.startsWith('/') ? redirect : '/community'

  return (
    <div className="min-h-screen bg-background p-4 text-white flex items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-6">
        {registered === '1' && (
          <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-center text-sm text-green-300">
            Account created. Please log in.
          </p>
        )}
        <header className="text-center">
          <h1 className="font-bold text-2xl tracking-tight">Log in</h1>
          <p className="mt-1 text-sm text-white/70">
            Sign in to add topics and join the community.
          </p>
        </header>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  )
}
