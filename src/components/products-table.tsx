'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { IconChevron } from "./icons/chevron"
import { ProductDto } from "@/app/product.dto"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import React from "react"
import { IconPenToSquare } from "./icons/pen-to-square"

interface ProductsProps {
    data: ProductDto[],
    loading?: boolean
}

export const ProductsTable = ({ data, loading = false }: ProductsProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState(-1)

    const handleSelectIndex = React.useCallback((idx: number) => {
        if(idx === selectedIndex) setSelectedIndex(-1)
        else setSelectedIndex(idx)
    }, [selectedIndex])

    return (
        <div className="relative overflow-auto">
            <ScrollArea className="h-80 w-full border rounded-[8px]">
                <Table >
                    <TableHeader className="sticky top-0">
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Hospital (Alias)</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.length == 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No Data</TableCell>
                                </TableRow>
                            )
                            :
                            (
                                data?.map((item, index) => (
                                    <Collapsible key={index} asChild open={selectedIndex == index}>
                                        <>
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <CollapsibleTrigger onClick={() => handleSelectIndex(index)}>
                                                        <IconChevron icon={selectedIndex == index ? "bottom" :"right"} />
                                                    </CollapsibleTrigger>
                                                </TableCell>
                                                <TableCell>{item?.area_name} ({item?.alias})</TableCell>
                                                <TableCell>{item?.area_name}</TableCell>
                                                <TableCell>{item?.address}</TableCell>
                                                <TableCell className="text-center">
                                                    <IconPenToSquare color="orange" button />
                                                </TableCell>
                                            </TableRow>
                                            <CollapsibleContent asChild className="bg-slate-100">
                                                <TableRow key={index}>
                                                    <TableCell colSpan={5}>
                                                        <div className="flex">
                                                            <div className="mr-3">
                                                                <img src="/assets/no-image.jpg" width={'100px'}  />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span>Phone: {item?.phone_number_1 || '-'}</span>
                                                                <span>
                                                                    Pinpoin: {item?.latitude && item?.longitude ? (<button onClick={() => window.open(`https://maps.google.com/?q=${item?.latitude},${item?.longitude}`, '_blank')}>Open Location</button>) : 'No Pinpoint Available'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </CollapsibleContent>
                                        </>
                                    </Collapsible>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}
