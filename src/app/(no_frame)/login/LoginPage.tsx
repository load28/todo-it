'use client';

import { Button, Stack, Text } from '@mantine/core';
import React from 'react';
import { googleLogin } from '@/core/auth/auth-action';

export default function LoginPage() {
  const login = async () => await googleLogin();

  return (
    <Stack justify={'center'} align={'center'} m={'auto'} h={'100vh'}>
      <Text variant={'gradient'} size={'xl'} fw={'bold'} c={'blue.5'}>
        Todo it
      </Text>
      <Button variant={'default'} onClick={login}>
        Start with Google
      </Button>
    </Stack>
  );
}
