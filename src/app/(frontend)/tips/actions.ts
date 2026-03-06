'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { TipForList } from './helpers'
import { toTipForList } from './helpers'

export type Period = 'day' | 'week' | 'month' | 'year'
export type { TipForList } from './helpers'

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

export async function getFilteredTips(
  search: string,
  period: Period,
  category?: string,
): Promise<{ tips: TipForList[]; total: number }> {
  const payload = await getPayload({ config: configPromise })
  const since = sinceDate(period)

  const and = [
    { updatedAt: { greater_than_equal: since } },
    ...(category ? [{ category: { equals: category } }] : []),
    ...(search.trim()
      ? [
          {
            or: [{ title: { contains: search.trim() } }, { teaser: { contains: search.trim() } }],
          },
        ]
      : []),
  ]

  const { docs, totalDocs } = await payload.find({
    collection: 'tips',
    depth: 1,
    limit: 100,
    sort: '-updatedAt',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { and } as any,
  })

  const tips: TipForList[] = docs.map(toTipForList)

  return { tips, total: totalDocs }
}

export type FilterTipsState = {
  tips: TipForList[]
  total: number
  search: string
  period: Period
}

export async function filterTipsAction(
  _prevState: FilterTipsState,
  formData: FormData,
): Promise<FilterTipsState> {
  const search = (formData.get('search') as string) ?? ''
  const period = ((formData.get('period') as string) ?? 'week') as Period
  const categoryRaw = formData.get('category')
  const category = typeof categoryRaw === 'string' && categoryRaw ? categoryRaw : undefined
  const { tips, total } = await getFilteredTips(search, period, category)
  return { tips, total, search, period }
}
