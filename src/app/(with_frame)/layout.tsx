import { PropsWithChildren } from 'react';
import { Stack } from '@mantine/core';
import { Navbar } from '@/app/@layout/Navbar';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

export default async function layout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="layout">
      <Navbar />
      <div className="layoutMain">
        <Stack pl={24} pr={24} h={'100%'}>
          {children}
        </Stack>
      </div>
    </div>
  );
}
