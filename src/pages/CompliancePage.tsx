import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { REGULATORY_DISCLAIMER_FULL, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { PageId } from '../types/navigation';
import { HeroBackground } from '../components/HeroBackground';
import complianceHeroBg from '../assets/images/hero_eb_wealth_1791394753165.jpg';

interface CompliancePageProps {
  onNavigate: (page: PageId) => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = () => {
  return (
    <div className="pt-24 pb-20 text-[#141E18] bg-[#FAF9F5]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-28 border-b border-stone-200 overflow-hidden bg-[#FAF9F5]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.compliance}
          fallbackSrc={HERO_FALLBACKS.compliance || complianceHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl bg-white/90 backdrop-blur-xs p-8 sm:p-10 rounded-xs border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C5A869] font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>Statutory Governance & Compliance</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D3B2E] leading-tight">
              Regulatory Disclosures, Risk Warnings & Policies.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-sans">
              EB Wealth operates with complete institutional transparency. Review our statutory non-advisory notices, investment risk disclosures, privacy protections, and terms of service below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section 1: Statutory Disclosures */}
          <div className="p-8 bg-white border border-stone-200 rounded-xs shadow-2xs">
            <div className="flex items-center gap-2.5 text-[#0D3B2E] font-serif font-bold text-base mb-4">
              <ShieldCheck className="w-5 h-5 text-[#C5A869]" />
              <span>Full Statutory Regulatory & Investment Risk Disclosures</span>
            </div>
            <div className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap bg-[#FAF9F5] p-6 rounded-xs border border-stone-200 font-sans">
              {REGULATORY_DISCLAIMER_FULL.trim()}
            </div>
          </div>

          {/* Section 2: Privacy Policy */}
          <div className="p-8 bg-white border border-stone-200 rounded-xs space-y-4 shadow-2xs">
            <div className="flex items-center gap-2.5 text-[#0D3B2E] font-serif font-bold text-base">
              <Lock className="w-5 h-5 text-[#C5A869]" />
              <span>Data Protection & Privacy Policy (UK GDPR)</span>
            </div>
            <div className="text-xs text-stone-600 space-y-3 leading-relaxed font-sans">
              <p>
                <strong className="text-[#0D3B2E]">1. Data Governance:</strong> EB Wealth adheres strictly to United Kingdom data protection laws and UK GDPR. We do not sell, rent, or distribute personal client emails, phone numbers, or submitted financial questionnaires to third parties.
              </p>
              <p>
                <strong className="text-[#0D3B2E]">2. Security Standards:</strong> All forms and communication channels utilize modern SSL/TLS encryption. We do not store sensitive payment details on our servers.
              </p>
              <p>
                <strong className="text-[#0D3B2E]">3. Confidentiality:</strong> All coaching notes, mentoring applications, and financial questionnaires are treated with strict executive discretion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
