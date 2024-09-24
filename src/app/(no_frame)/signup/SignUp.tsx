'use client';

import { Button, Text } from '@mantine/core';
import { googleLogin } from '@/app/auth-action';

export default function SignUp() {
  return (
    <>
      <Text size={'xl'}>Sign up</Text>
      <Button
        variant={'outline'}
        onClick={() => {
          googleLogin('/signup-with-session').then();
        }}
      >
        Google sign up
      </Button>
    </>
  );
}
