'use client';

import { Button, Text } from '@mantine/core';

// TODO 구글 api를 이용해서 직접 유저의 로그인 정보를 가져온다. 그리고 정보를 화면에 표출함 (세션 X)
export default function SignUp() {
  return (
    <>
      <Text size={'xl'}>Sign up</Text>
      <Button variant={'outline'}>Google sign up</Button>
    </>
  );
}
