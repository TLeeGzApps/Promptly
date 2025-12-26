"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/contexts/auth-provider";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const tiers = [
  {
    name: "Free",
    price: "$0",
    priceId: "price_1Shcs8HHPmnAKOCeMSVwrjWR",
    description: "Basic access for individuals exploring prompt generation and formatting.",
    features: [
      "Basic prompt generation",
      "Limited prompt conversion & formatting",
      "Plain text export only",
      "Single-user access",
      "Manual prompt editing",
      "Community-level support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$5",
    priceId: "price_1Shcs9HHPmnAKOCePoCHmM9e",
    description: "For power users who need full prompt generation, conversion, and scoring.",
    features: [
      "Unlimited prompt generation",
      "Unlimited prompt conversion & formatting",
      "Prompt scoring & optimization insights",
      "Limited prompt translation",
      "Export to Plain Text, Markdown, and JSON",
      "Priority generation queue",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Team",
    price: "$12",
    priceId: "price_1Shcs8HHPmnAKOCeVA9QZnUa",
    description: "For small teams collaborating across prompts and AI models.",
    features: [
      "Everything in Pro",
      "Shared team workspace",
      "Up to 5 users",
      "Full multi-model prompt translation",
      "Shared prompt libraries",
      "Version history & rollback",
    ],
    cta: "Upgrade to Team",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "$25",
    priceId: "price_1Shcs8HHPmnAKOCejasUMyOR",
    description: "For organizations requiring scale, security, and compliance.",
    features: [
      "Everything in Team",
      "Unlimited users",
      "Compliance mode",
      "Audit logs",
      "Single Sign-On (SSO)",
      "Enterprise-grade support",
    ],
    cta: "Contact Sales",
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
        description: "Please log in to continue.",
      });
      return;
    }

    if (tierName === "Free") {
      toast({
        title: "You're all set",
        description: "You can start using the Free plan immediately.",
      });
      return;
    }

    if (tierName === "Team" || tierName === "Enterprise") {
      toast({
        title: "Contact Sales",
        description: "Please reach out to upgrade to this plan.",
      });
      return;
    }

    try {
      setLoading(priceId);

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load.");

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        successUrl: `${window.location.origin}/generate?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
        clientReferenceId: user.uid,
      });

      if (error) throw error;
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: err.message || "Unable to start checkout. Please try again.",
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
          <Card key={tier.name} className={`flex flex-col ${tier.popular ? "border-primary" : ""}`}>
            <CardHeader>
              <CardTitle className="font-headline">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <p className="pt-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.price !== "$0" && <span className="text-muted-foreground"> / month</span>}
              </p>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mr-2 mt-1 h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={tier.popular ? "default" : "outline"}
                onClick={() => handleCheckout(tier.priceId, tier.name)}
                disabled={loading === tier.priceId}
              >
                {loading === tier.priceId && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
