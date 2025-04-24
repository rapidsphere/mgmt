'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, DollarSign } from "lucide-react";
import { format } from "date-fns";
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card className="h-40">
            <CardHeader className="flex flex-col space-y-1.5 p-3">
              <CardTitle className="text-lg">Number of Assets</CardTitle>
              <CardDescription className="text-sm">Total number of assets managed.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2 p-3">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <p className="text-xl font-bold">{assetsList ? assetsList.length : 0}</p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card className="h-40">
            <CardHeader className="flex flex-col space-y-1.5 p-3">
              <CardTitle className="text-lg">Value of Assets</CardTitle>
              <CardDescription className="text-sm">Total value of all assets.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2 p-3">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-xl font-bold">$500,000</p>
            </CardContent>
          </Card>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Asset Calendar Dashboard</CardTitle>
            <CardDescription className="text-sm">View asset maintenance and renewal dates. {formattedToday}</CardDescription>
          </CardHeader>
          <CardContent className="p-3 grid gap-2 text-sm">
            {isClient ? <Calendar /> : null}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
