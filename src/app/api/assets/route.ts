import { NextResponse } from 'next/server';
import { z } from "zod";

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
  purchaseDate: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNo: z.string().optional(),
  cost: z.string().optional(),
  status: z.enum(['Active', 'Inactive', 'Maintenance']).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = assetSchema.safeParse(body);

    if (!validation.success) {
      console.log(validation.error);
      return NextResponse.json({ errors: validation.error }, { status: 400 });
    }

    const newAsset = validation.data;
    //   assets.push(newAsset);

    // Instead of directly pushing to 'assets', return the data to be handled by the client
    return NextResponse.json(newAsset, { status: 201 });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

