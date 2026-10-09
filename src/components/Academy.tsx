import React, { useState } from 'react';
import { ACADEMY_LEVELS, COURSES } from '../data/content';
import { Course } from '../types';
import { BookOpen, Check, ArrowRight, Smartphone, ShieldCheck } from 'lucide-react';
import academyCurriculumImage from '../assets/images/gs_academy_seminar_1791537976945.jpg';

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

  const currentLevelData = ACADEMY_LEVELS.find((l) => l.levelNumber === selectedLevel) || ACADEMY_LEVELS[0];

  return (
    <section id="academy" className="py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-2">
            <BookOpen className="w-4 h-4 text-[#0D3B2E]" />
            <span>EB Wealth Academy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
            Institutional Education. Zero Industry Jargon.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            The EB Wealth Academy is designed for beginners and developing investors who wish to master the bedrock principles of global markets, fund structures, and UK tax wrappers before allocating capital.
          </p>
        </div>

        {/* 3 Audience Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-sm bg-white border border-[#C5A869]/25 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#EDF4F1] text-[#0D3B2E] flex items-center justify-center font-serif font-bold text-sm shrink-0">
              I
            </div>
            <div>
              <div className="font-serif text-sm font-bold text-[#0D3B2E]">Beginner Investors</div>
              <div className="text-[11px] text-[#5A6860]">Establish foundational market literacy from ground zero</div>
            </div>
          </div>
          <div className="p-4 rounded-sm bg-white border border-[#C5A869]/25 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#FAF5E8] text-[#9E8040] flex items-center justify-center font-serif font-bold text-sm shrink-0">
              II
            </div>
            <div>
              <div className="font-serif text-sm font-bold text-[#0D3B2E]">Developing Allocators</div>
              <div className="text-[11px] text-[#5A6860]">Master UK ISAs, SIPPs, and portfolio diversification</div>
            </div>
          </div>
          <div className="p-4 rounded-sm bg-white border border-[#C5A869]/25 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#0D3B2E] text-[#C5A869] flex items-center justify-center font-serif font-bold text-sm shrink-0">
              III
            </div>
            <div>
              <div className="font-serif text-sm font-bold text-[#0D3B2E]">Disciplined Compounding</div>
              <div className="text-[11px] text-[#5A6860]">Eliminate high fund manager fees and emotional mistakes</div>
            </div>
          </div>
        </div>

        {/* Level Navigation Tabs in Goldman Sachs Style */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {ACADEMY_LEVELS.map((lvl) => (
            <button
              key={lvl.levelNumber}
              onClick={() => setSelectedLevel(lvl.levelNumber)}
              className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                selectedLevel === lvl.levelNumber
                  ? 'bg-[#0D3B2E] text-[#C5A869] border-[#C5A869] shadow-sm'
                  : 'bg-white text-[#4A5550] border-slate-200 hover:text-[#0D3B2E] hover:border-[#C5A869]/50'
              }`}
            >
              Level 0{lvl.levelNumber}: {lvl.title.split('—')[1]?.trim() || lvl.title}
            </button>
          ))}
        </div>

        {/* Selected Level Deep Dive Card */}
        <div className="bg-white rounded-sm border border-[#C5A869]/35 shadow-xl p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#FAF5E8] text-[#9E8040] font-mono text-xs font-bold rounded-sm border border-[#C5A869]/30">
                  Level 0{currentLevelData.levelNumber}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                  {currentLevelData.badge} · {currentLevelData.duration}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E]">
                  {currentLevelData.headline}
                </h3>
                <p className="text-sm text-[#4A5550] mt-2 leading-relaxed">
                  {currentLevelData.description}
                </p>
              </div>

              <div className="pt-2">
                <div className="text-xs font-mono font-bold text-[#0D3B2E] uppercase tracking-wider mb-3">
                  Core Curriculum Topics Covered:
                </div>
                <div className="space-y-2.5">
                  {currentLevelData.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111816]">
                      <div className="w-5 h-5 rounded-full bg-[#EDF4F1] text-[#0D3B2E] flex items-center justify-center shrink-0 mt-0.5 border border-[#0D3B2E]/20">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => {
                    const matchCourse = COURSES.find((c) => c.id === `course-level-${currentLevelData.levelNumber}`) || COURSES[0];
                    onSelectCourse(matchCourse);
                  }}
                  className="py-3 px-6 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-sm border border-[#C5A869]/50 flex items-center justify-center gap-2"
                >
                  <span>View Full Syllabus Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
                </button>

                <button
                  onClick={() => onOpenAppDownload(`EB Wealth Academy: Level ${currentLevelData.levelNumber}`)}
                  className="py-3 px-6 bg-white hover:bg-[#FAF9F5] text-[#0D3B2E] border border-slate-300 hover:border-[#C5A869] text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Access on Mobile App</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Preview Card */}
            <div className="lg:col-span-5 bg-[#FAF9F5] p-6 rounded-sm border border-[#C5A869]/25 space-y-4">
              <div className="flex items-center justify-between border-b border-[#C5A869]/20 pb-3">
                <span className="text-[11px] font-mono font-bold text-[#0D3B2E] uppercase tracking-wider">
                  Target Learner
                </span>
                <span className="text-xs font-semibold text-[#9E8040]">
                  {currentLevelData.targetAudience}
                </span>
              </div>

              <div className="relative rounded-sm overflow-hidden aspect-[16/10] bg-slate-200 border border-slate-200">
                <img
                  src={academyCurriculumImage}
                  alt="EB Wealth Academy Curriculum Preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07251C]/90 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs">
                    <span className="text-[#C5A869] font-mono font-bold block mb-0.5 tracking-wider uppercase">EB Wealth Academy</span>
                    <span>Self-paced video modules, practical worksheets, and live interactive Q&A.</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-[#C5A869]/30 rounded-sm text-xs text-[#2B3632] leading-relaxed">
                <strong className="text-[#0D3B2E]">Why this level matters:</strong> Skipping the basics is the primary reason retail investors panic and sell at market bottoms. Mastering Level 0{currentLevelData.levelNumber} equips you with objective data over market noise.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Explorer Action Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-sm border border-[#C5A869]/30 shadow-2xs">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#0D3B2E]">
              Browse the complete curriculum directory
            </h4>
            <p className="text-xs text-[#5A6860] mt-0.5">
              Explore all 6 levels, downloadable lesson checklists, and detailed learning outcomes.
            </p>
          </div>

          {onNavigateToAcademy && (
            <button
              onClick={onNavigateToAcademy}
              className="py-3 px-6 bg-[#0D3B2E] hover:bg-[#07251C] text-[#C5A869] border border-[#C5A869]/40 font-semibold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <span>Full Academy Directory</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
