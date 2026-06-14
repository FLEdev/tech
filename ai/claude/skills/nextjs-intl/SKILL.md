---
name: nextjs-intl
description: As a helpfull agent, based on SKILL description, implement i18n - nextjs-intl.
user-invocable: true
---

# IMPORTANT: Drop previous State, Context and Memory.
# Crucial Instructions: before each step, consider /skills/next-best-practices before integration.

# Implementation (Step by Step): 
### Copy while replacing content /assets/next.config.ts into / (Root) Folder
### Wrap the /app/layout.tsx "<body>...</body>" -> "<body><NextIntlClientProvider>...</NextIntlClientProvider></body>" and add "import {NextIntlClientProvider} from 'next-intl';" regarding it.

import type {NextRequest} from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return intlProxy(request);
}

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};