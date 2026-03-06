'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  filterTipsAction,
  type FilterTipsState,
  type Period,
  type TipForList,
} from '../tips/actions'
import { PeriodSelect } from './PeriodSelect'
import { SearchInput, SearchIcon } from './SearchInput'
import { TipTeaserCard } from './TipTeaserCard'

type TipsListWithFiltersProps = {
  category?: string
  initialState: FilterTipsState
  children?: (filters: ReactNode, list: ReactNode) => ReactNode
}

export function TipsListWithFilters({
  category,
  initialState,
  children,
}: TipsListWithFiltersProps) {
  const [search, setSearch] = useState(initialState.search)
  const [period, setPeriod] = useState<Period>(initialState.period)
  const [tips, setTips] = useState<TipForList[]>(initialState.tips)
  const [total, setTotal] = useState(initialState.total)
  const [isPending, setIsPending] = useState(false)

  const runFilter = (searchValue: string, periodValue: Period) => {
    setSearch(searchValue)
    setPeriod(periodValue)
    setIsPending(true)
    const formData = new FormData()
    formData.set('search', searchValue)
    formData.set('period', periodValue)
    formData.set('category', category ?? '')
    const prevState: FilterTipsState = { tips, total, search: searchValue, period: periodValue }
    filterTipsAction(prevState, formData).then((result) => {
      setTips(result.tips)
      setTotal(result.total)
      setIsPending(false)
    })
  }

  const filters = (
    <div className="space-y-4">
      <SearchInput
        id="tips-search"
        label="Search tips"
        placeholder="Search topics"
        value={search}
        onChange={(v) => runFilter(v, period)}
        icon={<SearchIcon />}
        className="font-bold bg-white/50"
      />
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-white font-bold">Tips of the week</span>
          <span className="text-sm text-white opacity-70">{total} total</span>
        </div>
        <PeriodSelect
          value={period}
          onChange={(v) => runFilter(search, v as Period)}
          aria-label="Select period"
          className="bg-white/50"
        />
      </div>
    </div>
  )

  const list = (
    <>
      {tips.length === 0 && !isPending ? (
        <p className="text-white/80">No tips found. Try a different period or search.</p>
      ) : tips.length > 0 ? (
        <div className={isPending ? 'animate-pulse' : ''} aria-busy={isPending}>
          <ul className="flex list-none flex-col gap-6 p-0">
            {tips.map((tip) => {
              const picture = tip.picture
              const imageUrl = typeof picture === 'object' && picture?.url ? picture.url : null
              const imageAlt = typeof picture === 'object' && picture?.alt ? picture.alt : tip.title

              return (
                <li key={tip.id}>
                  <TipTeaserCard
                    title={tip.title}
                    teaser={tip.teaser}
                    imageUrl={imageUrl}
                    imageAlt={imageAlt ?? tip.title}
                    exploreHref={`/tips/${tip.id}`}
                    category={tip.category}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </>
  )

  if (typeof children === 'function') {
    return <>{children(filters, list)}</>
  }

  return (
    <div className="space-y-4">
      {filters}
      <p className="text-sm text-white/80">
        {total} tip{total !== 1 ? 's' : ''} in this period
        {search.trim() ? ' matching your search' : ''}
      </p>
      {list}
    </div>
  )
}
