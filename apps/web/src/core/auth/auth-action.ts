'use server';

// 서버 액션에서 리다이렉트 할때에는 상대 경로가 아닌 절대 경로로 동작해야함
import { getServerEnvValue } from '@todo-it/core/providers/env/env-server';
import { signIn, signOut } from '@todo-it/core/auth/auth';

export async function googleLogin() {
  const env = await getServerEnvValue();
  return await signIn('google', { redirectTo: `${env.NEXT_PUBLIC_APP_URL}/main` });
}

export async function googleSignOut(redirectTo?: string) {
  const env = await getServerEnvValue();
  return await signOut({ redirectTo: redirectTo || `${env.NEXT_PUBLIC_APP_URL}/login` });
}
