import React from 'react';
import { ShieldAlert, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { REGULATORY_DISCLAIMER_FULL } from '../data/content';
import { PageId } from '../types/navigation';

interface CompliancePageProps {
  onNavigate: (page: PageId) => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = () => {
  return (
    <div className="pt-24 pb-20 text-neutral-100 bg-neutral-950">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-neutral-900 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
            <ShieldAlert className="w-4 h-4" />
            <span>Statutory Governance & Disclosures</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Total Legal Transparency</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display max-w-4xl">
            Regulatory Disclosures, Risk Warnings & Policies.
          </h1>
          <p className="text-base text-neutral-300 max-w-3xl mt-4 leading-relaxed">
            EB Wealth ("Empowerment Body") operates with institutional transparency. Review our full non-advisory notices, investment risk disclosures, privacy protections, and terms of service below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section 1: Statutory Disclosures */}
          <div className="p-8 bg-neutral-900/80 border border-neutral-800 rounded-3xl">
            <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-sm mb-4">
              <ShieldAlert className="w-5 h-5" />
              <span>Full Regulatory & Investment Risk Disclosures</span>
            </div>
            <div className="text-xs text-neutral-300 leading-relaxed font-mono whitespace-pre-wrap bg-neutral-950 p-6 rounded-2xl border border-neutral-800/80">
              {REGULATORY_DISCLAIMER_FULL.trim()}
            </div>
          </div>

          {/* Section 2: Privacy Policy */}
          <div className="p-8 bg-neutral-900/80 border border-neutral-800 rounded-3xl space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
              <Lock className="w-5 h-5" />
              <span>Data Protection & Privacy Policy</span>
            </div>
            <div className="text-xs text-neutral-300 space-y-3 leading-relaxed">
              <p>
                <strong>1. Data Governance:</strong> EB Wealth adheres strictly to international privacy frameworks (GDPR and CCPA principles). We do not monetize, rent, or distribute personal client emails, corporate profiles, or financial portfolio submissions.
              </p>
              <p>
                <strong>2. Payment Security:</strong> All financial transactions, recurring billing, and enrollment checkouts are secured via Stripe using TLS 1.3 256-bit cryptographic encryption. EB Wealth servers never store raw credit card credentials.
              </p>
              <p>
                <strong>3. Executive Discretion:</strong> All advisory communications conducted via direct telephone, video conference, WhatsApp, or Signal are treated under institutional non-disclosure standards.
              </p>
            </div>
          </div>

          {/* Section 3: Terms of Membership */}
          <div className="p-8 bg-neutral-900/80 border border-neutral-800 rounded-3xl space-y-4">
            <div className="flex items-center gap-2.5 text-blue-400 font-semibold text-sm">
              <FileText className="w-5 h-5" />
              <span>Terms of Membership & Cancellation Policy</span>
            </div>
            <div className="text-xs text-neutral-300 space-y-3 leading-relaxed">
              <p>
                <strong>1. Intellectual Property:</strong> Masterclass curricula, financial spreadsheets, prompt engineering libraries, and underwriting models are the proprietary intellectual property of EB Wealth. Resale or unauthorized redistribution is strictly forbidden.
              </p>
              <p>
                <strong>2. Course Refund Policy:</strong> Educational masterclasses in the EB Wealth Academy include a 14-day conditional satisfaction guarantee. Custom 1-on-1 coaching sessions and executive mentorship retainers are non-refundable once individual advisory hours have commenced.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
