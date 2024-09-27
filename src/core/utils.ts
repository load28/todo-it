// import * as Process from 'node:process';
//
// type TProcess = typeof Process;
// /**
//  * Creates an absolute routing URL by appending the given path to the app's base URL.
//  *
//  * @param {TProcess} processParam - The process object. This parameter needs to be injected
//  * differently depending on whether it's used in a client or server component.
//  * @param {string} path - The path to append. Must start with a forward slash (/).
//  * @throws {Error} If the path doesn't start with a forward slash.
//  * @returns {string} The complete absolute URL for routing.
//  *
//  * @example
//  * getAbsoluteRouteUrl('/users', process) // Returns: 'https://your-app-url.com/users'
//  */
// const getAbsoluteRouteUrl = (path: string, processParam: TProcess): string => {
//   if (!path.startsWith('/')) {
//     throw Error(`Invalid path: Must start with a forward slash (/). Received: ${path}`);
//   }
//
//   return `${getPublicAppUrl(processParam)}${path}`;
// };
//
// /**
//  * Utility function to ensure environment variables are returned as strings.
//  * This function only checks the type of the environment variable.
//  * It does not verify if the environment variable is properly loaded or exists.
//  */
// const getTypeSafeEnv = (key: string, processParam: TProcess): string => {
//   return processParam.env?.[key] as string;
// };
//
// /**
//  * Functions prefixed with "getPublic" represent environment variables
//  * that are safe to use on the client-side.
//  * These variables should not contain sensitive information as they may be exposed to the browser.
//  *
//  * @param {TProcess} processParam - The process object. This parameter is required because
//  * the behavior of `process` differs between client and server components.
//  *
//  * @returns {string} The environment variable.
//  **/
// const getAuthUrl = (processParam: TProcess): string => getTypeSafeEnv('AUTH_URL', processParam);
// const getAuthSecret = (processParam: TProcess) => getTypeSafeEnv('AUTH_SECRET', processParam);
// const getPublicAuthGoogleId = (processParam: TProcess) => getTypeSafeEnv('NEXT_PUBLIC_AUTH_GOOGLE_ID', processParam);
// const getAuthGoogleSecret = (processParam: TProcess) => getTypeSafeEnv('AUTH_GOOGLE_SECRET', processParam);
//
// const getPublicAppUrl = (processParam: TProcess) => getTypeSafeEnv('NEXT_PUBLIC_APP_URL', processParam);
// const getAPIUrl = (processParam: TProcess) => getTypeSafeEnv('API_URL', processParam);
//
// export { getAbsoluteRouteUrl, getAuthUrl, getAuthSecret, getPublicAuthGoogleId, getAuthGoogleSecret, getPublicAppUrl, getAPIUrl };
