import { PageHeader } from '@/components/page-header';

export default function TermsOfServicePage() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <PageHeader title="Terms of Use" description="Document Type: Binding Agreement" />

      <h2>1. Definitions</h2>
      <p>
        “User” refers to any individual or entity accessing the Service.
        <br />
        “Operator” refers to the entity providing the Service.
      </p>

      <h2>2. License Grant</h2>
      <p>
        Users are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>
        Users shall not:
      </p>
      <ul>
        <li>Reverse engineer the Service</li>
        <li>Exploit system vulnerabilities</li>
        <li>Interfere with normal operation</li>
        <li>Use the Service for unlawful purposes</li>
      </ul>

      <h2>4. User Content</h2>
      <p>
        Users retain ownership of content submitted. Users grant the Operator a limited license to process such content solely to provide the Service.
      </p>

      <h2>5. Subscription and Billing</h2>
      <p>
        Subscription fees are billed in advance. The Operator may modify pricing with reasonable notice.
      </p>

      <h2>6. Suspension and Termination</h2>
      <p>
        Access may be suspended or terminated for violations, abuse, or legal requirements.
      </p>

      <h2>7. Indemnification</h2>
      <p>
        Users agree to indemnify and hold harmless the Operator from claims arising from misuse of the Service.
      </p>

      <h2>8. Governing Law and Venue</h2>
      <p>
        These Terms shall be governed by the laws of the Operator’s principal place of business.
      </p>
    </div>
  );
}
