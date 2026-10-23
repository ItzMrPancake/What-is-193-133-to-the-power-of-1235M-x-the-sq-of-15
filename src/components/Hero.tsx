import { ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../data/content';
import { PlanId } from '../types';

interface HeroProps {
  onOpenIntake: (planId?: PlanId) => void;
}

export function Hero({ onOpenIntake }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Proposition & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed kicker */}
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-4">
              Website Developer · Monthly Maintenance &amp; Care
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] [text-wrap:balance]">
              Reliable websites. Zero maintenance headaches.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              I’m <span className="text-white font-medium">Jacob George</span>. I build custom, responsive websites and provide dedicated monthly maintenance—handling security, web hosting, routine updates, and layout edits so your site stays fast, secure, and always up to date.
            </p>

            {/* Quick pricing callout */}
            <div className="mt-6 p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 max-w-xl">
              <div className="text-xs text-neutral-400 mb-2">Monthly Maintenance Plans:</div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Basic Plan</span>
                  <span className="font-mono text-amber-400 font-semibold tabular-nums">$20/mo</span>
                  <span className="text-neutral-500 text-xs">· 3 updates included</span>
                </div>
                <div className="h-4 w-px bg-neutral-800 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Plus Plan</span>
                  <span className="font-mono text-amber-400 font-semibold tabular-nums">$40/mo</span>
                  <span className="text-neutral-500 text-xs">· 10 small + 1 big edit</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-amber-300 transition-colors whitespace-nowrap"
              >
                Explore Maintenance Plans
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => onOpenIntake('basic')}
                className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-3.5 text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors whitespace-nowrap"
              >
                Request Free Site Assessment
              </button>
            </div>

            {/* Unboxed Trust Markers with clean typographic separators */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <Clock className="h-3.5 w-3.5 text-amber-400" /> 24–48h Turnaround
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Security &amp; Hosting Covered
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" /> Extra edits from $3
              </span>
              <span aria-hidden="true">·</span>
              <span>Month-to-month / Cancel anytime</span>
            </div>
          </div>

          {/* Right Column: Visual Focal Carrier */}
          <div className="lg:col-span-5 flex items-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Jacob George web development setup showing responsive code and modern site interfaces"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent"></div>
              </div>

              {/* Surface caption info */}
              <div className="p-5 border-t border-neutral-800/80 bg-neutral-950/90 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Full-Stack Craftsmanship</div>
                  <div className="text-xs text-neutral-400 mt-0.5">React · TypeScript · Next.js · Tailwind · Node</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-semibold text-amber-400 tabular-nums">99.9% Uptime</div>
                  <div className="text-[11px] text-neutral-500">Proactively Monitored</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Bar below the hero */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-neutral-800/80">
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">24–48h</div>
            <div className="text-xs text-neutral-400 mt-1">Average update completion time</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">$20 &amp; $40</div>
            <div className="text-xs text-neutral-400 mt-1">Transparent monthly tiers</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">$3 &amp; $5</div>
            <div className="text-xs text-neutral-400 mt-1">Extra edits on Plus ($3 small / $5 big)</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">1-on-1</div>
            <div className="text-xs text-neutral-400 mt-1">Direct communication with Jacob</div>
          </div>
        </div>
      </div>
    </section>
  );
}
