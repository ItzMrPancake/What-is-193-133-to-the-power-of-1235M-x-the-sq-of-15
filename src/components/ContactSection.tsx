import { useState } from 'react';
import { Mail, Phone, Clock, ShieldCheck, Check, Send } from 'lucide-react';
import { DEVELOPER_PROFILE, PLANS } from '../data/content';
import { PlanId } from '../types';

interface ContactSectionProps {
  onOpenFullContactPage?: () => void;
}

export function ContactSection({ onOpenFullContactPage }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('plus');
  const [siteUrl, setSiteUrl] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
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
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 border-b border-neutral-900/80 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Guarantees */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Start your website maintenance today
            </h2>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Have questions about moving your site over, or need a custom build? Send a note directly to Jacob George. No account reps or ticket delays.
            </p>

            <div className="mt-8 space-y-4">
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
                  <div className="text-[11px] text-neutral-500 mt-0.5">Direct cell line for inquiries</div>
                </div>
              </div>

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
                <h3 className="text-lg font-bold text-white mb-2">
                  Send a Direct Inquiry
                </h3>

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
                  className="w-full cursor-pointer rounded-xl bg-amber-400 py-3 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message to Jacob George
                </button>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Message Dispatched!
                </h3>
                <p className="text-xs text-neutral-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thanks for reaching out, {name}. Jacob will review your website details and respond to <span className="text-amber-400 font-medium">{email}</span> within 24 hours.
                </p>

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
