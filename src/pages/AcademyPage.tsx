import React, { useState } from 'react';
import { ACADEMY_LEVELS, COURSES, REGULATORY_DISCLAIMER_SHORT } from '../data/content';
import { Course } from '../types';
import { BookOpen, Check, ArrowRight, ShieldCheck, Smartphone, HelpCircle, Layers, TrendingUp } from 'lucide-react';
import { PageId } from '../types/navigation';
import { LearnByDoing } from '../components/LearnByDoing';
import { HeroBackground } from '../components/HeroBackground';
import academyHeroBg from '../assets/images/academy_curriculum_1791394772347.jpg';

interface AcademyPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCourse: (course: Course) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({
  onNavigate,
  onSelectCourse,
  onOpenAppDownload,
  onOpenDisclosures
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeLevel = ACADEMY_LEVELS.find((l) => l.levelNumber === selectedLevel) || ACADEMY_LEVELS[0];

  const faqs = [
    {
      q: 'Is the Academy suitable if I have zero prior investing experience?',
      a: 'Yes, absolutely. Level 1 starts from absolute ground zero: explaining what a share is, why leaving money in cash guarantees loss of purchasing power to inflation, and how passive index funds allow ordinary people to build wealth without guessing stock picks.'
    },
    {
      q: 'Does EB Wealth provide specific stock tips or tell me what to buy?',
      a: 'No. EB Wealth provides pure financial education, analytical frameworks, and mentorship. We do not provide regulated personal investment advice or tell you which specific stocks to buy. We teach you how to analyze investments independently.'
    },
    {
      q: 'Why is there a dedicated module for UK Investing?',
      a: 'UK tax wrappers—such as the Stocks & Shares ISA (£20,000 annual allowance) and the Self-Invested Personal Pension (SIPP)—offer substantial legal tax advantages. Understanding how HMRC treats dividends, capital gains, and pension relief saves investors tens of thousands of pounds over a compounding horizon.'
    },
    {
      q: 'How can I access the course material and video modules?',
      a: 'Curricula are accessible through our web portal and the official EB Wealth Mobile App, allowing you to learn on the go, practice with interactive walkthrough simulators, and track your progress.'
    }
  ];

  return (
    <div className="pt-24 pb-20 text-[#17202A] bg-[#F8FAFC]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-[#F8FAFC]">
        <HeroBackground
          imageSrc={academyHeroBg}
          fallbackSrc="/images/academy_curriculum_1791394772347.jpg"
          accent="emerald"
          overlayOpacity="medium"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#00A878] font-bold mb-3">
            <BookOpen className="w-4 h-4" />
            <span>EB Wealth Academy Curriculum</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17202A] max-w-4xl">
            Learn Investing Without the Jargon.
          </h1>
          <p className="text-base sm:text-lg text-[#52606D] max-w-3xl mt-4 leading-relaxed">
            From your very first index fund to comprehensive balance sheet analysis and UK tax optimization. Designed for complete beginners, intermediate investors, and professionals wanting to understand investing before committing significant capital.
          </p>

          <div className="pt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenAppDownload('EB Wealth Academy')}
              className="py-3 px-6 bg-[#00A878] hover:bg-[#009267] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Access All Levels in App</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('levels-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-3 px-6 bg-white hover:bg-slate-50 text-[#17202A] border border-slate-200 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Explore 6 Progression Levels
            </button>
          </div>
        </div>
      </section>

      {/* The 6 Levels Interactive Explorer */}
      <section id="levels-section" className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A878]">
              Step-by-Step Pathway
            </span>
            <h2 className="text-3xl font-extrabold text-[#17202A] mt-1">
              The 6 Academy Levels
            </h2>
            <p className="text-sm text-[#52606D] mt-1">
              Select any level below to inspect topics, learning outcomes, and target experience level.
            </p>
          </div>

          {/* Level Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {ACADEMY_LEVELS.map((lvl) => (
              <button
                key={lvl.levelNumber}
                onClick={() => setSelectedLevel(lvl.levelNumber)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedLevel === lvl.levelNumber
                    ? 'bg-[#ECFDF5] border-[#00A878] ring-2 ring-[#00A878]/10'
                    : 'bg-[#F8FAFC] border-slate-200 hover:bg-white'
                }`}
              >
                <div>
                  <span className={`text-xs font-mono font-bold block mb-1 ${
                    selectedLevel === lvl.levelNumber ? 'text-[#00A878]' : 'text-slate-400'
                  }`}>
                    LEVEL 0{lvl.levelNumber}
                  </span>
                  <div className={`text-xs font-bold leading-snug ${
                    selectedLevel === lvl.levelNumber ? 'text-[#17202A]' : 'text-[#52606D]'
                  }`}>
                    {lvl.title.split('—')[1]?.trim() || lvl.title}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Level Viewer */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#00A878] text-white font-mono text-xs font-bold rounded-lg">
                    Level {activeLevel.levelNumber}
                  </span>
                  <span className="text-xs font-semibold text-[#52606D]">
                    {activeLevel.badge} · {activeLevel.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17202A]">
                    {activeLevel.title}
                  </h3>
                  <h4 className="text-base font-semibold text-[#00A878] mt-1">
                    {activeLevel.headline}
                  </h4>
                  <p className="text-sm text-[#52606D] mt-3 leading-relaxed">
                    {activeLevel.description}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
                    Curriculum Lessons & Topics Covered:
                  </div>
                  <div className="space-y-3">
                    {activeLevel.topics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#17202A] bg-white p-3.5 rounded-xl border border-slate-200/80">
                        <div className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#00A878] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </div>
                        <span className="leading-snug">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const matchCourse = COURSES.find((c) => c.id === `course-level-${activeLevel.levelNumber}`) || COURSES[0];
                      onSelectCourse(matchCourse);
                    }}
                    className="py-3 px-6 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Inspect Course Syllabus Modal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenAppDownload(`EB Wealth Academy: Level ${activeLevel.levelNumber}`)}
                    className="py-3 px-6 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Start Level in App</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Info Card */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="text-xs font-bold text-[#17202A] uppercase tracking-wider">
                  Level Profile
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#52606D] block">Target Audience:</span>
                    <strong className="text-[#17202A]">{activeLevel.targetAudience}</strong>
                  </div>
                  <div>
                    <span className="text-[#52606D] block">Duration / Pace:</span>
                    <strong className="text-[#17202A]">{activeLevel.duration}</strong>
                  </div>
                  <div>
                    <span className="text-[#52606D] block">Learning Format:</span>
                    <strong className="text-[#17202A]">HD Video Lessons + In-App Interactive Simulators + Downloadable Spreadsheets</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] text-[#52606D] leading-relaxed">
                    All Academy modules adhere strictly to educational guidelines. We teach the analytical principles; you maintain complete self-directed sovereignty.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Platform Simulator Section */}
      <LearnByDoing onOpenAppDownload={onOpenAppDownload} />

      {/* FAQs Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A878]">
              Common Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17202A] mt-1">
              Frequently Asked Questions About the Academy
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#17202A]">{faq.q}</h4>
                  <span className="text-xs font-bold text-[#00A878]">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaq === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-[#52606D] leading-relaxed pt-2 border-t border-slate-200">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Notice */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-xs text-[#52606D]">
            <div className="flex items-center gap-2 font-bold text-[#17202A] mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00A878]" />
              <span>Regulatory Disclosure</span>
            </div>
            <p>{REGULATORY_DISCLAIMER_SHORT}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
