'use server';

/**
 * @fileOverview A flow to paraphrase text with different modes and lengths.
 *
 * - paraphraseText - A function that paraphrases text.
 * - ParaphraseTextInput - The input type for the paraphraseText function.
 * - ParaphraseTextOutput - The return type for the paraphraseText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ParaphraseTextInputSchema = z.object({
  sourceText: z.string().describe('The original text to paraphrase.'),
  mode: z.enum(['Basic', 'Advanced', 'Complex']).describe('The complexity of the paraphrasing.'),
  length: z.enum(['Shorter', 'Same', 'Expanded']).describe('The desired output length.'),
});
export type ParaphraseTextInput = z.infer<typeof ParaphraseTextInputSchema>;

export const ParaphraseTextOutputSchema = z.object({
  paraphrasedText: z.string().describe('The paraphrased text.'),
});
export type ParaphraseTextOutput = z.infer<typeof ParaphraseTextOutputSchema>;


export async function paraphraseText(input: ParaphraseTextInput): Promise<ParaphraseTextOutput> {
    return paraphraseTextFlow(input);
}

const prompt = ai.definePrompt({
    name: 'paraphraseTextPrompt',
    input: {schema: ParaphraseTextInputSchema},
    output: {schema: ParaphraseTextOutputSchema},
    prompt: `You are an expert text editor. Your task is to paraphrase the given text while adhering to the specified mode and length.

Here are the details:

Source Text:
'''
{{{sourceText}}}
'''

Paraphrasing Mode: {{{mode}}}
Desired Length: {{{length}}}

- Preserve the core meaning and original tone of the text.
- If Mode is 'Basic', use common vocabulary and simple sentence structures.
- If Mode is 'Advanced', use more sophisticated vocabulary and varied sentence structures.
- If Mode is 'Complex', use nuanced terminology and complex sentence structures, suitable for academic or technical contexts.
- Adjust the length as requested ('Shorter', 'Same', or 'Expanded').
- Return ONLY the paraphrased text in the 'paraphrasedText' field.
`,
});


const paraphraseTextFlow = ai.defineFlow(
    {
        name: 'paraphraseTextFlow',
        inputSchema: ParaphraseTextInputSchema,
        outputSchema: ParaphraseTextOutputSchema,
    },
    async input => {
        const {output} = await prompt(input);
        return output!;
    }
);
