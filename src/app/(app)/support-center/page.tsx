import { PageHeader } from '@/components/page-header';

export default function SupportCenterPage() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <PageHeader title="Support Center" description="Document Type: Operational Support Policy" />

      <h2>1. Support Scope</h2>
      <p>
        Support is limited to issues related to:
      </p>
      <ul>
        <li>Account access</li>
        <li>Subscription management</li>
        <li>Platform functionality</li>
      </ul>

      <h2>2. Exclusions</h2>
      <p>
        Support does not include:
      </p>
      <ul>
        <li>Third-party AI behavior</li>
        <li>Custom prompt engineering consulting</li>
        <li>Legal or compliance advice</li>
      </ul>

      <h2>3. Response Prioritization</h2>
      <p>
        Response times vary by subscription tier.
      </p>

      <h2>4. Maintenance and Downtime</h2>
      <p>
        Scheduled maintenance and service interruptions may occur with or without notice.
      </p>

      <h2>5. Feedback</h2>
      <p>
        User feedback may be used to improve the Service without obligation.
      </p>
      <p>
        Please email <a href="mailto:DEV.TLG96@GMAIL.COM">DEV.TLG96@GMAIL.COM</a>
      </p>
    </div>
  );
}
