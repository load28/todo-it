'use client';

import { Stack, Text } from '@mantine/core';
import React from 'react';
import { googleLogin } from '@/app/auth-action';
import Script from 'next/script';

const login = async () => {
  await googleLogin('/main');
};

const initializeGoogleSignIn = () => {
  const targetElement = document.getElementById('google-signin-button');
  const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;

  if (!(targetElement && clientId)) {
    return;
  }

  window.google.accounts.id.initialize({ client_id: clientId, callback: login });
  window.google.accounts.id.renderButton(targetElement, { theme: 'outline', size: 'large' });
};

export default function LoginPage() {
  return (
    <Stack justify={'center'} align={'center'} m={'auto'} h={'100vh'}>
      <Script src="https://accounts.google.com/gsi/client" onLoad={() => initializeGoogleSignIn()} />
      <Text size={'xl'} fw={'bold'}>
        Todo it
      </Text>
      <div id="google-signin-button"></div>
    </Stack>
  );
}
