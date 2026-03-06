import React from 'react'
import { LoginForm } from './LoginForm'

type Props = {
  searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirect } = await searchParams
  const redirectTo = redirect && redirect.startsWith('/') ? redirect : '/community'

  return (
    <div className="min-h-screen bg-background p-4 text-white flex items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-6">
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
