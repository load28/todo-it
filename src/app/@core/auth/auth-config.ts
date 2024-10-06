import { NextAuthConfig } from 'next-auth';
import Google from '@auth/core/providers/google';
import { DynamoDBAdapter } from '@auth/dynamodb-adapter';
import { dbDocument } from '@/app/@core/db/dynamoDB';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  adapter: DynamoDBAdapter(dbDocument),
  debug: false,
} satisfies NextAuthConfig;
