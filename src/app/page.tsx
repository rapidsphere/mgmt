
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
          <CardHeader>
            <CardTitle>Number of Assets</CardTitle>
            <CardDescription>Total number of assets managed.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">150</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
