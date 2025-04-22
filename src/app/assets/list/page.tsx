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
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';

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

export default function AssetsListPage() {
  const [assetsList, setAssetsList] = useState(assets);

  const handleDelete = (assetTagId: string) => {
    setAssetsList(assetsList.filter(asset => asset.assetTagId !== assetTagId));
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
    </div>
  );
}
