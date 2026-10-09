import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Smartphone, ShieldCheck } from 'lucide-react';
import { PageId } from '../types/navigation';
import { MarketBar } from './MarketBar';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (feature?: string) => void;
  onOpenGetStarted: () => void;
  onOpenCompanyDispatch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenDownloadModal,
  onOpenGetStarted,
  onOpenCompanyDispatch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId | 'app'; label: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'about', label: 'Philosophy' },
    { id: 'academy', label: 'Academy' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'coaching', label: 'Private Coaching' },
    { id: 'tools', label: 'Tools & Analytics' },
    { id: 'app', label: 'App Portal' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D3B2E]/95 backdrop-blur-md border-b border-[#C5A869]/35 shadow-lg text-white'
          : 'bg-[#0D3B2E] border-b border-[#C5A869]/25 text-white'
      }`}
    >
      {/* 1. Goldman Sachs Institutional Market Bar */}
      <MarketBar />

      {/* 2. Main Institutional Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo / Brand — Goldman Sachs Prestige Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xs bg-gradient-to-br from-[#165342] to-[#07251C] border border-[#C5A869]/60 flex items-center justify-center font-serif font-bold text-white tracking-widest text-sm shadow-xs group-hover:border-[#DFCA96] transition-all">
                EB
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-none group-hover:text-[#DFCA96] transition-colors">
                  EB WEALTH
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A869] mt-1">
                  Institutional Investment Education
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider">
            {navLinks.map((link) => {
              if (link.id === 'app') {
                return (
                  <button
                    key={link.id}
                    onClick={() => onOpenDownloadModal('EB Wealth Mobile Portal')}
                    className="text-slate-300 hover:text-[#C5A869] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>App Portal</span>
                  </button>
                );
              }

              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id as PageId)}
                  className={`transition-colors cursor-pointer py-1 relative ${
                    isActive
                      ? 'text-[#C5A869] font-bold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-[#C5A869]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenCompanyDispatch && (
              <button
                onClick={onOpenCompanyDispatch}
                className="py-2 px-2.5 text-slate-300 hover:text-[#C5A869] hover:bg-white/5 rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-transparent hover:border-[#C5A869]/30"
                title="Company Inbound Leads & Notification Settings"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
                <span className="hidden xl:inline text-[10px] tracking-wide uppercase font-mono">Inbound Leads</span>
              </button>
            )}

            <button
              onClick={onOpenGetStarted}
              className="py-2.5 px-4.5 bg-gradient-to-r from-[#C5A869] to-[#DFCA96] hover:from-[#B89748] hover:to-[#C5A869] text-[#07251C] font-semibold text-xs rounded-xs transition-all cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2 uppercase tracking-wider border border-[#DFCA96]/40"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#07251C]" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#C5A869] rounded-xs cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07251C] border-b border-[#C5A869]/30 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              if (link.id === 'app') {
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDownloadModal('EB Wealth Mobile Portal');
                    }}
                    className="w-full text-left py-2.5 px-3 rounded-xs text-xs font-semibold uppercase tracking-wider text-slate-200 hover:bg-white/5 hover:text-[#C5A869] flex items-center gap-2 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-[#C5A869]" />
                    <span>EB Wealth App Portal</span>
                  </button>
                );
              }

              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id as PageId)}
                  className={`w-full text-left py-2.5 px-3 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-[#C5A869] font-bold border-l-2 border-[#C5A869]'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full py-3 bg-[#C5A869] hover:bg-[#B89748] text-[#07251C] font-semibold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-4 h-4 text-[#07251C]" />
            </button>

            {onOpenCompanyDispatch && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCompanyDispatch();
                }}
                className="w-full py-2.5 text-center text-[11px] uppercase tracking-wider text-[#C5A869] hover:underline font-mono"
              >
                Inbound Lead Center
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
