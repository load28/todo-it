'use client';

import { Stack, Text } from '@mantine/core';
import Script from 'next/script';
import { signIn } from 'next-auth/react';
import React from 'react';
import { CredentialResponse } from 'google-one-tap';

const handleCredentialResponse = async (response: CredentialResponse) => {
  try {
    await fetch('/api/auth/callback/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    });

    await signIn('google');
  } catch (e: unknown) {
    console.error(e);
  }
};

const initializeGoogleSignIn = () => {
  const targetElement = document.getElementById('google-signin-button');
  const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID;

  if (!(targetElement && clientId)) {
    return;
  }

  window.google.accounts.id.initialize({ client_id: clientId, callback: handleCredentialResponse });
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
