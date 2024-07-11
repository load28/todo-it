import { Navbar } from '@/app/@layout/Navbar';
import { ColorSchemeScript, createTheme, MantineProvider, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { QueryProviders } from './query-provider';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({});
export const metadata: Metadata = {
  title: 'Todo App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <QueryProviders>
            <div className="layout">
              <Navbar />
              <main className="layoutMain">
                <Stack pl={24} pr={24}>
                  {children}
                </Stack>
              </main>
            </div>
          </QueryProviders>
        </MantineProvider>
      </body>
    </html>
  );
}
