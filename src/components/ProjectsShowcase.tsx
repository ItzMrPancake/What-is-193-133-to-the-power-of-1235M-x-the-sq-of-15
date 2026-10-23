import { useState } from 'react';
import { ExternalLink, X, Check, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/content';
import { ProjectItem, PlanId } from '../types';

interface ProjectsShowcaseProps {
  onOpenIntake: (planId?: PlanId) => void;
}

export function ProjectsShowcase({ onOpenIntake }: ProjectsShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 border-b border-neutral-900 bg-neutral-950/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
              Featured Client Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Built to perform. Maintained to stay fresh.
            </h2>
            <p className="mt-4 text-base text-neutral-400 leading-relaxed">
              Explore websites developed and maintained by Jacob George—combining modern aesthetics, sub-second speed, and consistent monthly care.
            </p>
          </div>

          <div className="text-xs text-neutral-400 font-mono hidden md:block">
            3 Active Showcases · 100% Uptime
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-neutral-800 bg-neutral-900/50 overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all hover:shadow-xl"
            >
              <div>
                {/* Visual Screenshot Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 text-[11px] font-medium bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-neutral-300 border border-neutral-800">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white font-display">
                    {project.title}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-1">
                    Client: {project.client}
                  </div>

                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Quantified Metrics (Zero pills, unboxed numbers) */}
                  <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-neutral-800/80 text-center">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-neutral-950/60 p-2 rounded-lg border border-neutral-900">
                        <div className="text-sm font-bold font-mono text-amber-400 tabular-nums">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5 truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack (Unboxed text with separators) */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-neutral-400">
                    {project.techStack.map((tech, idx) => (
                      <span key={tech} className="flex items-center gap-2">
                        {tech}
                        {idx < project.techStack.length - 1 && (
                          <span className="text-neutral-600" aria-hidden="true">&middot;</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full cursor-pointer py-2.5 px-4 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  Inspect Case Study
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for project detail */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-700 bg-neutral-950 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {selectedProject.category}
              </div>

              <h3 className="text-2xl font-bold text-white mt-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Client: {selectedProject.client}
              </p>

              <div className="mt-4 rounded-xl overflow-hidden border border-neutral-800 aspect-[16/9]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Project Overview
                </h4>
                <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                  {selectedProject.summary} Designed and coded from scratch with high-performance standards, SEO structure, and seamless mobile responsiveness.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  Maintenance Plan in Action
                </h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {selectedProject.maintenancePlanUsed}
                </p>
              </div>

              {/* Quantified Metrics */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {selectedProject.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                    <div className="text-lg font-bold font-mono text-white tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenIntake('plus');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 text-neutral-950 text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-2"
                >
                  Get Similar Site &amp; Care
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
