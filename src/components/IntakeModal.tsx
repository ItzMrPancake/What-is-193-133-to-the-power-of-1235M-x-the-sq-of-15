import { useState, useEffect } from 'react';
import { X, Check, Copy, CheckCheck, Mail, ArrowRight } from 'lucide-react';
import { PlanId } from '../types';
import { PLANS, DEVELOPER_PROFILE } from '../data/content';

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
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [editsEstimate, setEditsEstimate] = useState<number>(initialEdits);
  const [notes, setNotes] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
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
    setSubmitted(true);
  };

  const getSummaryText = () => {
    return `Hi Jacob,

I'd like to get started with website maintenance.

Selected Plan: ${currentPlan.name} ($${currentPlan.price}/month)
${
  currentPlan.id === 'plus'
    ? 'Includes: 10 small updates + 1 big edit/mo (Extra edits: $3 small / $5 big)'
    : 'Includes: 3 small updates/mo (Extra edits: $5/change)'
}
Client Name: ${name}
Email: ${email}
Website URL: ${websiteUrl || 'Not specified'}
Estimated Monthly Updates: ${editsEstimate}
Notes/Requirements: ${notes || 'None'}

Please let me know the next steps for onboarding.`;
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(getSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const mailtoLinkGmail = `mailto:${DEVELOPER_PROFILE.email}?subject=${encodeURIComponent(
    `Maintenance Request: ${currentPlan.name} for ${name || 'New Client'}`
  )}&body=${encodeURIComponent(getSummaryText())}`;

  const mailtoLinkOutlook = `mailto:${DEVELOPER_PROFILE.alternateEmail}?subject=${encodeURIComponent(
    `Maintenance Request: ${currentPlan.name} for ${name || 'New Client'}`
  )}&body=${encodeURIComponent(getSummaryText())}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-700 bg-neutral-950 p-6 sm:p-8 shadow-2xl max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-1">
              Start Your Plan · Direct With Jacob George
            </div>
            <h3 className="text-2xl font-bold text-white">
              Website Maintenance Onboarding
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              No immediate credit card required. Fill in your details to begin your setup and free site health assessment.
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
                    placeholder="alex@company.com"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label htmlFor="intake-url" className="block text-xs font-medium text-neutral-300 mb-1">
                  Current Website Address
                </label>
                <input
                  id="intake-url"
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourwebsite.com (or leave empty if new build)"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="intake-notes" className="block text-xs font-medium text-neutral-300 mb-1">
                  What updates or maintenance do you need help with?
                </label>
                <textarea
                  id="intake-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Need monthly blog updates, price changes, and reliable hosting without downtime..."
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              {/* Plan terms reminder */}
              <div className="rounded-lg bg-neutral-900/60 border border-neutral-800/80 p-3 text-[11px] text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-200 font-medium">
                  <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  {currentPlan.name} (${currentPlan.price}/month)
                </div>
                <div>
                  Includes web hosting, security patches, and up to{' '}
                  {currentPlan.smallUpdatesLimit} small updates per month.
                  {currentPlan.id === 'plus'
                    ? ' Extra edits are discounted to only $3 per small update and $5 per big layout edit.'
                    : ' Additional edits are $5 per small change.'}
                </div>
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
                  className="w-full cursor-pointer rounded-xl bg-amber-400 py-3 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  Confirm &amp; Send Request to Jacob
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="text-[11px] text-neutral-500 text-center mt-2">
                  Jacob George reviews every request personally within 24 hours.
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
              Request Received!
            </h3>
            <p className="text-xs text-neutral-300 mt-2 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-white">{name}</span>. Jacob George has received your request for the{' '}
              <span className="text-amber-400 font-semibold">{currentPlan.name}</span> (${currentPlan.price}/month).
            </p>

            <div className="mt-6 rounded-xl bg-neutral-900 border border-neutral-800 p-4 text-left text-xs space-y-2">
              <div className="text-neutral-400 font-medium text-[11px] uppercase tracking-wider">
                Submission Summary
              </div>
              <div className="text-neutral-200">
                <span className="text-neutral-400">Plan:</span> {currentPlan.name} (${currentPlan.price}/mo)
              </div>
              <div className="text-neutral-200">
                <span className="text-neutral-400">Extra Edits Rate:</span>{' '}
                {currentPlan.id === 'plus' ? '$3 small / $5 big' : '$5 per small edit'}
              </div>
              <div className="text-neutral-200">
                <span className="text-neutral-400">Email:</span> {email}
              </div>
              {websiteUrl && (
                <div className="text-neutral-200">
                  <span className="text-neutral-400">Website:</span> {websiteUrl}
                </div>
              )}
              <div className="text-neutral-200">
                <span className="text-neutral-400">Turnaround:</span> 24–48 hours for onboarding setup
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
              <a
                href={mailtoLinkGmail}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-3.5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email via Gmail
              </a>

              <a
                href={mailtoLinkOutlook}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2.5 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                Email via Outlook
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
            <div className="mt-3 text-[11px] text-neutral-400 text-center space-y-1">
              <div>Jacob George ({DEVELOPER_PROFILE.email} · {DEVELOPER_PROFILE.alternateEmail})</div>
              <div>Direct Phone / Text: <a href={`tel:${DEVELOPER_PROFILE.phone}`} className="text-amber-400 hover:underline font-mono">{DEVELOPER_PROFILE.phone}</a></div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-neutral-400 hover:text-white"
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
