'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CheckOutPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
           <div className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              <CardTitle>Check Out</CardTitle>
            </div>
          <CardDescription>
            Keep track of your assets within your organization and create an even more detailed history of them.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Button className="bg-green-500 text-white hover:bg-green-600">
            <PlusCircle className="mr-2 h-4 w-4" /> Select Assets
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

import { PlusCircle } from "lucide-react";
