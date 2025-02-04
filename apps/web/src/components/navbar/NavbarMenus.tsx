'use client';

import Link from 'next/link';
import React from 'react';
import { IconList } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { Text } from '@mantine/core';
import classes from '@todo-it/components/navbar/Navbar.module.css';

const data = [{ link: '/main', label: 'Todo', icon: IconList }];

export function NavbarMenus() {
  const currentPath = usePathname();

  return (
    <>
      {data.map((item) => (
        <Link key={item.link} className={classes.link} data-active={item.link === currentPath || undefined} href={item.link}>
          <item.icon className={classes.linkIcon} stroke={2.0} />
          <Text size={'sm'}>{item.label}</Text>
        </Link>
      ))}
    </>
  );
}
