import type { CollectionConfig } from 'payload'

export const CommunityMessages: CollectionConfig = {
  slug: 'community-messages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'updatedAt'],
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
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: async ({ req, id }) => {
      if (!req.user?.id || id == null) return false
      try {
        const doc = await req.payload.findByID({
          collection: 'community-messages',
          id: id as number,
          depth: 0,
        })
        const authorId: number | undefined =
          typeof doc.author === 'object' && doc.author !== null
            ? (doc.author as { id: number }).id
            : (doc.author as number | undefined)
        return authorId === req.user.id
      } catch {
        return false
      }
    },
  },
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'The authenticated user who wrote this message.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'likes',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        description: 'Authenticated users who liked this message.',
      },
    },
    {
      name: 'comments',
      type: 'array',
      admin: {
        description: 'Comments from authenticated users.',
      },
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
        {
          name: 'createdAt',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            readOnly: true,
          },
        },
      ],
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (Array.isArray(value)) {
              return value.map((row) => ({
                ...row,
                createdAt: row?.createdAt ?? new Date().toISOString(),
              }))
            }
            return value
          },
        ],
      },
    },
  ],
}
