import React from 'react';
import { Mail, Phone, ShieldCheck, Download, Smartphone } from 'lucide-react';
import { PageId } from '../types/navigation';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (feature?: string) => void;
  onOpenLegal: (type: 'disclaimer' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDownloadModal, onOpenLegal }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-3">
            <button
              onClick={() => handleNav('home')}
              className="text-xl font-bold text-white font-display tracking-tight block text-left cursor-pointer hover:text-emerald-400 transition-colors"
            >
              EB Wealth
            </button>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Empowerment Body investment education, tailored executive mentorship, and proprietary AI business growth architectures. All masterclasses, deal rooms, and tools are hosted directly in the EB Wealth Mobile App.
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => onOpenDownloadModal('Footer Link')}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Android APK (v2.4.0)</span>
              </button>
            </div>
          </div>

          {/* Core Multi-Page Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Platform Pages
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About & Leadership Bio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('academy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  EB Wealth Academy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mentorship')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Executive Mentorship
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('coaching')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  One-to-One Coaching
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ai-growth')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Business Growth
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tools')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Capital Suite & Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Direct Advisory Office
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:ebnetworks@outlook.com" className="hover:text-white transition-colors">
                  ebnetworks@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+447365230302" className="hover:text-white transition-colors">
                  +447365230302
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Governance & Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('compliance')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Compliance Disclosures Page</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Statutory Disclosures (Modal)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms of Membership
                </button>
              </li>
              <li>
                <span className="text-[11px] text-neutral-500 block pt-1">
                  Mobile App Package Verified
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclosure Bottom Banner */}
        <div className="pt-6 border-t border-neutral-900 pb-6 text-[11px] leading-relaxed text-neutral-400">
          <p>
            <strong>Statutory Risk Disclaimer:</strong> EB Wealth ("Empowerment Body") is strictly an educational publishing and business consultancy firm. EB Wealth is not an investment adviser registered with the U.S. SEC or FINRA, and does not provide individualized tax, legal, or securities advisory services. Hypothetical examples and historical performance analyses are not indicative of future market returns.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} EB Wealth (Empowerment Body). All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              X (Twitter)
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
