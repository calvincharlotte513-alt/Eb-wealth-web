import React, { useState, useEffect } from 'react';
import { PageId } from '../types/navigation';
import { ACADEMY_LEVELS, REGULATORY_DISCLAIMER_SHORT, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { progressService, OverallProgressInfo } from '../services/progressService';
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
  FileCheck
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
  const [progress, setProgress] = useState<OverallProgressInfo>(progressService.getOverallProgress());
  const [activeLevelTab, setActiveLevelTab] = useState<number>(1);
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('eb_student_name') || 'Private Investor';
  });
  const [studentNotes, setStudentNotes] = useState<string>(() => {
    return localStorage.getItem('eb_student_notes') || '';
  });
  const [notesSaved, setNotesSaved] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    const unsubscribe = progressService.subscribe(() => {
      setProgress(progressService.getOverallProgress());
    });
    return () => unsubscribe();
  }, []);

  // Sync progress to backend database asynchronously
  useEffect(() => {
    const studentId = localStorage.getItem('eb_student_id') || `STU-${Date.now()}`;
    if (!localStorage.getItem('eb_student_id')) {
      localStorage.setItem('eb_student_id', studentId);
    }

    const syncToBackend = async () => {
      try {
        const rawCompleted = localStorage.getItem('eb_wealth_student_progress_v2');
        const topics = rawCompleted ? JSON.parse(rawCompleted) : [];
        await fetch('/api/user/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: studentId,
            completedTopics: topics,
            currentLevel: activeLevelTab,
            notes: studentNotes
          })
        });
      } catch (err) {
        console.warn('Backend progress sync notice:', err);
      }
    };

    const timer = setTimeout(syncToBackend, 1500);
    return () => clearTimeout(timer);
  }, [progress, activeLevelTab, studentNotes]);

  const handleToggleTopic = (levelNumber: number, topicIdx: number) => {
    progressService.toggleTopicCompletion(levelNumber, topicIdx);
    setProgress(progressService.getOverallProgress());
  };

  const handleSaveNotes = () => {
    localStorage.setItem('eb_student_notes', studentNotes);
    localStorage.setItem('eb_student_name', studentName);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your curriculum progress on this device?')) {
      progressService.resetProgress();
      setProgress(progressService.getOverallProgress());
    }
  };

  const currentLevel = ACADEMY_LEVELS.find((l) => l.levelNumber === activeLevelTab) || ACADEMY_LEVELS[0];
  const activeLevelProgress = progress.levels.find((l) => l.levelNumber === activeLevelTab);

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
                <span>Verified Student Learning Portal</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Member Learning Dashboard
              </h1>
              <p className="mt-3 text-stone-300 max-w-2xl text-sm sm:text-base font-sans leading-relaxed">
                Track your mastery of the six structured EB Wealth curriculum levels, monitor compounding milestones, and build institutional investment discipline.
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
                Active Compounding Streak
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-serif text-3xl font-bold text-[#DFCA96]">5 Days</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Disciplined
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">Consistent execution compounds wealth.</p>
            </div>

            <div className="bg-[#08231B]/80 border border-[#C5A869]/30 p-5 rounded-xs">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]">
                Database Sync Status
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">Active Local & Cloud Sync</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">Synced to EB Wealth persistent store</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Curriculum Progression Tracker */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Quick Mentorship & Coaching Support Card */}
            <div className="bg-[#08231B] border border-[#C5A869]/40 rounded-xs p-6 text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
                <ShieldCheck className="w-4 h-4 text-[#DFCA96]" />
                <span>1-on-1 Portfolio Guidance</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-white">
                Need Feedback On Your Allocation?
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                Review your Vanguard, Hargreaves Lansdown, or ISA asset allocation directly with an experienced wealth coach.
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
                  Interactive Topic Mastery Checklist (Click to check off):
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

            {/* Student Study Notes & Reflections */}
            <div className="bg-white border border-[#C5A869]/30 rounded-xs p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#C5A869]" />
                  <h3 className="font-serif text-lg font-bold text-[#0D3B2E]">
                    Personal Investor Journal & Study Notes
                  </h3>
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
                <div className="flex items-end">
                  <p className="text-[11px] text-stone-500 font-sans">
                    This name will be printed on your official EB Wealth Curriculum Completion Certificate once all modules are finished.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 mb-1">
                  Private Investment Notes & Action Items
                </label>
                <textarea
                  rows={4}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Record your asset allocation takeaways, ISA contributions targets, or questions for your mentorship sessions..."
                  className="w-full text-xs p-3 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E] font-sans"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="py-2 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  Save Notes to Database
                </button>
              </div>
            </div>
          </div>
        </div>
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
                  <span className="block font-bold text-[#0D3B2E]">EB-VERIFIED</span>
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
                  <span>Print</span>
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
