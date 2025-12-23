"use client";

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Loader2, Copy, Check } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PromptAnalysis } from '@/components/prompt-analysis';
import { paraphraseText, ParaphraseTextInput, ParaphraseTextInputSchema, ParaphraseTextOutput } from '@/ai/flows/paraphrase-text';
import { useToast } from '@/hooks/use-toast';

type FormData = ParaphraseTextInput;

export default function ParaphrasePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [paraphrasedText, setParaphrasedText] = React.useState('');
  const { toast } = useToast();

  const handleCopy = () => {
    if (!paraphrasedText) return;
    navigator.clipboard.writeText(paraphrasedText);
    toast({
      title: "Copied to Clipboard",
      description: "The paraphrased text has been copied.",
    });
  };

  const form = useForm<FormData>({
    resolver: zodResolver(ParaphraseTextInputSchema),
    defaultValues: {
      sourceText: '',
      mode: 'Advanced',
      length: 'Same',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setParaphrasedText('');

    try {
      const result: ParaphraseTextOutput = await paraphraseText(data);
      setParaphrasedText(result.paraphrasedText);
    } catch (error) {
      console.error('Error paraphrasing text:', error);
      toast({
        variant: "destructive",
        title: "Paraphrase Failed",
        description: "Could not paraphrase the text. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const sourceTextValue = form.watch('sourceText');

  return (
    <>
      <PageHeader
        title="Text Paraphraser"
        description="Adapt your text with different complexity and length while preserving tone."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
               <div className="grid gap-6 md:grid-cols-2">
                 <FormField
                  control={form.control}
                  name="mode"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Paraphrasing Mode</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="Basic" /></FormControl>
                            <FormLabel className="font-normal">Basic</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="Advanced" /></FormControl>
                            <FormLabel className="font-normal">Advanced</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="Complex" /></FormControl>
                            <FormLabel className="font-normal">Complex</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Output Length</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="Shorter" /></FormControl>
                            <FormLabel className="font-normal">Shorter</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="Same" /></FormControl>
                            <FormLabel className="font-normal">Same Length</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="Expanded" /></FormControl>
                            <FormLabel className="font-normal">Expanded</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Paraphrase Text
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Original Text</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="sourceText"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the text you want to paraphrase..."
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
                <div className="flex items-start justify-between">
                  <CardTitle className="font-headline">Paraphrased Text</CardTitle>
                  {paraphrasedText && (
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex items-center justify-center min-h-[250px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}
                {paraphrasedText && (
                  <pre className="min-h-[250px] mt-2 rounded-md bg-background p-4 font-code text-sm text-foreground overflow-x-auto whitespace-pre-wrap">
                    <code>{paraphrasedText}</code>
                  </pre>
                )}
                {!isLoading && !paraphrasedText && (
                  <p className="text-center text-sm text-muted-foreground min-h-[250px] flex items-center justify-center">
                    Your paraphrased text will appear here.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      {paraphrasedText && (
        <div className="mt-8">
            <PromptAnalysis promptText={paraphrasedText} />
        </div>
      )}
    </>
  );
}
