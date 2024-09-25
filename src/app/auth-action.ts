'use server';

import { signIn, signOut } from '@/app/auth';

// 서버 액션에서 리다이렉트 할때에는 상대 경로가 아닌 절대 경로로 동작해야함
export async function googleLogin() {
  return await signIn('google', { redirectTo: 'http://localhost:3000/main' });
}

export async function googleSignOut(redirectTo = 'http://localhost:3000/login') {
  return await signOut({ redirectTo });
}
