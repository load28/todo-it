'use client';

import { Text } from '@mantine/core';
import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const getUserInfo = async (code: string) => {
  try {
    const queryParams = new URLSearchParams({ code }).toString();
    const res = await fetch(`/api/auth/user/accessToken?${queryParams}`, { method: 'GET' });

    return await res.json();
  } catch (e) {
    return null;
  }
};

export default function Session() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = useMemo(() => searchParams.get('code'), [searchParams]);
  const { data, isSuccess } = useQuery({
    queryKey: ['signup', 'userInfo', code],
    queryFn: ({ queryKey }) => getUserInfo(queryKey[2] as string),
    enabled: !!code,
  });

  useEffect(() => {
    if (!code) {
      router.replace('/signup');
    }
  }, [code]);

  return (
    <>
      {isSuccess && (
        <>
          <Text size={'lg'}>{data.email}</Text>
          <Text size={'lg'}>{data.name}</Text>
          <Image src={data.picture} alt={data.name} width={100} height={100} />
        </>
      )}
    </>
  );
}
