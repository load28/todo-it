import { Navbar } from '@/app/@layout/Navbar';
import { ColorSchemeScript, createTheme, MantineProvider, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { QueryProviders } from './query-provider';
import { TzProvider } from '@/app/@core/Timezone.context';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({});
export const metadata: Metadata = {
  title: 'Todo App',
};

async function getTimezone() {
  // timezone 을 변경하는 로직은 기존 fetch를 무효화 하여 새로고침을 유도하는 로직이 필요합니다.
  // 테스트 하려면 api를 통해서 테스트가 필요함
  return Promise.resolve('Asia/Seoul');
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const tz = await getTimezone();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <QueryProviders>
            <TzProvider value={{ tz }}>
              <div className="layout">
                <Navbar />
                <main className="layoutMain">
                  <Stack pl={24} pr={24}>
                    {children}
                  </Stack>
                </main>
              </div>
            </TzProvider>
          </QueryProviders>
        </MantineProvider>
      </body>
    </html>
  );
}
