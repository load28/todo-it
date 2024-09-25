'use client';

import { Button, Stack, Text } from '@mantine/core';
import React from 'react';
import { googleLogin } from '@/app/auth-action';

export default function LoginPage() {
  const login = async () => await googleLogin();
  
  return (
    <Stack justify={'center'} align={'center'} m={'auto'} h={'100vh'}>
      <Text size={'xl'} fw={'bold'}>
        Todo it
      </Text>
      <Button variant={'outline'} onClick={login}>
        Google Login
      </Button>
    </Stack>
  );
}
