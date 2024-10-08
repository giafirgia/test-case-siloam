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
import React from "react"
import { IconPenToSquare } from "./icons/pen-to-square"
import { EditProductModal } from "./modals/edit-product-modal"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image"
import { ScrollArea } from "./ui/scroll-area"

interface ProductsProps {
    data: ProductDto[],
    loading?: boolean
}

const saveSchema = z
    .object({
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name is required",
        })
        .min(1, { message: "Name is required" }),
      alias: z
        .string({
          required_error: "Alias is required",
          invalid_type_error: "Alias is required",
        })
        .min(1, { message: "Alias is required" }),
      phone_number_1: z
        .string()
        .refine((value) => {
          return typeof value !== "object" && !isNaN(Number(value));
        }, "Phone number must contain only numbers."),
      area_name: z
        .string()
        .nonempty({ message: "Area name is required." }),
      address: z
        .string(),
    })

export const ProductsTable = ({ data, loading = false }: ProductsProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    const [editData, setEditData] = React.useState<ProductDto>()
    const [isAdmin, setIsAdmin] = React.useState(false)
    const [isShowModal, setIsShowModal] = React.useState(false)
    
    const handleSelectIndex = React.useCallback((idx: number) => {
        if(idx === selectedIndex) setSelectedIndex(-1)
        else setSelectedIndex(idx)
    }, [selectedIndex])

    React.useEffect(() => {
        const role = localStorage.getItem('role')
        if(role && role == 'admin') setIsAdmin(true)
    }, [])

    const form = useForm({
        resolver: zodResolver(saveSchema),
        values: {
            id: editData?.id,
            hospital_id: editData?.hospital_id,
            name: editData?.name,
            alias: editData?.alias,
            address: editData?.address,
            phone_number_1: editData?.phone_number_1,
            longitude: editData?.longitude,
            latitude: editData?.latitude,
        }
    })

    const handleEditPress = React.useCallback((item: ProductDto) => {
        setEditData(item)
        setIsShowModal(true)
    }, [])

    const handleEditClosePress = React.useCallback(() => {
        setEditData(undefined)
        setIsShowModal(false)
    }, [])

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
                            {
                                isAdmin && (
                                    <TableHead>Action</TableHead>
                                )
                            }
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
                                                {
                                                    isAdmin && (
                                                        <TableCell className="text-center">
                                                            <IconPenToSquare color="orange" button onclick={() => handleEditPress(item)} />
                                                        </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                            <CollapsibleContent asChild className="bg-slate-100">
                                                <TableRow key={index}>
                                                    <TableCell colSpan={5}>
                                                        <div className="flex">
                                                            <div className="mr-3">
                                                                {
                                                                    item?.image_url ? 
                                                                    (
                                                                        <Image
                                                                            src={item?.image_url}
                                                                            alt={item?.name}
                                                                            width={100}
                                                                            height={100}
                                                                        />
                                                                    )
                                                                    :
                                                                    (
                                                                        <img src="/assets/no-image.jpg" width={'100px'}  />
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span>Phone: {item?.phone_number_1 || '-'}</span>
                                                                <span>
                                                                    Pinpoin: {item?.latitude && item?.longitude ? (<button onClick={() => window.open(`https://maps.google.com/?q=${item?.latitude},${item?.longitude}`, '_blank')}>Open Location</button>) : 'No Pinpoint Available'}
                                                                </span>
                                                                <span>
                                                                    Hospital SEO Key: {item?.hospital_seo_key}
                                                                </span>
                                                                <span>
                                                                    Registration Url: {item?.url_registration ? (<button onClick={() => window.open(`${item?.url_registration}`, '_blank')}>Open Registration Url</button>) : '-'}
                                                                </span>
                                                                <span>
                                                                    Pharmacy Url: {item?.url_pharmacy ? (<button onClick={() => window.open(`${item?.url_pharmacy}`, '_blank')}>Open Registration Url</button>) : '-'}
                                                                </span>
                                                                <span>
                                                                    Tele MySiloam: {item?.is_tele_mysiloam ? (<span className="text-indigo font-bold">Yes</span>) : (<span className="text-indigo font-bold">No</span>)}
                                                                </span>
                                                                <span>
                                                                    Tele AIDO: {item?.is_tele_aido ? (<span className="text-indigo font-bold">Yes</span>) : (<span className="text-indigo font-bold">No</span>)}
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
            <EditProductModal open={isShowModal} form={form} onconfirm={handleEditClosePress} onclose={handleEditClosePress} />
        </div>
    )
}
