'use client';

import { NavbarAddButton } from '@/app/@layout/NavbarAddButton';
import { Avatar, Button, Divider, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconList, IconLogin, IconLogout, IconSettings } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import classes from './Navbar.module.css';
import { googleLogin, googleSignOut } from '@/app/auth-action';

const data = [
  { link: '/main', label: 'Todo', icon: IconList },
  { link: '/settings', label: 'Settings', icon: IconSettings },
];

export function Navbar() {
  const currentPath = usePathname();
  const session = useSession();

  const singOutHandler = async () => {
    await googleSignOut();
  };

  const signInHandler = async () => {
    await googleLogin('/main');
  };

  const links = useMemo(() => {
    return data.map((item) => (
      <Link key={item.link} className={classes.link} data-active={item.link === currentPath || undefined} href={item.link}>
        <item.icon className={classes.linkIcon} stroke={2.0} />
        <span>{item.label}</span>
      </Link>
    ));
  }, [data, currentPath]);

  return (
    <nav className={classes.navbar}>
      <Stack flex={'1'} gap={64} justify={'space-between'}>
        <Stack gap={0}>
          <Group className={classes.header} justify="space-between">
            <Text size="lg" fw={700} c="gray.8">
              Todo it
            </Text>
            <NavbarAddButton />
          </Group>
          <Stack gap={'xs'}>{links}</Stack>
        </Stack>
        <Stack gap={0}>
          <Divider mb={'sm'} />
          {session.data?.user ? (
            <Group justify={'space-between'} pl={'sm'} pr={'sm'}>
              <Text>{session.data.user.email}</Text>
              <Menu width={180} styles={{ itemLabel: { fontSize: '12px' } }} position={'top-end'}>
                <Menu.Target>
                  <UnstyledButton>
                    <Avatar src={session.data.user.image} size={'sm'} style={{ cursor: 'pointer' }} />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconLogout size={14} />} style={{ color: 'red' }} onClick={singOutHandler}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          ) : (
            <Button className={classes.link} onClick={signInHandler} variant={'subtle'}>
              <IconLogin className={classes.linkIcon} stroke={2.0} />
              <span>Login</span>
            </Button>
          )}
        </Stack>
      </Stack>
    </nav>
  );
}
