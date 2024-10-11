'use client';

import Link from 'next/link';
import classes from '@/app/(with_frame)/@navbar/Navbar.module.css';
import React from 'react';
import { IconList } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

const data = [{ link: '/main', label: 'Todo', icon: IconList }];

export default function NavbarMenus() {
  const currentPath = usePathname();

  return (
    <>
      {data.map((item) => (
        <Link key={item.link} className={classes.link} data-active={item.link === currentPath || undefined} href={item.link}>
          <item.icon className={classes.linkIcon} stroke={2.0} />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );
}
