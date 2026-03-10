import Link from 'next/link'
import React from 'react'
import { RegisterForm } from './RegisterForm'

function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

type Props = {
  searchParams: Promise<{ from?: string }>
}

export default async function RegisterPage({ searchParams }: Props) {
  const { from } = await searchParams
  const showBackButton = from === 'onboarding'

  return (
    <div className="flex lg:min-h-screen flex-col bg-background text-white">
      <header className="flex shrink-0 items-center px-4 py-4">
        {showBackButton ? (
          <Link
            href="/onboarding"
            className="flex items-center justify-center p-2 text-white transition-opacity hover:opacity-80"
            aria-label="Back"
          >
            <ArrowLeftIcon />
          </Link>
        ) : (
          <span className="w-10" aria-hidden />
        )}
        <span className="flex-1 text-center text-lg font-bold tracking-tight text-white">
          iMGine
        </span>
        <span className="w-10" aria-hidden />
      </header>

      <div className="flex flex-1 flex-col px-8 pb-8 pt-2">
        <h1 className="text-3xl leading-tight tracking-tight font-normal text-white">
          All right, let&apos;s get started.
        </h1>
        <p className="mt-3 text-lg text-white/70">
          Before we introduce you to the community, we&apos;d like to know your name.
        </p>

        <RegisterForm />
      </div>
    </div>
  )
}
