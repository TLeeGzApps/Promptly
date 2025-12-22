'use server';

/**
 * @fileOverview A prompt translation AI agent.
 *
 * - translatePromptBetweenModels - A function that handles the prompt translation process.
 * - TranslatePromptBetweenModelsInput - The input type for the TranslatePromptBetweenModels function.
 * - TranslatePromptBetweenModelsOutput - The return type for the TranslatePromptBetweenModels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslatePromptBetweenModelsInputSchema = z.object({
  prompt: z.string().describe('The prompt to translate.'),
  sourceModel: z.string().describe('The AI model the prompt is currently optimized for.'),
  targetModel: z.string().describe('The AI model to translate the prompt to.'),
});
export type TranslatePromptBetweenModelsInput = z.infer<
  typeof TranslatePromptBetweenModelsInputSchema
>;

const TranslatePromptBetweenModelsOutputSchema = z.object({
  translatedPrompt: z.string().describe('The translated prompt.'),
});
export type TranslatePromptBetweenModelsOutput = z.infer<
  typeof TranslatePromptBetweenModelsOutputSchema
>;

export async function translatePromptBetweenModels(
  input: TranslatePromptBetweenModelsInput
): Promise<TranslatePromptBetweenModelsOutput> {
  return translatePromptBetweenModelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePromptBetweenModelsPrompt',
  input: {schema: TranslatePromptBetweenModelsInputSchema},
  output: {schema: TranslatePromptBetweenModelsOutputSchema},
  prompt: `You are an expert AI prompt engineer. Your task is to translate a prompt from one AI model to another, preserving the original intent while adhering to the conventions of the target model.

Here are the details:

Source Model: {{{sourceModel}}}
Target Model: {{{targetModel}}}
Original Prompt: {{{prompt}}}

Translate the prompt to be effective with the Target Model.`,
});

const translatePromptBetweenModelsFlow = ai.defineFlow(
  {
    name: 'translatePromptBetweenModelsFlow',
    inputSchema: TranslatePromptBetweenModelsInputSchema,
    outputSchema: TranslatePromptBetweenModelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
