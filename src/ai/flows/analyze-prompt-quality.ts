'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing the quality of a prompt and providing feedback for improvement.
 *
 * - analyzePromptQuality - A function that analyzes the prompt quality.
 * - AnalyzePromptQualityInput - The input type for the analyzePromptQuality function.
 * - AnalyzePromptQualityOutput - The return type for the analyzePromptQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePromptQualityInputSchema = z.object({
  promptText: z.string().describe('The prompt text to be analyzed.'),
});
export type AnalyzePromptQualityInput = z.infer<typeof AnalyzePromptQualityInputSchema>;

const AnalyzePromptQualityOutputSchema = z.object({
  score: z.number().describe('A numeric score representing the prompt quality (0-100).'),
  feedback: z.string().describe('Human-readable suggestions for improving the prompt.'),
});
export type AnalyzePromptQualityOutput = z.infer<typeof AnalyzePromptQualityOutputSchema>;

export async function analyzePromptQuality(input: AnalyzePromptQualityInput): Promise<AnalyzePromptQualityOutput> {
  return analyzePromptQualityFlow(input);
}

const analyzePromptQualityPrompt = ai.definePrompt({
  name: 'analyzePromptQualityPrompt',
  input: {schema: AnalyzePromptQualityInputSchema},
  output: {schema: AnalyzePromptQualityOutputSchema},
  prompt: `You are an AI prompt quality evaluator. You will score the prompt based on semantic clarity, ambiguity, missing constraints, token efficiency and model compatibility. You will also provide feedback on how to improve the prompt. Return a numeric score between 0 and 100. Use the following as the prompt to analyze:\n\nPrompt: {{{promptText}}}`,
});

const analyzePromptQualityFlow = ai.defineFlow(
  {
    name: 'analyzePromptQualityFlow',
    inputSchema: AnalyzePromptQualityInputSchema,
    outputSchema: AnalyzePromptQualityOutputSchema,
  },
  async input => {
    const {output} = await analyzePromptQualityPrompt(input);
    return output!;
  }
);
