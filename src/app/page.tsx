'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, DollarSign } from "lucide-react";
import { format } from "date-fns";
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

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
    { name: 'Available', value: 0 },
    { name: 'Maintenance', value: 0 },
    { name: 'Out of Service', value: 0 },
  ];

  if (assetsList) {
    assetsList.forEach((asset) => {
      if (asset.status === 'Active') {
        data[0].value++;
      } else if (asset.status === 'Maintenance') {
        data[1].value++;
      } else {
        data[2].value++;
      }
    });
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
        <Card className="h-48">
          <CardHeader className="flex flex-col space-y-1.5 p-3">
            <CardTitle className="text-lg">Number of Assets</CardTitle>
            <CardDescription className="text-sm">Total number of assets managed.</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-2xl font-bold">{totalAssets}</div>
          </CardContent>
        </Card>
        <Card className="h-48">
          <CardHeader className="flex flex-col space-y-1.5 p-3">
            <CardTitle className="text-lg">Value of Assets</CardTitle>
            <CardDescription className="text-sm">Total value of all assets.</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-2xl font-bold">$500,000</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Asset Calendar Dashboard</CardTitle>
            <CardDescription className="text-sm">View asset maintenance and renewal dates. {formattedToday}</CardDescription>
          </CardHeader>
          <CardContent className="p-3 grid gap-2 text-sm">
            {isClient ? <Calendar /> : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assets to be returned (overdue)</CardTitle>
            <CardDescription>Details of assets that are overdue.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Asset Type: Laptop</p>
            <p>Emp ID: 12345</p>
            <p>Emp Name: John Doe</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assets under repair</CardTitle>
            <CardDescription>Details of assets that are under repair.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Repair Issue: Screen damage</p>
            <p>Likely Resolution Date: 2025-05-01</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
