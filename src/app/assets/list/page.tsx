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
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, // Import DialogTrigger
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Asset {
  assetTagId: string;
  name: string;
  description: string;
  brand: string;
  purchaseDate: string;
  cost: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
  assetPhoto: string; // Add assetPhoto field
}


const assetFormSchema = z.object({
  assetTagId: z.string().min(2, {
    message: "Asset Tag ID must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Asset name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  purchaseDate: z.date().optional(),
  cost: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Cost must be a valid number.",
  }).transform((value) => Number(value)),
  status: z.enum(['Active', 'Inactive', 'Maintenance']),
  assetPhoto: z.string().optional(), // Add assetPhoto field
})

type AssetFormValues = z.infer<typeof assetFormSchema>

export default function AssetsListPage() {
  const [assetsList, setAssetsList] = useState<Asset[]>([]);
  const [open, setOpen] = useState(false);
  const [editAsset, setEditAsset] = useState<Asset | null>(null);

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      assetTagId: '',
      name: '',
      description: '',
      brand: '',
      purchaseDate: undefined,
      cost: '0',
      status: 'Active',
      assetPhoto: '', // Initialize assetPhoto
    },
  });


  useEffect(() => {
    // Load existing assets from local storage on component mount
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssetsList(JSON.parse(storedAssets));
    }
  }, []);

  const handleDelete = (assetTagId: string) => {
    const updatedAssetsList = assetsList.filter(asset => asset.assetTagId !== assetTagId);
    localStorage.setItem('assets', JSON.stringify(updatedAssetsList));
    setAssetsList(updatedAssetsList);
  };

  const handleEdit = (asset: Asset) => {
    setEditAsset(asset);
    form.setValue('assetTagId', asset.assetTagId);
    form.setValue('name', asset.name);
    form.setValue('description', asset.description);
    form.setValue('brand', asset.brand);
    form.setValue('purchaseDate', asset.purchaseDate ? new Date(asset.purchaseDate) : undefined);
    form.setValue('cost', String(asset.cost)); // Convert cost to string
    form.setValue('status', asset.status);
    form.setValue('assetPhoto', asset.assetPhoto); // Set assetPhoto
    setOpen(true);
  };

  const handleSubmitEdit = async (values: AssetFormValues) => {
    console.log('Edited values:', values);

    if (!editAsset) {
      console.error('No asset is selected for editing.');
      return;
    }
  
    try {
      const updatedAssets = assetsList.map(asset =>
        asset.assetTagId === editAsset.assetTagId ? { ...values } : asset
      );
  
      localStorage.setItem('assets', JSON.stringify(updatedAssets));
      setAssetsList(updatedAssets);
      setOpen(false);
      setEditAsset(null);
      alert('Asset updated successfully!');
    } catch (error) {
      console.error('Error updating asset:', error);
      alert('An unexpected error occurred while updating the asset. Please check the console for details.');
    }
  };

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
               <TableCell className="border border-black">{asset.cost}</TableCell>
              <TableCell className="border border-black">{asset.status}</TableCell>
              <TableCell className="border border-black">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(asset)}>
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
            <DialogTitle>Edit Asset</DialogTitle>
            <DialogDescription>
              Make changes to the asset details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="assetTagId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Tag ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset tag ID" className="border border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset name" className="border border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter asset description" className="border border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset brand" className="border border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Purchase Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'dd/MM/yyyy')
                              ) : (
                                <span>dd/MM/yyyy</span>
                              )}
                              {/* Calendar icon here if desired */}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" side="bottom">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={false}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset cost" type="number" className="border border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
                 <FormField
                  control={form.control}
                  name="assetPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Photo</FormLabel>
                      <FormControl>
                        <Input type="file" className="border border-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit">Update Asset</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
