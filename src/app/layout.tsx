import { Providers } from '@/app/@core/providers/Providers';
import { Navbar } from '@/app/@layout/Navbar';
import { ColorSchemeScript, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <div className="layout">
          <Providers>
            <Navbar />
            <main className="layoutMain">
              <Stack pl={24} pr={24} h={'100%'}>
                {children}
              </Stack>
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
