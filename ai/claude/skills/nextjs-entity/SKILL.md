---
name: nextjs-entity
description: As an Orchestrator Agent, go through each step and make sure each one is applied.
---

# IMPORTANT: Drop previous State, Context and Memory. Do not interpret or implement outside the defined scope.
# Apply Server Actions for Entity Read, Create, Update and Delete. Define also API Endpoints for Create, Update and Delete that would call the DB Action. There are intermediate Steps that are important and therefo make a individual Plan for the Skill Run instead of processing one after another.
# Each step is important, if not applicable than stop the execution and ask for explanation instead of try to fix it somehow.

# Parameters:
## $ARGUMENTS[0] = Table
## $ARGUMENTS[1] = Entity Name
## $ARGUMENTS[2]+ = Any further instructions to consider

# ACTIONS:
## Read db/schemaSqlite.ts and db/relations.ts and look for '$ARGUMENTS[0]\_table' for table definition
## $ARGUMENTS[1] could be same as Table Name. If not, "$ARGUMENTS[0]\_table" should contain something like "type" or similar distinguishing pattern, matching $ARGUMENTS[1].

## Within assets there are template files that has to be renamed accordingly the Entity Name. Following File and File Content Patterns should be replaced: [EntityName], [entityName], [entity-name] (mention casing and split)
### Copy while replacing content of /app into /app Folder
### Copy while replacing content /assets/components into /src/components Folder
### Copy while replacing content of /assets/data into /db/data Folder
### Append into /src/lib/types.ts following Code while replacing regarding mentioned pattern:

```
export const create[EntityName]Schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  formatter: z.enum(typeOptions).optional(),
  file_bundle: z.string().optional(),
});

export const update[EntityName]Schema = create[EntityName]Schema.partial();

export type Content[EntityName] = z.infer<typeof create[EntityName]Schema> & {
  id: number;
  created: number;
  authorId: number;
};
```
## Generate Entity routes within /app/[EntityName]/page.tsx where the list of Entity Entries will be displayed. Use the following Pattern while loading the List and provide the data to it via Server Component and "use" Hook:


```
import {use} from "react";

export default function [EntityName]List({entityNameItemsPromise}) {
  const entityNameItems = use([entityName]ItemsPromise);

  return ({[entityName]Items.map(...)});
}
```

## Generate directory within src/app/api/$ARGUMENTS[1]/ and add CRUD Entity file like "[$ARGUMENTS[1]].ts (EntityName)" containing REST Methods.
## For Entity handling, create API Endpoint to Create (POST), Update (PUT) and Delete (DELETE) and for Read (GET - plural naming pattern) and keep the API consistent.
## These API Endpoints for $ARGUMENTS[1] will have coresponding db/data/ files having the following naming Pattern: [$ARGUMENTS[1]]-actions.ts (like EntityName-actions.ts) and containing '"use server";' inclusion. The Data Call will be preceeded by "await requireUser()" DAL procedure.
## Important: Create, Update, Delete is handled via Server Actions (Type Safe). Read will be explicitly called via API route - Fetch.

