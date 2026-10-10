/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademyPage } from './pages/AcademyPage';
import { MentorshipPage } from './pages/MentorshipPage';
import { CoachingPage } from './pages/CoachingPage';
import { ToolsPage } from './pages/ToolsPage';
import { CompliancePage } from './pages/CompliancePage';

// Modals
import { AppDownloadModal } from './components/AppDownloadModal';
import { ApplicationModal } from './components/ApplicationModal';
import { BookingModal } from './components/BookingModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { LegalModal } from './components/LegalModal';
import { GetStartedModal } from './components/GetStartedModal';
import { CompanyDispatchModal } from './components/CompanyDispatchModal';

import { Course, CoachingPackage, MentorshipTier } from './types';
import { PageId } from './types/navigation';
import { MarketDataProvider } from './context/MarketDataContext';

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

  // Modal states
  const [appDownloadModalOpen, setAppDownloadModalOpen] = useState(false);
  const [downloadModalTab, setDownloadModalTab] = useState<'download' | 'uploader'>('download');
  const [downloadContextFeature, setDownloadContextFeature] = useState<string>('');

  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);

  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [applicationTierTitle, setApplicationTierTitle] = useState('Growth Mentorship');

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCoachingPackage, setSelectedCoachingPackage] = useState<CoachingPackage | null>(null);

  const [courseDetailModalOpen, setCourseDetailModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [companyDispatchModalOpen, setCompanyDispatchModalOpen] = useState(false);

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'disclaimer' | 'privacy' | 'terms'>('disclaimer');

  // Modal Handlers
  const handleOpenAppDownload = (featureName?: string) => {
    setDownloadContextFeature(featureName || 'EB Wealth Mobile Application');
    setDownloadModalTab('download');
    setAppDownloadModalOpen(true);
  };

  const handleOpenCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    setCourseDetailModalOpen(true);
  };

  const handleApplyMentorship = (tier?: MentorshipTier) => {
    setApplicationTierTitle(tier ? tier.title : 'Growth Mentorship');
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
    <MarketDataProvider>
      <div className="min-h-screen bg-[#FAF9F5] text-[#141E18] flex flex-col font-sans selection:bg-[#C5A869]/30 selection:text-[#0D3B2E]">
      {/* Universal Top Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenDownloadModal={handleOpenAppDownload}
        onOpenGetStarted={() => setGetStartedModalOpen(true)}
        onOpenCompanyDispatch={() => setCompanyDispatchModalOpen(true)}
      />

      {/* Dynamic Multi-Page Router View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenDownloadModal={handleOpenAppDownload}
            onOpenDisclosures={() => handleOpenLegal('disclaimer')}
            onSelectCourse={handleOpenCourseDetail}
            onApplyMentorship={handleApplyMentorship}
            onBookCoaching={handleBookSession}
            onOpenGetStartedModal={() => setGetStartedModalOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenMentorship={() => handleApplyMentorship()}
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

        {currentPage === 'tools' && (
          <ToolsPage
            onNavigate={navigateTo}
            onOpenMentorship={() => handleApplyMentorship()}
            onOpenDisclosures={() => handleOpenLegal('disclaimer')}
          />
        )}

        {currentPage === 'compliance' && (
          <CompliancePage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Universal Footer with prominent regulatory disclaimers */}
      <Footer
        onNavigate={navigateTo}
        onOpenDownloadModal={handleOpenAppDownload}
        onOpenLegal={handleOpenLegal}
        onOpenGetStarted={() => setGetStartedModalOpen(true)}
        onOpenCompanyDispatch={() => setCompanyDispatchModalOpen(true)}
      />

      {/* Pathfinder Onboarding Modal */}
      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
        onNavigate={navigateTo}
        onOpenAppDownload={handleOpenAppDownload}
      />

      {/* Primary Mobile App Download Modal */}
      <AppDownloadModal
        isOpen={appDownloadModalOpen}
        onClose={() => setAppDownloadModalOpen(false)}
        contextFeature={downloadContextFeature}
        initialTab={downloadModalTab}
      />

      {/* Secondary Admissions & Intake Modals */}
      <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        tierTitle={applicationTierTitle}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={selectedCoachingPackage}
        onProceedToStripe={() => handleOpenAppDownload('1-on-1 Investment Coaching Session')}
      />

      <CourseDetailModal
        course={selectedCourse}
        isOpen={courseDetailModalOpen}
        onClose={() => setCourseDetailModalOpen(false)}
        onEnroll={(course) => handleOpenAppDownload(`EB Wealth Academy: ${course.title}`)}
      />

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalModalType}
      />

      {/* Company Notification Center & Leads Management */}
      <CompanyDispatchModal
        isOpen={companyDispatchModalOpen}
        onClose={() => setCompanyDispatchModalOpen(false)}
      />
    </div>
    </MarketDataProvider>
  );
}
