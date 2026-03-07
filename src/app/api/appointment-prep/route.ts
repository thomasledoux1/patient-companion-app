import { google } from '@ai-sdk/google'
import { generateText, Output } from 'ai'
import { z } from 'zod'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import configPromise from '@payload-config'

const questionsSchema = z.object({
  questions: z.array(z.string()).min(1).max(15),
})

export const maxDuration = 30

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const concerns = typeof body.concerns === 'string' ? body.concerns.trim() : ''

  if (!concerns) {
    return Response.json(
      { error: 'Please share what’s on your mind (symptoms, worries, or goals for the visit).' },
      { status: 400 },
    )
  }

  const result = await generateText({
    model: google('gemini-2.5-flash-lite'),
    output: Output.object({
      schema: questionsSchema,
      name: 'appointment_questions',
      description: 'Questions for the patient to ask their doctor',
    }),
    prompt: `You are helping a patient prepare for a medical appointment. Based on what they share below, generate a short list of clear, practical questions they could ask their doctor. Include 5 to 10 questions. Phrase them in plain language. Cover: clarifying their condition or symptoms, next steps, medication or lifestyle changes, and anything they should watch for. Do not invent specific medical details—keep questions general enough to apply to their situation.

What the patient shared:
"""
${concerns}
"""`,
  })

  const questions = result.output?.questions ?? []

  let id: number | undefined
  const headersList = await headers()
  const payload = await getPayload({ config: configPromise })
  const authResult = await payload.auth({
    headers: headersList as Headers,
    canSetHeaders: false,
  })
  console.log('authResult', authResult)
  console.log('questions', questions)

  if (authResult.user) {
    const doc = await payload.create({
      collection: 'appointment-preps',
      data: {
        author: authResult.user.id,
        concerns,
        questions: questions.map((question) => ({ question })),
      },
      user: authResult.user,
      overrideAccess: false,
    })
    id = doc.id
  }

  return Response.json({ questions, id })
}
