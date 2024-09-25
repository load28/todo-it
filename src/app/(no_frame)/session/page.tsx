'use client';

import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Session() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoad, setIsLoad] = useState(false);
  const [userData, setUserData] = useState<{ name: string; photoUrl: string; email: string }>();

  useEffect(() => {
    if (!isLoad) {
      // TODO 두번 요청하는 문제 해결필요
      const getUserInfo = async () => {
        try {
          const code = searchParams.get('code');
          if (!code) {
            router.push('/signup');
            return;
          }

          router.replace(window.location.pathname);
          const queryParams = new URLSearchParams({
            code,
          }).toString();
          const res = await fetch(`/api/auth/user/accessToken?${queryParams}`, { method: 'GET' });

          return await res.json();
        } catch (e) {
          return null;
        }
      };

      getUserInfo().then((data) => {
        if (data) {
          setUserData({ name: data.name, photoUrl: data.picture, email: data.email });
        }
      });
      setIsLoad(true);
    }
  }, [isLoad]);

  return (
    <>
      {userData && (
        <>
          <Text size={'lg'}>{userData.email}</Text>
          <Text size={'lg'}>{userData.name}</Text>
          <Image src={userData.photoUrl} alt={userData.name} width={100} height={100} />
        </>
      )}
    </>
  );
}
