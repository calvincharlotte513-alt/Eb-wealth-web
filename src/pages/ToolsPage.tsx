import React from 'react';
import { InteractiveTools } from '../components/InteractiveTools';
import { PageId } from '../types/navigation';
import { Layers } from 'lucide-react';

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
    <div className="pt-24 pb-20 text-neutral-100 bg-neutral-950">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-neutral-900 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
            <Layers className="w-4 h-4" />
            <span>Interactive Financial Architecture</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Institutional Models</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display max-w-4xl">
            Interactive Capital & Compounding Suite.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mt-4 leading-relaxed">
            Run realistic mathematical scenarios on your long-term compounding runway, simulate balanced multi-asset distributions, and take our 3-minute portfolio health check to diagnose immediate vulnerabilities.
          </p>
        </div>
      </section>

      {/* Main Interactive Tool Component */}
      <InteractiveTools
        onExploreProgram={(prog) => {
          if (prog === 'mentorship') onOpenMentorship();
          else if (prog === 'academy' || prog === 'academy_pro') onNavigate('academy');
          else if (prog === 'coaching') onNavigate('coaching');
          else if (prog === 'ai-growth' || prog === 'ai_growth') onNavigate('ai-growth');
        }}
      />
    </div>
  );
};
