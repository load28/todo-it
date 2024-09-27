'use client';

import { PropsWithChildren } from 'react';
import { EnvContext, TEnvContext } from './env-hook';

export default function EnvProvider({ value, children }: PropsWithChildren<{ value: TEnvContext }>) {
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}
