'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PropsWithChildren } from 'react';

const apolloClient = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

export function ApolloClientProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
