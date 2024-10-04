'use client';

import { PropsWithChildren } from 'react';
import { Env, EnvContext } from './env-context';

export function EnvProvider({ value, children }: PropsWithChildren<{ value: Env }>) {
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}
