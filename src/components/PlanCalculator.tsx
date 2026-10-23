import { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles } from 'lucide-react';
import { PlanId } from '../types';

interface PlanCalculatorProps {
  onOpenIntake: (planId: PlanId, editsEstimate?: number) => void;
}

export function PlanCalculator({ onOpenIntake }: PlanCalculatorProps) {
  const [smallEdits, setSmallEdits] = useState<number>(6);
  const [bigEdits, setBigEdits] = useState<number>(1);

  // Calculation logic:
  // Basic Plan: $20 base covers 3 small updates, 0 big layout edits. Extra small edits = $5 each.
  // Ad-hoc big layout edits on Basic are $25 each.
  const basicIncludedSmall = 3;
  const basicExtraSmall = Math.max(0, smallEdits - basicIncludedSmall);
  const basicBigCost = bigEdits * 25;
  const basicTotal = 20 + basicExtraSmall * 5 + basicBigCost;

  // Plus Plan: $40 base covers 10 small updates + 1 big layout edit.
  // Extra small edits on Plus: ONLY $3 each!
  // Extra big layout edits on Plus: ONLY $5 each!
  const plusIncludedSmall = 10;
  const plusIncludedBig = 1;
  const plusExtraSmall = Math.max(0, smallEdits - plusIncludedSmall);
  const plusExtraBig = Math.max(0, bigEdits - plusIncludedBig);
  const plusTotal = 40 + plusExtraSmall * 3 + plusExtraBig * 5;

  const bestPlan: PlanId = basicTotal < plusTotal ? 'basic' : 'plus';
  const savings = Math.abs(basicTotal - plusTotal);

  return (
    <section id="calculator" className="py-20 border-b border-neutral-900 bg-neutral-950/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Interactive Cost Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Calculate your monthly maintenance cost
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Estimate your monthly updates to see exactly how much you will pay. On the Plus Plan, extra edits are heavily discounted at only <span className="text-amber-400 font-semibold">$3/small</span> and <span className="text-amber-400 font-semibold">$5/big</span>.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-6 border-b border-neutral-800">
              <div className="rounded-lg bg-amber-400/10 p-2.5 text-amber-400">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Your Monthly Update Needs</h3>
                <p className="text-xs text-neutral-400">Adjust small updates and big layout edits</p>
              </div>
            </div>

            {/* Slider: Small Updates */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-sm mb-3">
                <label htmlFor="edits-slider" className="font-medium text-neutral-200">
                  Small text &amp; photo updates / month
                </label>
                <span className="font-mono text-base font-bold text-amber-400 tabular-nums bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                  {smallEdits} {smallEdits === 1 ? 'update' : 'updates'}
                </span>
              </div>
              <input
                id="edits-slider"
                type="range"
                min="0"
                max="20"
                step="1"
                value={smallEdits}
                onChange={(e) => setSmallEdits(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-2">
                <span>0 updates</span>
                <span>3 (Basic limit)</span>
                <span>10 (Plus limit)</span>
                <span>20 updates</span>
              </div>
            </div>

            {/* Stepper: Big Layout Edits */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-medium text-neutral-200">
                    Big / Major Layout Edits / month
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    e.g. brand new page sections, redesigning navigation, rebuilding forms.
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setBigEdits(Math.max(0, bigEdits - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 font-mono text-sm"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-mono font-bold text-white text-sm tabular-nums">
                    {bigEdits}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBigEdits(Math.min(5, bigEdits + 1))}
                    className="w-7 h-7 flex items-center justify-center rounded bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 font-mono text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-[11px] text-amber-400/90 bg-amber-400/10 p-2 rounded border border-amber-400/20 mt-3">
                1 big edit is already included in Plus Plan ($40). Any extra big edits on Plus are only $5 each!
              </div>
            </div>

            {/* Quick preset buttons */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <div className="text-xs text-neutral-400 mb-3 font-medium">Quick Presets:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSmallEdits(2);
                    setBigEdits(0);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    smallEdits === 2 && bigEdits === 0
                      ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                      : 'border-neutral-800 text-neutral-300 hover:border-neutral-700 bg-neutral-950'
                  }`}
                >
                  Light Upkeep (2 small, 0 big)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSmallEdits(6);
                    setBigEdits(1);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    smallEdits === 6 && bigEdits === 1
                      ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                      : 'border-neutral-800 text-neutral-300 hover:border-neutral-700 bg-neutral-950'
                  }`}
                >
                  Standard Plus (6 small, 1 big)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSmallEdits(14);
                    setBigEdits(2);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    smallEdits === 14 && bigEdits === 2
                      ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                      : 'border-neutral-800 text-neutral-300 hover:border-neutral-700 bg-neutral-950'
                  }`}
                >
                  High Volume (14 small, 2 big)
                </button>
              </div>
            </div>
          </div>

          {/* Results Comparison Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Basic Plan Result */}
            <div
              className={`rounded-2xl p-6 border transition-all ${
                bestPlan === 'basic'
                  ? 'border-amber-400/80 bg-neutral-900/90 ring-1 ring-amber-400/30'
                  : 'border-neutral-800 bg-neutral-900/40 opacity-85'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">Basic Plan</span>
                {bestPlan === 'basic' && (
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded">
                    Best Value
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  ${basicTotal}
                </span>
                <span className="text-xs text-neutral-400">/ month</span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Base (3 small updates):</span>
                  <span className="font-mono text-neutral-200 tabular-nums">$20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">
                    Extra small ({basicExtraSmall} &times; $5):
                  </span>
                  <span className="font-mono text-neutral-200 tabular-nums">
                    ${basicExtraSmall * 5}
                  </span>
                </div>
                {bigEdits > 0 && (
                  <div className="flex justify-between text-neutral-300">
                    <span>Big edits ({bigEdits} &times; $25):</span>
                    <span className="font-mono tabular-nums">${basicBigCost}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => onOpenIntake('basic', smallEdits)}
                className={`mt-6 w-full cursor-pointer py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  bestPlan === 'basic'
                    ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300'
                    : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                }`}
              >
                Choose Basic Plan
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Plus Plan Result */}
            <div
              className={`rounded-2xl p-6 border transition-all ${
                bestPlan === 'plus'
                  ? 'border-amber-400 bg-neutral-900 shadow-lg shadow-amber-950/20 ring-1 ring-amber-400/40'
                  : 'border-neutral-800 bg-neutral-900/40 opacity-85'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white flex items-center gap-1.5">
                  Plus Plan
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                </span>
                {bestPlan === 'plus' && (
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  ${plusTotal}
                </span>
                <span className="text-xs text-neutral-400">/ month</span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Base (10 small + 1 big):</span>
                  <span className="font-mono text-neutral-200 tabular-nums">$40</span>
                </div>
                <div className="flex justify-between text-amber-300 font-medium">
                  <span>
                    Extra small ({plusExtraSmall} &times; $3):
                  </span>
                  <span className="font-mono tabular-nums">
                    ${plusExtraSmall * 3}
                  </span>
                </div>
                <div className="flex justify-between text-amber-300 font-medium">
                  <span>
                    Extra big ({plusExtraBig} &times; $5):
                  </span>
                  <span className="font-mono tabular-nums">
                    ${plusExtraBig * 5}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenIntake('plus', smallEdits)}
                className={`mt-6 w-full cursor-pointer py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  bestPlan === 'plus'
                    ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300'
                    : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                }`}
              >
                Choose Plus Plan
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Savings Callout Banner */}
            <div className="sm:col-span-2 rounded-xl bg-neutral-900 border border-neutral-800 p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-neutral-300">
                  {bestPlan === 'plus'
                    ? `Plus Plan gives you 10 small + 1 big included, and ultra-cheap extra edits ($3 small, $5 big).`
                    : `Basic Plan is optimal for lower monthly update frequency.`}
                </span>
              </div>
              {savings > 0 && (
                <span className="text-amber-400 font-mono font-semibold tabular-nums shrink-0">
                  Saves ~${savings}/mo
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
