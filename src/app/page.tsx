'use client'

import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import getAllProducts from "./data/fetchData";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getAllProducts(),
    queryKey: ["data"],
  });

  if (isLoading) return <span>lalala</span>;
  if (isError) return <div>Sorry There was an Error</div>;
  
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="w-11/12 sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
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
        
        <div className="w-full flex flex-col items-center font-mono text-sm lg:flex p-2">
          <Button className="w-full mb-3" size="lg" variant={'default'}>
            Add
          </Button>
          <ProductsTable data={[]} />
        </div>
      </div>
    </div>
  );
}
