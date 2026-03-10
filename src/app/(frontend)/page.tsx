import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import { getAuthOrRedirect } from './lib/auth'
import { Carousel } from './components/Carousel'
import { TipTeaserCard } from './components/TipTeaserCard'
import { TopicsOfTheWeek } from './components/TopicsOfTheWeek'
import { PrepareIcon } from './components/Icons'

function oneWeekAgoISO(): string {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString()
}

export default async function HomePage() {
  const authResult = await getAuthOrRedirect('/')
  const payload = await getPayload({ config: configPromise })
  const user = authResult.user as { name?: string | null; email?: string } | null | undefined
  const displayName = user?.name ?? user?.email ?? 'Anonymous'

  const [tipsResult, communityResult, prepsResult] = await Promise.all([
    payload.find({
      collection: 'tips',
      depth: 1,
      limit: 1,
      sort: '-updatedAt',
    }),
    payload.find({
      collection: 'community-messages',
      depth: 2,
      limit: 20,
      sort: '-createdAt',
      where: {
        createdAt: { greater_than_equal: oneWeekAgoISO() },
      },
    }),
    authResult.user
      ? payload.find({
          collection: 'appointment-preps',
          depth: 0,
          limit: 1,
          sort: '-createdAt',
          user: authResult.user,
          overrideAccess: false,
        })
      : Promise.resolve({ docs: [] }),
  ])

  const latestTip = tipsResult.docs[0]
  const latestPrep = prepsResult.docs[0]
    ? {
        id: prepsResult.docs[0].id,
        concerns: prepsResult.docs[0].concerns,
        createdAt: prepsResult.docs[0].createdAt,
      }
    : null
  const topicsOfTheWeek = communityResult.docs.map((doc) => {
    const author = doc.author && typeof doc.author === 'object' ? doc.author : null
    const authorName = author?.name || author?.email || 'Someone'
    const profilePicture = author?.profilePicture
    const authorAvatarUrl =
      profilePicture && typeof profilePicture === 'object' && profilePicture?.url
        ? profilePicture.url
        : null
    return {
      id: doc.id,
      title: doc.title,
      message: doc.message,
      authorName,
      authorAvatarUrl,
      createdAt: doc.createdAt,
    }
  })

  return (
    <div className="lg:min-h-screen bg-background px-4 py-6 text-white md:px-6 md:py-8 lg:mx-auto lg:max-w-5xl lg:px-8">
      <div className="flex flex-col gap-y-6 md:gap-y-8">
        <div>
          <h1>Hi, {displayName}.</h1>
          <p className="subtitle opacity-70">How can I help you today?</p>
        </div>

        <Carousel />

        {latestPrep ? (
          <Link
            href={`/prepare/${latestPrep.id}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-card p-4 text-left no-underline text-white transition-opacity hover:opacity-90"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <PrepareIcon width={24} height={24} fill="white" />
            </span>
            <div className="min-w-0 flex-1">
              <span className="font-bold">Latest prep</span>
              <p className="mt-0.5 line-clamp-2 text-sm text-white/70">{latestPrep.concerns}</p>
              <p className="mt-1 text-xs text-white/50">
                {new Date(latestPrep.createdAt).toLocaleDateString(undefined, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ) : (
          <Link
            href="/prepare"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-card p-4 text-left no-underline text-white transition-opacity hover:opacity-90"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <PrepareIcon width={24} height={24} fill="white" />
            </span>
            <div>
              <span className="font-bold">Prepare for your appointment</span>
              <p className="mt-0.5 text-sm text-white/70">
                Get a list of questions to bring to your doctor
              </p>
            </div>
          </Link>
        )}

        <div className="flex flex-col gap-y-6 lg:grid lg:grid-cols-12 lg:gap-8">
          {latestTip && (
            <div className="lg:col-span-7">
              <TipTeaserCard
                title={latestTip.title}
                teaser={latestTip.teaser}
                imageUrl={
                  typeof latestTip.picture === 'object' && latestTip.picture?.url
                    ? latestTip.picture.url
                    : null
                }
                imageAlt={
                  typeof latestTip.picture === 'object' && latestTip.picture?.alt
                    ? latestTip.picture.alt
                    : latestTip.title
                }
                exploreHref={`/tips/${latestTip.id}`}
                category={latestTip.category}
              />
            </div>
          )}
          <div className={latestTip ? 'lg:col-span-5' : 'lg:col-span-12'}>
            <TopicsOfTheWeek topics={topicsOfTheWeek} />
          </div>
        </div>
      </div>
    </div>
  )
}
