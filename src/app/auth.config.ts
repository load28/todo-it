import { NextAuthConfig } from 'next-auth';
import Google from '@auth/core/providers/google';
import { getAuthGoogleSecret, getPublicAuthGoogleId } from '@/core/utils';

export const authConfig = {
  providers: [
    Google({
      clientId: getPublicAuthGoogleId(process),
      clientSecret: getAuthGoogleSecret(process),
    }),
  ],
  callbacks: {
    async signIn(res) {
      const googleResponse = await fetch('http://localhost:8080/auth/google', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: res.account?.id_token }),
      });

      if (googleResponse.status === 200) {
        return true;
      } else if (googleResponse.status === 404) {
        const baseUrl = process.env.APP_URL;
        return new URL('http://localhost:3000/signup', baseUrl).toString();
      } else {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: false,
} satisfies NextAuthConfig;
