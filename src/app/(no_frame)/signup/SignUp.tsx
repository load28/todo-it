'use client';

import { useEnv } from '@/app/@core/providers/env/useEnv';
import { Button, Text } from '@mantine/core';

export default function SignUp() {
  const [NEXT_PUBLIC_AUTH_GOOGLE_ID, NEXT_PUBLIC_APP_HOST] = useEnv(['NEXT_PUBLIC_AUTH_GOOGLE_ID', 'NEXT_PUBLIC_APP_HOST']);

  /** TODO 플로우 변경
   * 1. 로그인 화면 띄우는 login api 호출하기 (어떤 로그인 플랫폼인지 쿼리스트링으로 명시), 로그인 화면 호출시 direct-url을 auth callback url로 설정하기
   * 2. auth callback에서 인가 코드를 파싱후 플랫폼에 맞는 access token -> user info를 호출하여 정보를 반환후 쿠키에 적재한 다음, 서버컴포넌트 login detail 페이지로 이동
   * 3. 서버 컴포넌트 login detail에서 쿠키 파싱 후 클라이언트 컴포넌트로 정보를 내려줌
   */

  const getUser = async () => {
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${NEXT_PUBLIC_AUTH_GOOGLE_ID}` +
      `&redirect_uri=${NEXT_PUBLIC_APP_HOST}/google-signup` +
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
