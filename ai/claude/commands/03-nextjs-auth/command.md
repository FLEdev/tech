---
allowed-tools: Read, Edit, Write
description: Next.js initialisation phase - auth
---

# IMPORTANT
# Drop previous State, Context and Memory!!!
# Each step is important, if not applicable or failed, stop the execution and ask for instructions. Use a Transaction log in order to revert changes if any Step would fail.
# Run following shell commands and expand/show each result output:
## $ set -e  # Exit on error
## $ ASSETS_DIR=~/.claude/commands/03-nextjs-auth/assets
## $ echo "ASSET directory: ${ASSETS_DIR}"
## $ pnpm add jose bcryptjs next-auth@beta
## $ npx shadcn@latest add button table dialog form input
## $ npx auth secret
## $ mkdir -p src/app/api/auth
## $ cp -Rf "${ASSETS_DIR}/app/[...nextauth]" src/app/api/auth/
## $ cp -Rf "${ASSETS_DIR}/app/layout.tsx" src/app/
## $ cp -Rf "${ASSETS_DIR}/app/page.tsx" src/app/
## $ cp "${ASSETS_DIR}/lib/auth.ts" src/lib/
## $ cp "${ASSETS_DIR}/not-found.tsx" src/app/
## $ cp "${ASSETS_DIR}/proxy.ts" src/
## $ cp "${ASSETS_DIR}/require-user.ts" db/data/
## $ rm -rf /src/middleware.ts