import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react'
import getAllProducts from './data/fetchData';
import HomePage from '@/components/products-page';


async function DonorPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["/"],
    queryFn: () =>
      getAllProducts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}

export default DonorPage;