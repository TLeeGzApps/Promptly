"use client";

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { generateInitialPrompt } from '@/ai/flows/generate-initial-prompt';
import { PromptAnalysis } from '@/components/prompt-analysis';

const formSchema = z.object({
  goal: z.string().min(1, 'Goal is required.'),
  role: z.string().optional(),
  constraints: z.array(z.object({ value: z.string() })).optional(),
  examples: z.array(z.object({ input: z.string(), output: z.string() })).optional(),
  outputFormat: z.string().optional(),
  model: z.string().min(1, 'Model is required.'),
});

type FormData = z.infer<typeof formSchema>;

export default function GeneratePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedPrompt, setGeneratedPrompt] = React.useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: '',
      role: '',
      constraints: [{ value: '' }],
      examples: [{ input: '', output: '' }],
      outputFormat: 'Markdown',
      model: 'gemini-2.5-flash',
    },
  });

  const {
    fields: constraintFields,
    append: appendConstraint,
    remove: removeConstraint,
  } = useFieldArray({
    control: form.control,
    name: 'constraints',
  });

  const {
    fields: exampleFields,
    append: appendExample,
    remove: removeExample,
  } = useFieldArray({
    control: form.control,
    name: 'examples',
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedPrompt('');

    let description = `Goal: ${data.goal}\n`;
    if (data.role) description += `Role: As a ${data.role}\n`;
    if (data.outputFormat) description += `Output Format: ${data.outputFormat}\n`;
    if (data.constraints && data.constraints.some(c => c.value)) {
      description += "Constraints:\n";
      data.constraints.forEach(c => c.value && (description += `- ${c.value}\n`));
    }
    if (data.examples && data.examples.some(e => e.input && e.output)) {
      description += "Few-shot Examples:\n";
      data.examples.forEach(e => e.input && e.output && (description += `  - Input: ${e.input}\n    Output: ${e.output}\n`));
    }

    try {
      const result = await generateInitialPrompt({ description });
      setGeneratedPrompt(result.prompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Prompt Generator"
        description="Use the guided builder to create a detailed, model-optimized prompt."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Prompt Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Goal</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Generate a marketing email for a new product launch." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target AI Model</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                          <SelectItem value="openai-gpt-4">OpenAI GPT-4</SelectItem>
                          <SelectItem value="anthropic-claude-3">Anthropic Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Role / Persona</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., a witty marketing expert" {...field} />
                      </FormControl>
                      <FormDescription>Define the persona the AI should adopt.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="outputFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Output Format</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an output format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Markdown">Markdown</SelectItem>
                          <SelectItem value="JSON">JSON</SelectItem>
                           <SelectItem value="Plain Text">Plain Text</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div>
                  <FormLabel>Constraints</FormLabel>
                  <FormDescription className="mb-2">Set rules or limitations for the AI.</FormDescription>
                  <div className="space-y-2">
                  {constraintFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                       <FormField
                          control={form.control}
                          name={`constraints.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="e.g., Do not exceed 200 words" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeConstraint(index)} disabled={constraintFields.length <= 1}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  </div>
                   <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendConstraint({ value: '' })}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Constraint
                    </Button>
                </div>
                
                <Separator />
                
                <div>
                   <FormLabel>Few-shot Examples</FormLabel>
                  <FormDescription className="mb-2">Provide input/output pairs to guide the model.</FormDescription>
                  <div className="space-y-4">
                  {exampleFields.map((field, index) => (
                    <div key={field.id} className="relative rounded-md border p-4 pr-10">
                        <FormField
                          control={form.control}
                          name={`examples.${index}.input`}
                          render={({ field }) => (
                            <FormItem className="mb-2">
                              <FormLabel className="text-xs">Example Input</FormLabel>
                              <FormControl>
                                <Input placeholder="Product: SuperWidget" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name={`examples.${index}.output`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Example Output</FormLabel>
                              <FormControl>
                                <Input placeholder="Email: Announcing the SuperWidget..." {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-1" onClick={() => removeExample(index)} disabled={exampleFields.length <= 1}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  </div>
                   <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendExample({ input: '', output: '' })}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Example
                    </Button>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Generate Prompt
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="font-headline">Generated Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}
                {generatedPrompt && (
                  <pre className="mt-2 rounded-md bg-background p-4 font-code text-sm text-foreground overflow-x-auto">
                    <code>{generatedPrompt}</code>
                  </pre>
                )}
                {!isLoading && !generatedPrompt && (
                  <p className="text-center text-sm text-muted-foreground p-8">
                    Your generated prompt will appear here.
                  </p>
                )}
              </CardContent>
            </Card>

            {generatedPrompt && <PromptAnalysis promptText={generatedPrompt} />}
        </div>
      </div>
    </>
  );
}
