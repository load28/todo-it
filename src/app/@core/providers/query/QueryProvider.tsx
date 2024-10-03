'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { getQueryClient } from '@/app/@core/providers/query/getQueryClient';

export function QueryProvider({ children }: PropsWithChildren<{}>) {
  const queryClient = getQueryClient();
  
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
