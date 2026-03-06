import type { CollectionConfig } from 'payload'

export const Tips: CollectionConfig = {
  slug: 'tips',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image for the tip. Add one in the admin for each tip.',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Weather', value: 'weather' },
        { label: 'Food', value: 'food' },
        { label: 'Stress', value: 'stress' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'teaser',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short teaser text for cards or lists.',
      },
    },
    {
      name: 'fullText',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full tip content.',
      },
    },
  ],
}
