import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'updatedAt'],
  },
  auth: true,
  access: {
    create: () => true,
    update: ({ req, id }) => req.user != null && String(req.user.id) === String(id),
    delete: ({ req, id }) => req.user != null && String(req.user.id) === String(id),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Display name for community messages and comments.',
      },
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile picture shown on community messages and your profile.',
      },
    },
  ],
}
