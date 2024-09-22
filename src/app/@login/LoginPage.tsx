'use client';

import { Stack, Text } from '@mantine/core';
import Script from 'next/script';
import { signIn } from 'next-auth/react';
import React from 'react';

const handleCredentialResponse = (response) => {
  fetch('/api/auth/callback/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: response.credential }),
  }).then(() => {
    signIn('google').then();
  });
};

const initializeGoogleSignIn = () => {
  console.log(window.google);
  window.google.accounts.id.initialize({
    client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
  });
  window.google.accounts.id.renderButton(document.getElementById('google-signin-button'), {
    theme: 'outline',
    size: 'large',
  });
};

export default function LoginPage() {
  return (
    <Stack justify={'center'} align={'center'} m={'auto'} h={'100vh'}>
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => {
          if (window.google) {
            initializeGoogleSignIn();
          }
        }}
      />
      <Text size={'xl'} fw={'bold'}>
        Todo it
      </Text>
      <div id="google-signin-button"></div>
    </Stack>
  );
}
