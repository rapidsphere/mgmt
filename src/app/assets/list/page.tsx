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
  cost: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Cost must be a valid number.",
  }).transform((value) => Number(value)),
  status: z.enum(['Active', 'Inactive', 'Maintenance']),
})

type AssetFormValues = z.infer<typeof assetFormSchema>

export default function AssetsListPage() {
  const [assetsList, setAssetsList] = useState(assets);

  const handleDelete = (assetTagId: string) => {
    setAssetsList(assetsList.filter(asset => asset.assetTagId !== assetTagId));
  };


  const handleEdit = (asset: Asset) => {
    // setEditAsset(asset);
    // form.setValue('name', asset.name);
    // form.setValue('description', asset.description);
    // form.setValue('brand', asset.brand);
    // form.setValue('purchaseDate', asset.purchaseDate);
    // form.setValue('cost', String(asset.cost)); // Convert cost to string
    // form.setValue('status', asset.status);
    // setOpen(true);
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
    </div>
  );
}
