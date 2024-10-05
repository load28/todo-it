import { auth } from '@/app/@core/auth/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
  }

  return NextResponse.next();
});

export const config = { matcher: ['/main', '/settings'] };
