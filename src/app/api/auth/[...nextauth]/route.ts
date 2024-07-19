import { firestore } from '@/app/@core/config/firebase';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [ GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string
  }) ],
  adapter: FirestoreAdapter(firestore),
  debug: false
});

export { handler as GET, handler as POST };
