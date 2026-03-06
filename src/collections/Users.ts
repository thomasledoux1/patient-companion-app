import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'updatedAt'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Display name for community messages and comments.',
      },
    },
  ],
}
