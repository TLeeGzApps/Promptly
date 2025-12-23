'use server';

/**
 * @fileOverview A flow to convert plain-text intent into a structured, model-specific prompt.
 *
 * - convertTextToPrompt - A function that handles the prompt conversion.
 * - ConvertTextToPromptInput - The input type for the convertTextToPrompt function.
 * - ConvertTextToPromptOutput - The return type for the convertTextToPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertTextToPromptInputSchema = z.object({
  intent: z.string().describe('The plain-text user intent.'),
  model: z.string().describe('The target AI model (e.g., "Gemini 2.5 Flash", "OpenAI GPT-4", "Anthropic Claude 3").'),
});
export type ConvertTextToPromptInput = z.infer<typeof ConvertTextToPromptInputSchema>;

const ConvertTextToPromptOutputSchema = z.object({
  structuredPrompt: z.string().describe('The fully structured, model-specific prompt.'),
});
export type ConvertTextToPromptOutput = z.infer<typeof ConvertTextToPromptOutputSchema>;

export async function convertTextToPrompt(input: ConvertTextToPromptInput): Promise<ConvertTextToPromptOutput> {
  return convertTextToPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'convertTextToPromptPrompt',
  input: {schema: ConvertTextToPromptInputSchema},
  output: {schema: ConvertTextToPromptOutputSchema},
  prompt: `You are an expert prompt engineer. Your task is to transform a user's plain-text input into a fully structured, properly formatted prompt that adheres to the official syntax and best practices of the specified AI model.

Analyze the user's intent, identify any constraints or output expectations, and then generate a structured prompt.

**Target AI Model:** {{{model}}}
**User's Plain-Text Intent:** {{{intent}}}

**Formatting Requirements:**
- The prompt must be well-structured and use clear headings (e.g., [System], [Objective], [Context], [Constraints], [Output Format]).
- The final output should be a single block of text, ready to be copied and pasted.
- **Model-Specific Adjustments:**
  - **For "Anthropic Claude 3":** Use XML tags like <role>, <task>, <constraints> instead of bracketed headings. Ensure the structure is optimized for Claude's documented best practices.
  - **For "OpenAI GPT-4":** Use clear role-task-context-constraints-format sections.
  - **For "Gemini 2.5 Flash":** Follow a similar structure to GPT-4, emphasizing clear role definition and task decomposition.
  - **For "DeepSeek":** Use the conventions specified in the DeepSeek prompt formatting guide.

Return ONLY the final, structured prompt in the 'structuredPrompt' field.
`,
});

const convertTextToPromptFlow = ai.defineFlow(
  {
    name: 'convertTextToPromptFlow',
    inputSchema: ConvertTextToPromptInputSchema,
    outputSchema: ConvertTextToPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
