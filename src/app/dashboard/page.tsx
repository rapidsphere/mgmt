
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Asset Calendar Dashboard</CardTitle>
          <CardDescription>Dashboard Content.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Calendar goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
