import type { CollectionConfig } from 'payload'

export const AppointmentPreps: CollectionConfig = {
  slug: 'appointment-preps',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'createdAt'],
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user && data) {
          data.author = req.user.id
        }
        return data
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return { author: { equals: user.id } }
    },
    create: ({ req }) => Boolean(req.user),
    update: async ({ req, id }) => {
      if (!req.user?.id || id == null) return false
      const doc = await req.payload.findByID({
        collection: 'appointment-preps',
        id: id as number,
        depth: 0,
      })
      const authorId =
        typeof doc.author === 'object' && doc.author != null
          ? (doc.author as { id: number }).id
          : doc.author
      return authorId === req.user.id
    },
    delete: async ({ req, id }) => {
      if (!req.user?.id || id == null) return false
      const doc = await req.payload.findByID({
        collection: 'appointment-preps',
        id: id as number,
        depth: 0,
      })
      const authorId =
        typeof doc.author === 'object' && doc.author != null
          ? (doc.author as { id: number }).id
          : doc.author
      return authorId === req.user.id
    },
  },
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional label, e.g. "Cardiologist visit" or "Annual check-up".',
      },
    },
    {
      name: 'concerns',
      type: 'textarea',
      required: true,
      admin: {
        description: 'What the patient shared (symptoms, worries, goals) used to generate the questions.',
      },
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Generated questions to bring to the appointment.',
      },
    },
  ],
}
