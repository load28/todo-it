import { AuthProvider } from '@/app/@core/providers/Auth.context';
import { TzProvider } from '@/app/@core/providers/Timezone.context';
import { QueryProviders } from '@/app/query-provider';
import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';

const theme = createTheme({});

async function getTimezone(): Promise<string> {
  return 'Asia/Seoul';
  // const userId = '1';
  // const res = await fetch(`${process.env.API_URL}/timezone/get?userId=${userId}`);
  // return res.json();
}

export async function Providers({ children }: PropsWithChildren) {
  const tz = await getTimezone();

  return (
    <AuthProvider>
      <QueryProviders>
        <MantineProvider theme={ theme }>
          <TzProvider value={ { tz } }>{ children }</TzProvider>
        </MantineProvider>
      </QueryProviders>
    </AuthProvider>
  );
}
