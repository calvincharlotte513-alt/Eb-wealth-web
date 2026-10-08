import React from 'react';
import { ShieldAlert, Lock, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { REGULATORY_DISCLAIMER_FULL } from '../data/content';
import { PageId } from '../types/navigation';
import { HeroBackground } from '../components/HeroBackground';
import complianceHeroBg from '../assets/images/hero_eb_wealth_1791394753165.jpg';

interface CompliancePageProps {
  onNavigate: (page: PageId) => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = () => {
  return (
    <div className="pt-24 pb-20 text-[#17202A] bg-[#F8FAFC]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-[#F8FAFC]">
        <HeroBackground
          imageSrc={complianceHeroBg}
          fallbackSrc="/images/hero_eb_wealth_1791394753165.jpg"
          accent="emerald"
          overlayOpacity="medium"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#00A878] font-bold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Governance & Disclosures</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17202A] max-w-4xl">
            Regulatory Disclosures, Risk Warnings & Policies.
          </h1>
          <p className="text-base sm:text-lg text-[#52606D] max-w-3xl mt-4 leading-relaxed">
            EB Wealth operates with complete institutional transparency. Review our full non-advisory notices, investment risk disclosures, privacy protections, and terms of service below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section 1: Statutory Disclosures */}
          <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xs">
            <div className="flex items-center gap-2.5 text-[#00A878] font-bold text-sm mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span>Full Regulatory & Investment Risk Disclosures</span>
            </div>
            <div className="text-xs text-[#52606D] leading-relaxed whitespace-pre-wrap bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200">
              {REGULATORY_DISCLAIMER_FULL.trim()}
            </div>
          </div>

          {/* Section 2: Privacy Policy */}
          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-[#2563EB] font-bold text-sm">
              <Lock className="w-5 h-5" />
              <span>Data Protection & Privacy Policy (UK GDPR)</span>
            </div>
            <div className="text-xs text-[#52606D] space-y-3 leading-relaxed">
              <p>
                <strong>1. Data Governance:</strong> EB Wealth adheres strictly to United Kingdom data protection laws and UK GDPR. We do not sell, rent, or distribute personal client emails, phone numbers, or submitted financial questionnaires to third parties.
              </p>
              <p>
                <strong>2. Security Standards:</strong> All forms and communication channels utilize modern SSL/TLS encryption. We do not store sensitive payment details on our servers.
              </p>
              <p>
                <strong>3. Confidentiality:</strong> All coaching notes, mentoring applications, and business audit submissions are treated with strict executive discretion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
