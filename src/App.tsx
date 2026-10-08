/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademyPage } from './pages/AcademyPage';
import { MentorshipPage } from './pages/MentorshipPage';
import { CoachingPage } from './pages/CoachingPage';
import { AIBusinessGrowthPage } from './pages/AIBusinessGrowthPage';
import { ToolsPage } from './pages/ToolsPage';
import { CompliancePage } from './pages/CompliancePage';

// Modals
import { AppDownloadModal } from './components/AppDownloadModal';
import { ApplicationModal } from './components/ApplicationModal';
import { BookingModal } from './components/BookingModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { AIAuditModal } from './components/AIAuditModal';
import { LegalModal } from './components/LegalModal';

import { Course, CoachingPackage, MentorshipTier } from './types';
import { PageId } from './types/navigation';

export default function App() {
  // Navigation state (Multi-page routing with browser history sync)
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages: PageId[] = [
      'home',
      'about',
      'academy',
      'mentorship',
      'coaching',
      'ai-growth',
      'tools',
      'compliance'
    ];
    if (validPages.includes(hash as PageId)) {
      return hash as PageId;
    }
    return 'home';
  });

  // Keep URL in sync with page changes
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = [
        'home',
        'about',
        'academy',
        'mentorship',
        'coaching',
        'ai-growth',
        'tools',
        'compliance'
      ];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // App Download Modal state
  const [appDownloadModalOpen, setAppDownloadModalOpen] = useState(false);
  const [downloadModalTab, setDownloadModalTab] = useState<'download' | 'uploader'>('download');
  const [downloadContextFeature, setDownloadContextFeature] = useState<string>('');

  const handleOpenAppDownload = (featureName?: string) => {
    setDownloadContextFeature(featureName || 'EB Wealth Mobile Application');
    setDownloadModalTab('download');
    setAppDownloadModalOpen(true);
  };

  const handleOpenManageApk = () => {
    setDownloadContextFeature('APK Release Management');
    setDownloadModalTab('uploader');
    setAppDownloadModalOpen(true);
  };

  // Other Modal states
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [applicationTierTitle, setApplicationTierTitle] = useState('Private Executive Mentorship');

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCoachingPackage, setSelectedCoachingPackage] = useState<CoachingPackage | null>(null);

  const [courseDetailModalOpen, setCourseDetailModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [aiAuditModalOpen, setAiAuditModalOpen] = useState(false);

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'disclaimer' | 'privacy' | 'terms'>('disclaimer');

  // Modal Action Handlers
  const handleOpenCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    setCourseDetailModalOpen(true);
  };

  const handleApplyMentorship = (tier?: MentorshipTier) => {
    setApplicationTierTitle(tier ? tier.title : 'Private Executive Mentorship');
    setApplicationModalOpen(true);
  };

  const handleBookSession = (pkg: CoachingPackage) => {
    setSelectedCoachingPackage(pkg);
    setBookingModalOpen(true);
  };

  const handleOpenLegal = (type: 'disclaimer' | 'privacy' | 'terms') => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Universal Top Bar with direct App download & APK manager */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenDownloadModal={handleOpenAppDownload}
        onOpenManageApk={handleOpenManageApk}
      />

      {/* Dynamic Multi-Page Router View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenDownloadModal={handleOpenAppDownload}
            onOpenDisclosures={() => handleOpenLegal('disclaimer')}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenMentorship={() => handleOpenAppDownload('Executive Mentorship with the Founder & CEO')}
            onOpenDisclosures={() => handleOpenLegal('disclaimer')}
          />
        )}

        {currentPage === 'academy' && (
          <AcademyPage
            onNavigate={navigateTo}
            onSelectCourse={handleOpenCourseDetail}
            onOpenAppDownload={handleOpenAppDownload}
            onOpenDisclosures={() => handleOpenLegal('disclaimer')}
          />
        )}

        {currentPage === 'mentorship' && (
          <MentorshipPage
            onNavigate={navigateTo}
            onApply={handleApplyMentorship}
            onOpenAppDownload={handleOpenAppDownload}
            onOpenDisclosures={() => handleOpenLegal('disclaimer')}
          />
        )}

        {currentPage === 'coaching' && (
          <CoachingPage
            onNavigate={navigateTo}
            onBookSession={handleBookSession}
            onOpenAppDownload={handleOpenAppDownload}
            onOpenDisclosures={() => handleOpenLegal('disclaimer')}
          />
        )}

        {currentPage === 'ai-growth' && (
          <AIBusinessGrowthPage
            onNavigate={navigateTo}
            onScheduleAudit={() => setAiAuditModalOpen(true)}
          />
        )}

        {currentPage === 'tools' && (
          <ToolsPage
            onNavigate={navigateTo}
            onOpenMentorship={() => handleOpenAppDownload('Executive Mentorship Suite')}
            onOpenDisclosures={() => handleOpenLegal('disclaimer')}
          />
        )}

        {currentPage === 'compliance' && (
          <CompliancePage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Universal Footer with direct APK download & manager */}
      <Footer
        onNavigate={navigateTo}
        onOpenDownloadModal={handleOpenAppDownload}
        onOpenManageApk={handleOpenManageApk}
        onOpenLegal={handleOpenLegal}
      />

      {/* Floating Admin APK Manager Button (Commented out for now)
      <aside aria-label="APK Administration" className="fixed bottom-5 right-5 z-40">
        <button
          onClick={handleOpenManageApk}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-neutral-900/95 hover:bg-neutral-800 text-white border border-emerald-500/50 hover:border-emerald-400 rounded-full shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ring-1 ring-emerald-500/20"
          title="Owner Tool: Upload or manage your APK file"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <Upload className="w-4 h-4 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-xs font-bold text-white tracking-wide">
            Upload / Manage APK
          </span>
          <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono rounded font-semibold uppercase">
            Admin
          </span>
        </button>
      </aside>
      */}

      {/* Primary Mobile App Download Modal */}
      <AppDownloadModal
        isOpen={appDownloadModalOpen}
        onClose={() => setAppDownloadModalOpen(false)}
        contextFeature={downloadContextFeature}
        initialTab={downloadModalTab}
      />

      {/* Secondary Information & Intake Modals */}
      <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        tierTitle={applicationTierTitle}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={selectedCoachingPackage}
        onProceedToStripe={() => handleOpenAppDownload('1-on-1 Coaching Private Room')}
      />

      <CourseDetailModal
        course={selectedCourse}
        isOpen={courseDetailModalOpen}
        onClose={() => setCourseDetailModalOpen(false)}
        onEnroll={(course) => handleOpenAppDownload(`EB Wealth Academy: ${course.title}`)}
      />

      <AIAuditModal
        isOpen={aiAuditModalOpen}
        onClose={() => setAiAuditModalOpen(false)}
      />

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalModalType}
      />
    </div>
  );
}
