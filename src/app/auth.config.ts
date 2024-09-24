import { NextAuthConfig } from 'next-auth';
import Google from '@auth/core/providers/google';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // 로그인 페이지에서 별도로 처리해야함
    // async signIn(res) {
    //   const googleResponse = await fetch('http://localhost:8080/auth/google', {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ token: res.account?.id_token }),
    //   });
    //
    //   if (googleResponse.status === 200) {
    //     return true;
    //   } else if (googleResponse.status === 404) {
    //     const baseUrl = process.env.APP_URL;
    //     return new URL('/signup', baseUrl).toString();
    //   } else {
    //     return false;
    //   }
    // },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: false,
} satisfies NextAuthConfig;
