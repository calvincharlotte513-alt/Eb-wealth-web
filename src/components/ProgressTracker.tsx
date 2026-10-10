import React, { useState, useEffect } from 'react';
import { progressService, OverallProgressInfo } from '../services/progressService';
import { ACADEMY_LEVELS } from '../data/content';
import { BookOpen, CheckCircle2, Circle, ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { PageId } from '../types/navigation';

interface ProgressTrackerProps {
  onNavigateToAcademyLevel?: (level: number) => void;
  onExploreProgram?: (page: PageId) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  onNavigateToAcademyLevel,
  onExploreProgram
}) => {
  const [progress, setProgress] = useState<OverallProgressInfo>(progressService.getOverallProgress());
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  useEffect(() => {
    const unsubscribe = progressService.subscribe(() => {
      setProgress(progressService.getOverallProgress());
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = (levelNumber: number, topicIdx: number) => {
    progressService.toggleTopicCompletion(levelNumber, topicIdx);
    setProgress(progressService.getOverallProgress());
  };

  const handleReset = () => {
    if (window.confirm('Reset all completed lessons on this device?')) {
      progressService.resetProgress();
      setProgress(progressService.getOverallProgress());
    }
  };

  const currentLevelTopics = ACADEMY_LEVELS.find((l) => l.levelNumber === selectedLevel)?.topics || [];

  return (
    <div className="bg-white border border-[#C5A869]/35 rounded-sm p-6 sm:p-10 shadow-sm space-y-8">
      {/* Top Bar: Overall Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-1">
            <Trophy className="w-4 h-4 text-[#C5A869]" />
            <span>Verified Student Learning Progress</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E]">
            Curriculum Completion Dashboard
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Your progress is securely saved in this browser. Check off each topic as you master it.
          </p>
        </div>

        {/* Big Overall Percent Stat */}
        <div className="flex items-center gap-5 p-4 bg-[#FAF9F5] border border-[#C5A869]/30 rounded-sm shrink-0">
          <div className="w-16 h-16 rounded-full border-4 border-stone-200 flex items-center justify-center relative font-mono">
            <span className="font-serif font-bold text-lg text-[#0D3B2E]">{progress.overallPercent}%</span>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-stone-500">Overall Completed</div>
            <div className="font-serif text-lg font-bold text-[#0D3B2E] mt-0.5">
              {progress.completedTopics} of {progress.totalTopics} Lessons
            </div>
            <button
              onClick={handleReset}
              className="text-[10px] font-mono text-stone-400 hover:text-red-700 flex items-center gap-1 mt-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Progress</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Levels Quick Bar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {progress.levels.map((lvl) => (
          <button
            key={lvl.levelNumber}
            onClick={() => setSelectedLevel(lvl.levelNumber)}
            className={`p-3.5 rounded-sm text-left border transition-all cursor-pointer flex flex-col justify-between ${
              selectedLevel === lvl.levelNumber
                ? 'bg-[#0D3B2E] text-white border-[#C5A869] shadow-sm'
                : 'bg-[#FAF9F5] border-stone-200 hover:border-[#C5A869]/60 text-stone-700'
            }`}
          >
            <div>
              <span className={`text-[10px] font-mono font-bold block mb-1 ${
                selectedLevel === lvl.levelNumber ? 'text-[#DFCA96]' : 'text-stone-400'
              }`}>
                LEVEL 0{lvl.levelNumber}
              </span>
              <div className="text-xs font-serif font-bold truncate">
                {lvl.title.split('—')[1]?.trim() || lvl.title}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-200/40">
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span>{lvl.completedTopics}/{lvl.totalTopics}</span>
                <span>{lvl.percent}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-300/40 rounded-xs overflow-hidden">
                <div
                  style={{ width: `${lvl.percent}%` }}
                  className={`h-full ${selectedLevel === lvl.levelNumber ? 'bg-[#C5A869]' : 'bg-[#165342]'}`}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Level Interactive Checklist */}
      <div className="p-6 bg-[#FAF9F5] border border-[#C5A869]/30 rounded-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9E8040] font-bold">
              Level 0{selectedLevel} Checklist
            </span>
            <h4 className="font-serif text-xl font-bold text-[#0D3B2E]">
              {ACADEMY_LEVELS.find((l) => l.levelNumber === selectedLevel)?.headline}
            </h4>
          </div>

          {onNavigateToAcademyLevel && (
            <button
              onClick={() => onNavigateToAcademyLevel(selectedLevel)}
              className="px-3.5 py-1.5 bg-[#0D3B2E] text-[#C5A869] hover:bg-[#07251C] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 cursor-pointer border border-[#C5A869]/40"
            >
              <span>Study Full Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
            </button>
          )}
        </div>

        {/* Interactive Topic Checkbox List */}
        <div className="space-y-2.5">
          {currentLevelTopics.map((topic, idx) => {
            const isCompleted = progressService.isTopicCompleted(selectedLevel, idx);
            return (
              <div
                key={idx}
                onClick={() => handleToggle(selectedLevel, idx)}
                className={`p-3.5 rounded-sm border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                  isCompleted
                    ? 'bg-white border-emerald-300 text-stone-800'
                    : 'bg-white/80 border-stone-200 hover:border-stone-300 text-stone-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    className="mt-0.5 text-stone-400 cursor-pointer shrink-0"
                    aria-label={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300 hover:text-stone-400" />
                    )}
                  </button>
                  <span className={`text-xs sm:text-sm leading-snug ${isCompleted ? 'line-through text-stone-400' : 'text-[#111816]'}`}>
                    {topic}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-stone-400 shrink-0">
                  Topic {idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
