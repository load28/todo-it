'use client';

import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { googleSignOut } from '@/app/auth-action';

export default function Session() {
  const session = useSession();
  const [isLoad, setIsLoad] = useState(false);
  const [userData, setUserData] = useState<{ name: string; photoUrl: string; email: string }>();

  // 회원가입을 위해 임시적으로 데이터를 가져오기 위해 로그인처리 했으므리 세션정보는 필요가 없다. 그래서 세션정보를 지우기 위해 로그아웃 처리
  // 유저 데이터는 세션정보에서 가져와서 별도로 상태관리함
  useEffect(() => {
    if (session.data && !isLoad) {
      setUserData({
        name: session.data?.user?.name || '',
        email: session.data?.user?.email || '',
        photoUrl: session.data?.user?.image || '',
      });
      setIsLoad(true);
      googleSignOut('http://localhost:3000/session').then();
    }
  }, [session]);

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
