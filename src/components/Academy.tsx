import React, { useState } from 'react';
import { ACADEMY_LEVELS, COURSES } from '../data/content';
import { Course } from '../types';
import { BookOpen, Check, ArrowRight, ChevronDown, ChevronUp, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import academyCurriculumImage from '../assets/images/academy_curriculum_1791394772347.jpg';

interface AcademyProps {
  onSelectCourse: (course: Course) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
  onNavigateToAcademy?: () => void;
}

export const Academy: React.FC<AcademyProps> = ({
  onSelectCourse,
  onOpenAppDownload,
  onOpenDisclosures,
  onNavigateToAcademy
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  const toggleExpand = (levelNum: number) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [levelNum]: !prev[levelNum]
    }));
  };

  const currentLevelData = ACADEMY_LEVELS.find((l) => l.levelNumber === selectedLevel) || ACADEMY_LEVELS[0];

  return (
    <section id="academy" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00A878] mb-2">
            <BookOpen className="w-4 h-4" />
            <span>EB Wealth Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17202A] tracking-tight">
            Learn Investing Without the Jargon.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#52606D] leading-relaxed">
            The EB Wealth Academy is designed for complete beginners, intermediate investors, and anyone who wants to thoroughly understand how investing works before committing significant capital.
          </p>
        </div>

        {/* 3 Audience Badges (Editorial clean styling) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#00A878] flex items-center justify-center font-bold text-xs shrink-0">
              01
            </div>
            <div>
              <div className="text-xs font-bold text-[#17202A]">Complete Beginners</div>
              <div className="text-[11px] text-[#52606D]">Build solid foundations from scratch</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">
              02
            </div>
            <div>
              <div className="text-xs font-bold text-[#17202A]">Intermediate Investors</div>
              <div className="text-[11px] text-[#52606D]">Master UK ISAs, SIPPs & company valuation</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold text-xs shrink-0">
              03
            </div>
            <div>
              <div className="text-xs font-bold text-[#17202A]">Prudent Capital Allocators</div>
              <div className="text-[11px] text-[#52606D]">Understand platforms before committing capital</div>
            </div>
          </div>
        </div>

        {/* Level Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {ACADEMY_LEVELS.map((lvl) => (
            <button
              key={lvl.levelNumber}
              onClick={() => setSelectedLevel(lvl.levelNumber)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedLevel === lvl.levelNumber
                  ? 'bg-[#00A878] text-white border-[#00A878] shadow-sm'
                  : 'bg-white text-[#52606D] border-slate-200 hover:text-[#17202A] hover:bg-slate-50'
              }`}
            >
              Level {lvl.levelNumber}: {lvl.title.split('—')[1]?.trim() || lvl.title}
            </button>
          ))}
        </div>

        {/* Selected Level Deep Dive Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 lg:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-[#ECFDF5] text-[#00A878] font-mono text-xs font-bold">
                  Level {currentLevelData.levelNumber}
                </span>
                <span className="text-xs font-medium text-[#52606D]">
                  {currentLevelData.badge} · {currentLevelData.duration}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#17202A]">
                  {currentLevelData.headline}
                </h3>
                <p className="text-sm text-[#52606D] mt-2 leading-relaxed">
                  {currentLevelData.description}
                </p>
              </div>

              <div className="pt-2">
                <div className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
                  Core Curriculum Topics Covered:
                </div>
                <div className="space-y-2.5">
                  {currentLevelData.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17202A]">
                      <div className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#00A878] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    const matchCourse = COURSES.find((c) => c.id === `course-level-${currentLevelData.levelNumber}`) || COURSES[0];
                    onSelectCourse(matchCourse);
                  }}
                  className="py-3 px-5 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <span>View Full Syllabus Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenAppDownload(`EB Wealth Academy: ${currentLevelData.title}`)}
                  className="py-3 px-5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Start Learning in App</span>
                </button>
              </div>
            </div>

            {/* Visual preview of curriculum assets */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-50">
                <img
                  src={academyCurriculumImage}
                  alt="EB Wealth Academy Educational Modules"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="text-xs font-bold text-[#17202A]">
                    Designed for Confident Long-Term Decisions
                  </div>
                  <div className="text-[11px] text-[#52606D] mt-0.5">
                    Clear video breakdowns, downloadable checklists, and interactive walkthroughs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All 6 Levels Overview Grid */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#17202A]">
              The 6 Progression Levels
            </h3>
            <span className="text-xs text-[#52606D]">From foundational cash management to sovereign investing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACADEMY_LEVELS.map((lvl) => (
              <div
                key={lvl.levelNumber}
                onClick={() => setSelectedLevel(lvl.levelNumber)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedLevel === lvl.levelNumber
                    ? 'bg-white border-[#00A878] ring-2 ring-[#00A878]/10 shadow-sm'
                    : 'bg-white/70 border-slate-200/90 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#00A878]">
                      LEVEL 0{lvl.levelNumber}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {lvl.duration.split('·')[0]}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#17202A] mb-1">
                    {lvl.title.split('—')[1]?.trim() || lvl.title}
                  </h4>
                  <p className="text-xs text-[#52606D] line-clamp-2 mb-3">
                    {lvl.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[#00A878] font-medium">{lvl.topics.length} Core Modules</span>
                  <span className="text-[#17202A] font-semibold flex items-center gap-1">
                    Inspect <ArrowRight className="w-3 h-3 text-[#00A878]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academy Section Footer CTA */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#17202A]">
              Want to preview the complete syllabus and interactive learning tools?
            </h4>
            <p className="text-xs text-[#52606D] mt-0.5">
              Access educational platform walkthroughs, compounding models, and guided walkthroughs.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateToAcademy) {
                onNavigateToAcademy();
              } else {
                onSelectCourse(COURSES[0]);
              }
            }}
            className="py-2.5 px-6 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore EB Wealth Academy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
