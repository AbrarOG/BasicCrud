import { getUserRole } from '@/user-details/user-role';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const role = getUserRole; // value set after login
    console.log("i am inside middleware", role)

  const pathname = req.nextUrl.pathname;

  const protectedRoutes: { pattern: string; allowedRoles: string[] }[] = [
    { pattern: '/roles', allowedRoles: ['admin'] },
    { pattern: '/books', allowedRoles: ['admin', 'librarian'] },
    { pattern: '/users', allowedRoles: ['admin'] },
  ];
  console.log("i am inside middleware", role)

  for (const { pattern, allowedRoles } of protectedRoutes) {
    if (pathname.startsWith(pattern)) {
      if (!role || !allowedRoles.includes(role)) {
        // Rewrite to Next.js default 404
        return NextResponse.rewrite(new URL('/404', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/roles/:path*', // /roles and all subroutes
    '/books/:path*',
    '/users/:path*',
  ],
};
