'use client'

import getAllProducts from "@/app/data/fetchData";
import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
    const { data: result, isLoading, isError } = useQuery({
        queryKey: ["/",],
        queryFn: () =>
          getAllProducts(),
        staleTime: 1000,
      });
  
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="w-11/12 sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-2">
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Refresh
          </div>
          <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
            <Button className="w-full" size="lg" variant={'ghost'}>
              Logout
            </Button>
          </div>
        </div>
        
        <div className="w-full flex flex-col items-center font-mono text-sm lg:flex ">
          <ProductsTable data={result?.data || []} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}