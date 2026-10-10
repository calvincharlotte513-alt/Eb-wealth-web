import React from 'react';
import { X, CheckCircle, Clock, BookOpen, Smartphone } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#08231B]/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-xs shadow-2xl p-6 sm:p-8 text-[#141E18] my-auto animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-stone-400 hover:text-stone-800 transition-colors p-2 rounded-xs hover:bg-stone-100 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-6">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-mono">
            <span className="text-[#C5A869] font-bold uppercase tracking-wider">{course.level}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {course.duration}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              {course.modulesCount} Core Modules
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0D3B2E]">{course.title}</h3>
          <p className="text-xs font-mono text-[#C5A869] font-medium mt-1">{course.subtitle}</p>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-sans">
          {course.description}
        </p>

        {/* Key Outcomes */}
        <div className="mb-6">
          <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D3B2E] mb-3">
            Core Learning Topics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {course.keyOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#0D3B2E] bg-[#FAF9F5] p-3 rounded-xs border border-stone-200">
                <CheckCircle className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                <span className="leading-snug font-sans">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus Lessons Preview */}
        {course.modules && course.modules.length > 0 && (
          <div className="mb-6">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D3B2E] mb-3">
              Curriculum Lessons
            </h4>
            <div className="space-y-2">
              {course.modules.map((mod, idx) => (
                <div key={idx} className="p-3 bg-[#FAF9F5] rounded-xs border border-stone-200 text-xs">
                  <div className="font-serif font-bold text-[#0D3B2E] mb-1">{mod.title}</div>
                  <div className="text-[11px] font-sans text-stone-600">
                    {mod.topics.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-stone-500">
            Available in the EB Wealth Academy portal & mobile app.
          </div>
          <button
            onClick={() => {
              onClose();
              onEnroll(course);
            }}
            className="w-full sm:w-auto py-2.5 px-6 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] text-xs font-medium rounded-xs border border-[#C5A869]/50 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Open in EB Wealth App</span>
          </button>
        </div>
      </div>
    </div>
  );
};
