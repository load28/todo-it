import { Navbar } from '@/app/@layout/Navbar';
import { ColorSchemeScript, createTheme, MantineProvider, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { QueryProviders } from './query-provider';
import { TzProvider } from '@/app/@core/Timezone.context';

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
            <TzProvider value={{ tz: 'Asia/Seoul' }}>
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
