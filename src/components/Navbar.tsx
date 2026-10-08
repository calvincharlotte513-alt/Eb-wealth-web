import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Smartphone, Upload } from 'lucide-react';
import { PageId } from '../types/navigation';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (feature?: string) => void;
  onOpenManageApk: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenDownloadModal,
  onOpenManageApk
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-neutral-950/70 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-lg md:text-xl font-bold tracking-tight text-white font-display hover:text-emerald-400 transition-colors shrink-0 cursor-pointer"
          >
            EB Wealth
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-medium text-neutral-300">
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-white transition-colors cursor-pointer py-1 relative ${
                currentPage === 'about'
                  ? 'text-white font-semibold after:w-full after:h-[2px] after:bg-emerald-400 after:absolute after:bottom-0 after:left-0'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('academy')}
              className={`hover:text-white transition-colors cursor-pointer py-1 relative ${
                currentPage === 'academy'
                  ? 'text-white font-semibold after:w-full after:h-[2px] after:bg-emerald-400 after:absolute after:bottom-0 after:left-0'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Academy
            </button>
            <button
              onClick={() => handleNavClick('mentorship')}
              className={`hover:text-white transition-colors cursor-pointer py-1 relative ${
                currentPage === 'mentorship'
                  ? 'text-white font-semibold after:w-full after:h-[2px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Mentorship
            </button>
            <button
              onClick={() => handleNavClick('coaching')}
              className={`hover:text-white transition-colors cursor-pointer py-1 relative ${
                currentPage === 'coaching'
                  ? 'text-white font-semibold after:w-full after:h-[2px] after:bg-blue-400 after:absolute after:bottom-0 after:left-0'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Coaching
            </button>
            <button
              onClick={() => handleNavClick('ai-growth')}
              className={`hover:text-white transition-colors cursor-pointer py-1 relative ${
                currentPage === 'ai-growth'
                  ? 'text-white font-semibold after:w-full after:h-[2px] after:bg-blue-400 after:absolute after:bottom-0 after:left-0'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              AI Growth
            </button>
            <button
              onClick={() => handleNavClick('tools')}
              className={`hover:text-white transition-colors cursor-pointer py-1 relative ${
                currentPage === 'tools'
                  ? 'text-white font-semibold after:w-full after:h-[2px] after:bg-emerald-400 after:absolute after:bottom-0 after:left-0'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Tools
            </button>
          </nav>

          {/* Zone 3: Direct App Download Action */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNavClick('tools')}
              className="px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Simulator
            </button>
            <button
              onClick={() => onOpenDownloadModal('EB Wealth App Full Suite')}
              className="px-3.5 py-2 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-lg transition-all shadow-sm hover:shadow-emerald-950/40 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download App (APK)</span>
            </button>
            {/* Upload / Manage APK (Commented out for now)
            <button
              onClick={onOpenManageApk}
              className="px-3 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 hover:border-emerald-400 rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-sm hover:scale-[1.02]"
              title="Upload your APK file or configure download link"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Upload / Manage APK</span>
            </button>
            */}
          </div>

          {/* Mobile hamburger & quick actions */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Upload APK mobile button (Commented out for now)
            <button
              onClick={onOpenManageApk}
              className="px-2.5 py-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-950 border border-emerald-500/50 rounded-lg whitespace-nowrap flex items-center gap-1 cursor-pointer"
              title="Upload or manage APK"
            >
              <Upload className="w-3 h-3 text-emerald-400" />
              <span>Upload APK</span>
            </button>
            */}
            <button
              onClick={() => onOpenDownloadModal('EB Wealth App Mobile')}
              className="px-2.5 py-1.5 text-[11px] font-bold text-neutral-950 bg-emerald-400 rounded-lg whitespace-nowrap flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>APK</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 border-b border-neutral-800 px-4 py-4 space-y-2">
          <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 mb-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                EB Wealth Mobile App
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">v2.4.0 APK</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              All masterclasses and mentorship deal rooms are hosted in the app.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownloadModal('EB Wealth Mobile Suite');
                }}
                className="w-full py-2 bg-emerald-400 text-neutral-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download APK</span>
              </button>
              {/* Mobile Drawer Upload APK (Commented out for now)
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenManageApk();
                }}
                className="w-full py-2 bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Upload APK</span>
              </button>
              */}
            </div>
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 text-sm font-medium border-b border-neutral-900 ${
              currentPage === 'home' ? 'text-emerald-400 font-bold' : 'text-neutral-300'
            }`}
          >
            Home Overview
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left py-2 text-sm font-medium border-b border-neutral-900 ${
              currentPage === 'about' ? 'text-emerald-400 font-bold' : 'text-neutral-300'
            }`}
          >
            About & Leadership Bio
          </button>
          <button
            onClick={() => handleNavClick('academy')}
            className={`block w-full text-left py-2 text-sm font-medium border-b border-neutral-900 ${
              currentPage === 'academy' ? 'text-emerald-400 font-bold' : 'text-neutral-300'
            }`}
          >
            EB Wealth Academy
          </button>
          <button
            onClick={() => handleNavClick('mentorship')}
            className={`block w-full text-left py-2 text-sm font-medium border-b border-neutral-900 ${
              currentPage === 'mentorship' ? 'text-amber-400 font-bold' : 'text-neutral-300'
            }`}
          >
            Mentorship Programs
          </button>
          <button
            onClick={() => handleNavClick('coaching')}
            className={`block w-full text-left py-2 text-sm font-medium border-b border-neutral-900 ${
              currentPage === 'coaching' ? 'text-blue-400 font-bold' : 'text-neutral-300'
            }`}
          >
            One-to-One Coaching
          </button>
          <button
            onClick={() => handleNavClick('ai-growth')}
            className={`block w-full text-left py-2 text-sm font-medium border-b border-neutral-900 ${
              currentPage === 'ai-growth' ? 'text-blue-400 font-bold' : 'text-neutral-300'
            }`}
          >
            AI Business Growth
          </button>
          <button
            onClick={() => handleNavClick('tools')}
            className={`block w-full text-left py-2 text-sm font-medium border-b border-neutral-900 ${
              currentPage === 'tools' ? 'text-emerald-400 font-bold' : 'text-neutral-300'
            }`}
          >
            Interactive Tools & Simulator
          </button>
          <button
            onClick={() => handleNavClick('compliance')}
            className={`block w-full text-left py-2 text-sm font-medium ${
              currentPage === 'compliance' ? 'text-amber-400 font-bold' : 'text-neutral-400'
            }`}
          >
            Regulatory Disclosures
          </button>
        </div>
      )}
    </header>
  );
};
