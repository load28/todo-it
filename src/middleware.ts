import { auth } from '@/app/@core/auth/auth';
import { NextResponse } from 'next/server';

function isProtectedRoute(pathname: string): boolean {
  return config.matcher.some((route) => pathname.startsWith(route));
}

export default auth((req) => {
  if (isProtectedRoute(req.nextUrl.pathname)) {
    if (!req.auth) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
    }

    return NextResponse.next();
  }
});

export const config = { matcher: ['/main', '/settings'] };
