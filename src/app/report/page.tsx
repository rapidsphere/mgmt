'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ReportPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Report</CardTitle>
          <CardDescription>Generate reports</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Report page content</p>
        </CardContent>
      </Card>
    </div>
  );
}
