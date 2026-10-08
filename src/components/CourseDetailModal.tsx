import React from 'react';
import { X, CheckCircle, Clock, BookOpen, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#17202A] my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#17202A] transition-colors p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[#52606D] mb-1.5">
            <span className="text-[#00A878] font-bold uppercase tracking-wider">{course.level}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.duration}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              {course.modulesCount} Core Modules
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#17202A]">{course.title}</h3>
          <p className="text-sm text-[#00A878] font-medium mt-0.5">{course.subtitle}</p>
        </div>

        <p className="text-xs sm:text-sm text-[#52606D] leading-relaxed mb-6">
          {course.description}
        </p>

        {/* Key Outcomes */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#17202A] mb-3">
            Core Learning Topics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {course.keyOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#17202A] bg-[#F8FAFC] p-3 rounded-xl border border-slate-200/70">
                <CheckCircle className="w-4 h-4 text-[#00A878] shrink-0 mt-0.5" />
                <span className="leading-snug">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus Lessons Preview */}
        {course.modules && course.modules.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17202A] mb-3">
              Curriculum Lessons
            </h4>
            <div className="space-y-2">
              {course.modules.map((mod, idx) => (
                <div key={idx} className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/70 text-xs">
                  <div className="font-bold text-[#17202A] mb-1">{mod.title}</div>
                  <div className="text-[11px] text-[#52606D]">
                    {mod.topics.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[#52606D]">
            Available in the EB Wealth Academy portal & mobile app.
          </div>
          <button
            onClick={() => {
              onClose();
              onEnroll(course);
            }}
            className="w-full sm:w-auto py-2.5 px-6 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Open in EB Wealth App</span>
          </button>
        </div>
      </div>
    </div>
  );
};
