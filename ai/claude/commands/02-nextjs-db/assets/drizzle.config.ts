import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export const dbCredentials = {
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
};

export default defineConfig({
  out: './db/migration',
  schema: './db/schemaSqlite.ts',
  dialect: 'turso',
  dbCredentials: dbCredentials,
  casing: 'snake_case',
  schemaFilter: ['public'],
  extensionsFilters: ['citext'],
  migrations: {
    migrationsFolder: './db/migration',
  }
});
