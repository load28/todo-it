'use client';

import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { Text } from '@mantine/core';
import Login from '@/app/@login/page';

export function AuthProvider({ children }: PropsWithChildren) {
  const session = useSession();

  return (
    <>
      {session?.status === 'loading' && <Text>Loading...</Text>}
      {session?.status === 'unauthenticated' && <Login />}
      {session?.status === 'authenticated' && children}
    </>
  );
}
