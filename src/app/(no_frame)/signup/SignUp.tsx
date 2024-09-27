'use client';

import { Button, Text } from '@mantine/core';
import { getAbsoluteRouteUrl, getPublicAuthGoogleId } from '@/core/utils';

export default function SignUp() {
  const getUser = async () => {
    const client_id = getPublicAuthGoogleId(process);
    console.log(client_id);
    const redirect_uri = getAbsoluteRouteUrl('/google-signup', process); // 콜백 URL

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

const get = (p) => {
  return p['test'];
};
