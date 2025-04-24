'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {CheckCircle, Search} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Checkbox} from '@/components/ui/checkbox';
import {useState, useEffect} from 'react';
import {cn} from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface Asset {
  assetTagId: string;
  name: string;
  description: string;
  status: string; // Adjust the type as necessary
}

const checkOutFormSchema = z.object({
  checkOutDate: z.date().optional(),
  checkOutPerson: z.string().min(2, {
    message: "Check-out person must be at least 2 characters.",
  }),
})

type CheckOutFormValues = z.infer<typeof checkOutFormSchema>

export default function CheckOutPage() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]); // Replace 'any' with your asset type
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
    const [checkOutOpen, setCheckOutOpen] = useState(false); // State for the check-out dialog
     const [checkOutDetails, setCheckOutDetails] = useState<CheckOutFormValues | null>(null);


  const form = useForm<CheckOutFormValues>({
    resolver: zodResolver(checkOutFormSchema),
    defaultValues: {
      checkOutDate: undefined,
      checkOutPerson: '',
    },
  });

  useEffect(() => {
    // Load existing assets from local storage on component mount
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets));
    }
  }, []);

  const handleCheckboxChange = (assetTagId: string) => {
    setSelectedAssets(prev => {
      if (prev.includes(assetTagId)) {
        return prev.filter(id => id !== assetTagId);
      } else {
        return [...prev, assetTagId];
      }
    });
  };

    const handleAddToList = () => {
        if (selectedAssets.length > 0) {
            setCheckOutOpen(true); // Open the check-out dialog
            setOpen(false); // Close the asset selection dialog
        } else {
            alert('Please select at least one asset.');
        }
    };

  const filteredAssets = assets.filter(asset => {
    const searchStr = `${asset.assetTagId} ${asset.name} ${asset.description}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  const pageCount = Math.ceil(filteredAssets.length / pageSize);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

    const handleSubmitCheckOut = async (values: CheckOutFormValues) => {
        console.log('Check-out values:', values);

        // Set the check-out details in local state
        setCheckOutDetails(values);

        // Store checked out assets and details in local storage
        const selectedAssetsDetails = assets.filter(asset => selectedAssets.includes(asset.assetTagId));
        const checkOutRecord = {
            ...values,
            assets: selectedAssetsDetails,
        };

        localStorage.setItem('checkedOutAssets', JSON.stringify(checkOutRecord));

        setCheckOutOpen(false);
         setSelectedAssets([]);
        alert('Asset checked out successfully!');
    };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
            <CardTitle>Check Out</CardTitle>
          </div>
          <CardDescription>
            Keep track of your assets within your organization and create an
            even more detailed history of them.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 text-white hover:bg-green-600">
                Select Assets
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Select Assets</DialogTitle>
                <DialogDescription>
                  Choose assets to check out from the list below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center">
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline" size="sm" className="ml-2">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    Show
                    <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder={String(pageSize)} />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 50].map((size) => (
                          <SelectItem key={size} value={String(size)}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    entries
                  </div>
                  <div>
                    Showing {(currentPage - 1) * pageSize + 1} to{' '}
                    {Math.min(currentPage * pageSize, filteredAssets.length)} of{' '}
                    {filteredAssets.length} entries
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Asset Tag ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      {/* Add more headers as needed */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAssets.map(asset => (
                      <TableRow key={asset.assetTagId}>
                        <TableCell className="w-[50px]">
                          <Checkbox
                            checked={selectedAssets.includes(asset.assetTagId)}
                            onCheckedChange={() => handleCheckboxChange(asset.assetTagId)}
                          />
                        </TableCell>
                        <TableCell>{asset.assetTagId}</TableCell>
                        <TableCell>{asset.description}</TableCell>
                        <TableCell>{asset.status}</TableCell>
                        {/* Add more cells as needed */}
                      </TableRow>
                    ))}
                    {paginatedAssets.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">No assets found.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </Button>
                  <div className="space-x-2">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === pageCount}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="primary" onClick={handleAddToList}>Add to List</Button>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

            <Dialog open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Check-out Details</DialogTitle>
                        <DialogDescription>
                            Enter the check-out details for the selected assets.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitCheckOut)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="checkOutDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Check-out Date</FormLabel>
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
                                name="checkOutPerson"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Check-out Person</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter person name" className="border border-black" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit Check-out</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
    </div>
  );
}
