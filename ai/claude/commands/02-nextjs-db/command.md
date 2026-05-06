---
allowed-tools: Read, Edit, Write
description: As a helpful executor of the Bash Scripts, do not interpret or auto generate files or code.
---

# IMPORTANT
## Drop previous State, Context and Memory!!!
## Phase 1: Run following shell commands and show each result output:
### $ set -e  # Exit on error
### $ ASSETS_DIR=~/.claude/commands/02-nextjs-db/assets

##  If .env file not present, pause and execution and ask in the terminal to provide it before continue. Request pressing [ENTER] key by the user.
### $ echo "Press enter if you copied your version of .env" && read -n

### $ pnpm add drizzle-orm@beta @libsql/client zod drizzle-zod
### $ pnpm add -D drizzle-kit@beta
### $ mkdir -p db
### $ cp -R "${ASSETS_DIR}"/db/* db/;
### $ cp "${ASSETS_DIR}"/drizzle.config.ts ./;
### $ cp "${ASSETS_DIR}"/types.ts ./src/lib/;
### $ touch db/project.db
### $ mv -f lib/* src/lib/
### $ rm -rf lib

## Phase 2: ⚠️ IMPORTANT: This step MUST pause execution
### $ test -f .env
### Expected behavior:
###   1. Check if .env exists
###   2. If NO → Stop and ask user (do NOT create template)
###   3. If YES → Continue
###   4. Do NOT use fallbacks or defaults


# Phase 3: Modify in project.json following lines:
### "db:start": "turso dev --db-file ./db/project.db",
### "db:generate": "drizzle-kit generate",
### "db:migrate": "npx drizzle-kit migrate",
### "db:studio": "drizzle-kit studio",
### "db:seed": "npx tsx ./db/seed.ts"

# Phase 4: Init DB
## npx drizzle-kit generate
## npx drizzle-kit migrate
## pnpm db:seed