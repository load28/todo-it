import { NextResponse } from 'next/server';
import { auth } from '@todo-it/core/auth/auth';

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
  }

  return NextResponse.next();
});

export const config = { matcher: ['/main'] };
