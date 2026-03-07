import React from 'react'
import { RegisterForm } from './RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background p-4 text-white flex items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <header className="text-center">
          <h1 className="font-bold text-2xl tracking-tight">Create an account</h1>
          <p className="mt-1 text-sm text-white/70">
            Sign up to add topics and join the community.
          </p>
        </header>
        <RegisterForm />
      </div>
    </div>
  )
}
