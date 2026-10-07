import React, { useState } from 'react';
import { COURSES } from '../data/content';
import { Course } from '../types';
import { BookOpen, Clock, Check, ArrowRight, ShieldAlert, Smartphone, Download, HelpCircle } from 'lucide-react';
import { PageId } from '../types/navigation';

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
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredCourses = filterLevel === 'all'
    ? COURSES
    : COURSES.filter((c) => c.level.toLowerCase() === filterLevel.toLowerCase() || c.level === 'All Levels');

  const faqs = [
    {
      q: 'Where do I watch the masterclasses after downloading the app?',
      a: 'All masterclasses, spreadsheets, and strategy tools are located directly in the EB Wealth Mobile App under the "Academy" tab. You can stream in HD or download modules for offline access.'
    },
    {
      q: 'How do I install the EB Wealth APK on Android?',
      a: 'Simply click "Download EB Wealth APK", open your notifications or Downloads folder, and tap "Install". If prompted, enable "Install unknown apps" in your browser or device settings.'
    },
    {
      q: 'Are live Q&A strategy labs hosted in the app?',
      a: 'Yes. Live strategy labs with our senior advisors and private Q&A sessions are broadcast directly inside the app with integrated interactive chat and replay archives.'
    },
    {
      q: 'Will there be an iOS / Apple App Store release?',
      a: 'Yes, our iOS TestFlight version is currently in private testing for existing members and will be released on the Apple App Store shortly.'
    }
  ];

  return (
    <div className="pt-24 pb-20 text-neutral-100 bg-neutral-950">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-neutral-900 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
            <Smartphone className="w-4 h-4" />
            <span>EB Wealth Mobile Application</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">All Courses Hosted In-App</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display max-w-4xl">
            Demystifying Capital Allocation & Private Market Alpha.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mt-4 leading-relaxed">
            All 4 flagship masterclasses, due diligence financial models, and syndicate analysis tools are hosted exclusively in the official <strong>EB Wealth Mobile App</strong>. Download the APK below for instant access.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenAppDownload('EB Wealth Complete Academy Suite')}
              className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download EB Wealth APK (v2.4.0)</span>
            </button>
            <span className="text-xs text-neutral-400">
              Direct Android APK installer · 42.8 MB
            </span>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl inline-flex">
            {[
              { id: 'all', label: 'All Curricula (4 Flagship Tracks)' },
              { id: 'beginner', label: 'Foundations' },
              { id: 'intermediate', label: 'Alternative Assets' },
              { id: 'advanced', label: 'Generational Trusts' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterLevel(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterLevel === tab.id
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Course Catalog */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  course.featured
                    ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-emerald-500/50 shadow-2xl shadow-emerald-950/20'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                    <span className="text-emerald-400 font-semibold uppercase tracking-wider">
                      {course.level}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {course.duration}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{course.modulesCount} Modules</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight font-display mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium mb-3">
                    {course.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Syllabus Modules Teaser */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                      Module Highlights:
                    </span>
                    {course.modules.map((m, mIdx) => (
                      <div key={mIdx} className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800/80 text-xs text-neutral-200 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Access Tier & Action Bar */}
                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Access Mode</span>
                    <div className="text-sm sm:text-base font-semibold text-emerald-400">
                      In-App Masterclass
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="py-2.5 px-3.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
                    >
                      Inspect Syllabus
                    </button>
                    <button
                      onClick={() => onOpenAppDownload(`EB Wealth Academy: ${course.title}`)}
                      className="py-2.5 px-4 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Access in App</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Callout */}
          <div className="p-8 sm:p-10 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-emerald-950/40 border border-emerald-500/30 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                Complete Mobile Learning Pass
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                EB Wealth Mobile Academy Bundle
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                Download the official APK to unlock all 4 flagship curricula, offline streaming, proprietary pro forma spreadsheets, and live weekly strategy replays.
              </p>
            </div>
            <div className="text-right shrink-0">
              <button
                onClick={() => onOpenAppDownload('EB Wealth Full Mobile Academy Pass')}
                className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download App to Unlock All</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
              Curriculum Inquiries
            </span>
            <h2 className="text-3xl font-bold text-white font-display">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between font-semibold text-white text-sm">
                  <span>{faq.q}</span>
                  <span className="text-emerald-400 text-lg">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && (
                  <p className="text-xs text-neutral-300 mt-3 pt-3 border-t border-neutral-900 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Notice Banner */}
      <section className="py-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Regulatory Notice:</strong> EB Wealth Academy is an educational publishing platform and does not provide individualized investment advice.
              </span>
            </div>
            <button
              onClick={onOpenDisclosures}
              className="text-emerald-400 hover:text-emerald-300 underline font-medium whitespace-nowrap cursor-pointer"
            >
              Statutory Disclosures
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
