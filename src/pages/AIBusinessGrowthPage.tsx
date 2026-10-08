import React, { useState } from 'react';
import { AI_GROWTH_SERVICES, HERO_BACKGROUNDS, HERO_FALLBACKS } from '../data/content';
import { Cpu, ArrowRight, CheckCircle2, TrendingUp, Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { PageId } from '../types/navigation';
import { HeroBackground } from '../components/HeroBackground';
import aiBusinessGrowthImage from '../assets/images/ai_business_growth_1791394794528.jpg';

interface AIBusinessGrowthPageProps {
  onNavigate: (page: PageId) => void;
  onScheduleAudit: () => void;
}

export const AIBusinessGrowthPage: React.FC<AIBusinessGrowthPageProps> = ({
  onNavigate,
  onScheduleAudit
}) => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursSpentOnRepetitiveAdmin, setHoursSpentOnRepetitiveAdmin] = useState<number>(10);
  const [hourlyValue, setHourlyValue] = useState<number>(45);

  const weeklyHoursReclaimed = Math.round(teamSize * hoursSpentOnRepetitiveAdmin * 0.65);
  const annualSavings = Math.round(weeklyHoursReclaimed * hourlyValue * 48);

  const focusPillars = [
    { title: 'Workflow Automation', desc: 'Connecting your CRM, calendar, and email to eliminate manual data entry.' },
    { title: 'AI Prompt Engineering', desc: 'Custom, multi-step prompt systems that deliver executive-quality outputs.' },
    { title: 'Business Systems', desc: 'Standard operating procedures (SOPs) digitized into instant AI knowledge bases.' },
    { title: 'Lead Generation & Qualification', desc: 'Automated prospect qualification that responds in under 3 minutes.' },
    { title: 'Operational Efficiency', desc: 'Auditing bottlenecks so you scale revenue without proportional headcount.' },
    { title: 'Custom AI Solutions', desc: 'Tailored solutions built specifically around your core business model.' }
  ];

  return (
    <div className="pt-24 pb-20 text-[#17202A] bg-[#F8FAFC]">
      {/* Header Banner with authentic Hero Background */}
      <section className="relative py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-[#F8FAFC]">
        <HeroBackground
          imageSrc={HERO_BACKGROUNDS.aiGrowth}
          fallbackSrc={HERO_FALLBACKS.aiGrowth || aiBusinessGrowthImage}
          overlayOpacity="subtle"
          imageOpacity="opacity-95 md:opacity-100"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl bg-white/70 sm:bg-white/45 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xs">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2563EB] font-bold mb-3">
              <Cpu className="w-4 h-4" />
              <span>Practical AI for Businesses & Entrepreneurs</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17202A]">
              Practical AI That Creates Business Leverage.
            </h1>
            <p className="text-base sm:text-lg text-[#17202A]/85 mt-4 leading-relaxed">
              AI should save time, increase revenue, or improve operations. EB Wealth helps businesses implement AI purposefully rather than wasting hundreds of hours randomly experimenting with generic chatbot prompts.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onScheduleAudit}
                className="py-3 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule AI Systems Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('services-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-white hover:bg-slate-50 text-[#17202A] border border-slate-200 font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Explore AI Service Frameworks
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00A878]">
                Beyond Generic Chatbots
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A]">
                Engineering Systematic Commercial Advantage
              </h2>
              <p className="text-sm sm:text-base text-[#52606D] leading-relaxed">
                Most businesses have tried using ChatGPT or Claude, but they quickly encounter problems: inconsistent formatting, hallucinations, lost context, and lack of integration with existing databases.
              </p>
              <p className="text-sm sm:text-base text-[#52606D] leading-relaxed">
                We engineer context-dense, multi-step prompt workflows and autonomous pipelines tailored specifically to your business operations. Your team receives turnkey templates and automated agents that perform mission-critical tasks in seconds.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17202A]">
                  <CheckCircle2 className="w-4 h-4 text-[#00A878] shrink-0 mt-0.5" />
                  <span><strong>Zero Hallucination SOPs:</strong> Structured reasoning trees that verify outputs before finalizing.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17202A]">
                  <CheckCircle2 className="w-4 h-4 text-[#00A878] shrink-0 mt-0.5" />
                  <span><strong>Instant Lead Qualification:</strong> Inbound leads scored and scheduled automatically 24/7.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17202A]">
                  <CheckCircle2 className="w-4 h-4 text-[#00A878] shrink-0 mt-0.5" />
                  <span><strong>Internal Knowledge Retrieval:</strong> Instant answers from your own company documents.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group bg-slate-50">
                <img
                  src={aiBusinessGrowthImage}
                  alt="EB Wealth AI Prompt Engineering & Automation"
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
                    Deterministic Prompt Systems
                  </div>
                  <div className="text-[11px] text-[#52606D] mt-0.5">
                    Repeatable corporate outputs built for real business ROI.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Implementation Focus Areas */}
      <section className="py-20 border-b border-slate-200 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A] mt-1">
              Where We Deploy AI Leverage
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusPillars.map((area, idx) => (
              <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-[#17202A] mb-1.5">{area.title}</h4>
                <p className="text-xs text-[#52606D] leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Time & Cost Savings Simulator */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#EFF6FF]/60 border border-blue-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                    Interactive ROI Calculator
                  </span>
                  <h3 className="text-2xl font-bold text-[#17202A] mt-1">
                    Calculate Your Organization's AI Time Dividend
                  </h3>
                  <p className="text-xs text-[#52606D] mt-1.5">
                    Adjust team size and repetitive administrative hours to see potential annual capacity reclaimed.
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
                      <span>Blended hourly rate:</span>
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

              <div className="lg:col-span-6 bg-white rounded-2xl border border-blue-200 p-6 sm:p-8 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Estimated Commercial Capacity Reclaimed
                </div>

                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB]">
                      ~{weeklyHoursReclaimed} hrs
                    </div>
                    <div className="text-xs text-[#52606D] mt-0.5">
                      Reclaimed Weekly Across Team
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#00A878]">
                      £{annualSavings.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#52606D] mt-0.5">
                      Annual Equivalent Value
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#52606D] mt-4 leading-relaxed">
                  By eliminating low-leverage data gathering and routine emails, your core staff can shift their focus toward high-margin client acquisition and strategic enterprise growth.
                </p>

                <button
                  onClick={onScheduleAudit}
                  className="mt-6 w-full py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Full AI Systems Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Packaged Services Grid */}
      <section id="services-grid" className="py-20 border-b border-slate-200 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Engagement Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A] mt-1">
              Tailored AI Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {AI_GROWTH_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#2563EB] uppercase block mb-1">
                    System Blueprint
                  </span>
                  <h3 className="text-2xl font-bold text-[#17202A] mb-2">{srv.title}</h3>
                  <p className="text-xs text-[#52606D] leading-relaxed mb-6">{srv.description}</p>

                  <div className="p-3.5 bg-[#ECFDF5] rounded-xl border border-[#00A878]/30 text-xs text-[#17202A] mb-6">
                    <span className="font-bold text-[#00A878]">Commercial Result: </span>
                    {srv.metricsImpact}
                  </div>

                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-2">
                      Deliverables:
                    </div>
                    {srv.deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#52606D]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00A878] shrink-0 mt-0.5" />
                        <span className="leading-snug">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <button
                    onClick={onScheduleAudit}
                    className="w-full py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inquire About {srv.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
