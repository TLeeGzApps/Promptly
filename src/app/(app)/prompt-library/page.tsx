"use client";

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const templates = [
  {
    category: 'Marketing',
    title: 'Generate Ad Copy',
    prompt: 'Act as a senior copywriter. Generate 3 compelling ad headlines and 1 short body text for a new product launch. Product: [Product Name]. Target Audience: [Audience]. Key Benefit: [Benefit].',
  },
  {
    category: 'Development',
    title: 'Create a Database Schema',
    prompt: 'You are a database architect. Design a normalized SQL schema for a simple blogging platform. Include tables for users, posts, and comments. Specify primary keys, foreign keys, and essential fields.',
  },
  {
    category: 'Business',
    title: 'Draft a Professional Email',
    prompt: 'Draft a professional email to a potential client. Your Goal: [Your Goal]. Client Name: [Client Name]. Your Company: [Your Company]. Include a clear call-to-action.',
  },
  {
    category: 'Creative',
    title: 'Brainstorm Story Ideas',
    prompt: 'Generate 5 unique story ideas based on the following theme: [Theme]. Each idea should include a protagonist, a conflict, and a potential setting.',
  },
  {
    category: 'Data Analysis',
    title: 'Explain a Complex Topic Simply',
    prompt: 'Explain the concept of [Complex Concept] in simple terms, as if you were explaining it to a 10-year-old. Use an analogy.',
  },
  {
      category: 'Customer Support',
      title: 'Write a Empathetic Support Response',
      prompt: 'Draft an empathetic and helpful response to a customer support ticket. Customer Issue: [Issue Description]. Your Goal: Acknowledge their frustration, provide a clear next step, and reassure them.'
  }
];

export default function PromptLibraryPage() {
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The prompt template has been copied.",
    });
  };

  return (
    <>
      <PageHeader
        title="Prompt Library"
        description="A collection of expert-crafted prompt templates to get you started."
      />
      <div className="mb-8">
        <Input placeholder="Search templates..." className="max-w-sm" />
      </div>
      <div className="grid gap-6">
        {templates.map((template) => (
          <Card key={template.title}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-primary">{template.category}</p>
                  <CardTitle className="mt-1 font-headline">{template.title}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(template.prompt)}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="mt-2 rounded-md bg-background p-4 font-code text-sm text-foreground overflow-x-auto whitespace-pre-wrap">
                <code>{template.prompt}</code>
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
