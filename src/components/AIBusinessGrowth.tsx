import React, { useState } from 'react';
import { AI_GROWTH_SERVICES } from '../data/content';
import { Cpu, ArrowRight, CheckCircle2, Zap, Clock, TrendingUp, Sliders, ShieldCheck } from 'lucide-react';
import aiBusinessGrowthImage from '../assets/images/ai_business_growth_1791394794528.jpg';

interface AIBusinessGrowthProps {
  onScheduleAudit: () => void;
  onNavigateToAIGrowth?: () => void;
}

export const AIBusinessGrowth: React.FC<AIBusinessGrowthProps> = ({ onScheduleAudit, onNavigateToAIGrowth }) => {
  // Interactive ROI & Time Saved Calculator for real business leverage
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursSpentOnRepetitiveAdmin, setHoursSpentOnRepetitiveAdmin] = useState<number>(10);
  const [hourlyValue, setHourlyValue] = useState<number>(45);

  const weeklyHoursReclaimed = Math.round(teamSize * hoursSpentOnRepetitiveAdmin * 0.65);
  const annualSavings = Math.round(weeklyHoursReclaimed * hourlyValue * 48);

  const focusPillars = [
    { title: 'Workflow Automation', desc: 'Connecting your CRM, calendar, and email to eliminate manual data entry.' },
    { title: 'AI Prompt Engineering', desc: 'Custom, multi-step prompt systems that deliver executive-quality outputs.' },
    { title: 'Business Systems', desc: 'Standard operating procedures (SOPs) digitized into instant AI knowledge bases.' },
    { title: 'Lead Generation', desc: 'Automated prospect qualification that responds in under 3 minutes.' },
    { title: 'Operational Efficiency', desc: 'Auditing bottlenecks so you scale revenue without proportional headcount.' },
    { title: 'Custom AI Solutions', desc: 'Tailored solutions built specifically around your core business model.' }
  ];

  return (
    <section id="ai-growth" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              <Cpu className="w-4 h-4" />
              <span>AI Business Growth & Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17202A] tracking-tight">
              Practical AI That Creates Business Leverage.
            </h2>
            <p className="text-base sm:text-lg text-[#52606D] leading-relaxed max-w-2xl">
              AI should save time, increase revenue, or improve operations. EB Wealth helps businesses and entrepreneurs implement AI purposefully rather than wasting hours randomly experimenting with generic chatbot prompts.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onScheduleAudit}
                className="py-3 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule AI Systems Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {onNavigateToAIGrowth && (
                <button
                  onClick={onNavigateToAIGrowth}
                  className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-[#17202A] font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore AI Business Growth</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md group bg-slate-50">
              <img
                src={aiBusinessGrowthImage}
                alt="Practical AI Business Automation"
                className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('/images/')) {
                    target.src = '/images/ai_business_growth_1791394794528.jpg';
                  }
                }}
              />
              <div className="p-4 bg-white border-t border-slate-200">
                <div className="text-xs font-bold text-[#17202A]">
                  Real Commercial Leverage, Not Hype
                </div>
                <div className="text-[11px] text-[#52606D] mt-0.5">
                  Turning unstructured processes into repeatable, profitable automated systems.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Focus Areas Grid */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A878]">
              Where We Create Value
            </span>
            <h3 className="text-2xl font-bold text-[#17202A] mt-1">
              Core AI Implementation Focus Areas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusPillars.map((area, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-2xs hover:bg-white hover:border-[#2563EB]/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-[#17202A] mb-1.5">{area.title}</h4>
                <p className="text-xs text-[#52606D] leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Leverage & Time Saved Calculator */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#EFF6FF]/60 border border-blue-200 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                  Interactive Business Calculator
                </span>
                <h3 className="text-2xl font-bold text-[#17202A] mt-1">
                  Estimate Your Organization's AI Time Dividend
                </h3>
                <p className="text-xs text-[#52606D] mt-1.5">
                  Adjust team size and repetitive administrative hours to see potential annual hours reclaimed.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#17202A] mb-1.5">
                    <span>Team / Operator Size:</span>
                    <span className="font-bold text-[#2563EB]">{teamSize} people</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-[#2563EB] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#17202A] mb-1.5">
                    <span>Weekly admin / repetitive hours per person:</span>
                    <span className="font-bold text-[#2563EB]">{hoursSpentOnRepetitiveAdmin} hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="25"
                    value={hoursSpentOnRepetitiveAdmin}
                    onChange={(e) => setHoursSpentOnRepetitiveAdmin(Number(e.target.value))}
                    className="w-full accent-[#2563EB] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#17202A] mb-1.5">
                    <span>Blended hourly operator rate:</span>
                    <span className="font-bold text-[#2563EB]">£{hourlyValue} / hr</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="5"
                    value={hourlyValue}
                    onChange={(e) => setHourlyValue(Number(e.target.value))}
                    className="w-full accent-[#2563EB] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Output Box */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-blue-200 p-6 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Estimated Commercial Return
              </div>

              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB]">
                    ~{weeklyHoursReclaimed} hrs
                  </div>
                  <div className="text-xs text-[#52606D] mt-0.5">
                    Hours Reclaimed Weekly
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00A878]">
                    £{annualSavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#52606D] mt-0.5">
                    Equivalent Annual Capacity
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#52606D] mt-4 leading-relaxed">
                Reclaiming ~{weeklyHoursReclaimed} hours each week allows you to reallocate focus toward high-margin client acquisition, strategic investing, and core company innovation.
              </p>

              <button
                onClick={onScheduleAudit}
                className="mt-5 w-full py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>Request Custom AI Systems Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Service Offerings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {AI_GROWTH_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#2563EB] uppercase block mb-1">
                  Service Framework
                </span>
                <h4 className="text-lg font-bold text-[#17202A] mb-2">{srv.title}</h4>
                <p className="text-xs text-[#52606D] leading-relaxed mb-4">{srv.description}</p>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-[#17202A] mb-4">
                  <span className="font-bold text-[#00A878]">Business Impact: </span>
                  {srv.metricsImpact}
                </div>

                <div className="space-y-2 mb-6">
                  {srv.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#52606D]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A878] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onScheduleAudit}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-[#17202A] border border-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Inquire About {srv.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
