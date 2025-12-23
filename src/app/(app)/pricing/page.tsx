import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals exploring prompt engineering.',
    features: [
      'Basic Prompt Generation',
      'Limited Text-to-Prompt Conversions',
      'Basic Prompt Templates',
      'Last 10 Prompts History',
      'Single Model Export',
      'Community Support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$15',
    description: 'For power users who need advanced tools.',
    features: [
      'Unlimited Prompt Generation',
      'Unlimited Conversions',
      'Prompt Scoring & Feedback',
      'Pro Prompt Templates',
      'Multi-Model Export',
      '90-Day History',
      'Standard Support',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Team',
    price: '$49',
    description: 'For teams that collaborate on AI projects.',
    features: [
      'Everything in Pro',
      'Shared Prompt Library',
      'Multi-User Workspaces',
      'Prompt Review Workflows',
      'Enhanced Analytics',
      'Priority Support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
    {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs.',
    features: [
        'Everything in Team',
        'SSO/SAML Integration',
        'Custom Integrations',
        'Compliance & Audit Logs',
        'On-Premise Deployment',
        'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
    popular: false,
    },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing Plans"
        description="Choose the plan that's right for you and your team."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle className='font-headline'>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <p className="pt-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.price !== 'Custom' && tier.price !== '$0' && <span className="text-muted-foreground">/month</span>}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
