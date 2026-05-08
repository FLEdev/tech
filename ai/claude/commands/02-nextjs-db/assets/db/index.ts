import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as schemaSqlite from './schemaSqlite';
import * as relations from "./relations";

const schema = { ...schemaSqlite, ...relations };

const db = drizzle({
  connection: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema,
  casing: 'snake_case'
});

export default db;
