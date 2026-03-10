import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import configPromise from '@payload-config'
import { getAuthOrRedirect } from '../../lib/auth'

function getPlainTextFromLexical(fullText: unknown): string {
  const root = (fullText as { root?: { children?: unknown[] } })?.root
  if (!root?.children?.length) return ''
  const parts: string[] = []
  for (const node of root.children) {
    if (node == null || typeof node !== 'object' || !('children' in node)) continue
    const child = node as { children?: { text?: string }[] }
    for (const c of child.children ?? []) {
      if (c?.text) parts.push(c.text)
    }
  }
  return parts.join(' ')
}

export default async function TipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await getAuthOrRedirect(`/tips/${id}`)
  const payload = await getPayload({ config: configPromise })
  const tip = await payload
    .findByID({
      collection: 'tips',
      id: Number(id),
      depth: 1,
    })
    .catch(() => null)

  if (!tip) notFound()

  const picture = tip.picture
  const imageUrl = typeof picture === 'object' && picture?.url ? picture.url : null
  const imageAlt = typeof picture === 'object' && picture?.alt ? picture.alt : tip.title

  const fullTextPlain = getPlainTextFromLexical(tip.fullText) || tip.teaser

  return (
    <div className="lg:min-h-screen bg-background">
      {/* Hero: full-width background image with back button and title overlay */}
      <header className="relative flex w-full flex-col justify-end aspect-[1.72]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#4a868a]/60" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <Link
          href="/tips"
          className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full text-2xl text-white hover:bg-white/20"
          aria-label="Back to tips"
        >
          ←
        </Link>
        <div className="relative z-10 px-6 pb-8 pt-14">
          <h1 className="text-2xl font-bold leading-tight text-white drop-shadow-sm sm:text-3xl">
            {tip.title}
          </h1>
        </div>
      </header>

      {/* Content: dark section with description */}
      <section className="px-6 py-8 md:px-8 lg:mx-auto lg:max-w-3xl lg:px-10">
        <p className="max-w-2xl text-left text-base leading-relaxed text-white/95 md:text-lg">
          {fullTextPlain}
        </p>
      </section>
    </div>
  )
}
