import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { getAuthOrRedirect } from '../../../lib/auth'
import { getFilteredTips } from '../../actions'
import { TipsListWithFilters } from '../../../components/TipsListWithFilters'

const VALID_CATEGORIES = ['weather', 'food', 'stress'] as const
type CategorySlug = (typeof VALID_CATEGORIES)[number]

const CATEGORY_LABELS: Record<CategorySlug, string> = {
  weather: 'Weather',
  food: 'Food',
  stress: 'Stress',
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }))
}

export default async function TipCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  await getAuthOrRedirect(`/tips/category/${category}`)
  if (!VALID_CATEGORIES.includes(category as CategorySlug)) notFound()

  const label = CATEGORY_LABELS[category as CategorySlug]
  const initialState = await getFilteredTips('', 'week', category)
  const stateWithSearch = { ...initialState, search: '', period: 'week' as const }

  return (
    <div className="lg:min-h-screen bg-background px-4 py-6 text-white md:px-6 md:py-8">
      <div className="mx-auto max-w-2xl space-y-6 md:max-w-4xl lg:max-w-5xl lg:px-0">
        <header>
          <Link
            href="/tips"
            className="mb-2 inline-block text-sm text-white/80 underline hover:text-white"
          >
            ← All tips
          </Link>
          <h1 className="font-bold text-[34px] leading-[40px] tracking-[-0.82px]">{label} tips</h1>
          <p className="subtitle mt-1 opacity-70">
            Tips about {label.toLowerCase()} for your health and routine.
          </p>
        </header>

        <TipsListWithFilters category={category} initialState={stateWithSearch} />
      </div>
    </div>
  )
}
