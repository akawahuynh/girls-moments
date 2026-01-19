import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL_PRODUCTION) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.DATABASE_URL_PRODUCTION },
	verbose: true,
	strict: true
});
