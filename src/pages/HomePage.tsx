import React from 'react';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';
import { GetStarted } from '../components/GetStarted';
import { PageId } from '../types/navigation';
import { BookOpen, Compass, Target, Cpu, Layers, ArrowRight, ShieldCheck, Download, Smartphone } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (featureName?: string) => void;
  onOpenDisclosures: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenDownloadModal,
  onOpenDisclosures
}) => {
  return (
    <div className="text-neutral-100 bg-neutral-950">
      {/* 1. Hero */}
      <Hero
        onExplore={() => onNavigate('about')}
        onDownloadApp={() => onOpenDownloadModal('EB Wealth Mobile Suite')}
      />

      {/* App Download Callout Banner */}
      <section className="py-8 bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-display">EB Wealth Display Portal & App Download</h4>
                <p className="text-xs text-neutral-400">All full video curricula, private deal rooms, and AI tools are hosted directly in the mobile application.</p>
              </div>
            </div>
            <button
              onClick={() => onOpenDownloadModal('EB Wealth Mobile Suite')}
              className="py-2.5 px-5 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-2 shrink-0 transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download APK (v2.4.0)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Executive Pillars Showcase (Multi-Page Gateway Bento) */}
      <section className="py-24 bg-neutral-900 border-t border-neutral-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
              Core Ecosystem Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Explore EB Wealth Platforms
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-3 leading-relaxed">
              Navigate our public showcase pages to preview curricula, explore private advisory structures, and download the mobile app for full access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1: About Empowerment Body & CEO */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">01. ORIGIN & BIO</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-emerald-400 transition-colors">
                  About Empowerment Body
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  The founding vision of total sovereignty. Learn how physical discipline, private capital stewardship, and AI leverage converged under the leadership of the Founder & CEO.
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
                  <span>Executive Bio</span>
                  <span>·</span>
                  <span>Core Doctrines</span>
                  <span>·</span>
                  <span>Philosophy</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('about')}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl border border-neutral-800 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Read Story & CEO Bio</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>

            {/* Pillar 2: EB Wealth Academy */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">02. IN-APP CURRICULUM</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-emerald-400 transition-colors">
                  EB Wealth Academy
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  4 flagship masterclasses taking you from modern portfolio allocation to syndication underwriting, trust entity architecture, and algorithmic AI market research.
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
                  <span>Stream In-App</span>
                  <span>·</span>
                  <span>Offline Video</span>
                  <span>·</span>
                  <span>Spreadsheets</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('academy')}
                  className="flex-1 py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl border border-neutral-800 transition-colors cursor-pointer"
                >
                  Preview Tracks
                </button>
                <button
                  onClick={() => onOpenDownloadModal('EB Wealth Academy Courses')}
                  className="py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs rounded-xl border border-emerald-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get App</span>
                </button>
              </div>
            </div>

            {/* Pillar 3: Executive Mentorship */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-amber-500/30 hover:border-amber-500/60 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-amber-400">03. MOBILE DEAL ROOM</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-amber-400 transition-colors">
                  Tailored Mentorship
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Direct partnership with the Founder & CEO. Private In-App Deal Room pro-forma reviews, tax entity design, and encrypted messaging channels.
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
                  <span>Deal Feeds</span>
                  <span>·</span>
                  <span>VIP Hotline</span>
                  <span>·</span>
                  <span>Strict NDA</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('mentorship')}
                  className="flex-1 py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl border border-neutral-800 transition-colors cursor-pointer"
                >
                  View Tiers
                </button>
                <button
                  onClick={() => onOpenDownloadModal('EB Wealth Mentorship Deal Room')}
                  className="py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold text-xs rounded-xl border border-amber-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get App</span>
                </button>
              </div>
            </div>

            {/* Pillar 4: One-to-One Coaching */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">04. 1-ON-1 SESSIONS</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-blue-400 transition-colors">
                  One-to-One Coaching
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Book a 90-minute forensic wealth blueprint or join our quarterly executive accountability sprint to eliminate idle cash and fee leakages directly in the app.
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
                  <span>In-App Scheduling</span>
                  <span>·</span>
                  <span>Vault Roadmap</span>
                  <span>·</span>
                  <span>Encrypted Video</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('coaching')}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl border border-neutral-800 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>View Coaching Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>

            {/* Pillar 5: AI Business Growth */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">05. AI AUTOMATION</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-blue-400 transition-colors">
                  AI Business Growth
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Proprietary prompt architectures, autonomous lead qualification funnels, and enterprise operations tools that scale profit margins without adding payroll.
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
                  <span>Custom Prompts</span>
                  <span>·</span>
                  <span>ROI Model</span>
                  <span>·</span>
                  <span>14-Day Delivery</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('ai-growth')}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl border border-neutral-800 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Explore AI Systems</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>

            {/* Pillar 6: Interactive Tools Suite */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">06. SIMULATOR</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-emerald-400 transition-colors">
                  Capital & Compounding Suite
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Interactive mathematical models calculating your compound interest trajectory and diagnosing portfolio allocations across equities, debt, and alpha.
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
                  <span>Real-Time Math</span>
                  <span>·</span>
                  <span>Health Diagnostic</span>
                  <span>·</span>
                  <span>Free Showcase</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('tools')}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl border border-neutral-800 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Launch Interactive Tools</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof & Testimonials */}
      <Testimonials />

      {/* 4. Get Started Section */}
      <GetStarted
        onDownloadApp={() => onOpenDownloadModal('EB Wealth Mobile Suite')}
        onExploreSimulator={() => onNavigate('tools')}
        onExploreAcademy={() => onNavigate('academy')}
      />
    </div>
  );
};
