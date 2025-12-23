import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare, Blocks, Languages, Zap } from 'lucide-react';

const features = [
  {
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
    title: '1. Generate Prompts',
    description: 'Use our guided builder to construct detailed and effective prompts. Specify your goal, constraints, and target AI model to get a perfectly engineered prompt from scratch.',
  },
  {
    icon: <Blocks className="h-8 w-8 text-primary" />,
    title: '2. Convert Plain Text',
    description: 'Have an idea but not a full prompt? Enter your plain-text intent, and our AI will instantly convert it into a structured, model-specific prompt ready for use.',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: '3. Translate Between Models',
    description: 'Seamlessly translate prompts between different AI models like Gemini, GPT-4, and Claude. Our system preserves your intent while adapting the syntax and conventions for the target model.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: '4. Analyze and Score',
    description: 'Every generated or translated prompt comes with a detailed analysis. Get a quality score (0-100) and actionable feedback to improve clarity, efficiency, and model compatibility.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        title="How It Works"
        description="A simple, powerful workflow for prompt engineering."
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              {feature.icon}
              <CardTitle className='font-headline'>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
