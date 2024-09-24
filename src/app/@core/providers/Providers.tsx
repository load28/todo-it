import { ClientSessionProvider } from '@/app/@core/providers/Session.context';
import { TzProvider } from '@/app/@core/providers/Timezone.context';
import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/app/@core/providers/QueryProvider';

const theme = createTheme({});

async function getTimezone(): Promise<string> {
  return 'Asia/Seoul';
}

export async function Providers({ children }: PropsWithChildren) {
  const tz = await getTimezone();

  return (
    <MantineProvider theme={theme}>
      <QueryProvider>
        <ClientSessionProvider>
          <TzProvider value={{ tz }}>{children}</TzProvider>
        </ClientSessionProvider>
      </QueryProvider>
    </MantineProvider>
  );
}
