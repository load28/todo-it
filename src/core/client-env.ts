// 'use client';
//
// /**
//  * Utility function to ensure environment variables are returned as strings.
//  * This function only checks the type of the environment variable.
//  * It does not verify if the environment variable is properly loaded or exists.
//  */
// const getTypeSafeClientEnv = (envName: string): (() => string) => {
//   return () => {
//     return process.env[envName] as string;
//   };
// };
//
// /**
//  * Functions prefixed with "getPublic" represent environment variables
//  * that are safe to use on the client-side.
//  * These variables should not contain sensitive information as they may be exposed to the browser.
//  */
// const getPublicAuthGoogleId = getTypeSafeClientEnv('NEXT_PUBLIC_AUTH_GOOGLE_ID');
// const getPublicAppUrl = getTypeSafeClientEnv('NEXT_PUBLIC_APP_URL');
//
// export { getTypeSafeClientEnv, getPublicAppUrl, getPublicAuthGoogleId };
