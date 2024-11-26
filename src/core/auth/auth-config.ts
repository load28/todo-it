import { DynamoDBAdapter } from '@auth/dynamodb-adapter';
import { dbDocument } from '@todo-it/core/db/dynamoDB';
import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig = {
  providers: [
    GoogleProvider({
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
