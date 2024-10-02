'use client';

import { Avatar, Divider, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import React, { PropsWithoutRef } from 'react';
import { googleSignOut } from '@/app/auth-action';

export default function NavbarBottom({
  userEmail,
  userImage,
}: PropsWithoutRef<{
  userEmail: string;
  userImage: string;
}>) {
  const singOutHandler = async () => {
    await googleSignOut();
  };

  return (
    <>
      <Divider mb={'sm'} />
      <Group justify={'space-between'} pl={'sm'} pr={'sm'}>
        <Text size={'md'} c="gray.8">
          {userEmail}
        </Text>
        <Menu width={180} styles={{ itemLabel: { fontSize: '12px' } }} position={'top-end'}>
          <Menu.Target>
            <UnstyledButton>
              <Avatar src={userImage} size={'sm'} style={{ cursor: 'pointer' }} />
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
