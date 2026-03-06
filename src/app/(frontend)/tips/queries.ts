import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { TipForList } from './helpers'
import { toTipForList } from './helpers'

const TIP_CATEGORIES = ['weather', 'food', 'stress'] as const

export async function getLatestTipPerCategory(): Promise<{
  tips: TipForList[]
  total: number
}> {
  const payload = await getPayload({ config: configPromise })

  const results = await Promise.all(
    TIP_CATEGORIES.map((category) =>
      payload.find({
        collection: 'tips',
        depth: 1,
        limit: 1,
        sort: '-updatedAt',
        where: { category: { equals: category } },
      }),
    ),
  )

  const tips: TipForList[] = results.flatMap((r) => r.docs).map(toTipForList)

  return { tips, total: tips.length }
}
