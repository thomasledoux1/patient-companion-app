import { headers } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import { Carousel } from './components/Carousel'
import { TipTeaserCard } from './components/TipTeaserCard'
import { TopicsOfTheWeek } from './components/TopicsOfTheWeek'

function oneWeekAgoISO(): string {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString()
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })
  const user = authResult.user as { name?: string | null; email?: string } | null | undefined
  const displayName = user?.name ?? user?.email ?? 'Anonymous'

  const [tipsResult, communityResult] = await Promise.all([
    payload.find({
      collection: 'tips',
      depth: 1,
      limit: 1,
      sort: '-updatedAt',
    }),
    payload.find({
      collection: 'community-messages',
      depth: 1,
      limit: 20,
      sort: '-createdAt',
      where: {
        createdAt: { greater_than_equal: oneWeekAgoISO() },
      },
    }),
  ])

  const latestTip = tipsResult.docs[0]
  const topicsOfTheWeek = communityResult.docs.map((doc) => {
    const author = doc.author && typeof doc.author === 'object' ? doc.author : null
    const authorName = author?.name || author?.email || 'Someone'
    return {
      id: doc.id,
      title: doc.title,
      message: doc.message,
      authorName,
      createdAt: doc.createdAt,
    }
  })

  return (
    <div className="min-h-screen bg-background p-4 text-white">
      <div className="flex flex-col gap-y-4">
        <div>
          <h1>Hi, {displayName}.</h1>
          <p className="subtitle opacity-70">How can I help you today?</p>
        </div>

        <Carousel />

        {latestTip && (
          <TipTeaserCard
            title={latestTip.title}
            teaser={latestTip.teaser}
            imageUrl={typeof latestTip.picture === 'object' && latestTip.picture?.url ? latestTip.picture.url : null}
            imageAlt={typeof latestTip.picture === 'object' && latestTip.picture?.alt ? latestTip.picture.alt : latestTip.title}
            exploreHref={`/tips/${latestTip.id}`}
            category={latestTip.category}
          />
        )}

        <TopicsOfTheWeek topics={topicsOfTheWeek} />
      </div>
    </div>
  )
}
