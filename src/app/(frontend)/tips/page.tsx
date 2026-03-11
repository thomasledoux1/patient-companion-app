import React from 'react'
import type { Metadata } from 'next'
import { getAuthOrRedirect } from '../lib/auth'
import { getLatestTipPerCategory } from './queries'
import { TipsPageLayout } from './TipsPageLayout'

export const metadata: Metadata = {
  themeColor: '#63B3B9',
}

export default async function TipsPage() {
  await getAuthOrRedirect('/tips')
  const { tips, total } = await getLatestTipPerCategory()
  const initialState = {
    tips,
    total,
    search: '',
    period: 'week' as const,
  }

  return <TipsPageLayout initialState={initialState} />
}
