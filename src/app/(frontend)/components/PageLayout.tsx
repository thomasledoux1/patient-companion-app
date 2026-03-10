'use client'

import type { ReactNode } from 'react'

const HERO_OVERLAP = 100

type PageLayoutProps = {
  /** Background color of the top section (e.g. #63B3B9 or #EB498A) */
  backgroundColor: string
  /** Shape of the bottom edge of the top section */
  bottomEdge?: 'angled' | 'rounded'
  /** Content inside the colored top section */
  topSection: ReactNode
  /** Content below the top section (overlaps when angled) */
  bottomSection: ReactNode
  /** Min height of the top section in px */
  topMinHeight?: number
  /** Overlap in px for bottom section (angled edge only) */
  overlap?: number
}

const SHAPE_PATH = 'M0 0H375V320.976C259.673 388.902 115.008 389.441 0 320.976V0Z'

export function PageLayout({
  backgroundColor,
  bottomEdge = 'angled',
  topSection,
  bottomSection,
  topMinHeight = 370,
  overlap = HERO_OVERLAP,
}: PageLayoutProps) {
  const isRounded = bottomEdge === 'rounded'
  const overlapPx = isRounded ? 0 : overlap

  return (
    <div className="lg:min-h-screen bg-background text-white">
      <div
        className="relative w-full md:min-h-[280px] lg:min-h-[320px]"
        style={{ minHeight: topMinHeight }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 375 373"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d={SHAPE_PATH} fill={backgroundColor} />
        </svg>
        <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-2xl flex-col gap-6 px-4 pt-8 md:max-w-4xl md:px-6 lg:max-w-5xl lg:px-8">
          {topSection}
        </div>
      </div>
      <div
        className="relative z-10 mx-auto max-w-2xl px-4 pb-6 md:max-w-4xl md:px-6 lg:max-w-5xl lg:px-8"
        style={overlapPx > 0 ? { marginTop: -overlapPx } : undefined}
      >
        {bottomSection}
      </div>
    </div>
  )
}

/** Props for the structured variant: hero with title, optional subtitle, filters, and list (Community/Tips). */
type StructuredPageLayoutProps = {
  backgroundColor: string
  bottomEdge?: 'angled' | 'rounded'
  title: string
  subtitle?: ReactNode
  filters: ReactNode
  list: ReactNode
  topMinHeight?: number
  overlap?: number
}

export function StructuredPageLayout({
  backgroundColor,
  bottomEdge,
  title,
  subtitle,
  filters,
  list,
  topMinHeight,
  overlap,
}: StructuredPageLayoutProps) {
  return (
    <PageLayout
      backgroundColor={backgroundColor}
      bottomEdge={bottomEdge}
      topMinHeight={topMinHeight}
      overlap={overlap}
      topSection={
        <>
          <header>
            <h1 className="font-bold text-[34px] leading-[40px] tracking-[-0.82px] md:text-4xl">
              {title}
            </h1>
            {subtitle != null && <p className="subtitle mt-1 opacity-70">{subtitle}</p>}
          </header>
          {filters}
        </>
      }
      bottomSection={list}
    />
  )
}
