import { useState } from 'react';
import { Mail, Phone, Clock, ShieldCheck, Copy, CheckCheck, Smartphone, ExternalLink, HelpCircle } from 'lucide-react';
import { DEVELOPER_PROFILE, PLANS } from '../data/content';
import { PlanId } from '../types';
import {
  getWebGmailLink,
  getWebOutlookLink,
  getMailtoLink,
  dispatchMailtoUniversal,
  buildInquirySummary,
  PRIMARY_RECIPIENT_EMAILS,
  PRIMARY_RECIPIENT_EMAIL,
} from '../utils/sendInquiry';

interface ContactSectionProps {
  onOpenFullContactPage?: () => void;
}

export function ContactSection({ onOpenFullContactPage }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('plus');
  const [siteUrl, setSiteUrl] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [mailAppAttempted, setMailAppAttempted] = useState(false);

  const currentPlan = PLANS.find((p) => p.id === selectedPlan) || PLANS[1];

  const payload = {
    name,
    email,
    phone,
    websiteUrl: siteUrl,
    planOrService: `$1,000 Upfront Build + ${currentPlan.name} ($${currentPlan.price}/month)`,
    notesOrMessage: message,
  };

  const webGmailLink = getWebGmailLink(payload);
  const webOutlookLink = getWebOutlookLink(payload);
  const deviceMailtoLink = getMailtoLink(payload);
  const messagePreview = buildInquirySummary(payload);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(messagePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleLaunchDeviceMail = (e: React.MouseEvent) => {
    e.preventDefault();
    setMailAppAttempted(true);
    dispatchMailtoUniversal(deviceMailtoLink);
  };

  return (
    <section id="contact" className="py-20 border-b border-neutral-900/80 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Guarantees */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
              Direct Contact &middot; Dedicated Care
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Start your website maintenance today
            </h2>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Have questions about moving your site over, or need a custom build? Send a note directly to Jacob George. No account reps or ticket delays.
            </p>

            <div className="mt-8 space-y-4">
              {/* Phone Card */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Direct Phone / Call or Text</div>
                  <a
                    href={`tel:${DEVELOPER_PROFILE.phone}`}
                    className="text-base font-semibold text-white hover:text-amber-400 font-mono transition-colors"
                  >
                    {DEVELOPER_PROFILE.phoneFormatted}
                  </a>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Direct cell line for quick questions &amp; onboarding</div>
                </div>
              </div>

              {/* Email Card */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Direct Developer Inboxes</div>
                  <div className="flex flex-col gap-1 mt-0.5 font-mono text-sm">
                    <a
                      href={`mailto:${DEVELOPER_PROFILE.email}`}
                      className="text-white hover:text-amber-400 transition-colors"
                    >
                      {DEVELOPER_PROFILE.email}
                    </a>
                    <a
                      href={`mailto:${DEVELOPER_PROFILE.secondaryEmail}`}
                      className="text-xs text-neutral-400 hover:text-amber-300 transition-colors"
                    >
                      {DEVELOPER_PROFILE.secondaryEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Fast Response Guarantee</div>
                  <div className="text-sm font-semibold text-white">
                    Direct reply within 24–48 hours
                  </div>
                </div>
              </div>

              {/* No Lock-in */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">No Long-Term Lock-in</div>
                  <div className="text-sm font-semibold text-white">
                    Strictly month-to-month flexibility
                  </div>
                </div>
              </div>

              {onOpenFullContactPage && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenFullContactPage}
                    className="cursor-pointer text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1.5"
                  >
                    Open Dedicated Contact &amp; Proposal Page &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Send via Gmail or Device Mail App */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-white">
                Direct Email Inquiry
              </h3>
              <span className="text-[11px] text-amber-400 font-mono">
                Sends to: {PRIMARY_RECIPIENT_EMAILS}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mb-5">
              Fill in your details below. Then click either <strong>Gmail</strong> or your <strong>Device Mail App</strong> to send your message directly to Jacob George.
            </p>

            {/* Plan Selection Buttons */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Choose Your Plan ($1,000 Upfront Build + Monthly Care)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('basic')}
                  className={`cursor-pointer p-3 rounded-xl border text-left text-xs transition-colors ${
                    selectedPlan === 'basic'
                      ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                      : 'border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Standard Care</span>
                    <span className="text-amber-400 font-mono text-xs font-bold tabular-nums">$100/mo</span>
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    $1,000 upfront build + 3 updates/mo &amp; hosting
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('plus')}
                  className={`cursor-pointer p-3 rounded-xl border text-left text-xs transition-colors ${
                    selectedPlan === 'plus'
                      ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                      : 'border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Growth Care</span>
                    <span className="text-amber-400 font-mono text-xs font-bold tabular-nums">$125/mo</span>
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    $1,000 upfront build + 10 updates &amp; 1 big layout edit
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Smith"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-url" className="block text-xs font-medium text-neutral-300 mb-1">
                    Website URL (Optional)
                  </label>
                  <input
                    id="contact-url"
                    type="text"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-medium text-neutral-300 mb-1">
                  Message, Edits Needed, or Goals
                </label>
                <textarea
                  id="contact-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell Jacob what you need—routine updates, faster site speeds, or peace-of-mind hosting..."
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              {/* THE ONLY TWO SEND OPTIONS */}
              <div className="pt-2 space-y-2.5">
                <div className="text-xs font-bold text-neutral-200 uppercase tracking-wider text-center mb-1">
                  Choose Your Sending Method:
                </div>

                {/* Button 1: Send via Gmail */}
                <a
                  href={webGmailLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full cursor-pointer rounded-xl bg-amber-400 py-3.5 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20 text-center"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send via Gmail</span>
                  <span className="text-[11px] font-normal opacity-80">(Opens Web Gmail)</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-70" />
                </a>

                {/* Button 2: Send via Device Mail App */}
                <button
                  type="button"
                  onClick={handleLaunchDeviceMail}
                  className="w-full cursor-pointer rounded-xl border border-neutral-700 bg-neutral-900 py-3.5 px-4 text-xs font-bold text-white hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-center shadow-md"
                >
                  <Smartphone className="h-4 w-4 text-sky-400" />
                  <span>Send via Mail App on Your Device</span>
                  <span className="text-[11px] font-normal text-neutral-400">(iPhone, Mac, Android, PC)</span>
                </button>

                {/* Fallback helper if computer lacks configured desktop email software */}
                {mailAppAttempted && (
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-700 text-xs text-neutral-300 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                      <HelpCircle className="h-3.5 w-3.5" />
                      Did your device mail app not open?
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Many browsers &amp; desktop PCs don&apos;t have a default email application configured. Click below to open in <strong>Outlook Web</strong>, <strong>Gmail</strong>, or copy the text:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={webOutlookLink}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-medium hover:bg-sky-500/30 transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Open in Outlook Web &rarr;
                      </a>
                      <a
                        href={webGmailLink}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-medium hover:bg-amber-400/30 transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Open in Gmail &rarr;
                      </a>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-200 text-xs font-medium hover:bg-neutral-700 transition-colors"
                      >
                        {copied ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? 'Copied!' : 'Copy Text'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="cursor-pointer text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {copied ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied to Clipboard!' : 'Copy Message Text'}
                  </button>

                  <a
                    href={`tel:${DEVELOPER_PROFILE.phone}`}
                    className="text-amber-400 font-mono hover:underline flex items-center gap-1 font-bold"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {DEVELOPER_PROFILE.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
