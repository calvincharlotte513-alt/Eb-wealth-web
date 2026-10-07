import React from 'react';
import { X, CheckCircle, Clock, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnroll
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 text-neutral-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-neutral-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <span className="text-emerald-400 font-semibold uppercase tracking-wider">{course.level}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-500" />
              {course.duration}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-neutral-500" />
              {course.modulesCount} Core Modules
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">{course.title}</h3>
          <p className="text-sm text-neutral-400 mt-1">{course.subtitle}</p>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed mb-6">
          {course.description}
        </p>

        {/* Key Outcomes */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            What You Will Master
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {course.keyOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modules Breakdown */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Curriculum Syllabus
          </h4>
          <div className="space-y-2.5">
            {course.modules.map((mod, idx) => (
              <div key={idx} className="p-3 bg-neutral-950 border border-neutral-800/80 rounded-xl text-xs">
                <div className="font-semibold text-white mb-1.5">{mod.title}</div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-neutral-400">
                  {mod.topics.map((t, tIdx) => (
                    <span key={tIdx} className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-neutral-400 block">Enrollment Status</span>
            <div className="text-base sm:text-lg font-bold text-emerald-400">
              {course.accessTier || 'Executive Member Pass'}
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(course);
              }}
              className="w-full sm:w-auto py-2.5 px-5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Complete Enrollment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
