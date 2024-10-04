import { QueryClient } from '@tanstack/react-query';
import { defaultShouldDehydrateQuery, isServer } from '@tanstack/query-core';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60 * 60, gcTime: 1000 * 60 * 5 },
      dehydrate: { shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending' },
    },
  });
}

let browseQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browseQueryClient) {
      return (browseQueryClient = makeQueryClient());
    } else {
      return browseQueryClient;
    }
  }
}
