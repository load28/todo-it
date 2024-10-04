import { Navbar } from '@/app/@layout/Navbar';
import { SessionQueryPrefetchBoundary } from '@/app/@core/query/sessionQuery';

export default async function NavbarPage() {
  return (
    <SessionQueryPrefetchBoundary>
      <Navbar />
    </SessionQueryPrefetchBoundary>
  );
}
