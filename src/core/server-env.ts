// 'use server';
//
// import {getPublicAppUrl} from '@/core/client-env';
//
// /**
//  * Creates an absolute routing URL by appending the given path to the app's base URL.
//  *
//  * @param {string} path - The path to append. Must start with a forward slash (/).
//  * @throws {Error} If the path doesn't start with a forward slash.
//  * @returns {string} The complete absolute URL for routing.
//  *
//  * @example
//  * getAbsoluteRouteUrl('/users') // Returns: 'https://your-app-url.com/users'
//  */
// const getAbsoluteRouteUrl = async (path: string): Promise<string> => {
//   if (!path.startsWith('/')) {
//     throw Error(`Invalid path: Must start with a forward slash (/). Received: ${path}`);
//   }
//
//   return `${getPublicAppUrl()}${path}`;
// };
//
// /**
//  * Utility function to ensure environment variables are returned as strings.
//  * This function only checks the type of the environment variable.
//  * It does not verify if the environment variable is properly loaded or exists.
//  */
// const getTypeSafeServerEnv = (envName: string): (() => Promise<string>) => {
//   return async () => {
//     return process.env[envName] as string;
//   };
// };
//
// /**
//  * Functions prefixed with "getPublic" represent environment variables
//  * that are safe to use on the client-side.
//  * These variables should not contain sensitive information as they may be exposed to the browser.
//  */
// const getAuthUrl = getTypeSafeServerEnv('AUTH_URL');
// const getAuthSecret = getTypeSafeServerEnv('AUTH_SECRET');
// const getAuthGoogleSecret = getTypeSafeServerEnv('AUTH_GOOGLE_SECRET');
//
// const getAPIUrl = getTypeSafeServerEnv('API_URL');
//
// export { getAbsoluteRouteUrl, getAuthUrl, getAuthSecret, getAuthGoogleSecret, getAPIUrl };
