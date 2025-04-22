'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useState, useEffect } from 'react';

export default function ReportPage() {
  const [assetsList, setAssetsList] = useState<any[]>([]);

  useEffect(() => {
    // Load existing assets from local storage on component mount
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssetsList(JSON.parse(storedAssets));
    }
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF();
    // Define the columns for the table
    const col = ["Asset Tag ID", "Name", "Description", "Brand", "Purchase Date", "Cost", "Status"];

    // Prepare rows
    const rows: string[][] = [];
    assetsList.forEach((asset: any) => {
      rows.push([asset.assetTagId, asset.name, asset.description, asset.brand, asset.purchaseDate, asset.cost, asset.status]);
    });

    // Dynamically set the height of the header row
    (doc as any).autoTable({
      head: [col],
      body: rows,
      didParseCell: function(data: any) {
        if (data.row.index === 0) {
          data.cell.styles.minHeight = 20; // Set minimal height for header cells
        }
      },
    });
    doc.save('assets_report.pdf');
  };

  const generateExcel = () => {
    if (!assetsList) {
      console.error("No assets data available to export.");
      return;
    }

    const data = assetsList.map(asset => ({
      'Asset Tag ID': asset.assetTagId,
      'Name': asset.name,
      'Description': asset.description,
      'Brand': asset.brand,
      'Purchase Date': asset.purchaseDate,
      'Cost': asset.cost,
      'Status': asset.status,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Assets');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(fileData, 'assets_report.xlsx');
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Report</CardTitle>
          <CardDescription>Generate reports</CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Button onClick={generatePdf}>Download PDF Report</Button>
          <Button onClick={generateExcel}>Display Excel Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}
