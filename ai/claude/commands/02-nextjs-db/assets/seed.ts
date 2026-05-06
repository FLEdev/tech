import 'dotenv/config';
import db from './index';
import { usersTable } from './schemaSqlite';

function makeUsername(name: string) {
  const base = name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}.${suffix}`;
}

async function seed() {
  const name = process.env.ADMIN_NAME ?? 'Admin';
  const email = process.env.ADMIN_EMAIL ?? 'admin@localhost';
  const password = process.env.ADMIN_HASH ?? '';
  
  await db.insert(usersTable).values({
    name,
    username: makeUsername(name),
    email,
    password,
    dob: 0,
    role: 'admin'
  }).onConflictDoNothing();

  console.log('Seed complete');
}

seed().catch(console.error);
