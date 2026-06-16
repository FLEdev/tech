"use server";

import db from "../index";
import { requireUser } from "../require-user";
import { contentTable } from "../schemaSqlite";
import { create[EntityName]Schema, update[EntityName]Schema } from "@/lib/types";
import { eq, desc } from "drizzle-orm";

const pageLimit: number = parseInt(process.env.PAGE_LIMIT ?? "30", 10);

export async function create[EntityName](data: unknown) {
  const user = await requireUser();
  const validated = create[EntityName]Schema.parse(data);

  const result = await db.insert(contentTable).values({
    title: validated.title,
    content: validated.content,
    formatter: validated.formatter,
    file_bundle: validated.file_bundle,
    authorId: Number(user.id) as number,
  }).returning();

  return result[0];
}

export async function read[EntityName](id: number) {
  await requireUser();

  const result = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.id, id));

  return result[0] || null;
}

export async function read[EntityName]s(
    offset: number = 0,
  limit = pageLimit,
  sortBy: SortableColumn = 'created',
  sortDir: SortDir = 'desc'
  ) {
  await requireUser();

  const col = contentTable[sortBy];
  const order = sortDir === 'asc' ? asc(col) : desc(col);

  const items = await db
    .select()
    .from(contentTable)
    .orderBy(order)
    .limit(limit)
    .offset(offset);

  const countResult = await db.select().from(contentTable);
  const total = countResult.length;

  return { items, total, offset, limit, sortBy, sortDir };
}

export async function update[EntityName](id: number, data: unknown) {
  await requireUser();
  const validated = update[EntityName]Schema.parse(data);

  const result = await db
    .update(contentTable)
    .set(validated)
    .where(eq(contentTable.id, id))
    .returning();

  return result[0] || null;
}

export async function delete[EntityName](id: number) {
  await requireUser();

  const result = await db
    .delete(contentTable)
    .where(eq(contentTable.id, id))
    .returning();

  return result[0] || null;
}
