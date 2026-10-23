import { CheckCircle2, Layers, ShieldCheck, DollarSign } from 'lucide-react';
import { SCOPE_ITEMS } from '../data/content';

export function ScopeGuide() {
  return (
    <section id="scope" className="py-20 border-b border-neutral-900/80 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Total Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Edit Scope &amp; Service Definitions
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            I believe in clear boundaries and zero surprises. Here is an exact breakdown of what is covered under small updates, layout edits, and hosting maintenance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Small Updates */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-amber-400/10 p-2 text-amber-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Small Updates</h3>
                  <div className="text-xs text-neutral-400 font-mono">
                    Basic: 3/mo · Plus: 10/mo
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Quick content refinements, imagery swaps, and announcements on existing pages. Usually deployed within 24 hours.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300">
                {SCOPE_ITEMS.smallUpdates.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-400 shrink-0 mt-0.5">&bull;</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400 space-y-1">
              <div>
                <span className="text-white font-medium">Basic Plan extras:</span> $5 / small change
              </div>
              <div>
                <span className="text-amber-400 font-medium">Plus Plan extras:</span> Only $3 / small update
              </div>
            </div>
          </div>

          {/* Card 2: Major Layout Edits */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-amber-400/10 p-2 text-amber-400">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Major (Big) Layout Edits</h3>
                  <div className="text-xs text-neutral-400 font-mono">
                    Plus: 1/mo included
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Structural page changes, new components, and interactive additions that enhance user engagement.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300">
                {SCOPE_ITEMS.majorEdits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-400 shrink-0 mt-0.5">&bull;</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400 space-y-1">
              <div>
                <span className="text-white font-medium">Included:</span> 1 per month in the Plus Plan ($40/mo).
              </div>
              <div>
                <span className="text-amber-400 font-medium">Extra big edits on Plus:</span> Only $5 / each!
              </div>
            </div>
          </div>

          {/* Card 3: Web Hosting & Security */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-amber-400/10 p-2 text-amber-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Hosting &amp; Security</h3>
                  <div className="text-xs text-neutral-400 font-mono">
                    Included in All Plans
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Behind-the-scenes infrastructure maintenance ensuring your website is secure, fast, and always accessible.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300">
                {SCOPE_ITEMS.hostingSecurity.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-400 shrink-0 mt-0.5">&bull;</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              <span className="text-white font-medium">Status:</span> Continuous 24/7 proactive monitoring.
            </div>
          </div>
        </div>

        {/* The Extra Edit Pricing Philosophy */}
        <div className="mt-12 rounded-xl bg-neutral-900/70 border border-neutral-800 p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-amber-400 text-neutral-950 font-bold flex items-center justify-center shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              Why our extra edit pricing beats traditional agencies
            </h4>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Most web agencies charge minimum $75–$150 hourly retainers for a single photo or text change. With Jacob George, Basic Plan extra edits are just $5, and Plus Plan members get discounted extra rates of only <span className="text-amber-400 font-semibold">$3 per small update</span> and <span className="text-amber-400 font-semibold">$5 per big layout edit</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
