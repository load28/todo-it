import { PropsWithChildren } from 'react';
import { Stack } from '@mantine/core';
import { Navbar } from '@/app/@layout/Navbar';

export default async function layout({ children }: PropsWithChildren) {
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
