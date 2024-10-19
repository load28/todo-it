import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { getServerEnvValue } from '@todo-it/core/providers/env/env-server';
import { EnvProvider } from '@todo-it/core/providers/env/EnvProvider';
import { QueryProvider } from '@todo-it/core/providers/query/QueryProvider';

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
