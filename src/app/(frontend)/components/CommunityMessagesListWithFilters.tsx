'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  filterCommunityMessagesAction,
  type FilterCommunityMessagesState,
  type Period,
} from '../community/actions'
import { CommunityMessageCard } from './CommunityMessageCard'
import { PeriodSelect } from './PeriodSelect'
import { SearchInput } from './SearchInput'

type CommunityMessagesListWithFiltersProps = {
  initialState: FilterCommunityMessagesState
  children?: (filters: ReactNode, list: ReactNode) => ReactNode
}

export function CommunityMessagesListWithFilters({
  initialState,
  children,
}: CommunityMessagesListWithFiltersProps) {
  const [search, setSearch] = useState(initialState.search)
  const [period, setPeriod] = useState<Period>(initialState.period)
  const [messages, setMessages] = useState(initialState.messages)
  const [total, setTotal] = useState(initialState.total)
  const [isPending, setIsPending] = useState(false)

  const runFilter = (searchValue: string, periodValue: Period) => {
    setIsPending(true)
    const formData = new FormData()
    formData.set('search', searchValue)
    formData.set('period', periodValue)
    const prevState: FilterCommunityMessagesState = {
      messages,
      total,
      search: searchValue,
      period: periodValue,
    }
    filterCommunityMessagesAction(prevState, formData).then((result) => {
      setMessages(result.messages)
      setTotal(result.total)
      setIsPending(false)
    })
  }

  const filters = (
    <div className="space-y-4">
      <SearchInput
        id="community-search"
        label="Search community messages"
        placeholder="Search messages..."
        value={search}
        onChange={(v) => runFilter(v, period)}
      />
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-white/90">Messages from the past</span>
          <span className="text-sm text-white/80">{total} total</span>
        </div>
        <PeriodSelect
          value={period}
          onChange={(v) => runFilter(search, v as Period)}
          aria-label="Select period"
        />
      </div>
    </div>
  )

  const list = (
    <>
      {messages.length === 0 && !isPending ? (
        <p className="text-white/80">No messages found. Try a different period or search.</p>
      ) : messages.length > 0 ? (
        <div className={isPending ? 'animate-pulse' : ''} aria-busy={isPending}>
          <ul className="flex list-none flex-col gap-4 p-0">
            {messages.map((message) => (
              <li key={message.id}>
                <CommunityMessageCard message={message} href={`/community/${message.id}`} />
              </li>
            ))}
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
        {total} message{total !== 1 ? 's' : ''} in this period
        {search.trim() ? ' matching your search' : ''}
      </p>
      {list}
    </div>
  )
}
