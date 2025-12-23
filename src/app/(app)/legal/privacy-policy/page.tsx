import { PageHeader } from '@/components/page-header';

export default function PrivacyPolicyPage() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <PageHeader title="Privacy Policy" description="Document Type: Data Protection Policy" />

      <h2>1. Purpose and Legal Basis</h2>
      <p>
        This Privacy Policy outlines how personal data is processed in compliance with applicable data protection laws, including principles of lawfulness, fairness, transparency, and minimization.
      </p>

      <h2>2. Categories of Personal Data</h2>
      <h3>2.1 Identifiers</h3>
      <ul>
        <li>Account email</li>
        <li>Subscription identifiers</li>
      </ul>
      <h3>2.2 User Content</h3>
      <ul>
        <li>Prompt text</li>
        <li>Saved configurations</li>
        <li>Metadata associated with prompts</li>
      </ul>
      <h3>2.3 Technical Data</h3>
      <ul>
        <li>IP address</li>
        <li>Device identifiers</li>
        <li>Log files</li>
      </ul>

      <h2>3. Lawful Bases for Processing</h2>
      <p>
        Processing is conducted based on:
      </p>
      <ul>
        <li>Contractual necessity</li>
        <li>Legitimate interests</li>
        <li>Legal obligations</li>
      </ul>

      <h2>4. Data Sharing and Transfers</h2>
      <p>
        Personal data may be shared with:
      </p>
      <ul>
        <li>Cloud hosting providers</li>
        <li>Payment processors</li>
        <li>Security vendors</li>
      </ul>
      <p>All transfers are subject to contractual safeguards.</p>

      <h2>5. International Transfers</h2>
      <p>
        Where applicable, data transfers are protected using standard contractual clauses or equivalent safeguards.
      </p>

      <h2>6. Retention Periods</h2>
      <p>
        Data is retained only for as long as necessary to fulfill the purposes outlined herein.
      </p>

      <h2>7. User Rights</h2>
      <p>
        Users may exercise rights including:
      </p>
      <ul>
        <li>Access</li>
        <li>Rectification</li>
        <li>Erasure</li>
        <li>Restriction</li>
        <li>Objection</li>
      </ul>
      <p>Requests may be subject to identity verification.</p>

      <h2>8. Data Security</h2>
      <p>
        We implement encryption, access controls, and monitoring systems to mitigate risk.
      </p>
    </div>
  );
}
