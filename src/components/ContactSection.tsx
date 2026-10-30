import { useState } from 'react';
import { Mail, Phone, Clock, ShieldCheck, Check, Send, Loader2, Copy, CheckCheck } from 'lucide-react';
import { DEVELOPER_PROFILE, PLANS } from '../data/content';
import { PlanId } from '../types';
import { sendEmailToJacob, getMailtoLink, getWebGmailLink, buildInquirySummary } from '../utils/sendInquiry';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentPlan = PLANS.find((p) => p.id === selectedPlan) || PLANS[1];

  const payload = {
    name,
    email,
    phone,
    websiteUrl: siteUrl,
    planOrService: selectedPlan === 'custom' ? 'Custom Website Build / Redesign' : `${currentPlan.name} ($${currentPlan.price}/month)`,
    notesOrMessage: message,
  };

  const mailtoLink = getMailtoLink(payload, DEVELOPER_PROFILE.email);
  const mailtoOutlook = getMailtoLink(payload, DEVELOPER_PROFILE.alternateEmail);
  const webGmailLink = getWebGmailLink(payload);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // 1. Dispatch actual email directly to Jacob's inbox (jacobg.webdev@gmail.com)
    await sendEmailToJacob(payload);

    // 2. Also trigger default mail client as an instant direct backup
    try {
      window.location.href = mailtoLink;
    } catch {
      // Ignored if browser blocks popup
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildInquirySummary(payload));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-20 border-b border-neutral-900/80 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Guarantees */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
              Direct Contact &middot; No Middlemen
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Start your website maintenance today
            </h2>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Have questions about moving your site over, or need a custom build? Contact Jacob George directly. No ticketing queues, agency account reps, or lost messages.
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
                    className="text-sm font-semibold text-white hover:text-amber-400 font-mono transition-colors"
                  >
                    {DEVELOPER_PROFILE.phone}
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
                  <div className="text-xs text-neutral-400">Direct Developer Emails</div>
                  <div className="flex flex-col gap-1 mt-0.5">
                    <a
                      href={`mailto:${DEVELOPER_PROFILE.email}`}
                      className="text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                    >
                      {DEVELOPER_PROFILE.email}
                    </a>
                    <a
                      href={`mailto:${DEVELOPER_PROFILE.alternateEmail}`}
                      className="text-xs text-neutral-400 hover:text-amber-300 transition-colors"
                    >
                      {DEVELOPER_PROFILE.alternateEmail}
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
                    Direct reply within 24 hours
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

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">
                    Send a Direct Inquiry to Jacob George
                  </h3>
                  <a
                    href={`mailto:${DEVELOPER_PROFILE.email}?subject=Direct%20Inquiry%20to%20Jacob%20George`}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Skip form &amp; email directly
                  </a>
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Submitting sends your message straight to Jacob&apos;s personal inbox (<span className="text-neutral-200">{DEVELOPER_PROFILE.email}</span>) and opens your mail client.
                </p>

                {/* Plan Selection Buttons */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-2">
                    Interested Plan / Service
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('basic')}
                      className={`cursor-pointer p-2.5 rounded-lg border text-left text-xs transition-colors ${
                        selectedPlan === 'basic'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-900/80 text-neutral-400'
                      }`}
                    >
                      <div>Basic Plan</div>
                      <div className="text-amber-400 font-mono text-[11px] font-bold tabular-nums">$20/mo</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan('plus')}
                      className={`cursor-pointer p-2.5 rounded-lg border text-left text-xs transition-colors ${
                        selectedPlan === 'plus'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-900/80 text-neutral-400'
                      }`}
                    >
                      <div>Plus Plan</div>
                      <div className="text-amber-400 font-mono text-[11px] font-bold tabular-nums">
                        $40/mo (Extras: $3/$5)
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan('custom')}
                      className={`cursor-pointer p-2.5 rounded-lg border text-left text-xs transition-colors col-span-2 sm:col-span-1 ${
                        selectedPlan === 'custom'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-900/80 text-neutral-400'
                      }`}
                    >
                      <div>Custom Website</div>
                      <div className="text-neutral-400 text-[11px]">New Build / Redesign</div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-300 mb-1">
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jordan Smith"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-neutral-300 mb-1">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jordan@domain.com"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-url" className="block text-xs font-medium text-neutral-300 mb-1">
                      Website URL (if existing)
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

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-neutral-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 555-123-4567"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-medium text-neutral-300 mb-1">
                    Tell Jacob about your website or current goals
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me what you are looking for—whether it's regular updates, fixing slow speeds, or peace of mind hosting."
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                {error && (
                  <div className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded border border-rose-900">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer rounded-xl bg-amber-400 py-3 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending Directly to Jacob...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Directly to Jacob George ({DEVELOPER_PROFILE.email})
                    </>
                  )}
                </button>

                <div className="text-[11px] text-neutral-500 text-center flex flex-wrap items-center justify-center gap-2">
                  <span>Direct phone / text:</span>
                  <a href={`tel:${DEVELOPER_PROFILE.phone}`} className="text-amber-400 font-mono hover:underline">
                    {DEVELOPER_PROFILE.phone}
                  </a>
                  <span>&middot;</span>
                  <span>Direct reply within 24 hours</span>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Message Dispatched to Jacob George!
                </h3>
                <p className="text-xs text-neutral-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thanks for reaching out, {name}. Your inquiry has been sent directly to <span className="text-amber-400 font-medium">{DEVELOPER_PROFILE.email}</span>. Jacob will personally respond within 24 hours.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
                  <a
                    href={webGmailLink}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-3.5 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Open in Web Gmail
                  </a>

                  <a
                    href={mailtoOutlook}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-sky-400" />
                    Email via Outlook
                  </a>

                  <a
                    href={`tel:${DEVELOPER_PROFILE.phone}`}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-amber-400" />
                    Call / Text
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    {copied ? <CheckCheck className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied!' : 'Copy Summary'}
                  </button>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
