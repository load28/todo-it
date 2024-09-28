'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { Env, EnvContext } from '@/app/@core/providers/env/EnvContext';

const CLIENT_ENV_PREFIX = 'NEXT_PUBLIC_';

type EnvKey = keyof Env;
type ClientEnvKey = Extract<EnvKey, `${typeof CLIENT_ENV_PREFIX}${string}`>;

const validateEnv = (keys: ClientEnvKey[]) => {
  const invalidKeys = keys.filter((key) => !key.startsWith(CLIENT_ENV_PREFIX));
  if (invalidKeys.length) {
    throw Error(`${invalidKeys.join(',')} is a server-side variable. Use 'NEXT_PUBLIC_' prefix for client-side access.`);
  }
};

/**
 * A hook to easily access public environment variables in client components.
 * It takes an array of environment variable keys, which are restricted to public variables only (prefixed with 'NEXT_PUBLIC_').
 * The type inference ensures that only public environment variable keys can be passed.
 *
 * @param keys - An array of keys for public environment variables to be accessed.
 * @returns An array of corresponding environment variable values.
 */
const useEnv = (keys: ClientEnvKey[]): string[] => {
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

export { useEnv };