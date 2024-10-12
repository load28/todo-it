import { NavbarHeader } from '@/components/navbar/NavbarHeader';
import { Group, Stack } from '@mantine/core';
import React from 'react';
import classes from './Navbar.module.css';
import NavbarBottom from '@/components/navbar/NavbarBottom';
import NavbarMenus from '@/components/navbar/NavbarMenus';

export default function Navbar() {
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
          <NavbarBottom />
        </Stack>
      </Stack>
    </nav>
  );
}
