import { Metadata } from 'next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Assets List',
  description: 'List of Assets',
};

interface Asset {
  name: string;
  type: string;
  purchaseDate: string;
  warrantyInfo: string;
  maintenanceSchedule: string;
  notes: string;
}

const assets: Asset[] = [
  {
    name: 'Laptop',
    type: 'Electronics',
    purchaseDate: '2023-01-15',
    warrantyInfo: '2 years',
    maintenanceSchedule: 'Annually',
    notes: 'Used for development',
  },
  {
    name: 'Monitor',
    type: 'Electronics',
    purchaseDate: '2023-03-20',
    warrantyInfo: '1 year',
    maintenanceSchedule: 'None',
    notes: 'Secondary display',
  },
  {
    name: 'Desk',
    type: 'Furniture',
    purchaseDate: '2022-11-10',
    warrantyInfo: '5 years',
    maintenanceSchedule: 'None',
    notes: 'Main workstation',
  },
];

export default function AssetsListPage() {
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Warranty Info</TableHead>
            <TableHead>Maintenance Schedule</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset, index) => (
            <TableRow key={index}>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>{asset.purchaseDate}</TableCell>
              <TableCell>{asset.warrantyInfo}</TableCell>
              <TableCell>{asset.maintenanceSchedule}</TableCell>
              <TableCell>{asset.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}