import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/lib/auth';

console.log('Auth middleware loaded');
// Protected routes that require authentication
const protectedRoutes = ['/', '/dashboard'];

export default async function proxy(req: NextRequest) {
  // Check if the current route is protected
  console.info('Incoming request for:', req.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
    //req.nextUrl.pathname === route
  );

  console.info('Is protected route:', isProtectedRoute);
  if (isProtectedRoute) {
    try {
      const session = await auth();

      if (!session?.user) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
      }
    } catch (err) {
      console.error('Auth middleware error:', err);
      // If auth checks fail in middleware (for internal routes like /_not-found during build),
      // allow the request to continue instead of throwing to avoid blocking page data collection.
    }
  }

  const nextResponse = NextResponse.next();
  nextResponse.headers.set('x-pathname', req.nextUrl.pathname);
  return nextResponse;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|_not-found).*)"],
};
