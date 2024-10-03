'use client';

import { Avatar, Divider, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import React from 'react';
import { googleSignOut } from '@/app/auth-action';
import { sessionQueryOptions } from '@/app/@core/query/session-query';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function NavbarBottom() {
  const { data: session } = useSuspenseQuery(sessionQueryOptions);

  const singOutHandler = async () => {
    await googleSignOut();
  };

  // TODO data가 null로 반환되는 이슈 확인 필요
  if (!session?.user?.email || !session?.user?.image) {
    return null;
  }

  return (
    <>
      <Divider mb={'sm'} />
      <Group justify={'space-between'} pl={'sm'} pr={'sm'}>
        <Text size={'md'} c="gray.8">
          {session.user.email}
        </Text>
        <Menu width={180} styles={{ itemLabel: { fontSize: '12px' } }} position={'top-end'}>
          <Menu.Target>
            <UnstyledButton>
              <Avatar src={session.user.image} size={'sm'} style={{ cursor: 'pointer' }} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconLogout size={14} />} style={{ color: 'red' }} onClick={singOutHandler}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </>
  );
}
