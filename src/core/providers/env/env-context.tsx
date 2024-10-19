'use client';

import { createContext } from 'react';
import { getServerEnvValue } from '@todo-it/core/providers/env/env-server';

type Env = Awaited<ReturnType<typeof getServerEnvValue>>;
const EnvContext = createContext<Env | undefined>(undefined);

export type { Env };
export { EnvContext };
