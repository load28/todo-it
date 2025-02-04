'use server';

const ENV = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL as string,
  API_URL: process.env.API_URL as string,
  AUTH_URL: process.env.AUTH_URL as string,
  AUTH_SECRET: process.env.AUTH_SECRET as string,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET as string,
} as const;

/**
 * This function is intended to be used only in server components.
 * It returns environment variables, including sensitive server-side variables,
 * which should not be exposed to the client to avoid security risks.
 * Therefore, this function should never be used in client components.
 *
 * @returns An object containing both public and server-side environment variables.
 */
const getServerEnvValue = async (): Promise<typeof ENV> => ENV;

export { getServerEnvValue };
