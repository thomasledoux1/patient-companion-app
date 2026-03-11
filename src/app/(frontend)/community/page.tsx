import React from 'react'
import type { Metadata } from 'next'
import { getAuthOrRedirect } from '../lib/auth'
import { getFilteredCommunityMessages } from './actions'
import { CommunityPageLayout } from './CommunityPageLayout'

export const metadata: Metadata = {
  themeColor: '#EB498A',
}

export default async function CommunityPage() {
  await getAuthOrRedirect('/community')
  const initialState = await getFilteredCommunityMessages('', 'week')
  const stateWithSearch = { ...initialState, search: '', period: 'week' as const }

  return <CommunityPageLayout initialState={stateWithSearch} />
}
