import { Logo } from '@/components/icons';
import Link from 'next/link';

const footerSections = [
    {
    title: 'Quick Links',
    links: [
        { name: 'Generate', href: '/generate' },
        { name: 'Convert', href: '/convert' },
        { name: 'Translate', href: '/translate' },
        { name: 'Paraphrase', href: '/paraphrase' },
        { name: 'Library', href: '/prompt-library' },
        { name: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Models Supported', href: '/models-supported' },
      { name: 'Documentation', href: '/documentation' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '/legal/terms-of-service' },
      { name: 'Privacy Policy', href: '/legal/privacy-policy' },
      { name: 'Cookie Policy', href: '/legal/cookie-policy' },
      { name: 'Acceptable Use', href: '/legal/acceptable-use' },
      { name: 'Disclaimer', href: '/legal/disclaimer' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
             <Link href="/generate" className="flex items-center gap-2.5">
                <Logo className="h-7 w-7 text-primary" />
                <span className="text-xl font-semibold tracking-tight text-foreground font-headline">
                  Promptly
                </span>
              </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Precision tools for building, formatting, and translating AI prompts across models.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-9">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold leading-6 text-foreground">{section.title}</h3>
                <ul role="list" className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
            <div className="space-y-4 text-xs text-muted-foreground">
                <p>
                    Promptly is an independent platform and is not affiliated with, endorsed by, or sponsored by OpenAI, Anthropic, Google, DeepSeek, or any other AI provider.
                </p>
                <p>
                    AI-generated outputs may be inaccurate or incomplete. Users are responsible for reviewing and validating results before use.
                </p>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
            &copy; {currentYear} Promptly. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
