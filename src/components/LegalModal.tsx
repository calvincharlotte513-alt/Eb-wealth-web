import React from 'react';
import { X, ShieldAlert, FileText, Lock } from 'lucide-react';
import { REGULATORY_DISCLAIMER_FULL } from '../data/content';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'disclaimer' | 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 text-neutral-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-neutral-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'disclaimer' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Statutory Transparency & Legal Notice</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Regulatory Disclosures & Risk Disclaimers
            </h3>
            <div className="max-h-[60vh] overflow-y-auto pr-2 text-xs text-neutral-300 leading-relaxed space-y-4 border-t border-b border-neutral-800 py-4 font-normal">
              <pre className="whitespace-pre-wrap font-sans text-xs text-neutral-300 leading-relaxed">
                {REGULATORY_DISCLAIMER_FULL.trim()}
              </pre>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-2">
              <Lock className="w-4 h-4" />
              <span>Data Protection & Confidentiality</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Privacy Policy</h3>
            <div className="max-h-[60vh] overflow-y-auto pr-2 text-xs text-neutral-300 leading-relaxed space-y-3 border-t border-b border-neutral-800 py-4">
              <p>
                <strong>1. Data Governance:</strong> EB Wealth ("Empowerment Body") adheres strictly to international data protection standards (including GDPR and CCPA principles). We do not sell, rent, or monetize personal client data or financial portfolio submissions.
              </p>
              <p>
                <strong>2. Information We Collect:</strong> Information gathered through our assessment tools, academy enrollment forms, or mentorship applications is strictly used to evaluate candidacy, coordinate private advisory sessions, and deliver requested educational curricula.
              </p>
              <p>
                <strong>3. Payment Security:</strong> All financial transactions and credit card processing are handled via Stripe using TLS 1.3 256-bit cryptographic encryption. EB Wealth never stores raw credit card details on our servers.
              </p>
              <p>
                <strong>4. Communication & Discretion:</strong> Private advisory exchanges via direct messaging channels (WhatsApp, Signal, email) are treated with executive discretion and institutional non-disclosure protection.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-400 uppercase mb-2">
              <FileText className="w-4 h-4" />
              <span>Terms of Service & Membership Agreement</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Terms of Membership</h3>
            <div className="max-h-[60vh] overflow-y-auto pr-2 text-xs text-neutral-300 leading-relaxed space-y-3 border-t border-b border-neutral-800 py-4">
              <p>
                <strong>1. Intellectual Property:</strong> All curriculum frameworks, financial modeling templates, prompt engineering architectures, and private research documents are the exclusive intellectual property of EB Wealth. Redistribution or public resale is strictly prohibited.
              </p>
              <p>
                <strong>2. Code of Conduct:</strong> Mentorship circles and private masterminds maintain a high standard of professional courtesy and confidentiality. Violation of peer discretion will result in immediate revocation of membership without refund.
              </p>
              <p>
                <strong>3. Cancellation & Refunds:</strong> EB Wealth Academy purchases carry a 14-day conditional satisfaction guarantee. Custom 1-on-1 mentorship programs and coaching retainers are non-refundable once individual advisory hours have commenced.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
