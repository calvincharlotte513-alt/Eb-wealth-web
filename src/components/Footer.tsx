import React from 'react';
import { ShieldCheck, Smartphone, ArrowRight, Heart } from 'lucide-react';
import { PageId } from '../types/navigation';
import { REGULATORY_DISCLAIMER_SHORT } from '../data/content';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (feature?: string) => void;
  onOpenManageApk?: () => void;
  onOpenLegal: (type: 'disclaimer' | 'privacy' | 'terms') => void;
  onOpenGetStarted?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDownloadModal,
  onOpenLegal,
  onOpenGetStarted
}) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#52606D] border-t border-slate-200 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Parent Ecosystem */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#00A878]/30 flex items-center justify-center font-bold text-[#00A878] text-xs">
                EB
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#17202A] tracking-tight">
                  EB Wealth
                </span>
                <span className="text-[11px] text-[#52606D]">
                  by Empowerment Body
                </span>
              </div>
            </div>

            <p className="text-xs text-[#52606D] max-w-sm leading-relaxed">
              Empowerment Body investment education, financial literacy, tailored mentorship, and practical AI business growth. Helping you build the knowledge, confidence, systems and tools needed to make better long-term decisions.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onOpenDownloadModal('Footer Link')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] border border-blue-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Open EB Wealth App</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  About EB & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  EB Wealth Academy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mentorship')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  Mentorship & Accountability
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('coaching')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  1-to-1 Coaching
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ai-growth')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  AI Business Growth
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tools')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  Calculators & Profiler
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Curriculum */}
          <div>
            <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
              Academy Levels
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer text-left"
                >
                  Level 1: Investing Foundations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer text-left"
                >
                  Level 2: Understanding Investments
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer text-left"
                >
                  Level 3: UK Tax Wrappers (ISAs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer text-left"
                >
                  Level 4: Portfolio Building
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer text-left"
                >
                  Level 5: Understanding Companies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer text-left"
                >
                  Level 6: Advanced Investing
                </button>
              </li>
            </ul>
          </div>

          {/* Legal, Governance & Disclosures */}
          <div>
            <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="text-[#00A878] font-medium hover:underline cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Regulatory Disclosures</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('compliance')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  Compliance Framework
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#00A878] transition-colors cursor-pointer"
                >
                  Privacy Policy & Cookies
                </button>
              </li>
              <li>
                <span className="text-[11px] text-slate-400">Jurisdiction: United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        {/* PROMINENT MANDATORY REGULATORY DISCLAIMER - VERBATIM FROM BRIEF */}
        <div className="pt-8 border-t border-slate-200">
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 text-xs text-[#52606D] leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-[#17202A] mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00A878]" />
              <span>Important Regulatory Disclaimer</span>
            </div>
            <p>
              {REGULATORY_DISCLAIMER_SHORT}
            </p>
          </div>

          {/* Bottom Copyright & Brand Credits */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#52606D] gap-4">
            <div>
              © {new Date().getFullYear()} EB Wealth. An Empowerment Body Brand. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Learn. Invest. Build Wealth.</span>
              <span>·</span>
              <span>EDUCATE → UNDERSTAND → ANALYSE → BUILD → TRACK → GROW</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
