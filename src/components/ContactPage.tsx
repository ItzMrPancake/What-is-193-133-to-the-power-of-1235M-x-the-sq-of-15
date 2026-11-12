import { useState, FormEvent } from 'react';
import {
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Send,
  Copy,
  CheckCheck,
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/content';
import { PlanId } from '../types';
import { submitFormSubmitAjax } from '../utils/sendInquiry';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenIntake: (planId?: PlanId) => void;
}

export function ContactPage({ onNavigateHome, onOpenIntake }: ContactPageProps) {
  const [selectedService, setSelectedService] = useState<string>('plus');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [timeline, setTimeline] = useState('immediate');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successDetail, setSuccessDetail] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async (textToCopy: string, type: 'gmail' | 'outlook' | 'phone') => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
    }
  };

  const getServiceLabel = () => {
    switch (selectedService) {
      case 'basic':
        return '$1,000 Upfront Build + Standard Care ($100/month · Extras: $5 small / $15 big)';
      case 'plus':
        return '$1,000 Upfront Build + Growth Care ($125/month · Extras: $3 small / $10 big)';
      case 'speed':
        return 'Website Speed & Performance Optimization';
      default:
        return '$1,000 Upfront Custom Website Build & Monthly Care';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);
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
        setPhone('');
        setCompany('');
        setWebsiteUrl('');
        setTimeline('immediate');
        setMessage('');
        setHoney('');
        setSuccessDetail(result.message ?? null);
        setSubmitted(true);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to send your inquiry right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumb & Back Link */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <button
            type="button"
            onClick={onNavigateHome}
            className="cursor-pointer hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </button>
          <span className="text-neutral-600">/</span>
          <span className="text-amber-400 font-medium">Contact Jacob George</span>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
            Direct Developer Communication
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
            Let&apos;s build and protect your website.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
            Every custom website project starts with a <span className="text-white font-semibold">$1,000 upfront build fee</span>, combined with dedicated monthly developer care: <span className="text-amber-400 font-medium">Standard Care ($100/mo)</span> or <span className="text-amber-400 font-medium">Growth Care ($125/mo)</span>. Send me a message directly—I reply within 24 hours.
          </p>
        </div>

        {/* Contact Cards Strip */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Direct Phone */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="rounded-lg bg-amber-400/10 p-2.5 text-amber-400">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Call or Text
                </span>
              </div>
              <h2 className="text-base font-bold text-white">Direct Cell</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Direct phone line for quick consults, urgent updates, and calls.
              </p>
              <div className="mt-4 font-mono text-sm font-semibold text-amber-400 break-all select-all">
                {DEVELOPER_PROFILE.phone}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2">
              <a
                href={`tel:${DEVELOPER_PROFILE.phone}`}
                className="flex-1 text-center py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                Call Now
              </a>
              <button
                type="button"
                onClick={() => handleCopy(DEVELOPER_PROFILE.phone, 'phone')}
                className="cursor-pointer p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors"
                title="Copy phone number"
              >
                {copied === 'phone' ? (
                  <CheckCheck className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Gmail */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="rounded-lg bg-amber-400/10 p-2.5 text-amber-400">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Primary Email
                </span>
              </div>
              <h2 className="text-base font-bold text-white">Gmail</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Fastest response for maintenance requests and new inquiries.
              </p>
              <div className="mt-4 font-mono text-sm font-semibold text-amber-400 break-all select-all">
                {DEVELOPER_PROFILE.email}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2">
              <a
                href={`mailto:${DEVELOPER_PROFILE.email}`}
                className="flex-1 text-center py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                Send Email
              </a>
              <button
                type="button"
                onClick={() => handleCopy(DEVELOPER_PROFILE.email, 'gmail')}
                className="cursor-pointer p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors"
                title="Copy email"
              >
                {copied === 'gmail' ? (
                  <CheckCheck className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Card 3: Outlook */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="rounded-lg bg-sky-500/10 p-2.5 text-sky-400">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Alternate Email
                </span>
              </div>
              <h2 className="text-base font-bold text-white">Outlook</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Direct mailbox for business proposals and enterprise accounts.
              </p>
              <div className="mt-4 font-mono text-sm font-semibold text-sky-400 break-all select-all">
                {DEVELOPER_PROFILE.alternateEmail}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2">
              <a
                href={`mailto:${DEVELOPER_PROFILE.alternateEmail}`}
                className="flex-1 text-center py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                Send Email
              </a>
              <button
                type="button"
                onClick={() =>
                  handleCopy(DEVELOPER_PROFILE.alternateEmail, 'outlook')
                }
                className="cursor-pointer p-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors"
                title="Copy email"
              >
                {copied === 'outlook' ? (
                  <CheckCheck className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Card 4: Availability & Response Time */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Active
                </span>
              </div>
              <h2 className="text-base font-bold text-white">Turnaround &amp; Hours</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Direct 1-on-1 developer attention without middle management.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">&bull;</span>
                  <span>Inquiry response: <strong>Within 24 hours</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">&bull;</span>
                  <span>Maintenance edits: <strong>24–48 hours</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">&bull;</span>
                  <span>Phone: <strong>{DEVELOPER_PROFILE.phone}</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
              Zero lock-in contracts · Month-to-month flexibility
            </div>
          </div>
        </div>

        {/* Main Content Grid: Detailed Contact Form & FAQ */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Hidden spam-protection honeypot & selected service */}
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
                <input type="hidden" name="service" value={getServiceLabel()} />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Send Jacob a Project Inquiry
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Fill out the form below. I will reply with next steps and a customized proposal.
                  </p>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    What plan or service do you need? <span className="text-amber-400">*</span>
                  </label>
                  <p className="text-[11px] text-neutral-400 mb-3">
                    Every custom website project starts with a <strong>$1,000 upfront build fee</strong> paired with your monthly developer care plan.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedService('basic')}
                      className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
                        selectedService === 'basic'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">Standard Care Package</div>
                      <div className="text-amber-400 font-mono text-xs font-bold tabular-nums mt-0.5">
                        $100 / mo <span className="text-neutral-400 font-normal text-[11px]">(+$1,000 upfront build)</span>
                      </div>
                      <div className="text-neutral-400 text-[11px] mt-1">
                        3 small updates/mo, managed hosting &amp; monthly security maintenance
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedService('plus')}
                      className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
                        selectedService === 'plus'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>Growth Care Package</span>
                        <Sparkles className="h-3 w-3 text-amber-400" />
                      </div>
                      <div className="text-amber-400 font-mono text-xs font-bold tabular-nums mt-0.5">
                        $125 / mo <span className="text-neutral-400 font-normal text-[11px]">(+$1,000 upfront build)</span>
                      </div>
                      <div className="text-neutral-400 text-[11px] mt-1">
                        10 updates/mo, 1 major layout edit/mo, lowest extras ($3/$10)
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedService('speed')}
                      className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all sm:col-span-2 ${
                        selectedService === 'speed'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white">Speed &amp; Performance Audit</div>
                        <span className="text-amber-400 text-[11px] font-semibold">Existing Sites</span>
                      </div>
                      <div className="text-neutral-400 text-[11px] mt-0.5">
                        Deep-dive audit &amp; sub-second performance optimization for already deployed websites
                      </div>
                    </button>
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-page-name" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="contact-page-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rachel Adams"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-page-email" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="contact-page-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rachel@brand.com"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Website URL, Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="contact-page-url" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Website URL
                    </label>
                    <input
                      id="contact-page-url"
                      name="websiteUrl"
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-page-phone" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Phone (Optional)
                    </label>
                    <input
                      id="contact-page-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 555-123-4567"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-page-company" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Company (Optional)
                    </label>
                    <input
                      id="contact-page-company"
                      name="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Studio Adams LLC"
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="contact-page-timeline" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Desired Start Timeline
                  </label>
                  <select
                    id="contact-page-timeline"
                    name="timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="immediate">Immediate (Ready to start this week)</option>
                    <option value="next-month">Within the next month</option>
                    <option value="planning">Just planning &amp; researching pricing</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-page-msg" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Message / Project Description <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="contact-page-msg"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Jacob about your current website, the pain points you are facing, or what updates you need handled each month..."
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                {submitted && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-xs text-emerald-200 flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-emerald-300">Project inquiry sent!</div>
                      <p className="text-emerald-200/80 mt-0.5">
                        {successDetail ||
                          'Thank you for reaching out. Jacob has received your details and will reply within 24 hours.'}
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/70 text-xs text-rose-200 flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-rose-300">Unable to send message</div>
                      <p className="text-rose-200/80 mt-0.5">{error}</p>
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer rounded-xl bg-amber-400 py-3.5 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20 text-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Project Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-neutral-400 text-center flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span>Direct phone / text:</span>
                  <a href={`tel:${DEVELOPER_PROFILE.phone}`} className="text-amber-400 font-mono hover:underline font-bold">
                    {DEVELOPER_PROFILE.phoneFormatted}
                  </a>
                  <span>&middot;</span>
                  <span>Direct reply within 24–48 hours</span>
                </div>
              </form>
            </div>

          {/* Right: What to Expect & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400" />
                What happens after you reach out?
              </h2>

              <ol className="space-y-4 text-xs text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-amber-400 shrink-0">01.</span>
                  <div>
                    <div className="font-semibold text-white">Personal Audit &amp; Response</div>
                    <div className="text-neutral-400 mt-0.5">
                      Jacob reviews your website, tests current load speed, and replies with honest guidance within 24 hours.
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-amber-400 shrink-0">02.</span>
                  <div>
                    <div className="font-semibold text-white">Seamless Plan Setup</div>
                    <div className="text-neutral-400 mt-0.5">
                      Whether you choose Standard Care ($100/mo) or Growth Care ($125/mo), we initiate your $1,000 custom build and ongoing support immediately.
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-amber-400 shrink-0">03.</span>
                  <div>
                    <div className="font-semibold text-white">Ongoing Peace of Mind</div>
                    <div className="text-neutral-400 mt-0.5">
                      Whenever you need updates, just email or message. Turnaround is 24–48 hours, every time.
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            {/* Quick Pricing Recall Card */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
              <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                Build &amp; Care Plans Summary
              </h2>
              <p className="text-[11px] text-neutral-400 mb-4">
                All projects include a <strong>$1,000 upfront custom build</strong> paired with monthly developer care.
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="flex justify-between font-semibold text-white">
                    <span>Standard Care Package</span>
                    <span className="text-amber-400 font-mono tabular-nums">$100/mo</span>
                  </div>
                  <div className="text-amber-400/80 font-mono text-[11px] mt-0.5">
                    +$1,000 upfront custom build
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    Managed hosting + SSL + 3 updates/mo (extra small: $5, layout: $15)
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-neutral-950 border border-amber-400/40">
                  <div className="flex justify-between font-semibold text-white">
                    <span className="flex items-center gap-1.5">
                      <span>Growth Care Package</span>
                      <Sparkles className="h-3 w-3 text-amber-400" />
                    </span>
                    <span className="text-amber-400 font-mono tabular-nums">$125/mo</span>
                  </div>
                  <div className="text-amber-400/80 font-mono text-[11px] mt-0.5">
                    +$1,000 upfront custom build
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    Managed hosting + 10 updates + 1 major layout edit/mo (extra small: $3, layout: $10)
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
                <span className="text-neutral-400">Ready to activate?</span>
                <button
                  type="button"
                  onClick={() => onOpenIntake('plus')}
                  className="cursor-pointer text-amber-400 hover:text-amber-300 font-semibold"
                >
                  Open Intake Form &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
