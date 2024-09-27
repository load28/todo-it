'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getServerEnvValue } from '@/core/env-server';

const CLIENT_ENV_PREFIX = 'NEXT_PUBLIC_';

type Env = Awaited<ReturnType<typeof getServerEnvValue>>;
type EnvKey = keyof Env;
type ClientEnvKey = Extract<EnvKey, `${typeof CLIENT_ENV_PREFIX}${string}`>;

const validateEnv = (keys: ClientEnvKey[]) => {
  const invalidKeys = keys.filter((key) => !key.startsWith(CLIENT_ENV_PREFIX));
  if (invalidKeys.length) {
    throw Error(`${invalidKeys.join(',')} is a server-side variable. Use 'NEXT_PUBLIC_' prefix for client-side access.`);
  }
};

export type TEnvContext = Awaited<ReturnType<typeof getServerEnvValue>>;
export const EnvContext = createContext<TEnvContext | undefined>(undefined);

export const useEnv = (keys: ClientEnvKey[]): string[] => {
  validateEnv(keys);

  const keysRef = useRef(keys);
  const env = useContext(EnvContext);
  const [selectedEnv, setSelectedEnv] = useState<string[]>(() => keys.map((key) => env?.[key] || ''));

  useEffect(() => {
    if (env) {
      const data = keysRef.current.map((key) => env[key]);
      setSelectedEnv(data);
    }
  }, [env]);

  return selectedEnv;
};
