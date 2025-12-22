import { Logo } from '@/components/icons';
import Link from 'next/link';

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'How It Works', href: '#' },
      { name: 'Models Supported', href: '#' },
      { name: 'Prompt Templates', href: '/generate' },
      { name: 'Prompt Scoring', href: '#' },
      { name: 'Version History', href: '#' },
      { name: 'API (Coming Soon)', href: '#' },
      { name: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Prompt Engineering Guides', href: '#' },
      { name: 'Support Center', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Acceptable Use Policy', href: '#' },
      { name: 'Disclaimer', href: '#' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-9">
            <div className="grid grid-cols-1">
                 <h3 className="text-sm font-semibold leading-6 text-foreground">Quick Links</h3>
                 <ul role="list" className="mt-4 space-y-2">
                    <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
                    <li><Link href="/generate" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link></li>
                    <li><Link href="/generate" className="text-sm text-muted-foreground hover:text-foreground">Create Prompt</Link></li>
                    <li><Link href="/convert" className="text-sm text-muted-foreground hover:text-foreground">Convert Prompt</Link></li>
                    <li><Link href="/translate" className="text-sm text-muted-foreground hover:text-foreground">Translate Prompt</Link></li>
                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Prompt Library</Link></li>
                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                 </ul>
            </div>
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
