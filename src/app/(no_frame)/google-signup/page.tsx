'use client';

import { AuthUser } from '@/types/auth';
import { Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const getUserInfo = async (code: string): Promise<AuthUser | undefined> => {
  const queryParams = new URLSearchParams({ code }).toString();
  const accessTokenResponse = await fetch(`/api/auth/user/access-token?${queryParams}`, { method: 'GET' });

  const { access_token } = await accessTokenResponse.json();
  const userInfoResponse = await fetch(`/api/auth/user/user-info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token }),
  });

  const { email, name, picture } = await userInfoResponse.json();
  return { email, name, picture };
};

export default function GoogleSignup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = useMemo(() => searchParams.get('code'), [searchParams]);
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['signup', 'userInfo', code],
    queryFn: ({ queryKey }) => getUserInfo(queryKey[2] as string),
    enabled: !!code,
    retry: 1,
  });

  useEffect(() => {
    if (isError || !code) {
      router.replace('/signup');
    }
  }, [isError, code, router]);

  return (
    <>
      {isSuccess && data && (
        <>
          <Text size={'lg'}>{data.email}</Text>
          <Text size={'lg'}>{data.name}</Text>
          <Image src={data.picture} alt={data.name} width={100} height={100} />
        </>
      )}
    </>
  );
}
