"use server";

import db from "../index";
import { requireUser } from "../require-user";
import { contentTable } from "../schemaSqlite";
import { createCodeSchema, updateCodeSchema } from "@/lib/types";
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

export async function readCode(id: number) {
  await requireUser();

  const result = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.id, id));

  return result[0] || null;
}

export async function readCodes(offset: number = 0, limit = pageLimit) {
  await requireUser();

  const items = await db
    .select()
    .from(contentTable)
    .orderBy(desc(contentTable.created))
    .limit(limit)
    .offset(offset);

  const countResult = await db.select().from(contentTable);
  const total = countResult.length;

  return {
    items,
    total,
    offset,
    limit,
  };
}

export async function updateCode(id: number, data: unknown) {
  await requireUser();
  const validated = updateCodeSchema.parse(data);

  const result = await db
    .update(contentTable)
    .set(validated)
    .where(eq(contentTable.id, id))
    .returning();

  return result[0] || null;
}

export async function deleteCode(id: number) {
  await requireUser();

  const result = await db
    .delete(contentTable)
    .where(eq(contentTable.id, id))
    .returning();

  return result[0] || null;
}
