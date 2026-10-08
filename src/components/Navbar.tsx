import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Smartphone, Sparkles, Mail } from 'lucide-react';
import { PageId } from '../types/navigation';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenDownloadModal: (feature?: string) => void;
  onOpenManageApk?: () => void;
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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About EB' },
    { id: 'academy', label: 'Academy' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'coaching', label: '1-to-1 Coaching' },
    { id: 'ai-growth', label: 'AI Business Growth' },
    { id: 'app', label: 'App' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#00A878]/30 flex items-center justify-center font-bold text-[#00A878] group-hover:bg-[#00A878] group-hover:text-white transition-all shadow-sm">
                EB
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#17202A] leading-none group-hover:text-[#00A878] transition-colors">
                  EB Wealth
                </span>
                <span className="text-[11px] font-medium text-[#52606D] mt-0.5 tracking-tight">
                  by Empowerment Body
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links: Home | About EB | Academy | Mentorship | 1-to-1 Coaching | AI Business Growth | App */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              if (link.id === 'app') {
                return (
                  <button
                    key={link.id}
                    onClick={() => onOpenDownloadModal('EB Wealth Mobile App')}
                    className="text-[#52606D] hover:text-[#00A878] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
                  >
                    <Smartphone className="w-4 h-4 text-[#00A878]" />
                    <span>App</span>
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
                      ? 'text-[#00A878] font-semibold after:w-full after:h-[2px] after:bg-[#00A878] after:absolute after:bottom-0 after:left-0'
                      : 'text-[#52606D] hover:text-[#17202A]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons: Secondary CTA "Open EB Wealth App" + Primary CTA "Get Started" */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenCompanyDispatch && (
              <button
                onClick={onOpenCompanyDispatch}
                className="py-2 px-3 text-xs font-semibold text-[#17202A] bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="View Dispatched Applications & Company Notification Routing"
              >
                <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse"></span>
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="hidden xl:inline">Company Inbox</span>
              </button>
            )}

            <button
              onClick={() => onOpenDownloadModal('EB Wealth App')}
              className="py-2.5 px-4 text-xs font-semibold text-[#17202A] bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-slate-200 hover:border-blue-300 rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Open EB Wealth App</span>
            </button>
            <button
              onClick={onOpenGetStarted}
              className="py-2.5 px-5 text-xs font-semibold text-white bg-[#00A878] hover:bg-[#009267] rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenGetStarted}
              className="sm:hidden py-1.5 px-3 text-xs font-semibold text-white bg-[#00A878] rounded-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#17202A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              if (link.id === 'app') {
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDownloadModal('EB Wealth Mobile App');
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17202A] hover:bg-[#EFF6FF] flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#2563EB]" />
                      <span>App</span>
                    </span>
                    <span className="text-xs text-[#2563EB] font-semibold">Open</span>
                  </button>
                );
              }

              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id as PageId)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#ECFDF5] text-[#00A878] font-bold'
                      : 'text-[#52606D] hover:bg-slate-50 hover:text-[#17202A]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full py-3 px-4 bg-[#00A878] text-white text-sm font-semibold rounded-xl text-center shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownloadModal('EB Wealth Mobile App');
              }}
              className="w-full py-2.5 px-4 bg-[#F8FAFC] text-[#17202A] border border-slate-200 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Open EB Wealth App</span>
            </button>
            {onOpenCompanyDispatch && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCompanyDispatch();
                }}
                className="w-full py-2 px-4 bg-white text-[#17202A] border border-slate-200 text-xs font-medium rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50"
              >
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Company Dispatch & Inbound Leads</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
