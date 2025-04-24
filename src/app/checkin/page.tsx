'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {UserX} from 'lucide-react';
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
import {Search} from 'lucide-react';
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

interface Asset {
  assetTagId: string;
  name: string;
  description: string;
  status: string; // Adjust the type as necessary
}

const checkInFormSchema = z.object({
  checkInDate: z.date().optional(),
  checkInPerson: z.string().min(2, {
    message: "Check-in person must be at least 2 characters.",
  }),
})

type CheckInFormValues = z.infer<typeof checkInFormSchema>

export default function CheckInPage() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]); // Replace 'any' with your asset type
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
    const [checkInOpen, setCheckInOpen] = useState(false); // State for the check-in dialog

  const form = useForm<CheckInFormValues>({
    resolver: zodResolver(checkInFormSchema),
    defaultValues: {
      checkInDate: undefined,
      checkInPerson: '',
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
            setCheckInOpen(true); // Open the check-in dialog
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

    const handleSubmitCheckIn = async (values: CheckInFormValues) => {
        console.log('Check-in values:', values);
        // Handle the check-in submission here, e.g., save to local storage, etc.
        setCheckInOpen(false);
    };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <UserX className="mr-2 h-6 w-6 text-red-500" />
            <CardTitle>Check In</CardTitle>
          </div>
          <CardDescription>
            Track the journey of each asset as it moves through your
            organization.
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
                  Choose assets to check in from the list below.
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

            <Dialog open={checkInOpen} onOpenChange={setCheckInOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Check-in Details</DialogTitle>
                        <DialogDescription>
                            Enter the check-in details for the selected assets.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitCheckIn)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="checkInDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Check-in Date</FormLabel>
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
                                name="checkInPerson"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Check-in Person</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter person name" className="border border-black" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit Check-in</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
    </div>
  );
}

