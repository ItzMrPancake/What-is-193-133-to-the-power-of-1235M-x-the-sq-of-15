import { useState, useEffect } from 'react';
import { X, Check, Copy, CheckCheck, Mail, ArrowRight, Phone, Loader2, ExternalLink } from 'lucide-react';
import { PlanId } from '../types';
import { PLANS, DEVELOPER_PROFILE } from '../data/content';
import { sendEmailToJacob, getMailtoLink, getWebGmailLink, buildInquirySummary } from '../utils/sendInquiry';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: PlanId;
  initialEdits?: number;
}

export function IntakeModal({
  isOpen,
  onClose,
  initialPlanId = 'plus',
  initialEdits = 3,
}: IntakeModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(initialPlanId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [editsEstimate, setEditsEstimate] = useState<number>(initialEdits);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPlanId) {
      setSelectedPlanId(initialPlanId);
    }
  }, [initialPlanId]);

  useEffect(() => {
    if (initialEdits) {
      setEditsEstimate(initialEdits);
    }
  }, [initialEdits]);

  if (!isOpen) return null;

  const currentPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[1];

  const payload = {
    name,
    email,
    phone,
    websiteUrl,
    planOrService: `${currentPlan.name} ($${currentPlan.price}/month)`,
    notesOrMessage: notes,
    editsEstimate,
  };

  const mailtoLinkGmail = getMailtoLink(payload, DEVELOPER_PROFILE.email);
  const mailtoLinkOutlook = getMailtoLink(payload, DEVELOPER_PROFILE.alternateEmail);
  const webGmailLink = getWebGmailLink(payload);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and a valid email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // 1. Dispatch actual email directly to Jacob's inbox (jacobg.webdev@gmail.com)
    await sendEmailToJacob(payload);

    // 2. Also open their mail client directly as a fallback so they can review / send
    try {
      window.location.href = mailtoLinkGmail;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-700 bg-neutral-950 p-6 sm:p-8 shadow-2xl max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Direct Contact Banner */}
        <div className="mb-6 p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-semibold text-amber-400">Direct Developer Access:</div>
            <div className="text-neutral-300">Call or text Jacob George: <a href={`tel:${DEVELOPER_PROFILE.phone}`} className="font-mono text-white hover:underline">{DEVELOPER_PROFILE.phone}</a></div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${DEVELOPER_PROFILE.email}?subject=Website%20Maintenance%20Plan%20Inquiry`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-bold text-[11px] hover:bg-amber-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Direct Email
            </a>
            <a
              href={`tel:${DEVELOPER_PROFILE.phone}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-semibold text-[11px] hover:bg-neutral-800 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-amber-400" />
              Call Now
            </a>
          </div>
        </div>

        {!submitted ? (
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-1">
              Start Your Plan With Jacob George
            </div>
            <h3 className="text-2xl font-bold text-white">
              Website Maintenance Setup
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              No contracts or lock-in fees. Submitting this form sends your request directly to Jacob&apos;s personal inbox (<span className="text-neutral-200">{DEVELOPER_PROFILE.email}</span>) and opens your direct email.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Plan Selector Buttons */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Select Plan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-amber-400 bg-neutral-900 ring-1 ring-amber-400/30'
                            : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">
                            {plan.name}
                          </span>
                          <span className="font-mono text-xs font-bold text-amber-400 tabular-nums">
                            ${plan.price}/mo
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                          {plan.id === 'plus'
                            ? '10 updates + 1 layout edit · Extras $3/$5'
                            : '3 updates included · Extras $5'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="intake-name" className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="intake-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="intake-email" className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="intake-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Website URL & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="intake-url" className="block text-xs font-medium text-neutral-300 mb-1">
                    Website URL (or current platform)
                  </label>
                  <input
                    id="intake-url"
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://mywebsite.com"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="intake-phone" className="block text-xs font-medium text-neutral-300 mb-1">
                    Phone (Optional for call/text)
                  </label>
                  <input
                    id="intake-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 555-123-4567"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Monthly edits expectation */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label htmlFor="intake-edits" className="font-medium text-neutral-300">
                    Typical Monthly Edits You Anticipate
                  </label>
                  <span className="font-mono text-amber-400 font-bold">
                    ~{editsEstimate} updates/mo
                  </span>
                </div>
                <input
                  id="intake-edits"
                  type="range"
                  min={1}
                  max={25}
                  value={editsEstimate}
                  onChange={(e) => setEditsEstimate(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                />
              </div>

              {/* Specific notes */}
              <div>
                <label htmlFor="intake-notes" className="block text-xs font-medium text-neutral-300 mb-1">
                  Notes, Current Hosting, or Priority Edits Needed
                </label>
                <textarea
                  id="intake-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell Jacob about your site (WordPress, Webflow, React, custom code, etc.) and what you'd like handled first..."
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              {error && (
                <div className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded border border-rose-900">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
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
                      Send Request to Jacob George ({DEVELOPER_PROFILE.email})
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <div className="text-[11px] text-neutral-400 text-center mt-2">
                  Direct dispatch to {DEVELOPER_PROFILE.email} &middot; Or call/text {DEVELOPER_PROFILE.phone}
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Check className="h-6 w-6" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              Inquiry Dispatched!
            </h3>
            <p className="text-xs text-neutral-300 mt-2 max-w-sm mx-auto leading-relaxed">
              Your message for the <span className="text-amber-400 font-semibold">{currentPlan.name}</span> has been sent directly to <span className="text-white font-medium">{DEVELOPER_PROFILE.email}</span>.
            </p>

            <div className="mt-6 rounded-xl bg-neutral-900 border border-neutral-800 p-4 text-left text-xs space-y-2">
              <div className="text-neutral-400 font-medium text-[11px] uppercase tracking-wider">
                Request Details
              </div>
              <div className="text-neutral-200">
                <span className="text-neutral-400">Plan:</span> {currentPlan.name} (${currentPlan.price}/mo)
              </div>
              <div className="text-neutral-200">
                <span className="text-neutral-400">Client:</span> {name} ({email})
              </div>
              {phone && (
                <div className="text-neutral-200">
                  <span className="text-neutral-400">Phone:</span> {phone}
                </div>
              )}
              {websiteUrl && (
                <div className="text-neutral-200">
                  <span className="text-neutral-400">Website:</span> {websiteUrl}
                </div>
              )}
              <div className="text-neutral-200">
                <span className="text-neutral-400">Turnaround:</span> Jacob personally responds within 24 hours
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
              <a
                href={webGmailLink}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-3.5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Open in Web Gmail
              </a>

              <a
                href={mailtoLinkOutlook}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2.5 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                Email via Outlook
              </a>

              <a
                href={`tel:${DEVELOPER_PROFILE.phone}`}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2.5 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                Call / Text Jacob
              </a>

              <button
                type="button"
                onClick={handleCopySummary}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2.5 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                {copied ? <CheckCheck className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy Summary'}
              </button>
            </div>

            <div className="mt-4 text-[11px] text-neutral-400 text-center space-y-1">
              <div>Jacob George ({DEVELOPER_PROFILE.email} &middot; {DEVELOPER_PROFILE.alternateEmail})</div>
              <div>Direct Phone / Text: <a href={`tel:${DEVELOPER_PROFILE.phone}`} className="text-amber-400 hover:underline font-mono">{DEVELOPER_PROFILE.phone}</a></div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer text-xs text-neutral-400 hover:text-white transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
