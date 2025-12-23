"use client";

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { PromptAnalysis } from '@/components/prompt-analysis';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertTextToPrompt } from '@/ai/flows/convert-text-to-prompt';

const formSchema = z.object({
  intent: z.string().min(10, 'Please describe your intent in at least 10 characters.'),
  model: z.string().min(1, 'Model is required.'),
});

type FormData = z.infer<typeof formSchema>;

export default function ConvertPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedPrompt, setGeneratedPrompt] = React.useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      intent: '',
      model: 'gemini-2.5-flash',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedPrompt('');

    try {
      const result = await convertTextToPrompt({ 
        intent: data.intent,
        model: data.model 
      });
      setGeneratedPrompt(result.structuredPrompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Text to Prompt"
        description="Transform unstructured plain-text intent into a structured, model-specific prompt."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Intent</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="intent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plain Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., create a python script that reads a csv and outputs a bar chart"
                          className="min-h-[200px]"
                          {...field}
                        />
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Convert to Prompt
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="font-headline">Converted Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
              {generatedPrompt && (
                <pre className="mt-2 rounded-md bg-background p-4 font-code text-sm text-foreground overflow-x-auto whitespace-pre-wrap">
                  <code>{generatedPrompt}</code>
                </pre>
              )}
              {!isLoading && !generatedPrompt && (
                <p className="text-center text-sm text-muted-foreground p-8">
                  Your converted prompt will appear here.
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
