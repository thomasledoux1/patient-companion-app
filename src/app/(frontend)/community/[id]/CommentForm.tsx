'use client'

import { useActionState } from 'react'
import { addCommentToCommunityMessage, type AddCommentResult } from '../actions'

type CommentFormProps = {
  messageId: number
}

function formAction(_prev: AddCommentResult | null, formData: FormData) {
  return addCommentToCommunityMessage(_prev, formData)
}

export function CommentForm({ messageId }: CommentFormProps) {
  const [state, formActionBound] = useActionState(formAction, null)

  return (
    <form action={formActionBound} className="mt-6">
      <input type="hidden" name="messageId" value={messageId} />
      <label htmlFor="comment-body" className="block font-bold text-white">
        Post a comment:
      </label>
      <textarea
        id="comment-body"
        name="body"
        required
        rows={4}
        className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Write your comment…"
      />
      {state && !state.ok && 'error' in state && (
        <p className="mt-2 text-sm text-red-300" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        Post comment
      </button>
    </form>
  )
}
