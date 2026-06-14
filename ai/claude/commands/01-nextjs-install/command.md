---
allowed-tools: Read, Edit, Write
description: Next.js install
---

# IMPORTANT:
## Drop previous State, Context and Memory!!!
## If anything exits with error or is not run properly, stop any furhter execution and halt!

# Run following shell commands and expand/show each result output:
## $ set -e  # Exit on error
## $ ASSETS_DIR=~/.claude/commands/01-nextjs-install/assets
## $ echo "ASSET directory: ${ASSETS_DIR}"
## $ npx create-next-app@latest . --skip-install --ts --tailwind --react-compiler --eslint --biome --app --api --src-dir --turbopack --empty --use-pnpm  --import-alias --example "app-api" --no-agents-md
## $ pnpm add nuqs dotenv sass sass-embedded @tailwindcss/postcss postcss postcss-import tailwind-merge  tailwindcss tw-animate-css framer-motion
## $ pnpm add radix-ui @radix-ui/react-slot @radix-ui/react-dropdown-menu @radix-ui/react-dialog @radix-ui/react-form @radix-ui/react-icons @radix-ui/themes
## $ pnpm add lucide-react zod yjs uuid
## $ mkdir -p src/components
## $ mkdir -p src/components/entities
## $ mkdir -p src/lib
## $ mkdir -p public/styles
## $ touch public/styles/index.css
## $ pnpm add shadcn class-variance-authority clsx pagination
## $ pnpm dlx shadcn@latest init --preset b1s91WtVo --template next 
## $ pnpm dlx shadcn@latest add -y form
## $ cp -rf "${ASSETS_DIR}/lib/utils.ts" src/lib
## $ cp -r "${ASSETS_DIR}/postcss.config.js" /
## $ cp -r "${ASSETS_DIR}/tailwind.config.js" /
## $ cp -r "${ASSETS_DIR}/styles" src/
## $ cp -r "${ASSETS_DIR}/ui" src/components/
## $ rm -rf src/app/[slug]
## $ rm -rf src/app/route.ts
## $ cp -r "${ASSETS_DIR}/styles" src/
## $ cp -nr "${ASSETS_DIR}/components.json" /

# Update package.json
## within generated package.json: change "$ pnpm dev" execution to "next dev --turbopack" and futher possible addition of "--turbopack"

# Ensure tsconfig.json contains:
## ```
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
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


