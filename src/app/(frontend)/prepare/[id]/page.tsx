import Link from 'next/link'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function PrepDetailPage({
  params,
}: {
  params: Promise<{ id: string }>,
}) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })

  if (!authResult.user) notFound()

  const prep = await payload
    .findByID({
      collection: 'appointment-preps',
      id: Number(id),
      depth: 0,
      user: authResult.user,
      overrideAccess: false,
    })
    .catch(() => null)

  if (!prep) notFound()

  const questions = prep.questions ?? []

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="mx-auto max-w-2xl px-4 py-6 pb-24 md:max-w-3xl md:px-6 md:py-8 lg:max-w-4xl lg:px-8">
        <Link
          href="/prepare"
          className="mb-6 inline-flex text-white/70 no-underline hover:text-white"
        >
          ← Back to Prepare
        </Link>

        <header className="mb-8">
          <p className="text-sm text-white/70">{formatDate(prep.createdAt)}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
            Appointment questions
          </h1>
        </header>

        {prep.concerns && (
          <section className="mb-8 rounded-xl border border-white/10 bg-card p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white/70">
              What you shared
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-white/90">{prep.concerns}</p>
          </section>
        )}

        <section className="rounded-xl border border-white/10 bg-card p-6">
          <h2 className="text-lg font-bold text-white">Questions to bring</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5">
            {questions.map((q, i) => (
              <li key={q.id ?? i} className="text-white/95 leading-snug">
                {q.question}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
