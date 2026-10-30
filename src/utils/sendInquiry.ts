import { DEVELOPER_PROFILE } from '../data/content';

export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  planOrService: string;
  notesOrMessage?: string;
  timeline?: string;
  editsEstimate?: number;
}

export function buildInquirySummary(payload: InquiryPayload): string {
  return `Hi Jacob,

I'd like to get in touch regarding website development / maintenance.

Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone || 'Not provided'}
Website: ${payload.websiteUrl || 'New build / not yet launched'}
Plan / Service: ${payload.planOrService}
${payload.timeline ? `Desired Timeline: ${payload.timeline}` : ''}
${payload.editsEstimate ? `Estimated Monthly Updates: ${payload.editsEstimate}` : ''}
${payload.notesOrMessage ? `Details & Notes:\n${payload.notesOrMessage}` : ''}

Looking forward to hearing from you!`;
}

export function getMailtoLink(payload: InquiryPayload, toEmail: string = DEVELOPER_PROFILE.email): string {
  const subject = `Website Inquiry from ${payload.name || 'New Client'}: ${payload.planOrService}`;
  const body = buildInquirySummary(payload);
  return `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getWebGmailLink(payload: InquiryPayload): string {
  const subject = `Website Inquiry from ${payload.name || 'New Client'}: ${payload.planOrService}`;
  const body = buildInquirySummary(payload);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(DEVELOPER_PROFILE.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends real email to Jacob George (jacobg.webdev@gmail.com) via FormSubmit AJAX service
 */
export async function sendEmailToJacob(payload: InquiryPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const summary = buildInquirySummary(payload);
    
    const response = await fetch(`https://formsubmit.co/ajax/${DEVELOPER_PROFILE.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `New Inquiry from ${payload.name}: ${payload.planOrService}`,
        _replyto: payload.email,
        _template: 'table',
        _captcha: 'false',
        'Client Name': payload.name,
        'Client Email': payload.email,
        'Client Phone': payload.phone || 'Not provided',
        'Website URL': payload.websiteUrl || 'Not specified',
        'Selected Plan / Service': payload.planOrService,
        'Timeline': payload.timeline || 'Immediate',
        'Estimated Updates': payload.editsEstimate || 'Standard',
        'Message / Notes': payload.notesOrMessage || 'None provided',
        'Full Brief Summary': summary,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    return { success: true, message: data.message || 'Sent successfully' };
  } catch (err: any) {
    console.warn('Direct FormSubmit failed or blocked, fallback to mailto', err);
    return { success: false, message: err?.message || 'Network error' };
  }
}
