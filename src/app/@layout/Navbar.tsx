'use client';

import { Group, Text } from '@mantine/core';
import { IconList } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './Navbar.module.css';

const data = [
  { link: '/', label: 'Todo', icon: IconList },
  // { link: '/search', label: 'Search', icon: IconSearch },
];

export function Navbar() {
  const currentPath = usePathname();

  const links = data.map((item) => (
    <Link
      key={item.link}
      className={classes.link}
      data-active={item.link === currentPath || undefined}
      href={item.link}
    >
      <item.icon className={classes.linkIcon} stroke={2.0} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text size="lg" fw={700} c="gray.8">
            Todo it
          </Text>
        </Group>
        {links}
      </div>
    </nav>
  );
}
