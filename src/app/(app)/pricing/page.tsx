"use client";

import * as React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/contexts/auth-provider';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const tiers = [
  {
    name: 'Free',
    price: '$0',
    priceId: '',
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
    priceId: 'price_1Sh9iODttCUBZqsc7b0g7b1h', // Placeholder, replace with actual Price ID
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
    priceId: 'price_1Sh9iODttCUBZqsc8c1h8c2i', // Placeholder, replace with actual Price ID
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
    priceId: 'price_1Sh9iODttCUBZqsc9d2i9d3j', // Placeholder, replace with actual Price ID
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
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleCheckout = async (priceId: string, tierName: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to subscribe.",
      });
      return;
    }

    if (tierName === 'Free' || tierName === 'Enterprise' || tierName === 'Team') {
        // Handle free tier or contact sales
        toast({
            title: tierName === 'Free' ? "You're all set!" : "Contact Us",
            description: tierName === 'Free' ? "You are on the Free plan." : "Please contact our sales team to get started with the Enterprise plan.",
        });
        return;
    }

    setLoading(priceId);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe.js failed to load.');

      // This is a simplified client-side checkout.
      // In a real app, you'd create a checkout session on your server
      // and return the session ID to the client.
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/generate?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.origin + '/pricing',
        clientReferenceId: user.uid,
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      toast({
        variant: "destructive",
        title: "Checkout Failed",
        description: error.message || "Could not proceed to checkout. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };


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
              <Button 
                className="w-full" 
                variant={tier.popular ? 'default' : 'outline'}
                onClick={() => handleCheckout(tier.priceId, tier.name)}
                disabled={loading === tier.priceId}
              >
                {loading === tier.priceId ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
