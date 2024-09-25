'use client';

import { Button, Text } from '@mantine/core';

// TODO 구글 api를 이용해서 직접 유저의 로그인 정보를 가져온다. 그리고 정보를 화면에 표출함 (세션 X)
export default function SignUp() {
  const getUser = async () => {
    const client_id = '16200103282-ooghgcr76tcs2l82dj2obdukhcd44nvu.apps.googleusercontent.com';
    const redirect_uri = 'http://localhost:3000/session'; // 콜백 URL

    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${client_id}` +
      `&redirect_uri=${redirect_uri}` +
      `&response_type=code` +
      `&scope=email profile` +
      `&access_type=offline`;
  };

  return (
    <>
      <Text size={'xl'}>Sign up</Text>
      <Button variant={'outline'} onClick={getUser}>
        Google sign up
      </Button>
    </>
  );
}
