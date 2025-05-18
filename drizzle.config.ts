// Drizzle ORM-konfig for Light Cones – kobling mot Neon Serverless Postgres
import type { Config } from 'drizzle-kit';

// Få URL fra miljøvariabelen
const databaseUrl = process.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  console.error('NEON_DATABASE_URL er ikke satt i .env.local');
}

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl || '',
  },
} satisfies Config;
