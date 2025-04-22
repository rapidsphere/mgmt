'use client'

import AssetsFormComponent from "@/components/assets-form";
import { useRouter } from 'next/navigation';

export default function AssetsCreatePage() {
  const router = useRouter();

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
        // router.push('/assets/list');
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
    <div className="container mx-auto py-10">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">Asset Details</h1>
        <AssetsFormComponent onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

