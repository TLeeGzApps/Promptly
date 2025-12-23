import { PageHeader } from '@/components/page-header';

export default function DocumentationPage() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <PageHeader title="Documentation" description="Document Type: Technical Reference" />

      <h2>1. Intended Audience</h2>
      <p>
        This documentation is intended for end users, administrators, and technical evaluators.
      </p>

      <h2>2. System Capabilities</h2>
      <ul>
        <li>Prompt normalization</li>
        <li>Model-specific formatting</li>
        <li>Constraint and role definition</li>
        <li>Output evaluation</li>
      </ul>

      <h2>3. Usage Recommendations</h2>
      <p>
        Users should:
      </p>
      <ul>
        <li>Validate outputs before deployment</li>
        <li>Test across models where applicable</li>
        <li>Maintain version histories</li>
      </ul>

      <h2>4. Feature Availability</h2>
      <p>
        Certain features are limited by subscription tier.
      </p>
    </div>
  );
}
