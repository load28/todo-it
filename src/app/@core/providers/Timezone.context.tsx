'use client';

import { createOptionalContext } from '@mantine/core';

interface TzProviderValue {
  tz: string | undefined;
}

export const [TzProvider, useTzContext] = createOptionalContext<TzProviderValue>();
