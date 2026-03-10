'use client'

import React from 'react'
import { StructuredPageLayout } from '../components/PageLayout'
import { CommunityMessagesListWithFilters } from '../components/CommunityMessagesListWithFilters'
import type { FilterCommunityMessagesState } from './actions'

type CommunityPageLayoutProps = {
  initialState: FilterCommunityMessagesState
}

export function CommunityPageLayout({ initialState }: CommunityPageLayoutProps) {
  return (
    <CommunityMessagesListWithFilters initialState={initialState}>
      {(filters, list) => (
        <StructuredPageLayout
          backgroundColor="#EB498A"
          title="Community"
          subtitle="Topics and messages from the community. Search and filter by date."
          filters={filters}
          list={list}
        />
      )}
    </CommunityMessagesListWithFilters>
  )
}
