import { PageHeader } from '@/components/page-header';

export default function CookiePolicyPage() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <PageHeader title="Cookie Policy" description="Document Type: Compliance Disclosure" />

      <h2>1. Purpose and Scope</h2>
      <p>
        This Cookie Policy governs the use of cookies and similar technologies when users access the Service.
      </p>

      <h2>2. Definitions</h2>
      <p>
        “Cookies” refers to small data files stored on a user’s device to enable functionality and analytics.
      </p>

      <h2>3. Cookie Categories</h2>
      <h3>3.1 Strictly Necessary Cookies</h3>
      <p>Required for:</p>
      <ul>
        <li>Secure authentication</li>
        <li>Session continuity</li>
        <li>Abuse prevention</li>
      </ul>
      <p>
        Disabling these cookies may render the Service unusable.
      </p>
      <h3>3.2 Functional Cookies</h3>
      <p>Used to store:</p>
      <ul>
        <li>UI preferences</li>
        <li>Display configurations</li>
        <li>User-selected options</li>
      </ul>
      <h3>3.3 Analytics and Performance Cookies</h3>
      <p>
        Used solely for internal analysis to improve:
      </p>
      <ul>
        <li>System reliability</li>
        <li>Feature usability</li>
        <li>Performance optimization</li>
      </ul>
      <p>No personal profiling or advertising is conducted.</p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        The Service does not deploy third-party advertising cookies.
      </p>

      <h2>5. User Consent and Control</h2>
      <p>
        Users may manage cookies via browser settings. Continued use of the Service constitutes consent where required by law.
      </p>

      <h2>6. Policy Modifications</h2>
      <p>
        Material changes will be reflected by updating the effective date.
      </p>
    </div>
  );
}
