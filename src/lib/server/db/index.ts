import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const getDb = (DATABASE_URL: string) => {
	return drizzle(postgres(DATABASE_URL), { schema, casing: 'snake_case' });
};

export type DB = ReturnType<typeof getDb>;
