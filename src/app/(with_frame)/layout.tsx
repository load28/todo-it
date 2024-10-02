import { PropsWithChildren } from 'react';
import { Stack } from '@mantine/core';
import { Navbar } from '@/app/@layout/Navbar';
import { auth } from '@/app/auth';

export default async function layout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session?.user?.email || !session?.user?.image) {
    return;
  }

  // TODO 유저 정보를 서버에서 가져와 클라이언트 컴포넌트로 손쉽게 전달할수 있도록 디자인되어야 함
  return (
    <div className="layout">
      <>
        <Navbar userEmail={session.user.email} userImage={session.user.image} />
        <div className="layoutMain">
          <Stack pl={24} pr={24} h={'100%'}>
            {children}
          </Stack>
        </div>
      </>
    </div>
  );
}
