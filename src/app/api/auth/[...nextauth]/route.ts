import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseAdapterConfig, FirestoreAdapter } from '@next-auth/firebase-adapter';
import { firestore } from '@/firebase';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: FirestoreAdapter(firestore as FirebaseAdapterConfig),
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        // session.user['id'] = user.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
