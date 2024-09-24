'use client';

import { Text } from '@mantine/core';
import { useSession } from 'next-auth/react';

export default function Page() {
  const session = useSession();

  return (
    <>
      <Text size={'lg'}>{session.data?.user?.name}</Text>
    </>
  );
}
