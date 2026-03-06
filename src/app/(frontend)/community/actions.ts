'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type CreateCommunityMessageResult =
  | { ok: true; id: number }
  | { ok: false; authRequired: true }
  | { ok: false; error: string }

export async function createCommunityMessage(
  _prev: unknown,
  formData: FormData,
): Promise<CreateCommunityMessageResult> {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })

  if (!authResult.user) {
    return { ok: false, authRequired: true }
  }

  const title = (formData.get('title') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!title || !message) {
    return { ok: false, error: 'Title and message are required.' }
  }

  try {
    const doc = await payload.create({
      collection: 'community-messages',
      data: {
        title,
        message,
        author: authResult.user.id,
      },
      user: authResult.user,
      overrideAccess: false,
    })
    return { ok: true, id: doc.id }
  } catch (err) {
    const message =
      err && typeof err === 'object' && 'message' in err
        ? String((err as { message: unknown }).message)
        : 'Something went wrong.'
    return { ok: false, error: message }
  }
}

export type Period = 'day' | 'week' | 'month' | 'year'

function sinceDate(period: Period): string {
  const d = new Date()
  switch (period) {
    case 'day':
      d.setDate(d.getDate() - 1)
      break
    case 'week':
      d.setDate(d.getDate() - 7)
      break
    case 'month':
      d.setDate(d.getDate() - 30)
      break
    case 'year':
      d.setDate(d.getDate() - 365)
      break
  }
  return d.toISOString()
}

export type CommunityMessageForList = {
  id: number
  title: string
  message: string
  authorName: string
  createdAt: string
}

function toCommunityMessageForList(doc: {
  id: number
  title: string
  message: string
  createdAt: string
  author?: number | { id: number; name?: string | null; email?: string | null }
}): CommunityMessageForList {
  const author =
    doc.author && typeof doc.author === 'object'
      ? doc.author
      : null
  const authorName = author?.name ?? author?.email ?? 'Someone'
  return {
    id: doc.id,
    title: doc.title,
    message: doc.message,
    authorName,
    createdAt: doc.createdAt,
  }
}

export async function getFilteredCommunityMessages(
  search: string,
  period: Period,
): Promise<{ messages: CommunityMessageForList[]; total: number }> {
  const payload = await getPayload({ config: configPromise })
  const since = sinceDate(period)

  const and = [
    { createdAt: { greater_than_equal: since } },
    ...(search.trim()
      ? [
          {
            or: [
              { title: { contains: search.trim() } },
              { message: { contains: search.trim() } },
            ],
          },
        ]
      : []),
  ]

  const { docs, totalDocs } = await payload.find({
    collection: 'community-messages',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { and } as any,
  })

  const messages = docs.map(toCommunityMessageForList)
  return { messages, total: totalDocs }
}

export type FilterCommunityMessagesState = {
  messages: CommunityMessageForList[]
  total: number
  search: string
  period: Period
}

export async function filterCommunityMessagesAction(
  _prevState: FilterCommunityMessagesState,
  formData: FormData,
): Promise<FilterCommunityMessagesState> {
  const search = (formData.get('search') as string) ?? ''
  const period = ((formData.get('period') as string) ?? 'week') as Period
  const { messages, total } = await getFilteredCommunityMessages(search, period)
  return { messages, total, search, period }
}
