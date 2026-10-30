import { DEVELOPER_PROFILE } from '../data/content';

interface FooterProps {
  onNavigate?: (page: 'home' | 'contact', anchorId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: 'home' | 'contact', anchorId?: string) => {
    if (onNavigate) {
      onNavigate(page, anchorId);
    }
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-xs text-neutral-500">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="text-sm font-bold text-white tracking-tight hover:text-amber-400 transition-colors text-left cursor-pointer"
            >
              Jacob George
            </button>
            <p className="mt-1 text-xs text-neutral-400">
              Website Developer · Monthly Website Maintenance &amp; Care
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-neutral-400">
            <button
              type="button"
              onClick={() => handleNav('home', 'plans')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Maintenance Plans
            </button>
            <button
              type="button"
              onClick={() => handleNav('home', 'scope')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Scope Guide
            </button>
            <button
              type="button"
              onClick={() => handleNav('home', 'projects')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="hover:text-white text-amber-400 transition-colors cursor-pointer font-medium"
            >
              Contact Page
            </button>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`tel:${DEVELOPER_PROFILE.phone}`} className="text-amber-400 hover:text-amber-300 font-mono transition-colors">
                {DEVELOPER_PROFILE.phone}
              </a>
              <span className="text-neutral-700">|</span>
              <a href={`mailto:${DEVELOPER_PROFILE.email}`} className="text-neutral-300 hover:text-amber-300 transition-colors">
                {DEVELOPER_PROFILE.email}
              </a>
              <span className="text-neutral-700">|</span>
              <a href={`mailto:${DEVELOPER_PROFILE.alternateEmail}`} className="text-neutral-400 hover:text-white transition-colors">
                {DEVELOPER_PROFILE.alternateEmail}
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Jacob George. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Basic: $20/mo (Extras: $5 small / +$15 big)</span>
            <span>&middot;</span>
            <span>Plus: $40/mo (Extras: $3 small / +$10 big)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
