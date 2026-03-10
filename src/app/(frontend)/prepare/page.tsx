import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getAuthOrRedirect } from '../lib/auth'
import { PrepareClient, type PrepForList } from './PrepareClient'

export default async function PreparePage() {
  const authResult = await getAuthOrRedirect('/prepare')
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'appointment-preps',
    depth: 0,
    limit: 20,
    sort: '-createdAt',
    user: authResult.user,
    overrideAccess: false,
  })
  const initialPreps: PrepForList[] = docs.map((doc) => ({
    id: doc.id,
    concerns: doc.concerns,
    createdAt: doc.createdAt,
    questions: doc.questions ?? [],
  }))

  return <PrepareClient initialPreps={initialPreps} />
}
