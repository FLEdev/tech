import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/lib/auth';

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ['/', '/dashboard'];
const localePrefix = new RegExp(`^/(${routing.locales.join('|')})(/|$)`);

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const canonicalPath = pathname.replace(localePrefix, '/');

  const isProtectedRoute = protectedRoutes.some(route =>
    canonicalPath === route || canonicalPath.startsWith(route + '/')
  );

  if (isProtectedRoute) {
    try {
      const session = await auth();

      if (!session?.user) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
      }
    } catch (err) {
      console.error('Auth middleware error:', err);
    }
  }

  req.headers.set('x-pathname', req.nextUrl.pathname);
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|_not-found).*)"],
};
