import { PageHeader } from '@/components/page-header';

export default function AcceptableUsePage() {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <PageHeader title="Acceptable Use Policy" description="Last updated: December 23, 2025" />
      <p>
        This Acceptable Use Policy ("AUP") governs your use of the Promptly application and services ("Services") provided by Promptly ("we," "us," or "our"). By using our Services, you agree to this AUP.
      </p>

      <h2>1. Prohibited Activities</h2>
      <p>
        You may not use the Services for any illegal, harmful, or fraudulent activities. Prohibited activities include, but are not limited to:
      </p>
      <ul>
        <li>
          <strong>Illegal Content:</strong> Generating, storing, or sharing content that is unlawful, defamatory, libelous, or invasive of another's privacy.
        </li>
        <li>
          <strong>Harmful Content:</strong> Creating content that promotes hate speech, violence, discrimination, or harm to individuals or groups.
        </li>
        <li>
          <strong>Malicious Activities:</strong> Transmitting viruses, malware, or other malicious code. Attempting to gain unauthorized access to our systems or another user's account.
        -</li>
        <li>
          <strong>Spam and Phishing:</strong> Using the Services to send unsolicited communications, promotions, or advertisements (spam) or to engage in phishing.
        </li>
        <li>
          <strong>Infringement of Intellectual Property:</strong> Violating the intellectual property rights of others, including copyrights, patents, and trademarks.
        </li>
      </ul>

      <h2>2. Content Standards</h2>
      <p>
        You are solely responsible for the content you generate using our Services. While we do not actively monitor content, we reserve the right to investigate and remove content that violates this AUP.
      </p>

      <h2>3. Enforcement</h2>
      <p>
        We reserve the right to suspend or terminate your access to the Services, with or without notice, for any violation of this AUP. We may also report any illegal activities to the appropriate law enforcement authorities.
      </p>

      <h2>4. Changes to This Policy</h2>
      <p>
        We may update this AUP from time to time. We will notify you of any significant changes by posting the new policy on our website.
      </p>
    </div>
  );
}
