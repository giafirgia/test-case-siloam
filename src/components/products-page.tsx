'use client'

import getAllProducts from "@/app/data/fetchData";
import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const HomePage = () => {
  const { data: result, isLoading, isError } = useQuery({
      queryKey: ["/",],
      queryFn: () =>
        getAllProducts(),
      staleTime: 1000,
    });

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    location.reload()
  }, [])
  
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="w-11/12 sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-2">
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 right-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
            <Button className="w-full" size="lg" variant={'ghost'} onClick={handleLogout}>
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