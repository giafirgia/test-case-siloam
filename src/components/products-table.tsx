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

interface ProductsProps {
    data: ProductDto[],
    loading?: boolean
}

export const ProductsTable = ({ data, loading = false }: ProductsProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Hospital (Alias)</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <Collapsible key={1} asChild>
                    <>
                        <TableRow>
                            <TableCell>
                                <CollapsibleTrigger asChild>
                                    <IconChevron icon="right" />
                                </CollapsibleTrigger>
                            </TableCell>
                            <TableCell>{'BIMC Kuta (BIMC Kuta)'}</TableCell>
                            <TableCell>{'Bali & Nusa Tenggara'}</TableCell>
                            <TableCell>{'Jl. Bypass Ngurah Rai No.100X, Kuta, Kec. Kuta, Kabupaten Badung, Bali 80361'}</TableCell>
                            <TableCell>{'O'}</TableCell>
                        </TableRow>
                        <CollapsibleContent asChild className="bg-slate-100">
                            <TableRow key={'visitor.id'}>
                                <TableCell colSpan={5}>{'visitor.name'}</TableCell>
                            </TableRow>
                        </CollapsibleContent>
                    </>
                </Collapsible>
            </TableBody>
        </Table>
    )
}
