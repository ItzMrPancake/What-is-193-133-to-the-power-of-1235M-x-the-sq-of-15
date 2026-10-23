import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/content';

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 border-b border-neutral-900/80 bg-transparent">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Everything you need to know about plans, turnaround times, and hosting care.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden transition-colors hover:border-neutral-700"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full cursor-pointer px-6 py-5 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
