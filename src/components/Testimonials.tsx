import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export function Testimonials() {
  return (
    <section className="py-20 border-b border-neutral-900 bg-neutral-950/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Client Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            Trusted by founders and growing businesses
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Real feedback from business owners who rely on Jacob George for ongoing web performance and rapid updates.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between"
            >
              <div>
                <Quote className="h-6 w-6 text-neutral-600 mb-4" />
                <p className="text-sm text-neutral-300 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-800/80">
                <div className="text-sm font-semibold text-white">
                  {t.author}
                </div>
                <div className="text-xs text-neutral-400">
                  {t.role} · {t.company}
                </div>
                <div className="mt-2 text-[11px] font-mono text-amber-400 tabular-nums">
                  Result: {t.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
