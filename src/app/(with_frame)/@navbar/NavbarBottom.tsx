'use client';

import { Avatar, Divider, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import React from 'react';
import { googleSignOut } from '@/app/@core/auth/auth-action';
import { useSessionQuery } from '@/app/@core/query/session-query';

export default function NavbarBottom() {
  const { data: session } = useSessionQuery();
  
  const singOutHandler = async () => await googleSignOut();

  if (!session) {
    return null;
  }

  return (
    <>
      <Divider mb={'sm'} />
      <Group justify={'space-between'} pl={'sm'} pr={'sm'}>
        <Text size={'md'} c="gray.8">
          {session.email}
        </Text>
        <Menu width={180} styles={{ itemLabel: { fontSize: '12px' } }} position={'top-end'}>
          <Menu.Target>
            <UnstyledButton>
              <Avatar src={session.image} size={'sm'} style={{ cursor: 'pointer' }} />
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
