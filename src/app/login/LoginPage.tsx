'use client';

import { Button, Group } from '@mantine/core';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const singInHandler = () => {
    signIn('google')
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  };

  return (
    <Group justify={ 'center' } align={ 'center' } mt={ 'auto' } mb={ 'auto' }>
      <Button onClick={ singInHandler }>Google login</Button>
    </Group>
  );
}
