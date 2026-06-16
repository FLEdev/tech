---
allowed-tools: Read, Edit, Write
description: As a helpful executor of the Bash Scripts, do not interpret or auto generate files or code.
---

# IMPORTANT
# Drop previous State, Context and Memory!!!
# Each step is important, if not applicable or failed, stop the execution and ask for instructions. Use a Transaction log in order to revert changes if any Step would fail.
# Phase 1: Run following shell commands and expand/show each result output:
## $ set -e  # Exit on error
## $ ASSETS_DIR=~/.claude/commands/02-nextjs-db/assets
## $ echo "ASSET directory: ${ASSETS_DIR}"
##  If .env file not present, pause and execution and ask in the terminal to provide it before continue. Request entering "continue" or similar to continue.
## $ echo "Press enter if you copied your version of .env" && read -n
## $ pnpm add drizzle-orm@beta @libsql/client zod drizzle-zod
## $ pnpm add -D drizzle-kit@beta
## $ mkdir -p db
## $ mkdir -p db/data
## $ cp -R "${ASSETS_DIR}/db/*" db/;
## $ cp "${ASSETS_DIR}/drizzle.config.ts" ./;
## $ cp "${ASSETS_DIR}/lib/types.ts "./src/lib/;
## $ touch db/project.db
## $ mv -f lib/* src/lib/
## $ rm -rf lib

# Phase 2: ⚠️ IMPORTANT: This step MUST pause execution
## $ test -f .env
## Expected behavior:
##   1. Check if .env exists
##   2. If NO → Stop and ask user (do NOT create template)
##   3. If YES → Continue
##   4. Do NOT use fallbacks or defaults

# Phase 3: Modify in project.json following lines:
## "db:start": "turso dev --db-file ./db/project.db",
## "db:generate": "drizzle-kit generate",
## "db:migrate": "npx drizzle-kit migrate",
## "db:studio": "drizzle-kit studio",
## "db:seed": "npx tsx ./db/seed.ts"

# Phase 4: Start DB
## $ pnpm db:start
## $ lsof -i :8080
## Check if lsof returns any process running on 8080. Important: if not, pause execution and request to "continue"

# Phase 5: Init DB
## $ npx drizzle-kit generate
## $ npx drizzle-kit migrate
## $ pnpm db:seed


