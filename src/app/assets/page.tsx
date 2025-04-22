'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const assetSchema = z.object({
  name: z.string().min(2, {
    message: 'Asset name must be at least 2 characters.',
  }),
  type: z.string().min(2, {
    message: 'Asset type must be at least 2 characters.',
  }),
  purchaseDate: z.string().optional(),
  warrantyInfo: z.string().optional(),
  maintenanceSchedule: z.string().optional(),
  notes: z.string().optional(),
});

type AssetValues = z.infer<typeof assetSchema>;

export default function AssetsPage() {
  const form = useForm<AssetValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: '',
      type: '',
      purchaseDate: '',
      warrantyInfo: '',
      maintenanceSchedule: '',
      notes: '',
    },
  });

  function onSubmit(values: AssetValues) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Asset Details Form</CardTitle>
          <CardDescription>
            Enter the details of the asset you want to manage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the asset.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset type" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the type of asset.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter purchase date" {...field} />
                    </FormControl>
                    <FormDescription>
                      The date when the asset was purchased.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warrantyInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty Information</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter warranty information" {...field} />
                    </FormControl>
                    <FormDescription>
                      Details about the asset's warranty.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maintenanceSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maintenance Schedule</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter maintenance schedule"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The schedule for the asset's maintenance.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional notes"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Any additional notes about the asset.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
