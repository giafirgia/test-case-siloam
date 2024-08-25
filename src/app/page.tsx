'use client'

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react'
import getAllProducts from './data/fetchData';
import { HomePage } from '@/components/products-page';
import { useRouter } from "next/navigation";

import UserData from "@/app/data/userData.json"

async function Home() {
  const router = useRouter()

  React.useEffect(() => {
    const userId = localStorage.getItem('userId')
    if(!userId) {router.push('/login');}

    const isValidUser = UserData.find((user) => user.id == Number(userId))
    
    if(!isValidUser) router.push('/login');
  }, [router])

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

export default Home;