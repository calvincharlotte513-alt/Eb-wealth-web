import React from 'react';
import { ShieldCheck, Smartphone, Lock, ChevronRight } from 'lucide-react';
import { PageId } from '../types/navigation';
import { REGULATORY_DISCLAIMER_SHORT } from '../data/content';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (feature?: string) => void;
  onOpenManageApk?: () => void;
  onOpenLegal: (type: 'disclaimer' | 'privacy' | 'terms') => void;
  onOpenGetStarted?: () => void;
  onOpenCompanyDispatch?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDownloadModal,
  onOpenLegal,
  onOpenCompanyDispatch
}) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#061C15] text-stone-300 border-t border-[#C5A869]/30 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xs bg-[#0D3B2E] border border-[#C5A869]/50 flex items-center justify-center font-serif font-bold text-[#C5A869] text-sm tracking-wider">
                EB
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-white tracking-wide">
                  EB WEALTH
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A869]">
                  Institutional Wealth Education
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-300 max-w-sm leading-relaxed font-sans">
              EB Wealth provides institutional-grade investment education, analytical calculators, and structured curricula designed to empower individual investors to navigate UK tax wrappers, global compounding, and asset allocation with clarity and confidence.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenDownloadModal('Footer Link')}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] border border-[#C5A869]/40 rounded-xs text-xs font-medium tracking-wide transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Open EB Wealth App</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-[#C5A869] uppercase tracking-widest mb-4">
              Overview
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Executive Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>About EB Wealth</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>EB Wealth Academy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mentorship')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Mentorship & Masterclasses</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('coaching')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>1-to-1 Private Coaching</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tools')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Calculators & Simulators</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Curriculum */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-[#C5A869] uppercase tracking-widest mb-4">
              Academy Curriculum
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Level 1: Foundations of Wealth</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Level 2: Asset Classes & ETFs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Level 3: UK ISAs & Tax Wrappers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Level 4: Portfolio Construction</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Level 5: Understanding Companies</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 group text-stone-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Level 6: Advanced Compounding</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal, Governance & Disclosures */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-[#C5A869] uppercase tracking-widest mb-4">
              Governance & Compliance
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="text-[#C5A869] hover:underline cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Regulatory Disclosures</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('compliance')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-300 flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Risk Warning Framework</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-300 flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-300 flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A869]/60 group-hover:text-[#C5A869] transition-colors" />
                  <span>Privacy Policy (UK GDPR)</span>
                </button>
              </li>
              {onOpenCompanyDispatch && (
                <li className="pt-2 border-t border-stone-800">
                  <button
                    onClick={onOpenCompanyDispatch}
                    className="text-stone-400 hover:text-[#C5A869] transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] font-mono"
                    title="Administrative Access Only"
                  >
                    <Lock className="w-3 h-3 text-stone-500" />
                    <span>Client Inbound Leads Center</span>
                  </button>
                </li>
              )}
              <li className="pt-1 text-[11px] font-mono text-stone-400">
                Jurisdiction: United Kingdom
              </li>
            </ul>
          </div>
        </div>

        {/* PROMINENT MANDATORY REGULATORY DISCLAIMER */}
        <div className="pt-8 border-t border-stone-800/80">
          <div className="p-5 rounded-xs bg-[#08231B] border border-[#C5A869]/30 text-xs text-stone-300 leading-relaxed">
            <div className="flex items-center gap-2 font-serif font-bold text-white mb-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
              <span className="tracking-wide">Statutory Regulatory Notice & Disclaimer</span>
            </div>
            <p className="font-sans text-[11px] text-stone-300 leading-normal">
              {REGULATORY_DISCLAIMER_SHORT}
            </p>
          </div>

          {/* Bottom Copyright & Principles */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-300 gap-4 font-mono">
            <div>
              © {new Date().getFullYear()} EB Wealth Management Education Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <span className="text-[#C5A869]">EDUCATE</span>
              <span>→</span>
              <span className="text-[#C5A869]">UNDERSTAND</span>
              <span>→</span>
              <span className="text-[#C5A869]">ALLOCATE</span>
              <span>→</span>
              <span className="text-[#C5A869]">COMPOUND</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
