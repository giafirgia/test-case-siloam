import { ProductDto } from "@/app/product.dto";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface EditProductProps {
    open: boolean;
    form: any;
    onclose?: () => void
    onconfirm?: () => void
}

export const EditProductModal = ({ open, form, onclose }: EditProductProps) => {
    return (
        <Dialog open={open} onOpenChange={onclose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update</DialogTitle>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#9FA0BC]">Name</FormLabel>
                                    <div className="w-full">
                                    <FormControl>
                                        <Input
                                        placeholder="Hospital Name"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </div>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alias"
                                render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel className="text-[#9FA0BC]">Alias</FormLabel>
                                    <div className="w-full">
                                    <FormControl>
                                        <Input
                                        placeholder="Hospital Name Alias"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </div>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel className="text-[#9FA0BC]">Address</FormLabel>
                                    <div className="w-full">
                                    <FormControl>
                                        <Input
                                        placeholder="Hospital Address"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </div>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel className="text-[#9FA0BC]">Address</FormLabel>
                                    <div className="w-full">
                                    <FormControl>
                                        <Input
                                        placeholder="Hospital Address"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </div>
                                </FormItem>
                                )}
                            />

                            <Button className="w-full mt-5">Update</Button>
                            <Button className="w-full mt-5" variant={"secondary"} onClick={onclose}>Cancel</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}