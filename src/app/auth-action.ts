'use server';

import { signIn, signOut } from '@/app/auth';

export async function googleLogin() {
  return await signIn('google', { redirectTo: '/main' });
}

export async function googleSignOut() {
  return await signOut({ redirectTo: '/login' });
}
