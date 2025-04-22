'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, DollarSign, ShoppingCart } from "lucide-react";
import { format } from "date-fns";
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";

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

  const data = [
    { name: 'Available', value: 400 },
    { name: 'Maintenance', value: 300 },
    { name: 'Out of Service', value: 300 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="w-full md:w-1/2 lg:w-1/4">
          <Card className="h-32">
            <CardHeader className="flex flex-col space-y-1.5 p-4">
              <CardTitle className="text-lg">Number of Assets</CardTitle>
              <CardDescription className="text-sm">Total number of assets managed.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2 p-3">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <p className="text-xl font-bold">150</p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4">
          <Card className="h-32">
            <CardHeader className="flex flex-col space-y-1.5 p-4">
              <CardTitle className="text-lg">Value of Assets</CardTitle>
              <CardDescription className="text-sm">Total value of all assets.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2 p-3">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-xl font-bold">$500,000</p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4">
          <Card className="h-32">
            <CardHeader className="flex flex-col space-y-1.5 p-4">
              <CardTitle className="text-lg">Purchase this fiscal year</CardTitle>
              <CardDescription className="text-sm">Total assets purchased in {formattedToday}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2 p-3">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <p className="text-xl font-bold">20</p>
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
            <Calendar />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Asset Availability</CardTitle>
            <CardDescription className="text-sm">Current status of assets.</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <ResponsiveContainerComponent width="100%" height={200}>
              <PieChartComponent>
                <PieComponent
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={() => null}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <CellComponent key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </PieComponent>
              </PieChartComponent>
            </ResponsiveContainerComponent>
            <div className="flex justify-center mt-2">
              {data.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center mr-4">
                  <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


