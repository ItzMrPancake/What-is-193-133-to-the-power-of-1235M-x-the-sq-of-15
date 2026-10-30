import { CheckCircle2, Layers, ShieldCheck, DollarSign, HelpCircle, ArrowRight } from 'lucide-react';
import { SCOPE_ITEMS } from '../data/content';

export function ScopeGuide() {
  return (
    <section id="scope" className="py-20 border-b border-neutral-900/80 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Plain English Explanation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            What do &ldquo;3 updates/month&rdquo; and &ldquo;10 updates/month&rdquo; mean?
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed">
            Every month, your maintenance plan gives you a <strong>set allowance of edits</strong> to keep your website current without hiring an expensive developer by the hour. You just send your text or photo changes to Jacob, and they are completed at no extra charge within your monthly plan.
          </p>
        </div>

        {/* 3 Main Scope Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Small Updates */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-amber-400/10 p-2 text-amber-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Small Updates</h3>
                  <div className="text-xs text-amber-400 font-semibold">
                    Text, photo &amp; price changes
                  </div>
                </div>
              </div>

              {/* Explicit Plain English Allowance */}
              <div className="mb-4 rounded-xl bg-neutral-950/80 p-3.5 border border-neutral-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-neutral-200">
                  <span className="font-semibold text-white">Basic Plan ($20/mo):</span>
                  <span className="font-mono text-amber-400 font-bold">3 updates / month included</span>
                </div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span className="font-semibold text-white">Plus Plan ($40/mo):</span>
                  <span className="font-mono text-amber-400 font-bold">10 updates / month included</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                <strong>What counts as a small update?</strong> Quick content tweaks on existing pages that take about 15–20 minutes each:
              </p>

              <ul className="space-y-2 text-xs text-neutral-300">
                {SCOPE_ITEMS.smallUpdates.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 shrink-0 mt-0.5">&bull;</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs space-y-1">
              <div className="text-neutral-400 font-semibold">What if you need more than your limit?</div>
              <div className="text-neutral-300">
                &bull; On Basic: <strong>$5</strong> per extra small edit
              </div>
              <div className="text-amber-400 font-medium">
                &bull; On Plus: Discounted to only <strong>$3</strong> per extra small edit!
              </div>
            </div>
          </div>

          {/* Card 2: Major (Big) Layout Edits */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-amber-400/10 p-2 text-amber-400">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Major (Big) Layout Edits</h3>
                  <div className="text-xs text-amber-400 font-semibold">
                    New sections &amp; restructuring
                  </div>
                </div>
              </div>

              {/* Explicit Plain English Allowance */}
              <div className="mb-4 rounded-xl bg-neutral-950/80 p-3.5 border border-neutral-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-neutral-200">
                  <span className="font-semibold text-white">Basic Plan ($20/mo):</span>
                  <span className="text-neutral-400">0 included (+$15 add-on per edit)</span>
                </div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span className="font-semibold text-white">Plus Plan ($40/mo):</span>
                  <span className="font-mono text-amber-400 font-bold">1 major layout edit / month included</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                <strong>What counts as a major layout edit?</strong> Structural redesigns or adding new interactive components to your website:
              </p>

              <ul className="space-y-2 text-xs text-neutral-300">
                {SCOPE_ITEMS.majorEdits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 shrink-0 mt-0.5">&bull;</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs space-y-1">
              <div className="text-neutral-400 font-semibold">What if you need extra big edits in the same month?</div>
              <div className="text-neutral-300">
                &bull; On Basic Plan: Major layout edits are only <strong>+$15</strong> each
              </div>
              <div className="text-amber-400 font-medium">
                &bull; On Plus Plan: Extra big layout edits are only <strong>+$10</strong> each!
              </div>
              <div className="text-neutral-400 text-[11px]">
                (Normal agencies charge $150+ for custom section builds)
              </div>
            </div>
          </div>

          {/* Card 3: Web Hosting & Security */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-amber-400/10 p-2 text-amber-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Hosting &amp; Security</h3>
                  <div className="text-xs text-emerald-400 font-semibold">
                    100% Covered in Both Plans
                  </div>
                </div>
              </div>

              {/* Explicit Plain English Allowance */}
              <div className="mb-4 rounded-xl bg-neutral-950/80 p-3.5 border border-neutral-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-neutral-200">
                  <span className="font-semibold text-white">Basic Plan ($20/mo):</span>
                  <span className="font-mono text-emerald-400 font-bold">Full hosting &amp; security</span>
                </div>
                <div className="flex items-center justify-between text-neutral-200">
                  <span className="font-semibold text-white">Plus Plan ($40/mo):</span>
                  <span className="font-mono text-emerald-400 font-bold">Hosting + Priority queue</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                <strong>What does hosting &amp; security maintenance mean?</strong> Jacob takes care of the technical backend so your site never breaks or goes down:
              </p>

              <ul className="space-y-2 text-xs text-neutral-300">
                {SCOPE_ITEMS.hostingSecurity.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 shrink-0 mt-0.5">&bull;</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
              <span className="text-white font-medium">Uptime Guarantee:</span> If your site ever goes down or experiences an error, Jacob investigates and fixes it immediately.
            </div>
          </div>
        </div>

        {/* Real-World Monthly Billing Examples */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="h-4 w-4" />
            Real-World Billing Examples
          </div>
          <h3 className="text-xl font-bold text-white">
            How your monthly invoice works in practice
          </h3>
          <p className="text-xs text-neutral-400 mt-1 mb-6">
            There are never any surprise hourly invoices or hidden fees. Here is how simple the math is:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Example 1 */}
            <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">Example A: Typical Quiet Month</span>
                <span className="font-mono text-emerald-400 font-bold">$20 total</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                You are on the <strong>Basic Plan ($20/mo)</strong>. In June, you email Jacob to change your store hours and swap 1 photo (2 small updates used out of 3 included).
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-800/80 text-neutral-400 font-mono">
                Calculation: $20 base plan + $0 extras = <strong>$20 flat</strong>
              </div>
            </div>

            {/* Example 2 */}
            <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">Example B: Active Month on Basic</span>
                <span className="font-mono text-amber-400 font-bold">$30 total</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                You are on the <strong>Basic Plan ($20/mo)</strong>. You have 5 text/photo updates in a month (3 are covered free in your plan, so you have 2 extra changes at $5 each).
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-800/80 text-neutral-400 font-mono">
                Calculation: $20 base + (2 extra &times; $5) = <strong>$30 total</strong>
              </div>
            </div>

            {/* Example 3 */}
            <div className="rounded-xl bg-neutral-950 p-4 border border-amber-400/40">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">Example C: Regular Updates + Layout on Plus</span>
                <span className="font-mono text-emerald-400 font-bold">$40 flat</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                You are on the <strong>Plus Plan ($40/mo)</strong>. In September, you update 7 product descriptions and ask Jacob to build a brand new FAQ section.
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-800/80 text-neutral-400 font-mono">
                Calculation: All 7 edits &amp; the new layout are 100% included = <strong>$40 flat</strong>
              </div>
            </div>

            {/* Example 4 */}
            <div className="rounded-xl bg-neutral-950 p-4 border border-amber-400/40">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">Example D: Heavy Promotional Month on Plus</span>
                <span className="font-mono text-amber-400 font-bold">$56 total</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                You are on the <strong>Plus Plan ($40/mo)</strong>. You submit 12 small updates (10 included + 2 extra at $3) AND 2 major layout changes (1 included + 1 extra at $10).
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-800/80 text-neutral-400 font-mono">
                Calculation: $40 base + (2 &times; $3) + (1 &times; $10) = <strong>$56 total</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Why Flat $3/$5 pricing matters */}
        <div className="mt-8 rounded-xl bg-neutral-900/40 border border-neutral-800 p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-amber-400 text-neutral-950 font-bold flex items-center justify-center shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              Why this beats traditional web agency retainers
            </h4>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Traditional web design agencies charge a minimum of $75 to $150 per hour just to change a phone number or swap a team photo. With Jacob George, you get a generous monthly allowance included, and any extra edit is just a flat <strong>$5</strong> on Basic (major layout edits only <strong>+$15</strong>) or a heavily discounted <strong>$3</strong> on Plus (extra big layout edits only <strong>+$10</strong>).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
