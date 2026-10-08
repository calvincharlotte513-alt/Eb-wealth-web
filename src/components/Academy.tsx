import React, { useState } from 'react';
import { COURSES } from '../data/content';
import { Course } from '../types';
import { BookOpen, Clock, ArrowRight, ShieldAlert, Smartphone, Check, Download } from 'lucide-react';
import academyCurriculumImage from '../assets/images/academy_curriculum_1791394772347.jpg';

interface AcademyProps {
  onSelectCourse: (course: Course) => void;
  onOpenAppDownload: (featureName: string) => void;
  onOpenDisclosures: () => void;
}

export const Academy: React.FC<AcademyProps> = ({
  onSelectCourse,
  onOpenAppDownload,
  onOpenDisclosures
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredCourses = filterLevel === 'all'
    ? COURSES
    : COURSES.filter((c) => c.level.toLowerCase() === filterLevel.toLowerCase() || c.level === 'All Levels');

  return (
    <section id="academy" className="py-24 bg-neutral-950 text-neutral-100 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split: Section Header & Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-emerald-400 font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>EB Wealth Academy</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">Streamed Exclusively In-App</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Investment Literacy Meets Asymmetric Alpha
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              All 4 flagship masterclasses, due diligence financial models, and live strategy recordings are hosted directly inside the <strong>EB Wealth Mobile App</strong>. Download the application to enroll and start learning.
            </p>

            {/* Interactive Filter Tabs */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl inline-flex">
              {[
                { id: 'all', label: 'All Curricula' },
                { id: 'beginner', label: 'Foundations' },
                { id: 'intermediate', label: 'Alternative Assets' },
                { id: 'advanced', label: 'Generational Trusts' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterLevel(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
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

          {/* Right Visual Carrier: High-Res Curriculum Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group">
              <img
                src={academyCurriculumImage}
                alt="EB Wealth Academy Curriculum Masterclasses & Strategy Modules"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  Mobile App Learning Suite
                </span>
                <span className="text-sm font-bold text-white mt-0.5">
                  Offline Video · Due Diligence Spreadsheets · Direct App Access
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                course.featured
                  ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-emerald-500/40 shadow-xl shadow-emerald-950/20'
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

                <h3 className="text-xl font-bold text-white tracking-tight font-display mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-emerald-400 font-medium mb-3">
                  {course.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
                  {course.description}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-2 mb-6">
                  {course.keyOutcomes.slice(0, 3).map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Row Linking to the App */}
              <div className="pt-5 border-t border-neutral-800/80 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Access Mode</span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-400">
                    {course.accessTier || 'EB Wealth App'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="py-2 px-3 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                  >
                    View Syllabus
                  </button>
                  <button
                    onClick={() => onOpenAppDownload(`EB Wealth Academy: ${course.title}`)}
                    className="py-2 px-4 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Access on App</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* App Notification Banner */}
        <div className="p-5 bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Stream All Curricula on the Go</h4>
              <p className="text-xs text-neutral-400">Install the official EB Wealth Android APK to download video lessons and interactive exercises.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenAppDownload('EB Wealth Academy Complete Bundle')}
            className="py-2.5 px-5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </button>
        </div>

        {/* Mandatory Regulatory Compliance Notice Box */}
        <div className="p-4 bg-neutral-900/90 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Regulatory Notice:</strong> EB Wealth Academy materials in the app are educational frameworks and do not constitute registered investment advice.
            </span>
          </div>
          <button
            onClick={onOpenDisclosures}
            className="text-emerald-400 hover:text-emerald-300 underline font-medium whitespace-nowrap cursor-pointer text-xs"
          >
            Read Full Disclosures & Terms
          </button>
        </div>
      </div>
    </section>
  );
};
