'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {useState} from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

const assetSchema = z.object({
  name: z.string().min(2, {
    message: 'Asset name must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
  assetTagId: z.string().min(2, {
    message: 'Asset Tag ID must be at least 2 characters.',
  }),
  purchasedFrom: z.string().optional(),
  purchaseDate: z.date().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNo: z.string().optional(),
  cost: z.string().optional(),
  status: z.enum(['Active', 'Inactive', 'Maintenance']).optional(),
});

type AssetValues = z.infer<typeof assetSchema>;

interface AssetsFormComponentProps {
  onSubmit: (values: AssetValues) => void;
}

export default function AssetsFormComponent({onSubmit}: AssetsFormComponentProps) {
  const form = useForm<AssetValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: '',
      description: '',
      assetTagId: '',
      purchasedFrom: '',
      purchaseDate: undefined,
      brand: '',
      model: '',
      serialNo: '',
      cost: '',
      status: 'Active',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter asset name" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter asset description" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assetTagId"
          render={({field}) => (
            <FormItem>
              <FormLabel>Asset Tag ID *</FormLabel>
              <FormControl>
                <Input placeholder="Enter asset tag ID" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchasedFrom"
          render={({field}) => (
            <FormItem>
              <FormLabel>Purchased From</FormLabel>
              <FormControl>
                <Input placeholder="Enter vendor" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchaseDate"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Purchase Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'dd/MM/yyyy')
                      ) : (
                        <span>dd/MM/yyyy</span>
                      )}
                      {/* Calendar icon here if desired */}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" side="bottom">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={false}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({field}) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="Enter asset brand" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({field}) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="Enter asset model" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serialNo"
          render={({field}) => (
            <FormItem>
              <FormLabel>Serial No</FormLabel>
              <FormControl>
                <Input placeholder="Enter asset serial number" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost"
          render={({field}) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input placeholder="Enter asset cost" className="border border-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select>
                 <SelectTrigger className="w-[180px] border border-black">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectGroup>
                </SelectContent>
               </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
