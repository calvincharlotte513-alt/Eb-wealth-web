import React from 'react';
import { InteractiveTools } from '../components/InteractiveTools';
import { PageId } from '../types/navigation';
import { Layers } from 'lucide-react';
import { HeroBackground } from '../components/HeroBackground';
import { HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import toolsHeroBg from '../assets/images/wealth_tools_analytics_1791462515697.jpg';

interface ToolsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenMentorship: () => void;
  onOpenDisclosures: () => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({
  onNavigate,
  onOpenMentorship,
  onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-[#17202A] bg-[#F8FAFC]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-[#F8FAFC]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.tools}
          fallbackSrc={HERO_FALLBACKS.tools || toolsHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl bg-white/70 sm:bg-white/45 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xs">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2563EB] font-bold mb-3">
              <Layers className="w-4 h-4" />
              <span>Investment Calculators & Simulators</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A]">
              Interactive Capital & Compounding Suite.
            </h1>
            <p className="text-base sm:text-lg text-[#334155] mt-4 leading-relaxed">
              Run realistic mathematical scenarios on your long-term compounding runway, see the tax advantage of UK ISA wrappers, and find the exact EB Wealth pathway for your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Component */}
      <InteractiveTools
        onExploreProgram={(page) => onNavigate(page)}
      />
    </div>
  );
};
