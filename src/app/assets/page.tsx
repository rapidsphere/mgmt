
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssetsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Asset List View</CardTitle>
          <CardDescription>View, sort, and filter all assets.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for the asset list view */}
          <p>Asset list will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
