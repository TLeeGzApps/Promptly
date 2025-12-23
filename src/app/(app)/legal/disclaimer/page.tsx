import { PageHeader } from '@/components/page-header';

export default function DisclaimerPage() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <PageHeader title="Disclaimer" description="Document Type: Legal Notice" />
      
      <h2>1. Scope and Purpose</h2>
      <p>
        This application and all related services, features, content, interfaces, software, APIs, documentation, and tools (collectively, the <strong>“Service”</strong>) are provided strictly on an <strong>“as is” and “as available” basis</strong> for general informational, productivity, and workflow enhancement purposes.
      </p>
      <p>
        The Service is intended to assist users in structuring, formatting, translating, and optimizing textual prompts for interaction with third-party artificial intelligence systems. The Service <strong>does not guarantee outcomes, accuracy, or suitability for any specific purpose</strong>.
      </p>

      <h2>2. No Professional Advice</h2>
      <p>
        Nothing provided by the Service constitutes, or is intended to constitute:
      </p>
      <ul>
        <li>Legal advice</li>
        <li>Medical advice</li>
        <li>Financial or investment advice</li>
        <li>Regulatory or compliance advice</li>
        <li>Professional consulting services</li>
      </ul>
      <p>
        Users are solely responsible for obtaining independent professional advice where appropriate.
      </p>

      <h2>3. No Professional or Fiduciary Relationship</h2>
      <p>
        Use of the Service does not create any professional, fiduciary, agency, partnership, joint venture, or confidential relationship between the user and the Service operator.
      </p>

      <h2>4. Artificial Intelligence Limitations</h2>
      <p>
        The Service relies on probabilistic AI systems that:
      </p>
      <ul>
        <li>Generate non-deterministic outputs</li>
        <li>May hallucinate, omit, or misinterpret information</li>
        <li>May produce biased or incomplete content</li>
      </ul>
      <p>
        The Service does not independently verify or validate AI outputs.
      </p>

      <h2>5. Third-Party Dependencies</h2>
      <p>
        The Service may interoperate with or prepare content for third-party AI platforms. The Service:
      </p>
      <ul>
        <li>Exercises no control over third-party outputs</li>
        <li>Assumes no responsibility for third-party service availability</li>
        <li>Does not endorse or certify third-party content</li>
      </ul>

      <h2>6. Warranty Disclaimer</h2>
      <p>
        To the fullest extent permitted by law, all warranties—express, implied, or statutory—are disclaimed, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        In no event shall the Service operator be liable for indirect, incidental, consequential, special, or punitive damages, including loss of data, profits, or business opportunities.
      </p>
    </div>
  );
}
