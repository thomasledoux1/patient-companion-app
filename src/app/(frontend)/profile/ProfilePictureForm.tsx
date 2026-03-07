'use client'

import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { Avatar } from '../components/Avatar'
import { setProfilePicture } from './actions'

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

type ProfilePictureFormProps = {
  avatarUrl: string | null
  displayName: string
}

export function ProfilePictureForm({ avatarUrl, displayName }: ProfilePictureFormProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    setError('')
    setIsPending(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', 'Profile picture')
      const res = await fetch('/api/media', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          errors?: Array<{ message?: string }>
          message?: string
        }
        const msg = data.errors?.[0]?.message ?? data.message ?? 'Upload failed.'
        setError(msg)
        setIsPending(false)
        return
      }
      const json = (await res.json()) as { doc?: { id?: number } }
      const mediaId = json?.doc?.id
      if (typeof mediaId !== 'number') {
        setError('Invalid response from server.')
        setIsPending(false)
        return
      }
      const result = await setProfilePicture(mediaId)
      if (!result.ok) {
        setError(result.error)
        setIsPending(false)
        return
      }
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsPending(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="relative inline-block">
      <Avatar src={avatarUrl} name={displayName} size="xl" />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isPending}
        className="sr-only"
        id="profile-picture-input"
        aria-label="Change profile picture"
      />
      <label
        htmlFor="profile-picture-input"
        className="absolute -right-1 -top-1 flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-card bg-white/95 text-gray-700 shadow transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
        title="Change profile picture"
      >
        <EditIcon />
      </label>
      {error && <p className="mt-2 text-center text-sm text-red-400">{error}</p>}
    </div>
  )
}
