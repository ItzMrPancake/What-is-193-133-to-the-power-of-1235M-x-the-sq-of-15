import { Send, Clock, ShieldCheck, FileCheck } from 'lucide-react';

export function Workflow() {
  const steps = [
    {
      number: '01',
      title: 'Simple Onboarding & Technical Audit',
      description: 'Share your website address and hosting credentials. Jacob reviews your setup, verifies backup protocols, and configures security monitoring.',
      icon: ShieldCheck,
    },
    {
      number: '02',
      title: 'Submit Updates Anytime',
      description: 'Whenever you have new text, photo swaps, or layout adjustments, simply email Jacob or drop a quick note through your client form.',
      icon: Send,
    },
    {
      number: '03',
      title: 'Rapid 24–48h Completion',
      description: 'Edits are tested and deployed directly to production. You receive a direct confirmation link to review changes with zero downtime.',
      icon: Clock,
    },
    {
      number: '04',
      title: 'Monthly Health & Status Summary',
      description: 'Receive a clear monthly summary showing your site uptime, security patches applied, and remaining updates balance.',
      icon: FileCheck,
    },
  ];

  return (
    <section className="py-20 border-b border-neutral-900/80 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Seamless Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            How website maintenance works
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            No convoluted ticketing systems, no automated bot replies, and no waiting weeks for simple text tweaks. Just direct, reliable developer communication.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-extrabold text-neutral-600 tabular-nums">
                      {step.number}
                    </span>
                    <div className="rounded-lg bg-neutral-800/80 p-2 text-amber-400">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                  Direct personal communication
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
