import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TipTeaserCardProps = {
  title: string
  teaser: string
  imageUrl?: string | null
  imageAlt?: string
  exploreHref: string
  category: 'weather' | 'food' | 'stress'
}

export function TipTeaserCard({
  title,
  teaser,
  imageUrl,
  imageAlt = '',
  exploreHref,
  category,
}: TipTeaserCardProps) {
  return (
    <article className="overflow-hidden rounded-xl bg-card shadow-(--shadow-card)">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#63b3b9] text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M9 21h6M12 3a6 6 0 0 1 4 10.5H8A6 6 0 0 1 12 3z" />
            <path d="M12 15v3" />
          </svg>
        </div>
        <span className="text-xl font-bold text-white capitalize">{category} tip</span>
      </div>

      {/* Main content: image with title and teaser overlaid */}
      <div className="relative min-h-[200px] w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 bg-[#4a868a]/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end gap-2 pb-4 pr-4 pt-[21px] pl-[25px] md:pl-6 md:pb-5 md:pr-6">
          <h2 className="max-w-[222px] md:max-w-sm text-xl font-bold leading-tight text-white drop-shadow-sm md:text-2xl">
            {title}
          </h2>
          <p className="max-w-[168px] md:max-w-xs text-base leading-[19px] text-white/95 drop-shadow-sm md:max-w-sm">
            {teaser}
          </p>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="grid grid-cols-2 border-t border-white/10">
        <Link
          href={`/tips/category/${category}`}
          className="flex items-center justify-center py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          More like this
        </Link>
        <Link
          href={exploreHref}
          className="flex items-center justify-center border-l border-white/10 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          Explore tip
        </Link>
      </div>
    </article>
  )
}
