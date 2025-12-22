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
  constraints: z.array(z.object({ value: z.string() })).optional(),
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
      constraints: [{ value: '' }],
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

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedPrompt('');

    let description = `Goal: ${data.goal}\n`;
    if (data.constraints && data.constraints.some(c => c.value)) {
      description += "Constraints:\n";
      data.constraints.forEach(c => c.value && (description += `- ${c.value}\n`));
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
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeConstraint(index)} disabled={constraintFields.length <= 1 && form.getValues('constraints.0.value') === ''}>
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
