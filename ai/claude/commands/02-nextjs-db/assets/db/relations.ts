import * as schema from './schemaSqlite' // db Schema
import { defineRelations } from "drizzle-orm/relations";

export const relations = defineRelations(schema, (r) => ({
}));
