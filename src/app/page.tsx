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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       
      </div>
    </div>
  );
}

