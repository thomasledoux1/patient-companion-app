import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'

/**
 * Get the current user or redirect to login. Use in protected pages.
 * @param redirectPath - Path to store in the redirect query param (e.g. '/profile')
 */
export async function getAuthOrRedirect(redirectPath: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })
  if (!authResult.user) {
    redirect(`/login?redirect=${encodeURIComponent(redirectPath)}`)
  }
  return authResult as { user: NonNullable<typeof authResult.user> }
}
