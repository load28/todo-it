'use client';

import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  const session = useSession();
  console.log(session);

  return (
    <>
      {/*{session?.status === 'unauthenticated' && <Login />}*/}
      {/*{session?.status === 'authenticated' && children}*/}
      {children}
    </>
  );
}
