import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MaintenancePlans } from './components/MaintenancePlans';
import { PlanCalculator } from './components/PlanCalculator';
import { ScopeGuide } from './components/ScopeGuide';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { Workflow } from './components/Workflow';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { IntakeModal } from './components/IntakeModal';
import { BackgroundAtmosphere } from './components/BackgroundAtmosphere';
import { PlanId } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>('plus');
  const [estimatedEdits, setEstimatedEdits] = useState<number>(3);

  // Sync hash with current page
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact-page') {
        setCurrentPage('contact');
      } else if (window.location.hash === '#home' || !window.location.hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'contact', anchorId?: string) => {
    setCurrentPage(page);
    if (page === 'contact') {
      window.location.hash = 'contact-page';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = anchorId ? anchorId : '';
      if (anchorId) {
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenIntake = (planId: PlanId = 'plus', edits?: number) => {
    setSelectedPlanId(planId);
    if (edits !== undefined) {
      setEstimatedEdits(edits);
    }
    setIsIntakeOpen(true);
  };

  const handleScrollToScope = () => {
    if (currentPage !== 'home') {
      handleNavigate('home', 'scope');
    } else {
      const el = document.getElementById('scope');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060608] text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Dynamic atmospheric dark background with ambient nebulae, tech grid & interactive spotlight */}
      <BackgroundAtmosphere />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* 3-Zone Top Bar Navigation */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenIntake={handleOpenIntake}
        />

        <main className="flex-1">
          {currentPage === 'home' ? (
            <>
              {/* Hero Section */}
              <Hero onOpenIntake={handleOpenIntake} />

              {/* Website Maintenance Plans (Core Feature) */}
              <MaintenancePlans
                onOpenIntake={handleOpenIntake}
                onOpenScopeGuide={handleScrollToScope}
              />

              {/* Interactive Cost & Plan Calculator */}
              <PlanCalculator onOpenIntake={handleOpenIntake} />

              {/* Edit Scope & Definitions Guide */}
              <ScopeGuide />

              {/* Featured Client Projects */}
              <ProjectsShowcase onOpenIntake={handleOpenIntake} />

              {/* How Maintenance Works (Workflow) */}
              <Workflow />

              {/* Testimonials */}
              <Testimonials />

              {/* Frequently Asked Questions */}
              <Faq />

              {/* Quick Contact & Inquiries */}
              <ContactSection onOpenFullContactPage={() => handleNavigate('contact')} />
            </>
          ) : (
            /* Dedicated Contact Page */
            <ContactPage
              onNavigateHome={() => handleNavigate('home')}
              onOpenIntake={handleOpenIntake}
            />
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Interactive Plan Intake & Onboarding Modal */}
      <IntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        initialPlanId={selectedPlanId}
        initialEdits={estimatedEdits}
      />
    </div>
  );
}
