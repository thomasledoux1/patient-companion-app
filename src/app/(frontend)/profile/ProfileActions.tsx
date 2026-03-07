'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { deleteAccount } from './actions'

export function ProfileActions() {
  const router = useRouter()
  const [deleteError, setDeleteError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleLogout() {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    router.push('/')
    router.refresh()
  }

  async function handleDeleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return
    setDeleteError('')
    setIsDeleting(true)
    const result = await deleteAccount()
    if (!result.ok) {
      setDeleteError(result.error)
      setIsDeleting(false)
      return
    }
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    router.push('/')
    router.refresh()
  }

  return (
    <div className="space-y-3">
      {deleteError && <p className="text-sm text-red-400">{deleteError}</p>}
      <button
        type="button"
        onClick={handleLogout}
        className="text-left text-[#FFA500] no-underline transition-opacity hover:opacity-90"
      >
        Log out
      </button>
      <button
        type="button"
        onClick={handleDeleteAccount}
        disabled={isDeleting}
        className="block text-left text-red-500 no-underline transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isDeleting ? 'Deleting…' : 'Delete Account'}
      </button>
    </div>
  )
}
