'use client';

import Login from '@/app/@login/page';
import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  const session = useSession();

  return (
    <>
      { session?.status === 'unauthenticated' && <Login /> }
      { session?.status === 'authenticated' && children }
    </>
  );
}
