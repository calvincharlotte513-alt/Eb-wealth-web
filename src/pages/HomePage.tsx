import React from 'react';
import { Hero } from '../components/Hero';
import { WhatIsEBWealth } from '../components/WhatIsEBWealth';
import { ResearchBriefings } from '../components/ResearchBriefings';
import { Academy } from '../components/Academy';
import { LearnByDoing } from '../components/LearnByDoing';
import { Mentorship } from '../components/Mentorship';
import { Coaching } from '../components/Coaching';
import { InteractiveTools } from '../components/InteractiveTools';
import { Testimonials } from '../components/Testimonials';
import { GetStarted } from '../components/GetStarted';
import { Course, CoachingPackage, MentorshipTier } from '../types';
import { PageId } from '../types/navigation';
import { Smartphone, ArrowRight, Shield } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (featureName?: string) => void;
  onOpenDisclosures: () => void;
  onSelectCourse: (course: Course) => void;
  onApplyMentorship: (tier?: MentorshipTier) => void;
  onBookCoaching: (pkg: CoachingPackage) => void;
  onOpenGetStartedModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenDownloadModal,
  onOpenDisclosures,
  onSelectCourse,
  onApplyMentorship,
  onBookCoaching,
  onOpenGetStartedModal
}) => {
  return (
    <div className="bg-[#FAF9F5] text-[#111816]">
      {/* 1. Hero Section — Goldman Sachs Prestige Atrium & Editorial Frame */}
      <Hero
        onGetStarted={onOpenGetStartedModal}
        onExploreApp={() => onOpenDownloadModal('EB Wealth Mobile App')}
        onExploreAcademy={() => onNavigate('academy')}
      />

      {/* 2. Institutional Access Ribbon */}
      <section className="py-4 bg-[#FAF9F5] border-b border-[#C5A869]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-4.5 bg-white border border-[#C5A869]/35 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xs bg-[#FAF5E8] border border-[#C5A869]/40 flex items-center justify-center text-[#0D3B2E] shrink-0 shadow-2xs">
                <Smartphone className="w-5 h-5 text-[#9E8040]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0D3B2E]">
                  The EB Wealth Mobile Portal & Curriculum Suite
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-600">
                  Access all structured investment courses, UK tax shelter calculators, and portfolio simulators on iOS, Android, and Web.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenDownloadModal('EB Wealth Mobile Suite')}
              className="py-2.5 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-white font-semibold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 shrink-0 transition-colors cursor-pointer border border-[#C5A869]/40 shadow-xs"
            >
              <Smartphone className="w-4 h-4 text-[#C5A869]" />
              <span>Launch App Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Goldman Sachs-Style Institutional Perspectives & Research Briefings */}
      <ResearchBriefings
        onOpenAppDownload={() => onOpenDownloadModal('EB Wealth Macro Research')}
      />

      {/* 4. "What is EB Wealth?" Section (5 Core Pillars & 6-Step Discipline) */}
      <WhatIsEBWealth
        onNavigate={onNavigate}
        onOpenGetStarted={onOpenGetStartedModal}
      />

      {/* 5. EB Wealth Academy (Learn Investing Without Jargon - 6 Progression Levels) */}
      <Academy
        onSelectCourse={onSelectCourse}
        onOpenAppDownload={onOpenDownloadModal}
        onOpenDisclosures={onOpenDisclosures}
        onNavigateToAcademy={() => onNavigate('academy')}
      />

      {/* 6. Learn By Doing (Interactive Educational Walkthrough Simulator) */}
      <LearnByDoing
        onOpenAppDownload={onOpenDownloadModal}
      />

      {/* 7. Mentorship & Masterclasses (Consistency Builds Wealth. Mentorship Keeps You Accountable.) */}
      <Mentorship
        onApply={onApplyMentorship}
        onOpenAppDownload={onOpenDownloadModal}
        onOpenDisclosures={onOpenDisclosures}
      />

      {/* 8. 1-to-1 Investment Coaching (Personalised Guidance for Your Portfolio & ISA Strategy) */}
      <Coaching
        onBookSession={onBookCoaching}
        onOpenAppDownload={onOpenDownloadModal}
        onOpenDisclosures={onOpenDisclosures}
      />

      {/* 9. Interactive Tools (UK Compound Growth & ISA Calculator + Platform Comparison) */}
      <InteractiveTools
        onExploreProgram={onNavigate}
      />

      {/* 10. Authentic Investor Experiences & Case Studies */}
      <Testimonials />

      {/* 11. Final Get Started Call-to-Action Section */}
      <GetStarted
        onNavigate={onNavigate}
        onOpenAppDownload={onOpenDownloadModal}
        onOpenGetStartedModal={onOpenGetStartedModal}
      />
    </div>
  );
};
