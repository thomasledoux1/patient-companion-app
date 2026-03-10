'use client'

import React from 'react'
import { StructuredPageLayout } from '../components/PageLayout'
import { TipsListWithFilters } from '../components/TipsListWithFilters'
import type { FilterTipsState } from './actions'

type TipsPageLayoutProps = {
  initialState: FilterTipsState
}

export function TipsPageLayout({ initialState }: TipsPageLayoutProps) {
  return (
    <TipsListWithFilters initialState={initialState}>
      {(filters, list) => (
        <StructuredPageLayout
          backgroundColor="#63B3B9"
          title="Tips/FAQ"
          filters={filters}
          list={list}
        />
      )}
    </TipsListWithFilters>
  )
}
