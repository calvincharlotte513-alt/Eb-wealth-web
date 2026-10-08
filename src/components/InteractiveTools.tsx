import React, { useState } from 'react';
import { ArrowRight, RefreshCw, BarChart3, HelpCircle, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { PageId } from '../types/navigation';

interface InteractiveToolsProps {
  onExploreProgram: (page: PageId) => void;
}

export const InteractiveTools: React.FC<InteractiveToolsProps> = ({ onExploreProgram }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'diagnostic'>('simulator');

  // UK Investment Simulator State
  const [initialCapital, setInitialCapital] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(400);
  const [annualReturn, setAnnualReturn] = useState<number>(8);
  const [years, setYears] = useState<number>(15);

  // Diagnostic Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Calculation for compound growth
  const calculateCompound = () => {
    const r = annualReturn / 100 / 12;
    const n = years * 12;
    const principalFV = initialCapital * Math.pow(1 + r, n);
    const contributionsFV = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
    const totalFV = Math.round(principalFV + contributionsFV);
    const totalContributed = Math.round(initialCapital + monthlyContribution * n);
    const compoundInterest = Math.max(0, totalFV - totalContributed);

    // Estimated UK Tax Drag in GIA vs ISA (assuming ~20% CGT drag on gains over allowance)
    const estimatedTaxInGIA = Math.round(compoundInterest * 0.20);

    return {
      totalFV,
      totalContributed,
      compoundInterest,
      estimatedTaxInGIA
    };
  };

  const results = calculateCompound();

  const quizQuestions = [
    {
      question: 'What is your current investing experience level?',
      options: [
        { label: 'Complete beginner (I have never invested in stocks, funds or ISAs)', recommendation: 'academy', title: 'EB Wealth Academy (Level 1 Foundations)' },
        { label: 'Intermediate (I invest occasionally, but lack a clear long-term strategy)', recommendation: 'academy', title: 'EB Wealth Academy (Level 3-4 UK Investing & Portfolio Building)' },
        { label: 'Active investor / High earner (I want consistent mentorship and accountability)', recommendation: 'mentorship', title: 'EB Wealth Mentorship & Accountability' },
        { label: 'Business owner / Entrepreneur (I want to integrate AI systems and scale company cash flow)', recommendation: 'ai-growth', title: 'AI Business Growth & Consulting' }
      ]
    },
    {
      question: 'What is your primary financial focus over the next 12 months?',
      options: [
        { label: 'Learning how to invest independently without paying high advisor fees', recommendation: 'academy', title: 'EB Wealth Academy' },
        { label: 'Maximising my UK ISA and SIPP allowances tax-efficiently', recommendation: 'coaching', title: '1-to-1 Wealth Strategy Coaching' },
        { label: 'Getting regular feedback, portfolio logic audits, and weekly discipline', recommendation: 'mentorship', title: 'Growth Mentorship Cohort' },
        { label: 'Freeing up 15+ hours a week in my business using AI automation', recommendation: 'ai-growth', title: 'AI Systems Audit' }
      ]
    },
    {
      question: 'How do you prefer to learn and implement?',
      options: [
        { label: 'Self-paced step-by-step videos and interactive platform simulators', recommendation: 'academy', title: 'EB Wealth Academy' },
        { label: 'Live cohort strategy sessions with peers and accountability check-ins', recommendation: 'mentorship', title: 'EB Wealth Mentorship' },
        { label: 'Private, confidential 1-on-1 strategy sessions directly on my numbers', recommendation: 'coaching', title: '1-to-1 Private Consultation' },
        { label: 'Hands-on done-with-you AI implementation for my commercial operations', recommendation: 'ai-growth', title: 'AI Business Growth Program' }
      ]
    }
  ];

  const handleSelectQuizOption = (optionIndex: number) => {
    const updated = [...quizAnswers, optionIndex];
    setQuizAnswers(updated);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const lastAnswer = quizQuestions[quizQuestions.length - 1].options[optionIndex];
      setQuizResult(lastAnswer.recommendation);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  return (
    <section id="tools" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00A878] mb-2">
            <BarChart3 className="w-4 h-4" />
            <span>Interactive Planning Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17202A] tracking-tight">
            Interactive Calculators & Pathway Profiler
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#52606D] leading-relaxed">
            Test the mathematics of compounding, see the tax advantage of UK ISA shelters, and identify the exact EB Wealth pathway best suited to your stage.
          </p>
        </div>

        {/* Tab Controls: Segmented Button Control */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit mb-10 shadow-xs">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-[#00A878] text-white shadow-xs'
                : 'text-[#52606D] hover:text-[#17202A]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>UK Compound Growth & ISA Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'diagnostic'
                ? 'bg-[#00A878] text-white shadow-xs'
                : 'text-[#52606D] hover:text-[#17202A]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Investor Pathway Finder</span>
          </button>
        </div>

        {/* Tab 1: UK Compound Growth & ISA Tax Advantage Calculator */}
        {activeTab === 'simulator' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#17202A]">
                  Adjust Your Wealth Assumptions
                </h3>
                <p className="text-xs text-[#52606D] mt-1">
                  Model your monthly savings discipline and long-term compounding horizon.
                </p>
              </div>

              {/* Slider 1: Initial Deposit */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#17202A] mb-1.5">
                  <span>Initial Capital:</span>
                  <span className="text-[#00A878]">£{initialCapital.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  className="w-full accent-[#00A878] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>£500</span>
                  <span>£25,000</span>
                  <span>£50,000</span>
                </div>
              </div>

              {/* Slider 2: Monthly Contribution */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#17202A] mb-1.5">
                  <span>Monthly Contribution:</span>
                  <span className="text-[#00A878]">£{monthlyContribution.toLocaleString()} / month</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2500"
                  step="25"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-[#00A878] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>£50/mo</span>
                  <span>£1,000/mo</span>
                  <span>£2,500/mo</span>
                </div>
              </div>

              {/* Slider 3: Expected Annual Return */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#17202A] mb-1.5">
                  <span>Expected Annualised Return:</span>
                  <span className="text-[#2563EB]">{annualReturn}% per year</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full accent-[#2563EB] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>4% (Conservative)</span>
                  <span>8% (Historical Global Index)</span>
                  <span>12% (High Growth)</span>
                </div>
              </div>

              {/* Slider 4: Time Horizon */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#17202A] mb-1.5">
                  <span>Compounding Horizon:</span>
                  <span className="text-[#17202A]">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="35"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-[#17202A] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>3 Years</span>
                  <span>15 Years</span>
                  <span>35 Years</span>
                </div>
              </div>
            </div>

            {/* Right Results Box */}
            <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Projected Portfolio Value
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#17202A] tracking-tight">
                  £{results.totalFV.toLocaleString()}
                </div>
                <p className="text-xs text-[#52606D] mt-1">
                  Based on consistent monthly contributions of £{monthlyContribution} compounded at {annualReturn}% over {years} years.
                </p>
              </div>

              {/* Visual Breakdown Bar */}
              <div>
                <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${Math.min(100, (results.totalContributed / results.totalFV) * 100)}%` }}
                    className="bg-slate-400 transition-all duration-300"
                    title="Your Contributions"
                  />
                  <div
                    style={{ width: `${Math.max(0, (results.compoundInterest / results.totalFV) * 100)}%` }}
                    className="bg-[#00A878] transition-all duration-300"
                    title="Compound Growth"
                  />
                </div>
                <div className="flex justify-between text-xs text-[#52606D] mt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                    Capital Contributed: <strong>£{results.totalContributed.toLocaleString()}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A878] inline-block" />
                    Compound Gain: <strong className="text-[#00A878]">£{results.compoundInterest.toLocaleString()}</strong>
                  </span>
                </div>
              </div>

              {/* UK ISA Tax Shield Advantage Callout */}
              <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#00A878]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A878] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The UK Stocks & Shares ISA Advantage</span>
                </div>
                <p className="text-xs text-[#17202A] leading-relaxed">
                  Inside a UK Stocks & Shares ISA, your <strong>£{results.compoundInterest.toLocaleString()}</strong> in compound growth is <strong>100% tax-free</strong>. Outside an ISA (in an unsheltered General Investment Account), you could lose up to <strong>~£{results.estimatedTaxInGIA.toLocaleString()}</strong> in UK Capital Gains Tax.
                </p>
              </div>

              <button
                onClick={() => onExploreProgram('academy')}
                className="w-full py-3 px-4 bg-[#00A878] hover:bg-[#009267] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Learn How to Build This in EB Academy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Diagnostic / Pathway Quiz */}
        {activeTab === 'diagnostic' && (
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {!quizResult ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00A878]">
                    Question {quizStep + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs text-slate-400">Step {quizStep + 1}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#17202A] mb-6">
                  {quizQuestions[quizStep].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      className="w-full p-4 text-left rounded-xl border border-slate-200 hover:border-[#00A878] hover:bg-[#ECFDF5]/50 transition-all text-xs sm:text-sm font-medium text-[#17202A] flex items-center justify-between group cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#00A878] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#00A878] flex items-center justify-center mx-auto shadow-xs">
                  <Sparkles className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00A878] block mb-1">
                    Your Tailored Recommendation
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17202A]">
                    {quizResult === 'academy' && 'EB Wealth Academy (Foundations & UK Wrappers)'}
                    {quizResult === 'mentorship' && 'Growth Mentorship & Accountability Cohort'}
                    {quizResult === 'coaching' && '1-to-1 Private Strategy Consultation'}
                    {quizResult === 'ai-growth' && 'AI Business Systems & Automation'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52606D] max-w-lg mx-auto mt-2 leading-relaxed">
                    Based on your current experience and immediate goals, starting with this pillar provides the highest return on your time and capital.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => onExploreProgram(quizResult as PageId)}
                    className="py-3 px-6 bg-[#00A878] hover:bg-[#009267] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore Your Recommended Pathway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="py-3 px-5 text-xs font-semibold text-[#52606D] hover:text-[#17202A] flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
