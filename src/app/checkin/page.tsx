'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CheckInPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Check In</CardTitle>
          <CardDescription>Check in asset</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Check In page content</p>
        </CardContent>
      </Card>
    </div>
  );
}
