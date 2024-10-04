'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryUtils } from '@/app/@core/providers/query/query-utils';

export function QueryProvider({ children }: PropsWithChildren<{}>) {
  const queryClient = queryUtils();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
