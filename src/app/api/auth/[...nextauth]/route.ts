import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface Account {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  expires_at: number;
  scope: string;
  token_type: string;
  id_token: string;
}

interface Profile {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
}

interface GoogleAuthResponse {
  user: User;
  account: Account;
  profile: Profile;
}

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
      } else if (googleResponse.status === 401) {
        return 'http://localhost:3000/signup';
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
