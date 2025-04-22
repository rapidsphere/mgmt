
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Asset Calendar Dashboard</CardTitle>
            <CardDescription className="text-sm">View asset maintenance and renewal dates.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 grid gap-2 text-sm">
            <Calendar />
          </CardContent>
        </Card>

        <div className="md:w-1/2">
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-md">Number of Assets</CardTitle>
              <CardDescription className="text-sm">Total number of assets managed.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2 p-3">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <p className="text-xl font-bold">150</p>
            </CardContent>
          </Card>
        </div>


        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-md">Value of Assets</CardTitle>
            <CardDescription className="text-sm">Total value of all assets.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2 p-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <p className="text-xl font-bold">$500,000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


