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
  onOpenMentorship: _onOpenMentorship,
  onOpenDisclosures: _onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-[#141E18] bg-[#FAF9F5]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-28 border-b border-stone-200 overflow-hidden bg-[#FAF9F5]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.tools}
          fallbackSrc={HERO_FALLBACKS.tools || toolsHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl bg-white/90 backdrop-blur-xs p-8 sm:p-10 rounded-xs border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C5A869] font-bold mb-3">
              <Layers className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>Institutional Quantitative Suite</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D3B2E] leading-tight">
              Interactive Capital & Compounding Simulators.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-sans">
              Model mathematical compounding runways across multiple time horizons, evaluate the drag of management fees, simulate UK ISA tax shields, and determine the optimal asset allocation for your risk tolerance.
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
