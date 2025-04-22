
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Asset Calendar Dashboard</CardTitle>
            <CardDescription>View asset maintenance and renewal dates.</CardDescription>
          </CardHeader>
          <CardContent className="p-2 grid gap-2 text-sm">
            <Calendar />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Number of Assets</CardTitle>
            <CardDescription className="text-sm">Total number of assets managed.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2 p-4">
            <Wrench className="h-5 w-5 text-muted-foreground" />
            <p className="text-2xl font-bold">150</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


    
