"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white bg-transparent">
          <div className="relative z-10 p-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-headline">
              The AI Prompt Engineering Toolkit
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
              Precision tools for building, formatting, and translating AI prompts across all major models.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/generate">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
