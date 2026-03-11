import React from 'react'
import { LoginForm } from './LoginForm'

type Props = {
  searchParams: Promise<{ redirect?: string; registered?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirect, registered } = await searchParams
  const redirectTo = redirect && redirect.startsWith('/') ? redirect : '/community'

  return (
    <div className="flex flex-col bg-background text-white lg:min-h-screen">
      <header className="flex shrink-0 items-center px-4 py-4">
        <span className="w-10" aria-hidden />
        <span className="flex-1 text-center text-lg font-bold tracking-tight text-white">
          iMGine
        </span>
        <span className="w-10" aria-hidden />
      </header>

      <div className="flex flex-1 flex-col px-8 pb-8 pt-2">
        {registered === '1' && (
          <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-center text-sm text-green-300">
            Account created. Please log in.
          </p>
        )}
        <h1 className="text-3xl font-normal leading-tight tracking-tight text-white">
          Welcome back.
        </h1>
        <p className="mt-3 text-lg text-white/70">
          Sign in to add topics and join the community.
        </p>

        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  )
}
