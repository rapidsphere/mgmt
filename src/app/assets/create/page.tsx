
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssetsCreatePage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Asset</CardTitle>
          <CardDescription>Input and store new asset information.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for the add asset form */}
          <p>Asset creation form will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
