
---
allowed-tools: Read, Edit, Write
description: Next.js initialisation phase - auth
---

# IMPORTANT
## Drop previous State, Context and Memory!!!
## Phase 1: Run following shell commands and show each result output:
### $ set -e  # Exit on error
### $ ASSETS_DIR=~/.claude/commands/03-nextjs-auth/assets

### $ pnpm add jose bcryptjs next-auth@beta
### $ npx shadcn@latest add button table dialog form input
### $ npx auth secret

### $ mkdir -p src/app/api/auth
### $ cp -R "${ASSETS_DIR}"/[...nextauth] src/app/api/auth/
### $ cp "${ASSETS_DIR}"/auth.ts src/lib/
### $ cp "${ASSETS_DIR}"/not-found.tsx src/app/
### $ cp "${ASSETS_DIR}"/page.tsx src/app/
### $ cp "${ASSETS_DIR}"/layout.tsx src/app/
### $ rm -rf /src/middleware.ts
### $ cp "${ASSETS_DIR}"/proxy.ts src/