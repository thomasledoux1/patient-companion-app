'use client'

import type { ReactNode } from 'react'

type PageLayoutProps = {
  /** Full-width hero background color (e.g. #63B3B9 or #EB498A) */
  backgroundColor: string
  title: string
  subtitle?: ReactNode
  /** Rendered inside the hero (e.g. search + period filters) */
  filters: ReactNode
  /** Rendered below the hero with overlap */
  list: ReactNode
}

const HERO_HEIGHT = 432
const HERO_OVERLAP = 100

export function PageLayout({ backgroundColor, title, subtitle, filters, list }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-white">
      <div
        className="w-full md:min-h-[280px] lg:min-h-[320px]"
        style={{
          height: HERO_HEIGHT,
          backgroundColor,
          clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${HERO_OVERLAP}px), 50% 100%, 0 calc(100% - ${HERO_OVERLAP}px))`,
        }}
      >
        <div className="mx-auto flex h-full max-w-2xl flex-col gap-6 px-4 pt-8 md:max-w-4xl md:px-6 lg:max-w-5xl lg:px-8">
          <header>
            <h1 className="font-bold text-[34px] leading-[40px] tracking-[-0.82px] md:text-4xl">{title}</h1>
            {subtitle && <p className="subtitle mt-1 opacity-70">{subtitle}</p>}
          </header>
          {filters}
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-2xl -mt-40 px-4 pb-6 md:max-w-4xl md:px-6 md:-mt-32 lg:max-w-5xl lg:px-8 lg:-mt-36">{list}</div>
    </div>
  )
}
