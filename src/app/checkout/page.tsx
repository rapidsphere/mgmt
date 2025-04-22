'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CheckOutPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Check Out</CardTitle>
          <CardDescription>Check out asset</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Check Out page content</p>
        </CardContent>
      </Card>
    </div>
  );
}
