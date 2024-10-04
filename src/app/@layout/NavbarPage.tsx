import {Navbar} from '@/app/@layout/Navbar';
import {sessionQueryOptions} from '@/app/@core/query/session-query';
import {queryUtils} from '@/app/@core/providers/query/query-utils';
import {dehydrate} from '@tanstack/query-core';
import {HydrationBoundary} from '@tanstack/react-query';

/**
 * 기본적인 데이터는 서버 컴포넌트에서 만들어서 내려주는 방향으로 작업해야함
 * 클라이언트 컴포넌트에서는 준비된 데이터를 통해서 렌더링을 하는 작업만 진행함
 * 서버 컴포넌트는 Page 를 붙인다
 */
export default async function NavbarPage() {
  const queryClient = queryUtils();
  await queryClient.prefetchQuery(sessionQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
    </HydrationBoundary>
  );
}
