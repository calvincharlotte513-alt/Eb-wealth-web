import React, { useState, useEffect } from 'react';
import { PageId } from '../types/navigation';
import { ACADEMY_LEVELS, REGULATORY_DISCLAIMER_SHORT, HERO_BACKGROUNDS, HERO_FALLBACKS, FOUNDER_IMAGE_URL } from '../data/content';
import { progressService, OverallProgressInfo } from '../services/progressService';
import { firebaseDataService } from '../services/firebaseDataService';
import { Course } from '../types';
import {
  Trophy,
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Sparkles,
  Award,
  ShieldCheck,
  TrendingUp,
  Download,
  Printer,
  Calculator,
  Compass,
  FileCheck,
  User,
  Mail,
  Calendar,
  Save,
  Clock,
  Layers,
  PieChart
} from 'lucide-react';
import { HeroBackground } from '../components/HeroBackground';

interface ProgressPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCourse?: (course: Course) => void;
  onOpenMentorship?: () => void;
  onOpenAppDownload?: (feature?: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  onNavigate,
  onOpenMentorship,
  onOpenAppDownload
}) => {
  // Navigation tab within the User Dashboard
  const [activeDashboardTab, setActiveDashboardTab] = useState<'curriculum' | 'portfolio' | 'inquiries' | 'journal'>('curriculum');

  // Overall curriculum progress
  const [progress, setProgress] = useState<OverallProgressInfo>(progressService.getOverallProgress());
  const [activeLevelTab, setActiveLevelTab] = useState<number>(1);

  // Student Profile State
  const [studentId, setStudentId] = useState<string>(() => {
    return localStorage.getItem('eb_student_id') || `STU-${Date.now().toString().slice(-6)}`;
  });
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('eb_student_name') || 'Private Investor';
  });
  const [studentEmail, setStudentEmail] = useState<string>(() => {
    return localStorage.getItem('eb_student_email') || '';
  });
  const [studentNotes, setStudentNotes] = useState<string>(() => {
    return localStorage.getItem('eb_student_notes') || '';
  });

  // Portfolio Allocation Planner State
  const [monthlyDca, setMonthlyDca] = useState<number>(() => {
    const saved = localStorage.getItem('eb_portfolio_monthly_dca');
    return saved ? parseInt(saved, 10) : 1000;
  });
  const [isaAllocation, setIsaAllocation] = useState<number>(() => {
    const saved = localStorage.getItem('eb_portfolio_isa_pct');
    return saved ? parseInt(saved, 10) : 70;
  });
  const [sippAllocation, setSippAllocation] = useState<number>(() => {
    const saved = localStorage.getItem('eb_portfolio_sipp_pct');
    return saved ? parseInt(saved, 10) : 30;
  });
  const [portfolioSaved, setPortfolioSaved] = useState<boolean>(false);

  // User Inquiries State
  const [userInquiries, setUserInquiries] = useState<any[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState<boolean>(false);

  // Sync and Modal States
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [notesSaved, setNotesSaved] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Ensure persistent studentId
  useEffect(() => {
    if (!localStorage.getItem('eb_student_id')) {
      localStorage.setItem('eb_student_id', studentId);
    }
  }, [studentId]);

  // Subscribe to progressService changes
  useEffect(() => {
    const unsubscribe = progressService.subscribe(() => {
      setProgress(progressService.getOverallProgress());
    });
    return () => unsubscribe();
  }, []);

  // Restore student progress from Cloud Firestore on initial load
  useEffect(() => {
    let isMounted = true;
    const fetchRemoteProgress = async () => {
      try {
        const remote = await firebaseDataService.getUserProgress(studentId);
        if (remote && isMounted) {
          if (remote.studentName && remote.studentName !== 'Private Investor') {
            setStudentName(remote.studentName);
            localStorage.setItem('eb_student_name', remote.studentName);
          }
          if (remote.studentEmail) {
            setStudentEmail(remote.studentEmail);
            localStorage.setItem('eb_student_email', remote.studentEmail);
          }
          if (remote.notes) {
            setStudentNotes(remote.notes);
            localStorage.setItem('eb_student_notes', remote.notes);
          }
          if (remote.portfolioPlan) {
            if (remote.portfolioPlan.monthlyDca) {
              setMonthlyDca(remote.portfolioPlan.monthlyDca);
              localStorage.setItem('eb_portfolio_monthly_dca', remote.portfolioPlan.monthlyDca.toString());
            }
            if (remote.portfolioPlan.isaAllocation) {
              setIsaAllocation(remote.portfolioPlan.isaAllocation);
              localStorage.setItem('eb_portfolio_isa_pct', remote.portfolioPlan.isaAllocation.toString());
            }
            if (remote.portfolioPlan.sippAllocation) {
              setSippAllocation(remote.portfolioPlan.sippAllocation);
              localStorage.setItem('eb_portfolio_sipp_pct', remote.portfolioPlan.sippAllocation.toString());
            }
          }
          if (Array.isArray(remote.completedTopics) && remote.completedTopics.length > 0) {
            progressService.setAllCompletedKeys(remote.completedTopics);
            setProgress(progressService.getOverallProgress());
          }
          if (remote.currentLevel) {
            setActiveLevelTab(remote.currentLevel);
          }
        }
      } catch (err) {
        console.warn('Could not restore from Firestore:', err);
      }
    };

    fetchRemoteProgress();
    return () => { isMounted = false; };
  }, [studentId]);

  // Sync progress to Cloud Firestore & backend database asynchronously
  useEffect(() => {
    const syncToDatabase = async () => {
      setIsSyncing(true);
      try {
        const rawCompleted = localStorage.getItem('eb_wealth_student_progress_v2');
        const topics = rawCompleted ? JSON.parse(rawCompleted) : [];

        // Save directly to Firebase Cloud Firestore
        await firebaseDataService.saveUserProgress({
          userId: studentId,
          studentName,
          studentEmail,
          completedTopics: topics,
          currentLevel: activeLevelTab,
          lastActive: new Date().toISOString(),
          notes: studentNotes,
          portfolioPlan: {
            monthlyDca,
            isaAllocation,
            sippAllocation
          },
          updatedAt: new Date().toISOString()
        });

        // Also dual-sync to local backend API
        await fetch('/api/user/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: studentId,
            studentName,
            studentEmail,
            completedTopics: topics,
            currentLevel: activeLevelTab,
            notes: studentNotes,
            portfolioPlan: {
              monthlyDca,
              isaAllocation,
              sippAllocation
            }
          })
        });
        setLastSyncTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
      } catch (err) {
        console.warn('Database progress sync notice:', err);
      } finally {
        setIsSyncing(false);
      }
    };

    const timer = setTimeout(syncToDatabase, 1200);
    return () => clearTimeout(timer);
  }, [progress, activeLevelTab, studentNotes, studentName, studentEmail, monthlyDca, isaAllocation, sippAllocation, studentId]);

  // Load user inquiries if email is provided
  useEffect(() => {
    if (!studentEmail.trim()) {
      setUserInquiries([]);
      return;
    }

    const loadInquiries = async () => {
      setIsLoadingInquiries(true);
      try {
        const res = await fetch(`/api/user/inquiries?email=${encodeURIComponent(studentEmail.trim())}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.inquiries)) {
            setUserInquiries(data.inquiries);
          }
        }
      } catch (err) {
        console.error('Failed to load user inquiries:', err);
      } finally {
        setIsLoadingInquiries(false);
      }
    };

    loadInquiries();
  }, [studentEmail]);

  const handleToggleTopic = (levelNumber: number, topicIdx: number) => {
    progressService.toggleTopicCompletion(levelNumber, topicIdx);
    setProgress(progressService.getOverallProgress());
  };

  const handleSaveProfile = () => {
    localStorage.setItem('eb_student_notes', studentNotes);
    localStorage.setItem('eb_student_name', studentName);
    localStorage.setItem('eb_student_email', studentEmail);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  const handleSavePortfolioPlan = () => {
    localStorage.setItem('eb_portfolio_monthly_dca', monthlyDca.toString());
    localStorage.setItem('eb_portfolio_isa_pct', isaAllocation.toString());
    localStorage.setItem('eb_portfolio_sipp_pct', sippAllocation.toString());
    setPortfolioSaved(true);
    setTimeout(() => setPortfolioSaved(false), 2500);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your curriculum progress on this device?')) {
      progressService.resetProgress();
      setProgress(progressService.getOverallProgress());
    }
  };

  const currentLevel = ACADEMY_LEVELS.find((l) => l.levelNumber === activeLevelTab) || ACADEMY_LEVELS[0];
  const activeLevelProgress = progress.levels.find((l) => l.levelNumber === activeLevelTab);

  // ISA & SIPP calculation values
  const annualDca = monthlyDca * 12;
  const annualIsaContribution = Math.round((annualDca * isaAllocation) / 100);
  const annualSippContribution = Math.round((annualDca * sippAllocation) / 100);
  const isaLimit = 20000;
  const sippLimit = 60000;

  return (
    <div className="bg-[#FAF9F5] text-[#141E18]">
      {/* 1. Institutional Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#071F18] text-white border-b border-[#C5A869]/30">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.academy}
          fallbackSrc={HERO_FALLBACKS.academy}
          overlayOpacity="dark"
          imageOpacity="opacity-100"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#165342]/80 border border-[#C5A869]/40 rounded-xs text-[#DFCA96] text-[11px] font-mono tracking-widest uppercase mb-4 shadow-xs">
                <Trophy className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Verified Member Dashboard · ID: {studentId}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Member Learning & Portfolio Portal
              </h1>
              <p className="mt-3 text-stone-300 max-w-2xl text-sm sm:text-base font-sans leading-relaxed">
                Track your syllabus completion across the six EB Wealth modules, manage your UK ISA & SIPP asset allocations, and monitor your personal mentorship sessions.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('academy')}
                className="py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider rounded-xs border border-white/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Browse Full Syllabus</span>
              </button>
              <button
                onClick={() => setShowCertificateModal(true)}
                className="py-2.5 px-4 bg-gradient-to-r from-[#C5A869] to-[#DFCA96] hover:from-[#B89748] hover:to-[#C5A869] text-[#07251C] text-xs font-semibold uppercase tracking-wider rounded-xs border border-[#DFCA96]/40 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Award className="w-4 h-4 text-[#07251C]" />
                <span>Completion Certificate</span>
              </button>
            </div>
          </div>

          {/* Metric KPI Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#08231B]/80 border border-[#C5A869]/30 p-5 rounded-xs">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]">
                Overall Curriculum Mastery
              </div>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-serif text-3xl font-bold text-white">{progress.overallPercent}%</span>
                <span className="text-xs text-stone-400">
                  {progress.completedTopics} of {progress.totalTopics} Topics
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#C5A869] to-[#DFCA96] h-full transition-all duration-500"
                  style={{ width: `${progress.overallPercent}%` }}
                />
              </div>
            </div>

            <div className="bg-[#08231B]/80 border border-[#C5A869]/30 p-5 rounded-xs">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]">
                Active Level Focus
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-serif text-2xl font-bold text-white">Level {activeLevelTab}</span>
              </div>
              <p className="text-xs text-stone-300 mt-1 truncate">
                {currentLevel.title}
              </p>
            </div>

            <div className="bg-[#08231B]/80 border border-[#C5A869]/30 p-5 rounded-xs">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]">
                Monthly Compounding Plan
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-serif text-3xl font-bold text-[#DFCA96]">
                  £{monthlyDca.toLocaleString('en-GB')}/mo
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">£{annualDca.toLocaleString('en-GB')} annual capital allocation</p>
            </div>

            <div className="bg-[#08231B]/80 border border-[#C5A869]/30 p-5 rounded-xs">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#DFCA96] flex items-center justify-between">
                <span>Cloud Firestore Sync</span>
                <span className="text-[9px] text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-400 animate-pulse'}`} />
                <span className="text-sm font-semibold text-white">
                  {isSyncing ? 'Writing to Firestore...' : 'Connected & Persisted'}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">Synced to Cloud Firestore at {lastSyncTime}</p>
            </div>
          </div>

          {/* Navigation Sub-Tabs within Dashboard */}
          <div className="flex flex-wrap gap-3 mt-8 border-b border-white/10 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setActiveDashboardTab('curriculum')}
              className={`pb-3 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
                activeDashboardTab === 'curriculum'
                  ? 'border-[#DFCA96] text-[#DFCA96]'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Curriculum Mastery (6 Levels)</span>
            </button>
            <button
              onClick={() => setActiveDashboardTab('portfolio')}
              className={`pb-3 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
                activeDashboardTab === 'portfolio'
                  ? 'border-[#DFCA96] text-[#DFCA96]'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <PieChart className="w-4 h-4" />
              <span>My ISA / SIPP Allocation</span>
            </button>
            <button
              onClick={() => setActiveDashboardTab('inquiries')}
              className={`pb-3 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
                activeDashboardTab === 'inquiries'
                  ? 'border-[#DFCA96] text-[#DFCA96]'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>My Sessions & Inquiries ({userInquiries.length})</span>
            </button>
            <button
              onClick={() => setActiveDashboardTab('journal')}
              className={`pb-3 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
                activeDashboardTab === 'journal'
                  ? 'border-[#DFCA96] text-[#DFCA96]'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Investor Study Journal</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Dashboard Tab Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TAB 1: CURRICULUM PROGRESSION TRACKER */}
        {activeDashboardTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: 6 Academy Level Selector Tabs (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-[#C5A869]/30 rounded-xs p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                  <h3 className="font-serif text-lg font-bold text-[#0D3B2E]">Curriculum Levels</h3>
                  <span className="text-[11px] font-mono text-[#9E8040] font-semibold">6 Modules</span>
                </div>

                <div className="space-y-2">
                  {ACADEMY_LEVELS.map((lvl) => {
                    const lvlProg = progress.levels.find((p) => p.levelNumber === lvl.levelNumber);
                    const isSelected = activeLevelTab === lvl.levelNumber;
                    const isComplete = (lvlProg?.percent || 0) === 100;

                    return (
                      <button
                        key={lvl.levelNumber}
                        onClick={() => setActiveLevelTab(lvl.levelNumber)}
                        className={`w-full text-left p-3.5 rounded-xs border transition-all cursor-pointer flex flex-col gap-2 ${
                          isSelected
                            ? 'bg-[#0D3B2E] border-[#0D3B2E] text-white shadow-xs'
                            : 'bg-stone-50 hover:bg-[#FAF9F5] border-stone-200 text-[#141E18]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                              isSelected ? 'text-[#DFCA96]' : 'text-[#9E8040]'
                            }`}
                          >
                            Level {lvl.levelNumber}
                          </span>
                          {isComplete ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> 100%
                            </span>
                          ) : (
                            <span
                              className={`text-[10px] font-mono ${
                                isSelected ? 'text-stone-300' : 'text-stone-500'
                              }`}
                            >
                              {lvlProg?.completedTopics || 0}/{lvlProg?.totalTopics || 0}
                            </span>
                          )}
                        </div>

                        <div className="font-serif text-xs sm:text-sm font-bold line-clamp-1">
                          {lvl.title}
                        </div>

                        {/* Mini Progress Bar */}
                        <div
                          className={`w-full h-1 rounded-full overflow-hidden ${
                            isSelected ? 'bg-white/20' : 'bg-stone-200'
                          }`}
                        >
                          <div
                            className={`h-full ${
                              isSelected ? 'bg-[#DFCA96]' : 'bg-[#0D3B2E]'
                            }`}
                            style={{ width: `${lvlProg?.percent || 0}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Reset Progress Action */}
                <div className="pt-5 mt-4 border-t border-stone-200 flex items-center justify-between">
                  <button
                    onClick={handleResetProgress}
                    className="text-xs text-stone-500 hover:text-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Study Checklist</span>
                  </button>
                </div>
              </div>

              {/* Quick Mentorship & Coaching Support Card with Founder Profile */}
              <div className="bg-[#08231B] border border-[#C5A869]/40 rounded-xs p-6 text-white space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={FOUNDER_IMAGE_URL}
                    alt="Founder & Head of Education"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#C5A869] shadow-sm shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('ceo_suit_portrait')) {
                        target.src = '/images/ceo_suit_portrait_1791395753240.jpg';
                      }
                    }}
                  />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#DFCA96]">
                      Founder & Head of Education
                    </div>
                    <div className="font-serif text-sm font-bold text-white">
                      Direct Diagnostic Guidance
                    </div>
                  </div>
                </div>
                <h4 className="font-serif text-base font-bold text-white">
                  Need Feedback On Your Allocation?
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Review your Vanguard, Hargreaves Lansdown, ISA, or SIPP asset allocation directly with EB Wealth leadership.
                </p>
                <button
                  onClick={() => (onOpenMentorship ? onOpenMentorship() : onNavigate('mentorship'))}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#C5A869] to-[#DFCA96] hover:from-[#B89748] hover:to-[#C5A869] text-[#07251C] text-xs font-semibold uppercase tracking-wider rounded-xs border border-[#DFCA96]/40 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Request Mentorship Diagnostic</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#07251C]" />
                </button>
              </div>
            </div>

            {/* Right Column: Active Level Topics Checklist & Interactive Study (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Active Level Header Banner */}
              <div className="bg-white border border-[#C5A869]/30 rounded-xs p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-200 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9E8040] font-bold">
                      <span>Level {currentLevel.levelNumber} Progression Focus</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] mt-1">
                      {currentLevel.title}
                    </h2>
                    <p className="text-xs text-stone-600 mt-2 font-sans max-w-xl">
                      {currentLevel.description}
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF9F5] border border-[#C5A869]/30 rounded-xs text-center shrink-0">
                    <div className="font-serif text-2xl font-bold text-[#0D3B2E]">
                      {activeLevelProgress?.percent || 0}%
                    </div>
                    <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                      Level Completed
                    </div>
                  </div>
                </div>

                {/* Topics Interactive Checklist */}
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-stone-500 font-semibold mb-3">
                    Interactive Topic Mastery Checklist (Click to check off and save to database):
                  </div>

                  {currentLevel.topics.map((topic, idx) => {
                    const isChecked = progressService.isTopicCompleted(currentLevel.levelNumber, idx);

                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleTopic(currentLevel.levelNumber, idx)}
                        className={`p-4 rounded-xs border transition-all cursor-pointer flex items-start gap-4 ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-300 text-stone-900 shadow-xs'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 shrink-0 transition-transform active:scale-95"
                          aria-label={`Toggle topic completion for ${topic}`}
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-stone-400 hover:text-[#0D3B2E]" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4
                              className={`text-sm font-semibold ${
                                isChecked ? 'line-through text-stone-500' : 'text-[#0D3B2E]'
                              }`}
                            >
                              {topic}
                            </h4>
                            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest shrink-0">
                              Topic {idx + 1} of {currentLevel.topics.length}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1 font-sans">
                            {isChecked
                              ? 'Verified mastered. Concept ready for portfolio implementation.'
                              : 'Click checkbox once you understand the theory and practical application.'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Practical Exercise Box */}
                <div className="mt-8 p-5 bg-[#FAF9F5] border-l-4 border-[#C5A869] border-t border-r border-b border-stone-200 rounded-xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9E8040] font-bold mb-1">
                    <Calculator className="w-4 h-4 text-[#C5A869]" />
                    <span>Module Practical Exercise</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#0D3B2E]">
                    {currentLevel.headline}: Practical Application & Portfolio Implementation
                  </h4>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onNavigate('tools')}
                      className="py-2 px-3.5 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#C5A869]" />
                      <span>Launch Financial Calculator</span>
                    </button>
                    <button
                      onClick={() => (onOpenAppDownload ? onOpenAppDownload(currentLevel.title) : null)}
                      className="py-2 px-3.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-xs border border-stone-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Practice in App Simulator</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY ISA / SIPP ALLOCATION PLANNER */}
        {activeDashboardTab === 'portfolio' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-6 sm:p-8 shadow-xs space-y-8 max-w-4xl mx-auto">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#9E8040] font-bold">
                Tax-Sheltered Compounding Architect
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] mt-1">
                Personal ISA & SIPP Allocation Planner
              </h2>
              <p className="text-xs text-stone-600 mt-2 font-sans">
                Structure your monthly capital deployment across the UK's two primary compounding vehicles: the Stocks & Shares ISA (Tax-Free Capital Gains & Income) and the Self-Invested Personal Pension (Up to 40%–45% Income Tax Relief).
              </p>
            </div>

            {portfolioSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xs text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Your portfolio allocation plan has been persisted to the EB Wealth database.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-stone-800">
                      Planned Monthly Contribution (£)
                    </label>
                    <span className="font-mono text-xs font-bold text-[#0D3B2E]">
                      £{monthlyDca.toLocaleString('en-GB')}/month
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={monthlyDca}
                    onChange={(e) => setMonthlyDca(parseInt(e.target.value, 10))}
                    className="w-full accent-[#0D3B2E]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
                    <span>£100/mo</span>
                    <span>£2,500/mo</span>
                    <span>£5,000/mo</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-stone-800">
                      Stocks & Shares ISA Ratio: {isaAllocation}%
                    </label>
                    <span className="font-mono text-xs text-emerald-700 font-bold">
                      £{annualIsaContribution.toLocaleString('en-GB')}/yr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={isaAllocation}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setIsaAllocation(val);
                      setSippAllocation(100 - val);
                    }}
                    className="w-full accent-emerald-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-stone-800">
                      SIPP (Pension) Ratio: {sippAllocation}%
                    </label>
                    <span className="font-mono text-xs text-amber-700 font-bold">
                      £{annualSippContribution.toLocaleString('en-GB')}/yr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={sippAllocation}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setSippAllocation(val);
                      setIsaAllocation(100 - val);
                    }}
                    className="w-full accent-amber-700"
                  />
                </div>

                <button
                  onClick={handleSavePortfolioPlan}
                  className="py-2.5 px-5 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Save className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Save Allocation Plan to Database</span>
                </button>
              </div>

              {/* Allowance Utilization Meters */}
              <div className="bg-[#FAF9F5] p-6 rounded-xs border border-stone-200 space-y-6">
                <h4 className="font-serif text-sm font-bold text-[#0D3B2E]">
                  Annual UK Statutory Allowance Usage
                </h4>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-stone-700">ISA Allowance (£20,000 / Tax Year)</span>
                    <span className="font-mono text-stone-500">
                      {Math.round((annualIsaContribution / isaLimit) * 100)}% Used
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full"
                      style={{ width: `${Math.min(100, (annualIsaContribution / isaLimit) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    £{(isaLimit - annualIsaContribution > 0 ? isaLimit - annualIsaContribution : 0).toLocaleString('en-GB')} remaining tax-free headroom
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-stone-700">SIPP Allowance (£60,000 / Tax Year)</span>
                    <span className="font-mono text-stone-500">
                      {Math.round((annualSippContribution / sippLimit) * 100)}% Used
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-600 h-full"
                      style={{ width: `${Math.min(100, (annualSippContribution / sippLimit) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Eligible for basic (20%), higher (40%), or additional (45%) HMRC tax relief top-ups.
                  </span>
                </div>

                <div className="p-3.5 bg-white border border-stone-200 rounded-xs text-[11px] text-stone-600 space-y-1">
                  <div className="font-bold text-[#0D3B2E]">Core Asset Mix Recommendation:</div>
                  <p>• 80% Low-Cost Global Equity ETF (Vanguard FTSE All-World VWRL/VWRP)</p>
                  <p>• 15% UK Sovereign Gilts / Cash Equivalent (Vanguard UK Gilt ETF)</p>
                  <p>• 5% Physical Gold / Purchasing Power Reserve</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MY INBOUND SESSIONS & MENTORSHIP INQUIRIES */}
        {activeDashboardTab === 'inquiries' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-6 sm:p-8 shadow-xs space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                  My Mentorship & Consultation Inquiries
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Track the status of your 1-on-1 coaching bookings and cohort applications directly from the EB Wealth database.
                </p>
              </div>

              <button
                onClick={() => (onOpenMentorship ? onOpenMentorship() : onNavigate('mentorship'))}
                className="py-2 px-3.5 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold rounded-xs flex items-center gap-1.5 self-start cursor-pointer"
              >
                <span>Book New Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
              </button>
            </div>

            {/* Email Filter / Lookup Box */}
            <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xs flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">
                  Registered Email for Booking Records
                </label>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="Enter your email used in applications (e.g. john@example.com)"
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xs bg-white focus:outline-none focus:border-[#0D3B2E]"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="self-end sm:self-center mt-2 sm:mt-4 py-2 px-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xs border border-stone-300 cursor-pointer"
              >
                Sync Inquiries
              </button>
            </div>

            {isLoadingInquiries ? (
              <div className="text-center py-10 text-stone-500 text-xs">
                Querying database for records matching {studentEmail}...
              </div>
            ) : userInquiries.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs space-y-2">
                <Calendar className="w-8 h-8 text-[#C5A869] mx-auto opacity-60" />
                <p>No booked consultations or applications associated with this email yet.</p>
                <p className="text-stone-400">
                  When you submit an intake form on the Mentorship or Private Coaching pages, your intake status will appear here live.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-4 border border-stone-200 rounded-xs bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded-xs bg-amber-100 text-amber-800">
                          {inquiry.type}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#0D3B2E]">
                          {inquiry.title}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        {inquiry.summaryText}
                      </p>
                      <div className="text-[10px] font-mono text-stone-400 mt-1 flex items-center gap-2">
                        <span>ID: {inquiry.id}</span>
                        <span>•</span>
                        <span>{new Date(inquiry.timestamp).toLocaleDateString('en-GB')}</span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-xs ${
                        inquiry.status === 'Consultation Scheduled'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : inquiry.status === 'Enrolled'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PERSONAL INVESTOR JOURNAL & PROFILE */}
        {activeDashboardTab === 'journal' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-6 sm:p-8 shadow-xs space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#C5A869]" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0D3B2E]">
                    Personal Investor Journal & Cloud Sync
                  </h3>
                  <p className="text-xs text-stone-500">
                    Record your takeaways, ISA targets, and notes. Persisted to the database across devices.
                  </p>
                </div>
              </div>
              {notesSaved && (
                <span className="text-xs text-emerald-600 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved to database
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 mb-1">
                  Student / Investor Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name for your certificate"
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="your.email@example.co.uk"
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 mb-1">
                Private Investment Notes & Action Items
              </label>
              <textarea
                rows={6}
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                placeholder="Record your asset allocation takeaways, ISA contributions targets, questions for mentorship sessions, or thoughts on market valuation..."
                className="w-full text-xs p-3 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E] font-sans"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-stone-400 font-mono">
                Student ID: {studentId}
              </span>
              <button
                onClick={handleSaveProfile}
                className="py-2 px-5 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Save className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Save to Database</span>
              </button>
            </div>
          </div>
        )}

      </section>

      {/* 3. Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-[#C5A869] rounded-xs max-w-2xl w-full p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b-2 border-[#C5A869]/40 pb-6">
              <div className="w-12 h-12 mx-auto rounded-xs bg-gradient-to-br from-[#165342] to-[#07251C] border border-[#C5A869] flex items-center justify-center font-serif font-bold text-white tracking-widest text-lg shadow-sm">
                EB
              </div>
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-[#9E8040] font-bold">
                EB Wealth Institutional Academy
              </h3>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E]">
                Certificate of Investment Competence
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Curriculum Verification & Long-Term Compounding Foundations
              </p>
            </div>

            {/* Certificate Body */}
            <div className="text-center py-4 space-y-3">
              <p className="text-xs text-stone-500 uppercase tracking-widest font-mono">
                This is to certify that
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E] underline decoration-[#C5A869] decoration-2 underline-offset-8">
                {studentName || 'Private Investor'}
              </h1>
              <p className="text-xs text-stone-600 max-w-md mx-auto font-sans pt-2">
                has actively studied the 6 EB Wealth curriculum levels covering Financial Foundations, Global Index Funds (ETFs), UK Tax Shelters (ISAs & SIPPs), Portfolio Asset Allocation, Fundamental Company Analysis, and Risk Management.
              </p>

              <div className="pt-4 flex items-center justify-center gap-6 text-xs font-mono text-stone-500">
                <div>
                  <span className="block font-bold text-stone-800">{progress.overallPercent}%</span>
                  <span>Progress Verified</span>
                </div>
                <div>
                  <span className="block font-bold text-stone-800">
                    {new Date().toLocaleDateString('en-GB')}
                  </span>
                  <span>Issue Date</span>
                </div>
                <div>
                  <span className="block font-bold text-[#0D3B2E]">EB-{studentId}</span>
                  <span>Credential ID</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t border-stone-200 pt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] text-stone-400 font-sans">
                Issued for educational and personal wealth-building verification only. Not an FCA credential.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="py-2 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold rounded-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Regulatory Disclaimer */}
      <section className="py-8 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-500 px-4">
        <p className="max-w-4xl mx-auto">{REGULATORY_DISCLAIMER_SHORT}</p>
      </section>
    </div>
  );
};
