import React, { useState } from 'react';
import { ACADEMY_LEVELS, COURSES, REGULATORY_DISCLAIMER_SHORT, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { Course } from '../types';
import { BookOpen, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';
import { PageId } from '../types/navigation';
import { LearnByDoing } from '../components/LearnByDoing';
import { HeroBackground } from '../components/HeroBackground';
import academyHeroBg from '../assets/images/gs_academy_seminar_1791537976945.jpg';

interface AcademyPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCourse: (course: Course) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({
  onNavigate: _onNavigate,
  onSelectCourse,
  onOpenAppDownload,
  onOpenDisclosures: _onOpenDisclosures
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
      q: 'How can I access the course material and practical exercises?',
      a: 'Curricula are accessible through our web portal and the official EB Wealth Mobile App, allowing you to learn on the go, practice with interactive walkthrough simulators, and track your progress across all 6 levels.'
    }
  ];

  return (
    <div className="pt-24 pb-20 text-[#141E18] bg-[#FAF9F5]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-28 border-b border-stone-200 overflow-hidden bg-[#FAF9F5]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.academy}
          fallbackSrc={HERO_FALLBACKS.academy || academyHeroBg}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl bg-white/90 backdrop-blur-xs p-8 sm:p-10 rounded-xs border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#C5A869] font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>EB Wealth Academy · 6 Tier Curriculum</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D3B2E] leading-tight">
              Institutional Investment Literacy Without Jargon.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-sans">
              From your very first broad-market index fund to comprehensive balance sheet analysis and UK tax optimization. Designed for complete beginners, intermediate investors, and professionals wanting to understand investing before committing significant capital.
            </p>

            <div className="pt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenAppDownload('EB Wealth Academy')}
                className="py-3 px-6 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] font-medium text-xs rounded-xs border border-[#C5A869]/50 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#C5A869]" />
                <span>Access All Levels in App</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('levels-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-white hover:bg-stone-50 text-[#0D3B2E] border border-stone-300 font-medium text-xs rounded-xs transition-all cursor-pointer"
              >
                Explore 6 Progression Levels
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Levels Interactive Explorer */}
      <section id="levels-section" className="py-20 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
              Structured Academic Pathway
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0D3B2E] mt-1">
              The 6 Academy Levels
            </h2>
            <p className="text-xs text-stone-500 mt-1 font-mono">
              Select any level below to inspect learning objectives, curriculum modules, and target experience level.
            </p>
          </div>

          {/* Level Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {ACADEMY_LEVELS.map((lvl) => (
              <button
                key={lvl.levelNumber}
                onClick={() => setSelectedLevel(lvl.levelNumber)}
                className={`p-4 rounded-xs text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedLevel === lvl.levelNumber
                    ? 'bg-[#0D3B2E] border-[#C5A869] text-white shadow-xs'
                    : 'bg-[#FAF9F5] border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-mono font-bold block mb-1 tracking-wider ${
                    selectedLevel === lvl.levelNumber ? 'text-[#C5A869]' : 'text-stone-400'
                  }`}>
                    LEVEL 0{lvl.levelNumber}
                  </span>
                  <div className={`text-xs font-serif font-bold leading-snug ${
                    selectedLevel === lvl.levelNumber ? 'text-white' : 'text-[#0D3B2E]'
                  }`}>
                    {lvl.title.split('—')[1]?.trim() || lvl.title}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Level Viewer */}
          <div className="p-8 sm:p-10 rounded-xs bg-[#FAF9F5] border border-stone-200 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-[#0D3B2E] text-[#C5A869] font-mono text-xs font-bold rounded-xs border border-[#C5A869]/40">
                    Tier {activeLevel.levelNumber}
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    {activeLevel.badge} · {activeLevel.duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E]">
                    {activeLevel.title}
                  </h3>
                  <h4 className="font-serif text-base font-semibold text-[#C5A869] mt-1">
                    {activeLevel.headline}
                  </h4>
                  <p className="text-sm text-stone-600 mt-3 leading-relaxed font-sans">
                    {activeLevel.description}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-mono font-bold text-[#0D3B2E] uppercase tracking-wider mb-3">
                    Curriculum Lessons & Topics Covered:
                  </div>
                  <div className="space-y-3">
                    {activeLevel.topics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#0D3B2E] bg-white p-3.5 rounded-xs border border-stone-200">
                        <div className="w-5 h-5 rounded-xs bg-[#FAF5E8] text-[#0D3B2E] border border-[#C5A869]/40 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </div>
                        <span className="leading-snug font-sans">{topic}</span>
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
                    className="py-3 px-5 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] font-medium text-xs rounded-xs border border-[#C5A869]/50 shadow-xs transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>View Full Syllabus Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
                  </button>
                  <button
                    onClick={() => onOpenAppDownload(`EB Wealth Academy: ${activeLevel.title}`)}
                    className="py-3 px-5 bg-white hover:bg-stone-50 text-[#0D3B2E] border border-stone-300 font-medium text-xs rounded-xs transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Open in Mobile App</span>
                  </button>
                </div>
              </div>

              {/* Sidebar Info Card */}
              <div className="lg:col-span-4 bg-white p-6 rounded-xs border border-stone-200 space-y-5">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#0D3B2E] uppercase tracking-wider block mb-1">
                    Target Profile
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {activeLevel.targetAudience}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <span className="text-[11px] font-mono font-bold text-[#0D3B2E] uppercase tracking-wider block mb-1">
                    Pedagogical Format
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    High-definition institutional briefings, downloadable asset allocation models, and live interactive Q&A recordings.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <span className="text-[11px] font-mono font-bold text-[#0D3B2E] uppercase tracking-wider block mb-1">
                    Regulatory Standing
                  </span>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                    Curricula are provided purely for financial education and conceptual literacy. EB Wealth does not provide personal investment advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <LearnByDoing onOpenAppDownload={onOpenAppDownload} />

      {/* Frequently Asked Questions */}
      <section className="py-20 border-b border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A869]">
              Institutional Inquiries
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0D3B2E] mt-1">
              Common Questions About EB Academy
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-stone-200 rounded-xs p-5 bg-[#FAF9F5] transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left font-serif font-bold text-sm text-[#0D3B2E] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-base font-mono text-[#C5A869]">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200 pt-3 font-sans">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Disclosures */}
      <section className="py-12 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-xs bg-[#FAF5E8] border border-[#C5A869]/40 text-xs text-stone-700 leading-relaxed">
            <div className="flex items-center gap-2 font-serif font-bold text-[#0D3B2E] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
              <span className="tracking-wide">Statutory Transparency Notice</span>
            </div>
            <p className="font-sans text-[11px] leading-normal">{REGULATORY_DISCLAIMER_SHORT}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
