import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PrepareClient, type PrepForList } from './PrepareClient'

export default async function PreparePage() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })

  let initialPreps: PrepForList[] = []
  if (authResult.user) {
    const { docs } = await payload.find({
      collection: 'appointment-preps',
      depth: 0,
      limit: 20,
      sort: '-createdAt',
      user: authResult.user,
      overrideAccess: false,
    })
    initialPreps = docs.map((doc) => ({
      id: doc.id,
      concerns: doc.concerns,
      createdAt: doc.createdAt,
      questions: doc.questions ?? [],
    }))
  }

  return <PrepareClient initialPreps={initialPreps} />
}
