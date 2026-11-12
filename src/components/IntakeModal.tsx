import { useState, useEffect, FormEvent } from 'react';
import { X, Phone, Sparkles, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { PlanId } from '../types';
import { PLANS, DEVELOPER_PROFILE } from '../data/content';
import { submitFormSubmitAjax } from '../utils/sendInquiry';

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
  const [notes, setNotes] = useState('');
  const [editsEstimate, setEditsEstimate] = useState<number>(initialEdits);
  const [honey, setHoney] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successDetail, setSuccessDetail] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const currentPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0];
  const planLabel = `$1,000 Upfront Build + ${currentPlan.name} ($${currentPlan.price}/month)`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setSuccessDetail(null);

    const formData = new FormData(e.currentTarget);
    const honeyValue = String(formData.get('_honey') ?? honey);

    // Stop submission if _honey is filled
    if (honeyValue.trim() !== '') {
      return;
    }

    const fieldValues = Object.fromEntries(
      Array.from(formData.entries()).map(([k, v]) => [k, String(v)])
    );

    setIsSubmitting(true);
    try {
      const result = await submitFormSubmitAjax({
        ...fieldValues,
        estimatedMonthlyEdits: editsEstimate,
        _honey: honeyValue,
      });

      if (result.sent) {
        setName('');
        setEmail('');
        setWebsiteUrl('');
        setNotes('');
        setHoney('');
        setSuccessDetail(result.message ?? null);
        setSubmitSuccess(true);
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Unable to send your message right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
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

        {/* Modal Header */}
        <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Contact · Direct to Jacob George
        </div>
        <h3 className="text-2xl font-bold text-white">
          Contact Jacob George
        </h3>
        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
          Every website requires a <strong>$1,000 upfront build fee</strong> paired with your chosen monthly care tier. Select your plan and submit the form below to reach Jacob directly.
        </p>

        {/* Plan / Project Selector Buttons */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-neutral-300 mb-2">
            Selected Plan ($1,000 Upfront Build + Monthly Care)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PLANS.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-neutral-900 ring-1 ring-amber-400/40'
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
                  <div className="text-[11px] text-amber-400/80 font-mono mt-0.5">
                    +$1,000 upfront build
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                    {plan.id === 'plus'
                      ? '10 updates + 1 big layout edit'
                      : '3 updates included + hosting'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          {/* Hidden spam-protection honeypot & selected plan */}
          <input
            type="text"
            name="_honey"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <input type="hidden" name="plan" value={planLabel} />

          {/* Customization Fields */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="intake-name" className="block text-xs font-medium text-neutral-300 mb-1">
                  Your Name <span className="text-amber-400">*</span>
                </label>
                <input
                  id="intake-name"
                  name="name"
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
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="intake-url" className="block text-xs font-medium text-neutral-300 mb-1">
                Website URL (Optional)
              </label>
              <input
                id="intake-url"
                name="websiteUrl"
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://mywebsite.com"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="intake-notes" className="block text-xs font-medium text-neutral-300 mb-1">
                Message or Project Goals <span className="text-amber-400">*</span>
              </label>
              <textarea
                id="intake-notes"
                name="message"
                rows={3}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell Jacob about your website goals, design style, or monthly updates needed..."
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Feedback States */}
          {submitSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-xs text-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-emerald-300">Message sent successfully!</div>
                <p className="text-emerald-200/80 mt-0.5">
                  {successDetail ||
                    'Thank you for reaching out. Jacob has received your inquiry and will reply within 24 hours.'}
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/70 text-xs text-rose-200 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-rose-300">Unable to send message</div>
                <p className="text-rose-200/80 mt-0.5">{submitError}</p>
              </div>
            </div>
          )}

          {/* Submit Action Area */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-xl bg-amber-400 py-3.5 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/25 text-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Secondary Utility Controls */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-neutral-500">Direct reply within 24 hours</span>

          <a
            href={`tel:${DEVELOPER_PROFILE.phone}`}
            className="text-amber-400 hover:underline font-mono flex items-center gap-1"
          >
            <Phone className="h-3.5 w-3.5" />
            Call / Text: {DEVELOPER_PROFILE.phoneFormatted}
          </a>
        </div>
      </div>
    </div>
  );
}
