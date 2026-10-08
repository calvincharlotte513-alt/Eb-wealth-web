import React, { useState } from 'react';
import { AI_GROWTH_SERVICES } from '../data/content';
import { Cpu, ArrowRight, CheckCircle2, TrendingUp, Zap, Clock, DollarSign } from 'lucide-react';
import aiBusinessGrowthImage from '../assets/images/ai_business_growth_1791394794528.jpg';

interface AIBusinessGrowthProps {
  onScheduleAudit: () => void;
}

export const AIBusinessGrowth: React.FC<AIBusinessGrowthProps> = ({ onScheduleAudit }) => {
  // Interactive mini calculator for AI ROI
  const [teamSize, setTeamSize] = useState(6);
  const [hoursPerWeekPerMember, setHoursPerWeekPerMember] = useState(12);
  const [blendedHourlyRate, setBlendedHourlyRate] = useState(55);

  const totalWeeklyHoursSaved = Math.round(teamSize * hoursPerWeekPerMember * 0.65);
  const annualDollarsSaved = Math.round(totalWeeklyHoursSaved * blendedHourlyRate * 50);

  return (
    <section id="ai-growth" className="py-24 bg-neutral-900 text-neutral-100 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split: Section Header & High-Res Image Carrier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-blue-400 font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Applied Enterprise Intelligence</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">Prompt Engineering & Automation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Scale Your Enterprise With Custom AI Architectures
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              Generic ChatGPT prompts produce mediocre, generic results. We design custom, high-precision prompt engineering systems and autonomous workflow agents that eliminate operational bottlenecks and turn inbound prospects into closed deals.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onScheduleAudit}
                className="py-3 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule AI Systems Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-neutral-400">
                Custom prompt frameworks delivered in 14 business days
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group">
              <img
                src={aiBusinessGrowthImage}
                alt="EB Wealth AI Prompt Engineering and Business Automation Architecture"
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  Autonomous Scaling Systems
                </span>
                <span className="text-sm font-semibold text-white mt-0.5">
                  RAG Pipelines · Qualification Agents · Custom System Prompts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Services Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {AI_GROWTH_SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">
                  0{idx + 1}. SERVICE
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight font-display mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-400 font-medium mb-3">
                  {service.tagline}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800/80 mb-5">
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold block mb-0.5">
                    Measurable Impact
                  </span>
                  <span className="text-xs font-medium text-white">
                    {service.metricsImpact}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  {service.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={onScheduleAudit}
                  className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl border border-neutral-700/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive AI ROI & Time Recovery Calculator */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  Interactive Value Model
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                  Estimate Your AI Operational Leverage
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                  See how many executive hours and operational capital custom EB Wealth prompt workflows can liberate for your business.
                </p>
              </div>

              {/* Slider 1: Team Size */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                  <span>Knowledge Workers / Team Members</span>
                  <span className="text-blue-400 tabular-nums">{teamSize} Persons</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: Hours spent in manual friction */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                  <span>Manual Repetitive Hours per Member / Week</span>
                  <span className="text-emerald-400 tabular-nums">{hoursPerWeekPerMember} Hours/Week</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="25"
                  value={hoursPerWeekPerMember}
                  onChange={(e) => setHoursPerWeekPerMember(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Slider 3: Hourly Rate */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                  <span>Blended Hourly Cost</span>
                  <span className="text-amber-400 tabular-nums">${blendedHourlyRate} / Hour</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="5"
                  value={blendedHourlyRate}
                  onChange={(e) => setBlendedHourlyRate(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Results Box */}
            <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Estimated Annual Capital Reclaimed</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight font-display mb-2">
                  ${annualDollarsSaved.toLocaleString()} <span className="text-xs font-normal text-neutral-400">/ Year</span>
                </div>
                <p className="text-xs text-neutral-400 mb-6">
                  Based on automating 65% of repetitive correspondence, research parsing, and lead intake tasks.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Weekly Hours Freed</span>
                    </div>
                    <span className="text-lg font-bold text-white tabular-nums">
                      {totalWeeklyHoursSaved} hrs/wk
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Speed to Lead</span>
                    </div>
                    <span className="text-lg font-bold text-emerald-400">
                      &lt; 90 Seconds
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onScheduleAudit}
                className="w-full py-3 px-5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Deploy This System In Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
