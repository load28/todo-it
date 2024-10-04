import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/app/@core/providers/query/QueryProvider';
import { getServerEnvValue } from '@/app/@core/providers/env/env-server';
import { EnvProvider } from '@/app/@core/providers/env/EnvProvider';
import { TzProvider } from '@/app/@core/providers/TimezoneProvider';

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
          <TzProvider value={{ tz }}>{children}</TzProvider>
        </QueryProvider>
      </EnvProvider>
    </MantineProvider>
  );
}
