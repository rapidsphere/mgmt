
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Asset Calendar Dashboard</CardTitle>
          <CardDescription>View asset maintenance and renewal dates.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 grid gap-2 text-sm">
          <Calendar />
        </CardContent>
      </Card>
    </div>
  );
}

