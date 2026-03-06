import React from 'react'
import { getLatestTipPerCategory } from './queries'
import { TipsPageLayout } from './TipsPageLayout'

export default async function TipsPage() {
  const { tips, total } = await getLatestTipPerCategory()
  const initialState = {
    tips,
    total,
    search: '',
    period: 'week' as const,
  }

  return <TipsPageLayout initialState={initialState} />
}
