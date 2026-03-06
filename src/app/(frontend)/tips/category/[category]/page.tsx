import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
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
  if (!VALID_CATEGORIES.includes(category as CategorySlug)) notFound()

  const label = CATEGORY_LABELS[category as CategorySlug]
  const initialState = await getFilteredTips('', 'week', category)
  const stateWithSearch = { ...initialState, search: '', period: 'week' as const }

  return (
    <div className="min-h-screen bg-background p-4 text-white">
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <Link
            href="/tips"
            className="mb-2 inline-block text-sm text-white/80 underline hover:text-white"
          >
            ← All tips
          </Link>
          <h1 className="font-bold text-[34px] leading-[40px] tracking-[-0.82px]">
            {label} tips
          </h1>
          <p className="subtitle mt-1 opacity-70">
            Tips about {label.toLowerCase()} for your health and routine.
          </p>
        </header>

        <TipsListWithFilters category={category} initialState={stateWithSearch} />
      </div>
    </div>
  )
}
