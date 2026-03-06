import 'dotenv/config'
import { getPayload } from 'payload'
import type { Tip } from '../payload-types'
import config from '../payload.config'

const seedTips = [
  {
    title: 'Stay hydrated in hot weather',
    teaser: 'Drink plenty of water when it’s warm to support your body and medications.',
    category: 'weather' as const,
    fullText: lexicalRoot(
      'When temperatures rise, aim for at least 8 glasses of water a day. Carry a bottle with you and sip regularly rather than drinking a lot at once.',
    ),
  },
  {
    title: 'Eat before taking certain meds',
    teaser: 'Some medications work better or cause fewer side effects when taken with a meal.',
    category: 'food' as const,
    fullText: lexicalRoot(
      'Check the leaflet or ask your pharmacist whether your medication should be taken with food. A small snack is often enough to protect your stomach.',
    ),
  },
  {
    title: 'Prepare questions before appointments',
    teaser: 'Write down your questions so you don’t forget them during your visit.',
    category: 'stress' as const,
    fullText: lexicalRoot(
      'Keep a list on your phone or on paper. Bring it to the appointment and tick items off as you discuss them. This reduces stress and helps you get the most from the visit.',
    ),
  },
  {
    title: 'Keep a simple sleep schedule',
    teaser: 'Same bedtime and wake time can improve rest and energy.',
    category: 'stress' as const,
    fullText: lexicalRoot(
      'Even at weekends, try to stay within an hour of your usual bedtime and wake time. A consistent routine supports better sleep and can help with stress and mood.',
    ),
  },
  {
    title: 'Warm drinks and comfort food in cold weather',
    teaser: 'Warm meals and drinks can help when the weather is cold or grey.',
    category: 'weather' as const,
    fullText: lexicalRoot(
      'Soups, herbal teas, and warm breakfasts can boost comfort and warmth. Dress in layers when you go out so you can adjust to indoor and outdoor temperatures.',
    ),
  },
  {
    title: 'Limit caffeine in the afternoon',
    teaser: 'Cut back on coffee and tea after 2 p.m. to protect your sleep.',
    category: 'food' as const,
    fullText: lexicalRoot(
      'Caffeine can stay in your system for several hours. Switching to decaf or herbal tea in the afternoon often makes it easier to fall asleep at night.',
    ),
  },
  {
    title: 'Dress in layers when it’s changeable',
    teaser: 'Be ready for sun, wind, or rain without overheating or getting cold.',
    category: 'weather' as const,
    fullText: lexicalRoot(
      'Start with a base layer, add a mid layer you can tie around your waist, and bring a light jacket. You can remove or add layers as the day changes.',
    ),
  },
  {
    title: 'Eat regular, balanced meals',
    teaser: 'Skipping meals can affect energy and mood. Small, frequent meals help some people.',
    category: 'food' as const,
    fullText: lexicalRoot(
      'Aim for three meals and optional healthy snacks. Include protein, fibre, and some healthy fats. Regular eating can stabilise energy and support medication timing.',
    ),
  },
  {
    title: 'Take short breaks when you feel overwhelmed',
    teaser: 'A few minutes of pause can help you reset and refocus.',
    category: 'stress' as const,
    fullText: lexicalRoot(
      'Step away from the screen or task, breathe slowly, or look out of the window. Even a 2–3 minute break can lower stress and improve focus.',
    ),
  },
  {
    title: 'Use sunscreen and a hat in strong sun',
    teaser: 'Protect your skin and eyes when the UV index is high.',
    category: 'weather' as const,
    fullText: lexicalRoot(
      'Apply sunscreen to exposed skin and wear a hat and sunglasses when you’re outside in strong sun. Some medications increase sun sensitivity, so protection is especially important.',
    ),
  },
  {
    title: 'Reduce salt when the weather is hot',
    teaser: 'Less salt can help with fluid balance and blood pressure in summer.',
    category: 'food' as const,
    fullText: lexicalRoot(
      'In hot weather, cutting back on very salty snacks and processed foods can help you stay hydrated and support your blood pressure. Focus on fresh vegetables and fruit where possible.',
    ),
  },
  {
    title: 'Talk to someone when stress builds up',
    teaser: 'Sharing how you feel can lighten the load and open up support.',
    category: 'stress' as const,
    fullText: lexicalRoot(
      'Reach out to a friend, family member, or your care team when things feel too much. You don’t have to have solutions—just being heard can help.',
    ),
  },
]

function lexicalRoot(paragraphText: string): Tip['fullText'] {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: null,
      format: 'left',
      indent: 0,
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [
            {
              type: 'text',
              version: 1,
              text: paragraphText,
            },
          ],
        },
      ],
    },
  }
}

async function run() {
  const payload = await getPayload({ config })

  // Delete all existing tips so we can recreate with the current schema
  const { docs } = await payload.find({
    collection: 'tips',
    limit: 500,
    depth: 0,
  })
  for (const doc of docs) {
    await payload.delete({
      collection: 'tips',
      id: doc.id,
    })
    console.log('Deleted tip:', doc.id)
  }
  if (docs.length > 0) {
    console.log(`Removed ${docs.length} existing tip(s).`)
  }

  for (const tip of seedTips) {
    await payload.create({
      collection: 'tips',
      data: tip,
    })
    console.log('Created tip:', tip.title)
  }
  console.log('Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
