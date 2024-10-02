'use client';

import { NavbarHeader } from '@/app/@layout/NavbarHeader';
import { Group, Stack } from '@mantine/core';
import React, { PropsWithoutRef } from 'react';
import classes from './Navbar.module.css';
import NavbarBottom from '@/app/@layout/NavbarBottom';
import NavbarMenus from '@/app/@layout/NavbarMenus';

export function Navbar({ userEmail, userImage }: PropsWithoutRef<{ userEmail: string; userImage: string }>) {
  return (
    <nav className={classes.navbar}>
      <Stack flex={'1'} gap={64} justify={'space-between'}>
        <Stack gap={0}>
          <Group className={classes.header} justify="space-between">
            <NavbarHeader />
          </Group>
          <Stack gap={'xs'}>
            <NavbarMenus />
          </Stack>
        </Stack>
        <Stack gap={0}>
          <NavbarBottom userEmail={userEmail} userImage={userImage} />
        </Stack>
      </Stack>
    </nav>
  );
}
