import { cookies, headers } from 'next/headers'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'

/** Cookie set when the user has completed or skipped onboarding. Must match OnboardingClient. */
const ONBOARDING_COOKIE = 'onboarding_done'

/**
 * Get the current user or redirect. Use on all protected pages (home, community, tips, prepare, profile).
 * If not logged in: redirects to /onboarding when the user hasn't seen onboarding yet, otherwise to /login?redirect=...
 */
export async function getAuthOrRedirect(redirectPath: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })
  if (!authResult.user) {
    const cookieStore = await cookies()
    const hasSeenOnboarding = cookieStore.get(ONBOARDING_COOKIE)?.value != null
    if (!hasSeenOnboarding) {
      redirect('/onboarding')
    }
    redirect(`/login?redirect=${encodeURIComponent(redirectPath)}`)
  }
  return authResult as { user: NonNullable<typeof authResult.user> }
}
