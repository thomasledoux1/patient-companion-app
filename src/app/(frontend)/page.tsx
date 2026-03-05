import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import { Carousel } from './components/Carousel'
import { TipTeaserCard } from './components/TipTeaserCard'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'tips',
    depth: 1,
    limit: 1,
    sort: '-updatedAt',
  })
  const latestTip = docs[0]

  return (
    <div className="min-h-screen bg-background p-4 text-white">
      <div className="flex flex-col gap-y-4">
        <div>
          <h1>Hi, name.</h1>
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
      </div>
    </div>
  )
}
