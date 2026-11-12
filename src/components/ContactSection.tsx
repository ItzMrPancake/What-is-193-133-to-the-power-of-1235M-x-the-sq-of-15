import { useState, FormEvent } from 'react';
import {
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { DEVELOPER_PROFILE, PLANS } from '../data/content';
import { PlanId } from '../types';
import { SECONDARY_RECIPIENT_EMAIL, submitFormSubmitAjax } from '../utils/sendInquiry';

interface ContactSectionProps {
  onOpenFullContactPage?: () => void;
}

export function ContactSection({ onOpenFullContactPage }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('plus');
  const [siteUrl, setSiteUrl] = useState('');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successDetail, setSuccessDetail] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentPlan = PLANS.find((p) => p.id === selectedPlan) || PLANS[1];
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
        _honey: honeyValue,
      });

      if (result.sent) {
        setName('');
        setEmail('');
        setSiteUrl('');
        setMessage('');
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

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-white">
                Contact Jacob George
              </h3>
              <span className="text-[11px] text-amber-400 font-mono">
                Sends to: {SECONDARY_RECIPIENT_EMAIL}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mb-5">
              Fill in your details below and submit your message directly to Jacob George.
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

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Hidden honeypot & selected plan */}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
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
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@company.com"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-url" className="block text-xs font-medium text-neutral-300 mb-1">
                  Website URL (Optional)
                </label>
                <input
                  id="contact-url"
                  name="websiteUrl"
                  type="text"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-medium text-neutral-300 mb-1">
                  Message, Edits Needed, or Goals <span className="text-amber-400">*</span>
                </label>
                <textarea
                  id="contact-msg"
                  name="message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell Jacob what you need—routine updates, faster site speeds, or peace-of-mind hosting..."
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              {/* Feedback States */}
              {submitSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-xs text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-emerald-300">Message sent successfully!</div>
                    <p className="text-emerald-200/80 mt-0.5">
                      {successDetail ||
                        'Thanks for reaching out. Jacob has received your inquiry and will reply within 24–48 hours.'}
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

              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer rounded-xl bg-amber-400 py-3.5 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20 text-center"
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

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-neutral-500">Direct reply within 24–48 hours</span>

                  <a
                    href={`tel:${DEVELOPER_PROFILE.phone}`}
                    className="text-amber-400 font-mono hover:underline flex items-center gap-1 font-bold"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {DEVELOPER_PROFILE.phoneFormatted}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
