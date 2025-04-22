'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Plus } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { useToast } from "@/hooks/use-toast"

interface Asset {
  assetTagId: string;
  name: string;
  description: string;
  brand: string;
  purchaseDate: string;
  cost: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
}

const assets: Asset[] = [
  {
    assetTagId: 'AST-001',
    name: 'Laptop',
    description: 'Dell XPS 15',
    brand: 'Dell',
    purchaseDate: '2023-01-15',
    cost: 1200,
    status: 'Active',
  },
  {
    assetTagId: 'AST-002',
    name: 'Monitor',
    description: 'Samsung 27" Curved',
    brand: 'Samsung',
    purchaseDate: '2023-03-20',
    cost: 350,
    status: 'Active',
  },
  {
    assetTagId: 'AST-003',
    name: 'Desk',
    description: 'Standing Desk Converter',
    brand: 'Vari',
    purchaseDate: '2022-11-10',
    cost: 450,
    status: 'Active',
  },
];

const assetFormSchema = z.object({
  name: z.string().min(2, {
    message: "Asset name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  purchaseDate: z.string().optional(),
  cost: z.number().int().min(0, {
    message: "Cost must be a positive number.",
  }),
  status: z.enum(['Active', 'Inactive', 'Maintenance']),
})

type AssetFormValues = z.infer<typeof assetFormSchema>

export default function AssetsListPage() {
  const [assetsList, setAssetsList] = useState(assets);
  const [open, setOpen] = useState(false);
  const { toast } = useToast()

  const handleDelete = (assetTagId: string) => {
    setAssetsList(assetsList.filter(asset => asset.assetTagId !== assetTagId));
  };

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      purchaseDate: "",
      cost: 0,
      status: 'Active',
    },
  })

  function onSubmit(values: AssetFormValues) {
    console.log(values);
    const newAsset: Asset = {
      assetTagId: `AST-${Math.floor(Math.random() * 1000)}`, // Generate a random ID
      name: values.name,
      description: values.description,
      brand: values.brand,
      purchaseDate: values.purchaseDate || '',
      cost: values.cost,
      status: values.status,
    };

    setAssetsList([...assetsList, newAsset]);
    setOpen(false);
    toast({
      title: "Asset added successfully!",
      description: "Your asset has been added to the list.",
    })
    form.reset(); // Clear the form
  }

  return (
    <div className="container mx-auto py-10">
      <Table className="border border-black">
        <TableHeader>
          <TableRow>
            <TableHead className="border border-black">Asset Tag ID</TableHead>
            <TableHead className="border border-black">Name</TableHead>
            <TableHead className="border border-black">Description</TableHead>
            <TableHead className="border border-black">Brand</TableHead>
            <TableHead className="border border-black">Purchase Date</TableHead>
            <TableHead className="border border-black">Cost</TableHead>
            <TableHead className="border border-black">Status</TableHead>
            <TableHead className="border border-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assetsList.map((asset, index) => (
            <TableRow key={index}>
              <TableCell className="border border-black">{asset.assetTagId}</TableCell>
              <TableCell className="border border-black">{asset.name}</TableCell>
              <TableCell className="border border-black">{asset.description}</TableCell>
              <TableCell className="border border-black">{asset.brand}</TableCell>
              <TableCell className="border border-black">{asset.purchaseDate}</TableCell>
              <TableCell className="border border-black">${asset.cost}</TableCell>
              <TableCell className="border border-black">{asset.status}</TableCell>
              <TableCell className="border border-black">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(asset.assetTagId)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">
            Add Asset <Plus className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Create a new asset by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Asset Name</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="Enter asset name" {...field} />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Description</FormLabel>
                      <FormControl className="col-span-3">
                        <Textarea placeholder="Enter asset description" {...field} />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Brand</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="Enter asset brand" {...field} />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Purchase Date</FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          placeholder="Enter purchase date"
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Cost</FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          placeholder="Enter asset cost"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Status</FormLabel>
                      <FormControl className="col-span-3">
                        <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option disabled value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
                <Button type="submit">Add Asset</Button>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}


