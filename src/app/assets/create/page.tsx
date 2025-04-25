'use client'

import AssetsFormComponent from "@/components/assets-form";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AssetsCreatePage() {
  const router = useRouter();
  const [assetsList, setAssetsList] = useState<any[]>([]);

  useEffect(() => {
    // Load existing assets from local storage on component mount
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssetsList(JSON.parse(storedAssets));
    }
  }, []);

  const handleSubmit = async (values: any) => {
    console.log('Form values:', values);
    // POST request
    try {
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const newAsset = await response.json();

        // Update assets list with the new asset
        const updatedAssets = [...assetsList, newAsset];

        // Store the updated assets list in local storage
        localStorage.setItem('assets', JSON.stringify(updatedAssets));
        setAssetsList(updatedAssets);

        router.push('/assets/list');
        router.refresh();
        alert('Asset created successfully!');
      } else {
        console.error('Failed to create asset:', await response.text());
        alert('Failed to create asset. Please check the console for details.');
      }
    } catch (error) {
      console.error('Error creating asset:', error);
      alert('An unexpected error occurred. Please check the console for details.');
    }
  };

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 w-3/4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Asset Details</h1>
        <AssetsFormComponent onSubmit={handleSubmit} />
      </div>
    </div>
  );
}


