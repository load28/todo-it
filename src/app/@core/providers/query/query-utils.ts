import { QueryClient } from '@tanstack/react-query';
import { defaultShouldDehydrateQuery, isServer } from '@tanstack/query-core';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { dehydrate: { shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending' } },
  });
}

let browseQueryClient: QueryClient | undefined = undefined;

export function queryUtils() {
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
