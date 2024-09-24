'use server';

import { signIn, signOut } from '@/app/auth';

export async function googleLogin(redirectTo: string) {
  return await signIn('google', { redirectTo });
}

export async function googleSignOut() {
  return await signOut({ redirectTo: '/login' });
}
