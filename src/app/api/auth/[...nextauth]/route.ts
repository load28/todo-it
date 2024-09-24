import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// TODO 미들웨어를 통해 세션정보가 없을때, 로그인 페이지로 이동하는 로직을 구현해야함
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
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
        return '/signup';
      } else {
        return false;
      }
    },
    async redirect(res) {
      const { url, baseUrl } = res;
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: false,
});

export { handler as GET, handler as POST };
