import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const SEED_PASSWORD = 'seed-secret-123'

const seedUsers = [
  { email: 'alice@example.com', name: 'Alice' },
  { email: 'bob@example.com', name: 'Bob' },
  { email: 'carol@example.com', name: 'Carol' },
]

const seedMessages = [
  {
    title: 'Tips for staying consistent with meds',
    message:
      'I use a weekly pill organiser and set a phone reminder at the same time every day. After a few weeks it became a habit. Would love to hear what works for you.',
  },
  {
    title: 'Best time for a short walk?',
    message:
      'I find a 10-minute walk after lunch helps with digestion and mood. Anyone else prefer morning or evening?',
  },
  {
    title: 'How do you prepare for doctor visits?',
    message:
      'I write down my questions and symptoms in a small notebook so I don’t forget anything. Sometimes I bring a family member to take notes. What’s your routine?',
  },
  {
    title: 'Sleep and medication',
    message:
      'Some of my meds used to affect my sleep. My doctor suggested taking them earlier in the evening. It helped a lot. Share your experience if you’ve had similar issues.',
  },
]

async function run() {
  const payload = await getPayload({ config })

  const userIds: number[] = []

  for (const u of seedUsers) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: u.email } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    if (existing.docs.length > 0) {
      userIds.push(existing.docs[0].id)
      console.log('User already exists:', u.email)
    } else {
      const created = await payload.create({
        collection: 'users',
        data: { email: u.email, password: SEED_PASSWORD, name: u.name },
        overrideAccess: true,
      })
      userIds.push(created.id)
      console.log('Created user:', u.email)
    }
  }

  if (userIds.length < 2) {
    console.error('Need at least 2 users for seed data. Create more users first.')
    process.exit(1)
  }

  const [aliceId, bobId, carolId] = userIds as [number, number, number]

  const { docs: existingMessages } = await payload.find({
    collection: 'community-messages',
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })
  for (const doc of existingMessages) {
    await payload.delete({
      collection: 'community-messages',
      id: doc.id,
      overrideAccess: true,
    })
  }
  if (existingMessages.length > 0) {
    console.log(`Removed ${existingMessages.length} existing community message(s).`)
  }

  const msg1 = await payload.create({
    collection: 'community-messages',
    data: {
      author: aliceId,
      title: seedMessages[0].title,
      message: seedMessages[0].message,
      likes: [bobId, carolId],
      comments: [
        { author: bobId, body: 'Same here – pill organiser + alarm is a game changer.', createdAt: new Date().toISOString() },
        { author: carolId, body: 'I also use sticky notes on the fridge for the morning dose.', createdAt: new Date().toISOString() },
      ],
    },
    overrideAccess: true,
  })
  console.log('Created message:', msg1.title)

  const msg2 = await payload.create({
    collection: 'community-messages',
    data: {
      author: bobId,
      title: seedMessages[1].title,
      message: seedMessages[1].message,
      likes: [aliceId],
      comments: [
        { author: aliceId, body: 'I do a short walk after breakfast. Works well for me!', createdAt: new Date().toISOString() },
      ],
    },
    overrideAccess: true,
  })
  console.log('Created message:', msg2.title)

  const msg3 = await payload.create({
    collection: 'community-messages',
    data: {
      author: carolId,
      title: seedMessages[2].title,
      message: seedMessages[2].message,
      likes: [],
      comments: [
        { author: aliceId, body: 'I bring a list and my partner comes with me to take notes.', createdAt: new Date().toISOString() },
      ],
    },
    overrideAccess: true,
  })
  console.log('Created message:', msg3.title)

  const msg4 = await payload.create({
    collection: 'community-messages',
    data: {
      author: aliceId,
      title: seedMessages[3].title,
      message: seedMessages[3].message,
      likes: [bobId, carolId],
      comments: [],
    },
    overrideAccess: true,
  })
  console.log('Created message:', msg4.title)

  console.log('Community messages seed complete.')
  console.log('You can log in with:', seedUsers.map((u) => `${u.email} / ${SEED_PASSWORD}`).join(' | '))
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
