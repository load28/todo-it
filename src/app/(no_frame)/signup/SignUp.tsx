'use client';

import { Button, Text } from '@mantine/core';
import { useEnv } from '@/app/@core/providers/Env.context';

export default function SignUp() {
  const [NEXT_PUBLIC_AUTH_GOOGLE_ID, NEXT_PUBLIC_APP_HOST] = useEnv(['NEXT_PUBLIC_AUTH_GOOGLE_ID', 'NEXT_PUBLIC_APP_HOST']);

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
