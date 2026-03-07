import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import React from 'react'
import configPromise from '@payload-config'
import { ProfileActions } from './ProfileActions'
import { ProfilePictureForm } from './ProfilePictureForm'

export default async function ProfilePage() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })

  if (!authResult.user) {
    redirect('/login?redirect=' + encodeURIComponent('/profile'))
  }

  const userWithDepth = await payload.findByID({
    collection: 'users',
    id: authResult.user.id,
    depth: 1,
  })

  const user = userWithDepth as {
    name?: string | null
    email?: string
    profilePicture?: number | { url?: string | null } | null
  }
  const displayName = user?.name ?? user?.email ?? 'User'
  const profilePicture = user?.profilePicture
  const avatarUrl =
    profilePicture && typeof profilePicture === 'object' && profilePicture?.url
      ? profilePicture.url
      : null

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-sm">
        {/* Top section: avatar, name, subtitle – lighter card background */}
        <section className="bg-card px-4 pb-6 pt-10">
          <div className="flex flex-col items-center text-center">
            <ProfilePictureForm avatarUrl={avatarUrl} displayName={displayName} />
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">{displayName}</h1>
            <p className="mt-1 text-sm text-white/70">Member</p>
          </div>
        </section>

        {/* Account details + actions – darker background */}
        <section className="px-4 py-5">
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-white/60">Email address</dt>
              <dd className="mt-1 text-white">{user?.email ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/60">Password</dt>
              <dd className="mt-1 text-white">••••••••••••</dd>
            </div>
          </dl>

          <div className="mt-5 border-t border-white/10 pt-5">
            <ProfileActions />
          </div>
        </section>
      </div>
    </div>
  )
}
