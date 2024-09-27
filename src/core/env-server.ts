'use server';

const ENV = {
  NEXT_PUBLIC_APP_HOST: process.env.NEXT_PUBLIC_APP_HOST as string,
  API_URL: process.env.API_URL as string,
  AUTH_URL: process.env.AUTH_URL as string,
  AUTH_SECRET: process.env.AUTH_SECRET as string,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET as string,
  NEXT_PUBLIC_AUTH_GOOGLE_ID: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID as string,
} as const;

const getServerEnvValue = async (): Promise<typeof ENV> => ENV;

export { getServerEnvValue };
