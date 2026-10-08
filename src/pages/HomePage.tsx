import React from 'react';
import { Hero } from '../components/Hero';
import { WhatIsEBWealth } from '../components/WhatIsEBWealth';
import { Academy } from '../components/Academy';
import { LearnByDoing } from '../components/LearnByDoing';
import { Mentorship } from '../components/Mentorship';
import { Coaching } from '../components/Coaching';
import { AIBusinessGrowth } from '../components/AIBusinessGrowth';
import { InteractiveTools } from '../components/InteractiveTools';
import { Testimonials } from '../components/Testimonials';
import { GetStarted } from '../components/GetStarted';
import { Course, CoachingPackage, MentorshipTier } from '../types';
import { PageId } from '../types/navigation';
import { Smartphone, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import { REGULATORY_DISCLAIMER_SHORT } from '../data/content';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (featureName?: string) => void;
  onOpenDisclosures: () => void;
  onSelectCourse: (course: Course) => void;
  onApplyMentorship: (tier?: MentorshipTier) => void;
  onBookCoaching: (pkg: CoachingPackage) => void;
  onScheduleAIAudit: () => void;
  onOpenGetStartedModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenDownloadModal,
  onOpenDisclosures,
  onSelectCourse,
  onApplyMentorship,
  onBookCoaching,
  onScheduleAIAudit,
  onOpenGetStartedModal
}) => {
  return (
    <div className="bg-[#F8FAFC] text-[#17202A]">
      {/* 1. Hero Section */}
      <Hero
        onGetStarted={onOpenGetStartedModal}
        onExploreApp={() => onOpenDownloadModal('EB Wealth Mobile App')}
        onExploreAcademy={() => onNavigate('academy')}
      />

      {/* 2. Quick Mobile App Access Bar (Clean, bright, non-intrusive) */}
      <section className="py-5 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-5 bg-[#EFF6FF] border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#17202A]">
                  The EB Wealth Mobile App & Portal
                </h4>
                <p className="text-[11px] sm:text-xs text-[#52606D]">
                  Access all structured video courses, live market briefs, and portfolio simulators on iOS and Android.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenDownloadModal('EB Wealth Mobile Suite')}
              className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shrink-0 transition-colors cursor-pointer shadow-xs"
            >
              <Smartphone className="w-4 h-4" />
              <span>Open EB Wealth App</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. "What is EB Wealth?" Section (5 Core Pillars & 6-Step Philosophy) */}
      <WhatIsEBWealth
        onNavigate={onNavigate}
        onOpenGetStarted={onOpenGetStartedModal}
      />

      {/* 4. EB Wealth Academy (Learn Investing Without the Jargon - 6 Progression Levels) */}
      <Academy
        onSelectCourse={onSelectCourse}
        onOpenAppDownload={onOpenDownloadModal}
        onOpenDisclosures={onOpenDisclosures}
        onNavigateToAcademy={() => onNavigate('academy')}
      />

      {/* 5. Learn By Doing (Interactive Educational Walkthrough Simulator) */}
      <LearnByDoing
        onOpenAppDownload={onOpenDownloadModal}
      />

      {/* 6. Mentorship & Accountability (Consistency Builds Wealth. Mentorship Keeps You Accountable.) */}
      <Mentorship
        onApply={onApplyMentorship}
        onOpenAppDownload={onOpenDownloadModal}
        onOpenDisclosures={onOpenDisclosures}
      />

      {/* 7. 1-to-1 Coaching (Personalised Guidance for Your Financial and Business Roadmap.) */}
      <Coaching
        onBookSession={onBookCoaching}
        onOpenAppDownload={onOpenDownloadModal}
        onOpenDisclosures={onOpenDisclosures}
      />

      {/* 8. AI Business Growth (Practical AI That Creates Business Leverage.) */}
      <AIBusinessGrowth
        onScheduleAudit={onScheduleAIAudit}
        onNavigateToAIGrowth={() => onNavigate('ai-growth')}
      />

      {/* 9. Interactive Tools (UK Compound Growth & ISA Calculator + Pathway Finder) */}
      <InteractiveTools
        onExploreProgram={onNavigate}
      />

      {/* 10. Authentic Social Proof & Member Stories */}
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
