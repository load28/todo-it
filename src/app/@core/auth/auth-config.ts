import { NextAuthConfig } from 'next-auth';
import Google from '@auth/core/providers/google';
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDBAdapter } from '@auth/dynamodb-adapter';

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID as string,
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET as string,
  },
  region: process.env.AUTH_DYNAMODB_REGION,
  endpoint: process.env.AUTH_DYNAMODB_END_POINT,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

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
  adapter: DynamoDBAdapter(client),
  debug: false,
} satisfies NextAuthConfig;
