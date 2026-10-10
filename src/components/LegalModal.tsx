import React from 'react';
import { X, FileText, Lock, ShieldCheck } from 'lucide-react';
import { REGULATORY_DISCLAIMER_FULL } from '../data/content';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'disclaimer' | 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#08231B]/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-xs shadow-2xl p-6 sm:p-8 text-[#141E18] my-auto animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-stone-400 hover:text-stone-800 transition-colors p-2 rounded-xs hover:bg-stone-100 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'disclaimer' && (
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#C5A869] uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
              <span>Statutory Transparency & Legal Notice</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-4">
              Regulatory Disclosures & Risk Warnings
            </h3>
            <div className="max-h-[60vh] overflow-y-auto pr-2 text-xs text-stone-600 leading-relaxed space-y-4 border-t border-b border-stone-200 py-4 font-normal bg-[#FAF9F5] p-4 rounded-xs">
              <pre className="whitespace-pre-wrap font-sans text-xs text-stone-600 leading-relaxed">
                {REGULATORY_DISCLAIMER_FULL.trim()}
              </pre>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#C5A869] uppercase mb-1">
              <Lock className="w-4 h-4 text-[#C5A869]" />
              <span>Data Protection & Privacy Policy (UK GDPR)</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-4">Privacy Policy</h3>
            <div className="max-h-[60vh] overflow-y-auto pr-2 text-xs text-stone-600 leading-relaxed space-y-3 border-t border-b border-stone-200 py-4 font-sans">
              <p>
                <strong className="text-[#0D3B2E]">1. Data Governance:</strong> EB Wealth adheres strictly to UK Data Protection legislation and UK GDPR principles. We do not sell, rent, or monetize personal client data or submitted questionnaires.
              </p>
              <p>
                <strong className="text-[#0D3B2E]">2. Information We Collect:</strong> Information gathered through our assessment calculators, Academy waitlists, or mentorship applications is strictly used to evaluate candidacy, coordinate coaching sessions, and deliver requested educational curricula.
              </p>
              <p>
                <strong className="text-[#0D3B2E]">3. Communications:</strong> We will communicate solely in relation to the services or programs you have requested. You may opt out of educational emails at any time.
              </p>
              <p>
                <strong className="text-[#0D3B2E]">4. Executive Discretion:</strong> All communications via video conference, email, WhatsApp, or Signal are treated with professional discretion.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#C5A869] uppercase mb-1">
              <FileText className="w-4 h-4 text-[#C5A869]" />
              <span>Terms of Engagement</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-4">Terms of Engagement</h3>
            <div className="max-h-[60vh] overflow-y-auto pr-2 text-xs text-stone-600 leading-relaxed space-y-3 border-t border-b border-stone-200 py-4 font-sans">
              <p>
                <strong className="text-[#0D3B2E]">1. Educational Agreement:</strong> By accessing EB Wealth, you acknowledge and agree that all courses, mentorship, tools, and content are provided solely for educational, informational, and general consulting purposes.
              </p>
              <p>
                <strong className="text-[#0D3B2E]">2. No Regulated Advice:</strong> EB Wealth is not authorised by the Financial Conduct Authority (FCA). Nothing on this platform constitutes regulated financial advice or investment recommendations.
              </p>
              <p>
                <strong className="text-[#0D3B2E]">3. Intellectual Property:</strong> All educational curricula, spreadsheets, frameworks, and system prompts remain the exclusive intellectual property of EB Wealth.
              </p>
              <p>
                <strong className="text-[#0D3B2E]">4. Governing Law:</strong> These terms are governed in accordance with the laws of England and Wales.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] text-xs font-medium rounded-xs border border-[#C5A869]/50 cursor-pointer shadow-xs"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
