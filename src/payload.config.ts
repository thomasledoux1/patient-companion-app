import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tips } from './collections/Tips'
import { CommunityMessages } from './collections/CommunityMessages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Tips, CommunityMessages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      // Local: file:./payload.db (or leave unset). Turso: libsql://<db>-<org>.turso.io
      url: process.env.DATABASE_URI || process.env.DATABASE_URL || 'file:./payload.db',
      // Required for Turso; leave unset for local SQLite
      authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
    },
  }),
  sharp,
  plugins: [
    mcpPlugin({
      collections: {
        users: { enabled: true },
        media: { enabled: true },
        tips: { enabled: true },
        'community-messages': { enabled: true },
      },
    }),
  ],
})
