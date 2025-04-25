'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Wrench} from 'lucide-react';
import {format} from 'date-fns';
import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';

const PieChartComponent = dynamic(() => import('recharts').then(mod => mod.PieChart), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

const PieComponent = dynamic(() => import('recharts').then(mod => mod.Pie), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

const CellComponent = dynamic(() => import('recharts').then(mod => mod.Cell), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

const ResponsiveContainerComponent = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

export default function Home() {
  const today = new Date();
  const formattedToday = format(today, 'yyyy');

  const [assetsList, setAssetsList] = useState<any[]>([]);

  useEffect(() => {
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssetsList(JSON.parse(storedAssets));
    }
  }, []);

  const totalAssets = assetsList ? assetsList.length : 0;

  const data = [
    {name: 'Available', value: 0},
    {name: 'Maintenance', value: 0},
    {name: 'Out of Service', value: 0},
  ];

  if (assetsList) {
    assetsList.forEach(asset => {
      if (asset.status === 'Active') {
        data[0].value++;
      } else if (asset.status === 'Under Repair') {
        data[1].value++;
      } else if (asset.status === 'Retired' || asset.status === 'Sold Out' || asset.status === 'Scrapped') {
        data[2].value++;
      }
    });
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const overdueAssets = [
    {assetType: 'Laptop', empId: '12345', empName: 'John Doe'},
    {assetType: 'Monitor', empId: '67890', empName: 'Jane Smith'},
  ];

  const underRepairAssets = [
    {repairIssue: 'Screen damage', likelyResolutionDate: '2025-05-01'},
    {repairIssue: 'Keyboard malfunction', likelyResolutionDate: '2025-04-25'},
  ];

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <Card className="h-48">
            <CardHeader className="flex flex-col space-y-1.5 p-4">
              <CardTitle>Assets to be returned (overdue)</CardTitle>
              <CardDescription>Details of assets that are overdue.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 border border-border rounded-md">
              <ul>
                {overdueAssets.map((asset, index) => (
                  <li key={index}>
                    Asset Type: {asset.assetType}
                    <br />
                    Emp ID: {asset.empId}
                    <br />
                    Emp Name: {asset.empName}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="w-1/2">
          <Card className="h-48">
            <CardHeader className="flex flex-col space-y-1.5 p-4">
              <CardTitle>Assets under repair</CardTitle>
              <CardDescription>Details of assets that are under repair.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 border border-border rounded-md">
              <ul>
                {underRepairAssets.map((asset, index) => (
                  <li key={index}>
                    Repair Issue: {asset.repairIssue}
                    <br />
                    Likely Resolution Date: {asset.likelyResolutionDate}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
