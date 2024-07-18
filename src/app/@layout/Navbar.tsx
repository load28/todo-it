'use client';

import { NavbarAddButton } from '@/app/@layout/NavbarAddButton';
import { Group, Stack, Text } from '@mantine/core';
import { IconList, IconLogin, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import classes from './Navbar.module.css';

const data = [
  { link: '/', label: 'Todo', icon: IconList },
  { link: '/settings', label: 'Settings', icon: IconSettings },
  { link: '/login', label: 'Login', icon: IconLogin }
];

export function Navbar() {
  const currentPath = usePathname();

  const links = useMemo(() => {
    return data.map((item) => (
      <Link key={ item.link } className={ classes.link } data-active={ item.link === currentPath || undefined }
            href={ item.link }>
        <item.icon className={ classes.linkIcon } stroke={ 2.0 } />
        <span>{ item.label }</span>
      </Link>
    ));
  }, [ data, currentPath ]);

  return (
    <nav className={ classes.navbar }>
      <Stack flex={ '1' } gap={ 64 } justify={ 'space-between' }>
        <Stack gap={ 0 }>
          <Group className={ classes.header } justify="space-between">
            <Text size="lg" fw={ 700 } c="gray.8">
              Todo it
            </Text>
            <NavbarAddButton />
          </Group>
          <Stack gap={ 'xs' }>{ links }</Stack>
        </Stack>
      </Stack>
    </nav>
  );
}
