'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type SetProfilePictureResult = { ok: true } | { ok: false; error: string }

export async function setProfilePicture(mediaId: number): Promise<SetProfilePictureResult> {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })

  if (!authResult.user) {
    return { ok: false, error: 'Not logged in.' }
  }

  try {
    await payload.update({
      collection: 'users',
      id: authResult.user.id,
      data: { profilePicture: mediaId },
      user: authResult.user,
      overrideAccess: false,
    })
    return { ok: true }
  } catch (e) {
    console.error('Set profile picture error:', e)
    return { ok: false, error: 'Could not update profile picture. Please try again.' }
  }
}

export type DeleteAccountResult = { ok: true } | { ok: false; error: string }

export async function deleteAccount(): Promise<DeleteAccountResult> {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })

  if (!authResult.user) {
    return { ok: false, error: 'Not logged in.' }
  }

  try {
    await payload.delete({
      collection: 'users',
      id: authResult.user.id,
      user: authResult.user,
      overrideAccess: false,
    })
    return { ok: true }
  } catch (e) {
    console.error('Delete account error:', e)
    return { ok: false, error: 'Could not delete account. Please try again.' }
  }
}
