import { PropsWithChildren } from 'react';
import { Stack } from '@mantine/core';
import NavbarPage from '@/app/@layout/NavbarPage';

export default async function layout({ children }: PropsWithChildren) {
  return (
    <div className="layout">
      <>
        <NavbarPage />
        <div className="layoutMain">
          <Stack pl={24} pr={24} h={'100%'}>
            {children}
          </Stack>
        </div>
      </>
    </div>
  );
}
