import { Check, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { PLANS } from '../data/content';
import { PlanId } from '../types';

interface MaintenancePlansProps {
  onOpenIntake: (planId: PlanId) => void;
  onOpenScopeGuide: () => void;
}

export function MaintenancePlans({ onOpenIntake, onOpenScopeGuide }: MaintenancePlansProps) {
  return (
    <section id="plans" className="py-20 border-b border-neutral-900/80 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Clear, Predictable Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Website Maintenance Plans
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Stop worrying about plugin crashes, hosting outages, or outdated photos. Choose the monthly plan that fits your pace, with no contracts and ultra-low extra edit rates.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const isPlus = plan.id === 'plus';

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all ${
                  isPlus
                    ? 'border-2 border-amber-400/90 bg-neutral-900/90 shadow-xl shadow-amber-950/20'
                    : 'border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                }`}
              >
                {/* Plus Plan Featured Label */}
                {isPlus && (
                  <div className="absolute -top-3.5 right-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1 text-xs font-bold text-neutral-950 shadow">
                      <Sparkles className="h-3.5 w-3.5" />
                      Recommended · Best Value
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white font-display">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-neutral-400 leading-normal">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                      ${plan.price}
                    </span>
                    <span className="text-sm font-medium text-neutral-400">
                      {plan.period}
                    </span>
                  </div>

                  {/* Additional Changes Note */}
                  <div className="mt-4 rounded-lg bg-neutral-950/80 p-3.5 border border-neutral-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-neutral-200">
                        {isPlus ? 'Discounted Extra Edits:' : 'Additional changes:'}
                      </span>
                      {isPlus && (
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                          Save on extras
                        </span>
                      )}
                    </div>
                    {isPlus ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-neutral-300">
                          <span>Extra small updates (text/photos):</span>
                          <span className="font-mono font-bold text-amber-400 tabular-nums">$3 / each</span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-300">
                          <span>Extra big edits (major layouts):</span>
                          <span className="font-mono font-bold text-amber-400 tabular-nums">$5 / each</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-neutral-400">
                        $5 / small change or additional edit after 3 monthly updates.
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="mt-8 space-y-3.5 border-t border-neutral-800 pt-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      What&apos;s included:
                    </div>

                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${isPlus ? 'bg-amber-400/20 text-amber-400' : 'bg-neutral-800 text-neutral-300'}`}>
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-neutral-300 leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal for note */}
                  <div className="mt-6 text-xs text-neutral-400 leading-relaxed bg-neutral-950/40 p-3 rounded-lg border border-neutral-900">
                    <span className="font-medium text-neutral-300">Ideal for: </span>
                    {plan.idealFor}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => onOpenIntake(plan.id)}
                    className={`w-full cursor-pointer rounded-xl py-3.5 px-4 text-center text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      isPlus
                        ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300 active:scale-[0.99] shadow-md'
                        : 'bg-neutral-800 text-white hover:bg-neutral-700 active:scale-[0.99]'
                    }`}
                  >
                    Select {plan.name} (${plan.price}/mo)
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="mt-3 text-center text-[11px] text-neutral-500">
                    {isPlus
                      ? 'Includes 10 small + 1 big edit · Extras only $3 small / $5 big'
                      : 'Includes 3 small updates · Extras $5/edit'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scope clarification helper banner */}
        <div className="mt-10 rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-amber-400/10 p-2 text-amber-400 shrink-0">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Not sure what counts as a small update vs. big layout edit?
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                On the Plus Plan, extra small updates are only $3 each and extra big layout edits are just $5 each. We clearly document every edit type.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenScopeGuide}
            className="cursor-pointer text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            Read the Scope Guide &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
