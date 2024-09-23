// 로그인 없이 접근 가능한 페이지 목록
import { NextRequest, NextResponse } from 'next/server';

const publicPages = ['/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  // 공개 페이지인 경우 접근 허용
  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  const isAuthenticated = checkAuthStatus(request);

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

function checkAuthStatus(request: NextRequest): boolean {
  // 여기에 실제 인증 확인 로직 구현
  // 예: 쿠키나 세션 확인
  const token = request.cookies.get('auth_token');
  console.log(request);
  return !!token;
}

// Middleware가 실행될 경로 설정
export const config = {
  matcher: '/**/*',
};
