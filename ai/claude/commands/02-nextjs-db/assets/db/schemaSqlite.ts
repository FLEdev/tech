import * as c from 'drizzle-orm/sqlite-core';
import { sql } from "drizzle-orm/sql";
import { User, userRoles, EntityType } from '../src/lib/types';
import { createUniqueId } from "../src/lib/utils";

export const usersTable = c.sqliteTable("users", {
  id: c.int().primaryKey({ autoIncrement: true }),
  name: c.text().notNull(),
  username: c.text().notNull(),
  dob: c.int().notNull(),
  email: c.text().notNull().unique(),
  password: c.text().notNull(),
  role: c.text({ enum: userRoles }).default("guest"),
  lastAttempts: c.int().default(0),
  lastLogin: c.int().default(sql`(current_timestamp)`),
  created: c.int().default(sql`(current_timestamp)`),
  settings: c.text({ mode: 'json' }).default("{}"),
});

