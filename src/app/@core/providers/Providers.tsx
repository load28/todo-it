import { ClientSessionProvider } from '@/app/@core/providers/Session.context';
import { TzProvider } from '@/app/@core/providers/Timezone.context';
import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/app/@core/providers/QueryProvider';
import { getServerEnvValue } from '@/app/@core/providers/Env.server';
import { EnvProvider } from '@/app/@core/providers/env/EnvProvider';

const theme = createTheme({});

async function getTimezone(): Promise<string> {
  return 'Asia/Seoul';
}

export async function Providers({ children }: PropsWithChildren) {
  const tz = await getTimezone();
  const env = await getServerEnvValue();

  return (
    <MantineProvider theme={theme}>
      <EnvProvider value={env}>
        <QueryProvider>
          <ClientSessionProvider>
            <TzProvider value={{ tz }}>{children}</TzProvider>
          </ClientSessionProvider>
        </QueryProvider>
      </EnvProvider>
    </MantineProvider>
  );
}
