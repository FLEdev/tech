---
allowed-tools: Read, Edit, Write
description: Next.js initialisation phase
---

# IMPORTANT
## Drop previous State, Context and Memory!!!
## Run following shell commands and show each result output:
### $ set -e  # Exit on error
### $ ASSETS_DIR=~/.claude/commands/01-nextjs-init/assets
### $ npx create-next-app@latest . --skip-install --ts --tailwind --react-compiler --eslint --biome --app --api --src-dir --turbopack --empty --use-pnpm  --import-alias --example "app-api" --no-agents-md
### $ pnpm add dotenv sass sass-embedded postcss postcss-import framer-motion zod yjs uuid
### $ pnpm add shadcn class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
### $ npx shadcn@latest init -b radix -t vite -y -p nova
### $ pnpm dlx shadcn@latest add form

### $ mkdir -p src/components
### $ mkdir -p src/lib
### $ cp -n "${ASSETS_DIR}"/utils.ts src/lib/
### $ cp -nr "${ASSETS_DIR}"/styles src/
### $ cp -nr "${ASSETS_DIR}"/components.json /
### $ cp -nr "${ASSETS_DIR}"/postcss.config.js /
### $ rm -rf src/app/[slug]
### $ rm -rf src/app/route.ts

# Update package.json
## within generated package.json: change "$ pnpm dev" execution to "next dev --turbopack" and futher possible addition of "--turbopack"

# Ensure tsconfig.json contains:
## ```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "imports": {
    "#components/*": "./src/components/*.tsx",
    "#lib/*": "./src/lib/*.ts",
    "#hooks/*": "./src/hooks/*.ts"
  }
}
```

# Ensure package.json contains:
```
{
  "imports": {
    "#components/*": "./src/components/*.tsx",
    "#lib/*": "./src/lib/*.ts",
    "#hooks/*": "./src/hooks/*.ts"
  }
}
```