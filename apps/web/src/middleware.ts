import { auth } from '@todo-it/core/auth/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = { matcher: ['/main'] };
