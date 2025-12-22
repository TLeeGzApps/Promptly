"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { analyzePromptQuality, AnalyzePromptQualityOutput } from '@/ai/flows/analyze-prompt-quality';
import { Loader2, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PromptAnalysisProps {
  promptText: string;
}

export function PromptAnalysis({ promptText }: PromptAnalysisProps) {
  const [analysis, setAnalysis] = React.useState<AnalyzePromptQualityOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzePromptQuality({ promptText });
      setAnalysis(result);
    } catch (e) {
      setError('Failed to analyze prompt. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary';
    if (score >= 50) return 'text-chart-4';
    return 'text-destructive';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Prompt Analysis & Scoring</CardTitle>
      </CardHeader>
      <CardContent>
        {!analysis && !isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 text-center rounded-lg border-2 border-dashed p-8">
            <div className="rounded-full bg-secondary p-3">
              <Zap className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Evaluate your prompt for clarity, efficiency, and model compatibility.
            </p>
            <Button onClick={handleAnalyze} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Prompt
            </Button>
          </div>
        )}
        
        {isLoading && (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )}
        
        {error && <p className="text-destructive text-sm">{error}</p>}
        
        {analysis && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-muted-foreground">Quality Score</p>
                <p className={`text-xl font-bold ${getScoreColor(analysis.score)}`}>{analysis.score}/100</p>
              </div>
              <Progress value={analysis.score} className="h-2 [&>div]:bg-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Feedback & Suggestions</p>
              <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border bg-background/50 p-4 text-sm">
                <p>{analysis.feedback}</p>
              </div>
            </div>
            <Button onClick={handleAnalyze} variant="outline" size="sm" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Re-analyze
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
