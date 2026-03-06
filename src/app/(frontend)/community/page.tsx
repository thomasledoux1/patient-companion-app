import React from 'react'
import { getFilteredCommunityMessages } from './actions'
import { CommunityPageLayout } from './CommunityPageLayout'

export default async function CommunityPage() {
  const initialState = await getFilteredCommunityMessages('', 'week')
  const stateWithSearch = { ...initialState, search: '', period: 'week' as const }

  return <CommunityPageLayout initialState={stateWithSearch} />
}
