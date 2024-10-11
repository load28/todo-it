import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/app/@core/providers/query/QueryProvider';
import { getServerEnvValue } from '@/app/@core/providers/env/env-server';
import { EnvProvider } from '@/app/@core/providers/env/EnvProvider';

const theme = createTheme({});

export async function Providers({ children }: PropsWithChildren) {
  const env = await getServerEnvValue();

  return (
    <MantineProvider theme={theme}>
      <EnvProvider value={env}>
        <QueryProvider>{children}</QueryProvider>
      </EnvProvider>
    </MantineProvider>
  );
}
