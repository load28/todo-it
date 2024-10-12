import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/core/providers/query/QueryProvider';
import { getServerEnvValue } from '@/core/providers/env/env-server';
import { EnvProvider } from '@/core/providers/env/EnvProvider';

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
