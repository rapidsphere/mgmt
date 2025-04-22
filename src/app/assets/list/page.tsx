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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Tag ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assetsList.map((asset, index) => (
            <TableRow key={index}>
              <TableCell>{asset.assetTagId}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.description}</TableCell>
              <TableCell>{asset.brand}</TableCell>
              <TableCell>{asset.purchaseDate}</TableCell>
              <TableCell>${asset.cost}</TableCell>
              <TableCell>{asset.status}</TableCell>
              <TableCell>
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

