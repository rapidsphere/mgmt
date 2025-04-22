import AssetsFormComponent from "@/components/assets-form";

export default function AssetsCreatePage() {
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    // Handle form submission logic here
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
