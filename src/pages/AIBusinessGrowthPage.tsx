import React, { useState } from 'react';
import { AI_GROWTH_SERVICES } from '../data/content';
import { Cpu, ArrowRight, CheckCircle2, TrendingUp, Zap, Clock, Sparkles } from 'lucide-react';
import { PageId } from '../types/navigation';

interface AIBusinessGrowthPageProps {
  onNavigate: (page: PageId) => void;
  onScheduleAudit: () => void;
}

export const AIBusinessGrowthPage: React.FC<AIBusinessGrowthPageProps> = ({
  onNavigate,
  onScheduleAudit
}) => {
  const [teamSize, setTeamSize] = useState(6);
  const [hoursPerWeekPerMember, setHoursPerWeekPerMember] = useState(12);
  const [blendedHourlyRate, setBlendedHourlyRate] = useState(55);

  const totalWeeklyHoursSaved = Math.round(teamSize * hoursPerWeekPerMember * 0.65);
  const annualDollarsSaved = Math.round(totalWeeklyHoursSaved * blendedHourlyRate * 50);

  return (
    <div className="pt-24 pb-20 text-neutral-100 bg-neutral-950">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-neutral-900 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
            <Cpu className="w-4 h-4" />
            <span>AI Business Growth & Systems Engineering</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Scale Without Headcount Friction</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display max-w-4xl">
            Prompt Engineering & Autonomous Revenue Systems.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mt-4 leading-relaxed">
            Standard conversational chatbots are toys. We build deterministic prompt architectures, automated high-ticket qualification pipelines, and internal executive agents that free your team to focus exclusively on high-value strategy.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onScheduleAudit}
              className="py-3 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule AI Systems Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-400">
              Custom operational blueprints delivered in 14 business days
            </span>
          </div>
        </div>
      </section>

      {/* Why Prompt Engineering Matters for Modern Enterprises */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                The Prompt Engineering Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                Why Generic AI Fails and Precision Architecture Wins
              </h2>
              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
                <p>
                  Most companies attempt to adopt AI by handing their staff off-the-shelf subscriptions and generic prompts like "write a polite follow-up email" or "summarize this contract." The results are predictably shallow, full of hallucinations, and unusable in commercial transactions.
                </p>
                <p>
                  At EB Wealth, we build <strong>contextual prompt architecture</strong>. We design few-shot examples, dynamic retrieval pipelines (RAG), and strict output schemas that enforce your brand tone, legal boundaries, and high-ticket sales psychology.
                </p>
                <p>
                  The result is an operational machine where inbound leads are scored and booked in under two minutes, complex research packets are synthesized in seconds, and internal administrative overhead drops by over 40%.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl group">
                <img
                  src="/src/assets/images/ai_business_growth_1791394794528.jpg"
                  alt="EB Wealth AI Systems Command Suite"
                  className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                    Autonomous Infrastructure
                  </span>
                  <span className="text-sm font-semibold text-white mt-0.5">
                    Production-Ready Prompt Chains & Enterprise Integrations
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Services Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {AI_GROWTH_SERVICES.map((service, idx) => (
              <div
                key={service.id}
                className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">
                    0{idx + 1}. CAPABILITY
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight font-display mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold block mb-0.5">
                      Target Outcome
                    </span>
                    <span className="text-xs font-medium text-white">
                      {service.metricsImpact}
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-6">
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
                    className="w-full py-2.5 px-3 bg-neutral-950 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl border border-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Engineering Brief</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive ROI Calculator */}
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                    Interactive Return on Automation
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                    Calculate Your Time & Capital Recapture
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                    Adjust your team parameters to see the tangible financial upside of eliminating manual operational friction.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                    <span>Active Team Members</span>
                    <span className="text-blue-400 tabular-nums">{teamSize} Persons</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                    <span>Manual Repetitive Hours Per Operator / Week</span>
                    <span className="text-emerald-400 tabular-nums">{hoursPerWeekPerMember} Hours/Week</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="30"
                    value={hoursPerWeekPerMember}
                    onChange={(e) => setHoursPerWeekPerMember(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                    <span>Blended Hourly Cost</span>
                    <span className="text-amber-400 tabular-nums">£{blendedHourlyRate} / Hour</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="5"
                    value={blendedHourlyRate}
                    onChange={(e) => setBlendedHourlyRate(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Estimated Annual Capital Reclaimed</span>
                  </div>
                  <div className="text-3xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight font-display mb-2">
                    £{annualDollarsSaved.toLocaleString()} <span className="text-xs font-normal text-neutral-400">/ Year</span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-6">
                    Achieved through automated data ingestion, prompt verification loops, and CRM appointment bots.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Weekly Hours Freed</span>
                      </div>
                      <span className="text-xl font-bold text-white tabular-nums">
                        {totalWeeklyHoursSaved} hrs/wk
                      </span>
                    </div>

                    <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Lead Velocity</span>
                      </div>
                      <span className="text-xl font-bold text-emerald-400">
                        Sub-2 Min
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onScheduleAudit}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Schedule Systems Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
