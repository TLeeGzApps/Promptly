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
import { translatePromptBetweenModels } from '@/ai/flows/translate-prompt-between-models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PromptAnalysis } from '@/components/prompt-analysis';

const formSchema = z.object({
  sourcePrompt: z.string().min(10, 'Please enter a prompt to translate.'),
  sourceModel: z.string().min(1, 'Source model is required.'),
  targetModel: z.string().min(1, 'Target model is required.'),
});

type FormData = z.infer<typeof formSchema>;

export default function TranslatePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [translatedPrompt, setTranslatedPrompt] = React.useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourcePrompt: '',
      sourceModel: 'openai-gpt-4',
      targetModel: 'gemini-2.5-flash',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setTranslatedPrompt('');

    try {
      const result = await translatePromptBetweenModels({
        prompt: data.sourcePrompt,
        sourceModel: data.sourceModel,
        targetModel: data.targetModel,
      });
      setTranslatedPrompt(result.translatedPrompt);
    } catch (error) {
      console.error('Error translating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sourcePromptValue = form.watch('sourcePrompt');

  return (
    <>
      <PageHeader
        title="Prompt Translator"
        description="Translate prompts between different AI models, preserving intent while applying provider-specific conventions."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="sourceModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="openai-gpt-4">OpenAI GPT-4</SelectItem>
                          <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                          <SelectItem value="anthropic-claude-3">Anthropic Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To Model</FormLabel>
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
              </div>
              <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Translate Prompt
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Source Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="sourcePrompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the prompt you want to translate..."
                          className="min-h-[250px] font-code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Translated Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex items-center justify-center min-h-[250px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}
                {translatedPrompt && (
                  <pre className="min-h-[250px] mt-2 rounded-md bg-background p-4 font-code text-sm text-foreground overflow-x-auto">
                    <code>{translatedPrompt}</code>
                  </pre>
                )}
                {!isLoading && !translatedPrompt && (
                  <p className="text-center text-sm text-muted-foreground min-h-[250px] flex items-center justify-center">
                    Your translated prompt will appear here.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {sourcePromptValue && <PromptAnalysis promptText={sourcePromptValue} />}
        {translatedPrompt && <PromptAnalysis promptText={translatedPrompt} />}
      </div>
    </>
  );
}
