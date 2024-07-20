'use client';

import LoginPage from '@/app/login/LoginPage';
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useEffect, useState } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  const session = useSession();
  const [ isLogin, setIsLogin ] = useState(false);

  useEffect(() => {
    const isLogin = !!(session && session.data && session.status === 'authenticated');
    setIsLogin(isLogin);
  }, [ session ]);

  return <>
    { isLogin ? children : <LoginPage /> }
  </>;
}
