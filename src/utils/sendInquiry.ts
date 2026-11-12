import { DEVELOPER_PROFILE } from '../data/content';

export interface InquiryPayload {
  name?: string;
  email?: string;
  phone?: string;
  websiteUrl?: string;
  planOrService: string;
  notesOrMessage?: string;
  timeline?: string;
  editsEstimate?: number;
}

export function buildInquirySummary(payload: InquiryPayload): string {
  const lines: string[] = [
    `Hi Jacob,`,
    ``,
    `I am interested in website development and monthly maintenance.`,
    ``,
    `----------------------------------------`,
    `REQUEST DETAILS:`,
    `Plan / Service: ${payload.planOrService}`,
  ];

  if (payload.name) {
    lines.push(`My Name: ${payload.name}`);
  }
  if (payload.email) {
    lines.push(`My Email: ${payload.email}`);
  }
  if (payload.phone) {
    lines.push(`My Phone: ${payload.phone}`);
  }
  if (payload.websiteUrl) {
    lines.push(`Current Website: ${payload.websiteUrl}`);
  }
  if (payload.timeline) {
    lines.push(`Desired Start Timeline: ${payload.timeline}`);
  }
  if (payload.editsEstimate) {
    lines.push(`Estimated Monthly Updates: ~${payload.editsEstimate}/month`);
  }
  if (payload.notesOrMessage) {
    lines.push(``, `Project Notes & Goals:`, payload.notesOrMessage);
  }

  lines.push(
    ``,
    `----------------------------------------`,
    `Please let me know the next steps for getting started!`,
    `Thanks!`
  );

  return lines.join('\n');
}

export const PRIMARY_RECIPIENT_EMAIL = 'blaiseplays12@gmail.com';
export const SECONDARY_RECIPIENT_EMAIL = 'jacobg.webdev@gmail.com';
export const PRIMARY_RECIPIENT_EMAILS = `${PRIMARY_RECIPIENT_EMAIL}, ${SECONDARY_RECIPIENT_EMAIL}`;

/**
 * Generates an RFC-compliant mailto URI:
 * Single primary recipient in path (avoids crash/rejection in Apple Mail & Windows Outlook),
 * and secondary recipient in CC parameter.
 */
export function getMailtoLink(
  payload: InquiryPayload,
  primaryTo: string = PRIMARY_RECIPIENT_EMAIL,
  ccTo: string = SECONDARY_RECIPIENT_EMAIL
): string {
  const subject = `Website Maintenance Request: ${payload.planOrService} ${payload.name ? `from ${payload.name}` : ''}`;
  const body = buildInquirySummary(payload);

  const queryParts: string[] = [];
  if (ccTo) {
    queryParts.push(`cc=${encodeURIComponent(ccTo)}`);
  }
  queryParts.push(`subject=${encodeURIComponent(subject)}`);
  queryParts.push(`body=${encodeURIComponent(body)}`);

  return `mailto:${encodeURIComponent(primaryTo)}?${queryParts.join('&')}`;
}

export function getWebGmailLink(payload: InquiryPayload): string {
  const subject = `Website Maintenance Request: ${payload.planOrService} ${payload.name ? `from ${payload.name}` : ''}`;
  const body = buildInquirySummary(payload);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PRIMARY_RECIPIENT_EMAIL)}&cc=${encodeURIComponent(SECONDARY_RECIPIENT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getWebOutlookLink(payload: InquiryPayload): string {
  const subject = `Website Maintenance Request: ${payload.planOrService} ${payload.name ? `from ${payload.name}` : ''}`;
  const body = buildInquirySummary(payload);
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(PRIMARY_RECIPIENT_EMAIL)}&cc=${encodeURIComponent(SECONDARY_RECIPIENT_EMAIL)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Universal mailto dispatcher that breaks out of iframe sandbox constraints
 */
export function dispatchMailtoUniversal(mailtoUrl: string) {
  try {
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_top';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Ignored
    }
  }
}

export const FORMSUBMIT_AJAX_ENDPOINT = 'https://formsubmit.co/ajax/jacobg.webdev@gmail.com';

export interface FormSubmitFields {
  [key: string]: string | number | undefined;
  _honey?: string;
}

export interface FormSubmitResult {
  sent: boolean;
  message?: string;
}

export async function submitFormSubmitAjax(fields: FormSubmitFields): Promise<FormSubmitResult> {
  // Stop submission if _honey is filled (spam protection)
  if (fields._honey && String(fields._honey).trim() !== '') {
    return { sent: false };
  }

  const payload: Record<string, string | number> = {
    ...Object.fromEntries(
      Object.entries(fields)
        .filter(([key, value]) => key !== '_honey' && key !== '_subject' && key !== '_captcha' && value !== undefined)
        .map(([key, value]) => [key, value as string | number])
    ),
    _subject: 'New Contact Form Submission',
    _captcha: 'false',
    _honey: fields._honey ? String(fields._honey) : '',
  };

  const response = await fetch(FORMSUBMIT_AJAX_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);
  const serverMessage =
    data && typeof data.message === 'string' && data.message.trim() !== ''
      ? data.message.trim()
      : undefined;

  if (!response.ok || (data && (data.success === 'false' || data.success === false))) {
    throw new Error(
      serverMessage || 'Failed to send your message. Please try again.'
    );
  }

  return { sent: true, message: serverMessage };
}
