import * as c from 'drizzle-orm/sqlite-core';
import { sql } from "drizzle-orm/sql";
import { User, userRoles, typeOptions } from '../src/lib/types';
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

export const contentTable = c.sqliteTable("content", {
  id: c.int().primaryKey({ autoIncrement: true }),
  title: c.text().notNull(),
  content: c.text().notNull(),
  formatter: c.text({ enum: typeOptions }),
  file_bundle: c.text(),
  created: c.int().default(sql`(current_timestamp)`),
  authorId: c.int().default(1),
});

export const fileTable = c.sqliteTable("file", {
  id: c.int().primaryKey({ autoIncrement: true }),
  uuid: c.text().notNull().$defaultFn(() => createUniqueId()),
  title: c.text().notNull(),
  description: c.text(),
  path: c.text().notNull(),
  size: c.int().notNull(),
  width: c.int(),
  height: c.int(),
  mimetype: c.text().notNull(),
  format: c.text().notNull(),
  tenantId: c.int().default(1),
  created: c.int().default(sql`(current_timestamp)`),
  authorId: c.int().default(1),
});

export const fileBundleTable = c.sqliteTable("file_bundle", {
  id: c.int().primaryKey({ autoIncrement: true }),
  title: c.text(),
  bundle_id: c.text().notNull(),
  order: c.int().default(1),
  file_id: c.int().notNull(),
  created: c.int().default(sql`(current_timestamp)`),
  authorId: c.int().default(1),
});
