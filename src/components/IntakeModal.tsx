import { useState, useEffect } from 'react';
import { X, Mail, Phone, ExternalLink, Copy, CheckCheck, Sparkles, Smartphone, HelpCircle } from 'lucide-react';
import { PlanId } from '../types';
import { PLANS, DEVELOPER_PROFILE } from '../data/content';
import {
  getWebGmailLink,
  getWebOutlookLink,
  getMailtoLink,
  dispatchMailtoUniversal,
  buildInquirySummary,
  PRIMARY_RECIPIENT_EMAILS,
  PRIMARY_RECIPIENT_EMAIL,
} from '../utils/sendInquiry';

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
  const [copied, setCopied] = useState(false);
  const [mailAppAttempted, setMailAppAttempted] = useState(false);

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

  const currentPlan = PLANS.find((p) => p.id === selectedPlanId);
  const planLabel =
    selectedPlanId === 'custom'
      ? 'Custom Website Build ($1,000 even)'
      : currentPlan
        ? `${currentPlan.name} ($${currentPlan.price}/month)`
        : 'Plus Plan ($40/month)';

  const payload = {
    name,
    email,
    phone,
    websiteUrl,
    planOrService: planLabel,
    notesOrMessage: notes,
    editsEstimate,
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
          Direct Email Dispatch · Direct to Jacob George
        </div>
        <h3 className="text-2xl font-bold text-white">
          Start Your Website Plan or Project
        </h3>
        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
          Select your plan or custom project below. When ready, click either <strong>Gmail</strong> or your <strong>Device Mail App</strong> to dispatch your request directly to Jacob George.
        </p>

        {/* Plan / Project Selector Buttons */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-neutral-300 mb-2">
            Selected Service / Plan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PLANS.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-neutral-900 ring-1 ring-amber-400/40'
                      : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {plan.name}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-amber-400 tabular-nums mt-0.5">
                    ${plan.price}/mo
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                    {plan.id === 'plus'
                      ? '10 updates + 1 big'
                      : '3 updates included'}
                  </div>
                </button>
              );
            })}

            {/* Custom Website Build ($1,000 even) */}
            <button
              type="button"
              onClick={() => setSelectedPlanId('custom')}
              className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                selectedPlanId === 'custom'
                  ? 'border-amber-400 bg-neutral-900 ring-1 ring-amber-400/40'
                  : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">
                  Custom Website
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-amber-400 tabular-nums mt-0.5">
                $1,000 even
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                New Build / Redesign
              </div>
            </button>
          </div>
        </div>

        {/* Customization Fields */}
        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="intake-name" className="block text-xs font-medium text-neutral-300 mb-1">
                Your Name (Optional)
              </label>
              <input
                id="intake-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="intake-url" className="block text-xs font-medium text-neutral-300 mb-1">
                Website URL (Optional)
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
          </div>

          <div>
            <label htmlFor="intake-notes" className="block text-xs font-medium text-neutral-300 mb-1">
              Notes or Questions (Optional)
            </label>
            <input
              id="intake-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Need monthly updates or a $1,000 custom website redesign"
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* THE ONLY TWO SEND OPTIONS */}
        <div className="mt-5 space-y-2.5">
          <div className="text-xs font-bold text-neutral-200 uppercase tracking-wider text-center">
            Choose Your Sending Method:
          </div>

          {/* Button 1: Send via Gmail */}
          <a
            href={webGmailLink}
            target="_blank"
            rel="noreferrer"
            className="w-full cursor-pointer rounded-xl bg-amber-400 py-3.5 px-4 text-xs font-bold text-neutral-950 hover:bg-amber-300 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-amber-950/25 text-center"
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
            className="w-full cursor-pointer rounded-xl border border-neutral-700 bg-neutral-900 py-3.5 px-4 text-xs font-bold text-white hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 text-center shadow-md"
          >
            <Smartphone className="h-4 w-4 text-sky-400" />
            <span>Send via Mail App on Your Device</span>
            <span className="text-[11px] font-normal text-neutral-400">(iPhone, Mac, Android, PC)</span>
          </button>

          {/* Fallback box if computer does not have a native mail client set up */}
          {mailAppAttempted && (
            <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-700 text-xs text-neutral-300 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <HelpCircle className="h-3.5 w-3.5" />
                Did your device mail app not open?
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Many PCs and browsers don&apos;t have a default email application configured. You can use <strong>Outlook Web</strong>, <strong>Gmail</strong>, or copy the text:
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
        </div>

        {/* Secondary Utility Controls */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs">
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
