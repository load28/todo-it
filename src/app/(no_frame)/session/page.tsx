'use client';

import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Session() {
  const { query } = useRouter();
  const [isLoad, setIsLoad] = useState(false);
  const [userData, setUserData] = useState<{ name: string; photoUrl: string; email: string }>();

  // 회원가입을 위해 임시적으로 데이터를 가져오기 위해 로그인처리 했으므리 세션정보는 필요가 없다. 그래서 세션정보를 지우기 위해 로그아웃 처리
  // 유저 데이터는 세션정보에서 가져와서 별도로 상태관리함
  useEffect(() => {
    if (!isLoad) {
      const getUserInfo = async () => {
        const code = query.code;

        if (!code) {
          return null;
        }

        const client_id = process.env.AUTH_GOOGLE_ID;
        const client_secret = process.env.AUTH_GOOGLE_SECRET;
        const redirect_uri = 'http://localhost:3000/signup';

        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const params = new URLSearchParams({
          code,
          client_id,
          client_secret,
          redirect_uri,
          grant_type: 'authorization_code',
        });

        // 토큰 교환
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params,
        });

        const data = await response.json();

        if (data.error) {
          return null;
        }

        const { access_token } = data;

        // Access token을 사용하여 유저 정보 요청
        const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
        const userInfoResponse = await fetch(userInfoUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const userInfo = await userInfoResponse.json();

        return userInfo;
      };

      getUserInfo().then((data) => {
        console.log(data);
      });
    }
  }, []);

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
