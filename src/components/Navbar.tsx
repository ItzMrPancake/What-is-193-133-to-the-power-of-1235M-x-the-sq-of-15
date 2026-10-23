import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PlanId } from '../types';

interface NavbarProps {
  currentPage: 'home' | 'contact';
  onNavigate: (page: 'home' | 'contact', anchorId?: string) => void;
  onOpenIntake: (planId?: PlanId) => void;
}

export function Navbar({ currentPage, onNavigate, onOpenIntake }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'contact', anchorId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, anchorId);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Jacob George
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentPage === 'home' ? 'text-white' : 'text-neutral-400'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('home', 'plans')}
            className="cursor-pointer text-neutral-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Maintenance Plans
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('home', 'scope')}
            className="cursor-pointer text-neutral-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Scope Guide
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('home', 'projects')}
            className="cursor-pointer text-neutral-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Projects
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              currentPage === 'contact' ? 'text-amber-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={() => onOpenIntake('plus')}
            className="cursor-pointer rounded-lg bg-amber-400 px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-amber-300 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            Start a Plan
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-6 py-5">
          <div className="flex flex-col gap-4 text-sm font-medium text-neutral-300">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="text-left py-1 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'plans')}
              className="text-left py-1 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Maintenance Plans
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'scope')}
              className="text-left py-1 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Scope Guide
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'projects')}
              className="text-left py-1 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="text-left py-1 hover:text-amber-400 text-amber-400 font-semibold transition-colors whitespace-nowrap"
            >
              Contact Page
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenIntake('plus');
                }}
                className="w-full cursor-pointer rounded-lg bg-amber-400 py-2.5 text-center text-xs font-semibold text-neutral-950 hover:bg-amber-300 transition-all whitespace-nowrap"
              >
                Start a Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
