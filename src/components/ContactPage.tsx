import { useState } from 'react';
import {
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Send,
  Check,
  Copy,
  CheckCheck,
  ArrowLeft,
  Calendar,
  Globe,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { DEVELOPER_PROFILE, PLANS } from '../data/content';
import { PlanId } from '../types';

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
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please provide your name, email address, and a brief message.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const getServiceLabel = () => {
    switch (selectedService) {
      case 'basic':
        return 'Basic Maintenance Plan ($20/month)';
      case 'plus':
        return 'Plus Maintenance Plan ($40/month · Extras: $3 small / $5 big)';
      case 'custom':
        return 'Custom Website Development / Redesign';
      case 'speed':
        return 'Website Speed & Performance Optimization';
      default:
        return 'General Website Inquiry';
    }
  };

  const formattedSummary = `Hi Jacob,

I'm contacting you via your website contact page.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company / Brand: ${company || 'N/A'}
Website: ${websiteUrl || 'New build / not yet launched'}
Service Needed: ${getServiceLabel()}
Desired Timeline: ${timeline}
Details:
${message}`;

  const mailtoGmail = `mailto:${DEVELOPER_PROFILE.email}?subject=${encodeURIComponent(
    `Inquiry from ${name}: ${getServiceLabel()}`
  )}&body=${encodeURIComponent(formattedSummary)}`;

  const mailtoOutlook = `mailto:${DEVELOPER_PROFILE.alternateEmail}?subject=${encodeURIComponent(
    `Inquiry from ${name}: ${getServiceLabel()}`
  )}&body=${encodeURIComponent(formattedSummary)}`;

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
            Let&apos;s talk about your website.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
            Whether you need the <span className="text-white font-medium">Basic Plan ($20/mo)</span>, <span className="text-white font-medium">Plus Plan ($40/mo)</span>, or a brand-new high-performance custom build, send me a message directly. I personally review every inquiry and reply within 24 hours.
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
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                    What service do you need? <span className="text-amber-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedService('basic')}
                      className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                        selectedService === 'basic'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">Basic Maintenance</div>
                      <div className="text-amber-400 font-mono text-[11px] font-semibold tabular-nums">
                        $20 / mo (3 updates)
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedService('plus')}
                      className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                        selectedService === 'plus'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>Plus Maintenance</span>
                        <Sparkles className="h-3 w-3 text-amber-400" />
                      </div>
                      <div className="text-amber-400 font-mono text-[11px] font-semibold tabular-nums">
                        $40 / mo (Extras: $3/$5)
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedService('custom')}
                      className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                        selectedService === 'custom'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">Custom Web Development</div>
                      <div className="text-neutral-400 text-[11px]">Bespoke React / Next.js</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedService('speed')}
                      className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                        selectedService === 'speed'
                          ? 'border-amber-400 bg-neutral-950 text-white font-semibold ring-1 ring-amber-400/30'
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">Speed &amp; Performance</div>
                      <div className="text-neutral-400 text-[11px]">Sub-second optimization</div>
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
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Jacob about your current website, the pain points you are facing, or what updates you need handled each month..."
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                {error && (
                  <div className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-900">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-xl bg-amber-400 py-3.5 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20"
                >
                  <Send className="h-4 w-4" />
                  Send Inquiry to Jacob George
                </button>
                <div className="text-[11px] text-neutral-500 text-center">
                  Direct reply guaranteed within 24 hours · No spam, ever
                </div>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Message Dispatched!
                </h2>
                <p className="text-xs text-neutral-300 mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{name}</span>. Your inquiry for{' '}
                  <span className="text-amber-400 font-semibold">{getServiceLabel()}</span> has been recorded. Jacob will reply directly to{' '}
                  <span className="text-white font-medium">{email}</span> within 24 hours.
                </p>

                {/* Email client direct options */}
                <div className="mt-8 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-left">
                  <div className="text-xs font-semibold text-neutral-300 mb-2">
                    Want to send this directly from your email app?
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={mailtoGmail}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-amber-400 px-3.5 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Open in Gmail ({DEVELOPER_PROFILE.email})
                    </a>
                    <a
                      href={mailtoOutlook}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-sky-400" />
                      Open in Outlook
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
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
                  <span className="text-neutral-700">&middot;</span>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="text-xs text-amber-400 hover:text-amber-300"
                  >
                    Return to Homepage &rarr;
                  </button>
                </div>
              </div>
            )}
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
                      If you choose Basic ($20) or Plus ($40), we complete onboarding in 15 minutes with no site downtime.
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
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                Maintenance Plans Quick Summary
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="flex justify-between font-semibold text-white">
                    <span>Basic Plan</span>
                    <span className="text-amber-400 font-mono tabular-nums">$20/mo</span>
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    Hosting + Security + 3 small updates/mo ($5 extra edits)
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-950 border border-amber-400/40">
                  <div className="flex justify-between font-semibold text-white">
                    <span>Plus Plan</span>
                    <span className="text-amber-400 font-mono tabular-nums">$40/mo</span>
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    Hosting + Priority + 10 small + 1 big edit/mo (Extras: $3 small / $5 big)
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
