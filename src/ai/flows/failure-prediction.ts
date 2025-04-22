'use server';
/**
 * @fileOverview Predicts potential asset failures based on historical data and usage patterns.
 *
 * - predictAssetFailure - A function that predicts asset failure.
 * - PredictAssetFailureInput - The input type for the predictAssetFailure function.
 * - PredictAssetFailureOutput - The return type for the predictAssetFailure function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PredictAssetFailureInputSchema = z.object({
  assetName: z.string().describe('The name of the asset.'),
  assetType: z.string().describe('The type of the asset.'),
  usagePatterns: z.string().describe('Historical usage patterns of the asset.'),
  maintenanceHistory: z.string().describe('Historical maintenance records of the asset.'),
});
export type PredictAssetFailureInput = z.infer<typeof PredictAssetFailureInputSchema>;

const PredictAssetFailureOutputSchema = z.object({
  failurePrediction: z.string().describe('The predicted failure and probability of occurence.'),
  recommendedActions: z.string().describe('Recommended actions to prevent the failure.'),
});
export type PredictAssetFailureOutput = z.infer<typeof PredictAssetFailureOutputSchema>;

export async function predictAssetFailure(input: PredictAssetFailureInput): Promise<PredictAssetFailureOutput> {
  return predictAssetFailureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictAssetFailurePrompt',
  input: {
    schema: z.object({
      assetName: z.string().describe('The name of the asset.'),
      assetType: z.string().describe('The type of the asset.'),
      usagePatterns: z.string().describe('Historical usage patterns of the asset.'),
      maintenanceHistory: z.string().describe('Historical maintenance records of the asset.'),
    }),
  },
  output: {
    schema: z.object({
      failurePrediction: z.string().describe('The predicted failure and probability of occurence.'),
      recommendedActions: z.string().describe('Recommended actions to prevent the failure.'),
    }),
  },
  prompt: `You are an AI assistant specialized in predicting asset failures.

  Based on the provided asset information, usage patterns, and maintenance history, predict potential failures and recommend proactive actions.

  Asset Name: {{{assetName}}}
  Asset Type: {{{assetType}}}
  Usage Patterns: {{{usagePatterns}}}
  Maintenance History: {{{maintenanceHistory}}}

  Provide a failure prediction and probability, as well as recommended actions to prevent the predicted failure.
  `,
});

const predictAssetFailureFlow = ai.defineFlow<
  typeof PredictAssetFailureInputSchema,
  typeof PredictAssetFailureOutputSchema
>({
  name: 'predictAssetFailureFlow',
  inputSchema: PredictAssetFailureInputSchema,
  outputSchema: PredictAssetFailureOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
