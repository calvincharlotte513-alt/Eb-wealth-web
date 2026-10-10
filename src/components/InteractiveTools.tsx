import React, { useState, useId } from 'react';
import {
  TrendingUp,
  Target,
  Clock,
  ShieldCheck,
  PieChart,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { PageId } from '../types/navigation';
import {
  calculateCompoundInterest,
  calculateSavingsGoal,
  calculateRetirement,
  simulatePortfolioAllocation,
  formatGBP
} from '../utils/financialCalculations';
import { useMarketData } from '../context/MarketDataContext';

interface InteractiveToolsProps {
  onExploreProgram: (page: PageId) => void;
}

type CalculatorTab = 'compound' | 'savingsGoal' | 'retirement' | 'portfolio' | 'profiler';

export const InteractiveTools: React.FC<InteractiveToolsProps> = ({ onExploreProgram }) => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('compound');
  const { indicators } = useMarketData();

  // ----------------------------------------------------
  // 1. COMPOUND INTEREST CALCULATOR STATE
  // ----------------------------------------------------
  const [initialCapital, setInitialCapital] = useState<number>(5000);
  const [regularContribution, setRegularContribution] = useState<number>(350);
  const [contributionFrequency, setContributionFrequency] = useState<'monthly' | 'annually'>('monthly');
  const [annualReturn, setAnnualReturn] = useState<number>(8.0);
  const [years, setYears] = useState<number>(15);
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'annually'>('monthly');
  const [feePercent, setFeePercent] = useState<number>(0.22); // Ongoing fund charges
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const compoundResult = calculateCompoundInterest({
    initialInvestment: initialCapital,
    regularContribution,
    contributionFrequency,
    annualInterestRate: annualReturn,
    durationYears: years,
    compoundingFrequency,
    annualFeePercent: feePercent
  });

  const applyCompoundPreset = (preset: 'starter' | 'isaMax' | 'lumpSum') => {
    if (preset === 'starter') {
      setInitialCapital(1000);
      setRegularContribution(150);
      setAnnualReturn(8);
      setYears(15);
      setFeePercent(0.22);
    } else if (preset === 'isaMax') {
      setInitialCapital(5000);
      setRegularContribution(1666); // £20,000 / 12
      setAnnualReturn(8);
      setYears(20);
      setFeePercent(0.22);
    } else {
      setInitialCapital(25000);
      setRegularContribution(250);
      setAnnualReturn(7.5);
      setYears(25);
      setFeePercent(0.15);
    }
  };

  // ----------------------------------------------------
  // 2. SAVINGS GOAL CALCULATOR STATE
  // ----------------------------------------------------
  const [goalTarget, setGoalTarget] = useState<number>(50000);
  const [goalCurrentSavings, setGoalCurrentSavings] = useState<number>(5000);
  const [goalYears, setGoalYears] = useState<number>(5);
  const [goalReturn, setGoalReturn] = useState<number>(6.5);

  const savingsResult = calculateSavingsGoal({
    targetAmount: goalTarget,
    currentSavings: goalCurrentSavings,
    yearsToGoal: goalYears,
    expectedAnnualReturn: goalReturn
  });

  // ----------------------------------------------------
  // 3. RETIREMENT SIPP CALCULATOR STATE
  // ----------------------------------------------------
  const [currentAge, setCurrentAge] = useState<number>(32);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentPensionPot, setCurrentPensionPot] = useState<number>(20000);
  const [monthlyPensionContribution, setMonthlyPensionContribution] = useState<number>(450);
  const [pensionExpectedReturn, setPensionExpectedReturn] = useState<number>(7.0);

  const retirementResult = calculateRetirement({
    currentAge,
    retirementAge,
    currentPensionPot,
    monthlyPensionContribution,
    expectedAnnualReturn: pensionExpectedReturn,
    safeDrawdownRatePercent: 4.0
  });

  // ----------------------------------------------------
  // 4. PORTFOLIO ASSET ALLOCATION SIMULATOR STATE
  // ----------------------------------------------------
  const [portfolioWeights, setPortfolioWeights] = useState<Record<string, number>>({
    globalEquities: 65,
    ukEquities: 15,
    bondsGilts: 10,
    cashEquivalents: 5,
    goldCommodities: 5
  });

  const portfolioResult = simulatePortfolioAllocation(portfolioWeights);

  const applyPortfolioPreset = (preset: 'allWorld' | 'growth' | 'classic' | 'defensive') => {
    if (preset === 'allWorld') {
      setPortfolioWeights({ globalEquities: 100, ukEquities: 0, bondsGilts: 0, cashEquivalents: 0, goldCommodities: 0 });
    } else if (preset === 'growth') {
      setPortfolioWeights({ globalEquities: 70, ukEquities: 15, bondsGilts: 10, cashEquivalents: 5, goldCommodities: 0 });
    } else if (preset === 'classic') {
      setPortfolioWeights({ globalEquities: 50, ukEquities: 10, bondsGilts: 30, cashEquivalents: 5, goldCommodities: 5 });
    } else {
      setPortfolioWeights({ globalEquities: 30, ukEquities: 10, bondsGilts: 35, cashEquivalents: 15, goldCommodities: 10 });
    }
  };

  // ----------------------------------------------------
  // 5. INVESTOR PROFILER QUIZ STATE
  // ----------------------------------------------------
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const quizQuestions = [
    {
      question: 'What is your current investment experience level?',
      options: [
        { label: 'Complete beginner — I have never bought an index fund, ETF, or opened an ISA.', rec: 'academy', title: 'Level 1: Foundations' },
        { label: 'Intermediate — I invest occasionally, but without a structured rebalancing framework.', rec: 'academy', title: 'Level 3-4: UK Tax Shelters & Portfolio Design' },
        { label: 'Active professional / High earner — Seeking cohort accountability and peer reviews.', rec: 'mentorship', title: 'Growth Mentorship Cohort' },
        { label: 'Private capital owner — Seeking private 1-on-1 strategic portfolio review.', rec: 'coaching', title: '1-to-1 Private Strategy Consultation' }
      ]
    },
    {
      question: 'What is your highest priority for the upcoming tax year?',
      options: [
        { label: 'Learning how to build a diversified portfolio independently without high advisor fees.', rec: 'academy', title: 'EB Wealth Academy' },
        { label: 'Maximising my £20,000 Stocks & Shares ISA and SIPP pension tax relief.', rec: 'coaching', title: '1-to-1 Tax Architecture Coaching' },
        { label: 'Joining regular bi-weekly strategy sessions and macro market briefings.', rec: 'mentorship', title: 'Growth Mentorship' },
        { label: 'Running quantitative compound interest models and platform fee audits.', rec: 'compound', title: 'Compound Interest Calculator' }
      ]
    },
    {
      question: 'Which learning format best fits your schedule?',
      options: [
        { label: 'Self-paced step-by-step video modules with checklists and interactive walkthroughs.', rec: 'academy', title: 'EB Wealth Academy' },
        { label: 'Live cohort strategy sessions with peers, direct feedback, and accountability.', rec: 'mentorship', title: 'EB Wealth Mentorship' },
        { label: 'Private, confidential 1-on-1 advisory session focused directly on my personal plan.', rec: 'coaching', title: '1-to-1 Private Consultation' }
      ]
    }
  ];

  const handleSelectQuizOption = (idx: number) => {
    const updated = [...quizAnswers, idx];
    setQuizAnswers(updated);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const finalOption = quizQuestions[quizQuestions.length - 1].options[idx];
      setQuizResult(finalOption.rec);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  return (
    <section id="tools" className="py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#9E8040] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A869]" />
            <span>Quantitative Investment Models & Calculators</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight">
            Interactive Capital & Compounding Suite
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Run realistic mathematical scenarios on your long-term wealth horizon, model UK tax shelter savings, evaluate asset allocation weights, and calibrate your optimal curriculum path.
          </p>
        </div>

        {/* 5-Tab Segmented Selector Control (Goldman Sachs Style) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#C5A869]/35 rounded-sm overflow-x-auto no-scrollbar mb-10 shadow-2xs">
          <button
            onClick={() => setActiveTab('compound')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'compound'
                ? 'bg-[#0D3B2E] text-[#C5A869] shadow-xs'
                : 'text-stone-600 hover:text-[#0D3B2E]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Compound Interest & ISA</span>
          </button>

          <button
            onClick={() => setActiveTab('savingsGoal')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'savingsGoal'
                ? 'bg-[#0D3B2E] text-[#C5A869] shadow-xs'
                : 'text-stone-600 hover:text-[#0D3B2E]'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Savings Target Goal</span>
          </button>

          <button
            onClick={() => setActiveTab('retirement')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'retirement'
                ? 'bg-[#0D3B2E] text-[#C5A869] shadow-xs'
                : 'text-stone-600 hover:text-[#0D3B2E]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>UK SIPP & Retirement Pot</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'portfolio'
                ? 'bg-[#0D3B2E] text-[#C5A869] shadow-xs'
                : 'text-stone-600 hover:text-[#0D3B2E]'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Asset Allocation Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('profiler')}
            className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profiler'
                ? 'bg-[#0D3B2E] text-[#C5A869] shadow-xs'
                : 'text-stone-600 hover:text-[#0D3B2E]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Pathway Profiler</span>
          </button>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* TAB 1: COMPOUND INTEREST & UK ISA TAX SHIELD CALCULATOR */}
        {/* ----------------------------------------------------------- */}
        {activeTab === 'compound' && (
          <div className="bg-white border border-[#C5A869]/35 rounded-sm p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                  Compound Interest & ISA Tax Drag Model
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Model multi-decade compounding velocity and see the exact capital saved through UK Stocks & Shares ISA wrappers.
                </p>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-stone-400">Presets:</span>
                <button
                  onClick={() => applyCompoundPreset('starter')}
                  className="px-2.5 py-1 text-[11px] font-mono bg-[#FAF9F5] border border-stone-300 hover:border-[#0D3B2E] text-[#0D3B2E] rounded-xs cursor-pointer transition-colors"
                >
                  Starter (£150/mo)
                </button>
                <button
                  onClick={() => applyCompoundPreset('isaMax')}
                  className="px-2.5 py-1 text-[11px] font-mono bg-[#FAF9F5] border border-stone-300 hover:border-[#0D3B2E] text-[#0D3B2E] rounded-xs cursor-pointer transition-colors"
                >
                  Full ISA (£20k/yr)
                </button>
                <button
                  onClick={() => applyCompoundPreset('lumpSum')}
                  className="px-2.5 py-1 text-[11px] font-mono bg-[#FAF9F5] border border-stone-300 hover:border-[#0D3B2E] text-[#0D3B2E] rounded-xs cursor-pointer transition-colors"
                >
                  Lump Sum (£25k)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-6 space-y-5">
                {/* Initial Capital */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                    <span>Initial Lump Sum Deposit:</span>
                    <span className="text-[#0D3B2E] font-bold tabular-nums">{formatGBP(initialCapital)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="500"
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Number(e.target.value))}
                    className="w-full accent-[#0D3B2E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-0.5">
                    <span>£0</span>
                    <span>£50,000</span>
                    <span>£100,000</span>
                  </div>
                </div>

                {/* Regular Contribution */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                    <span>Regular Contribution:</span>
                    <span className="text-[#0D3B2E] font-bold tabular-nums">{formatGBP(regularContribution)} / {contributionFrequency === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="5000"
                    step="25"
                    value={regularContribution}
                    onChange={(e) => setRegularContribution(Number(e.target.value))}
                    className="w-full accent-[#0D3B2E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-0.5">
                    <span>£25</span>
                    <span>£2,500</span>
                    <span>£5,000</span>
                  </div>
                </div>

                {/* Contribution & Compounding Frequencies */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-stone-500 block mb-1">
                      Contribution Frequency:
                    </label>
                    <select
                      value={contributionFrequency}
                      onChange={(e) => setContributionFrequency(e.target.value as 'monthly' | 'annually')}
                      className="w-full px-3 py-2 text-xs font-bold bg-white border border-stone-300 rounded-xs focus:outline-none focus:border-[#0D3B2E]"
                    >
                      <option value="monthly">Monthly Deposit</option>
                      <option value="annually">Annual Deposit</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-stone-500 block mb-1">
                      Compounding Frequency:
                    </label>
                    <select
                      value={compoundingFrequency}
                      onChange={(e) => setCompoundingFrequency(e.target.value as 'monthly' | 'annually')}
                      className="w-full px-3 py-2 text-xs font-bold bg-white border border-stone-300 rounded-xs focus:outline-none focus:border-[#0D3B2E]"
                    >
                      <option value="monthly">Monthly Compounding</option>
                      <option value="annually">Annual Compounding</option>
                    </select>
                  </div>
                </div>

                {/* Expected Return Rate */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                    <span>Expected Nominal Annual Return:</span>
                    <span className="text-[#9E8040] font-bold tabular-nums">{annualReturn.toFixed(1)}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="14"
                    step="0.5"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="w-full accent-[#9E8040] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-0.5">
                    <span>2% (Cash)</span>
                    <span>8% (Historical Global Index)</span>
                    <span>14% (Growth)</span>
                  </div>
                </div>

                {/* Holding Horizon & Fund Ongoing Charges */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1 font-mono">
                      <span>Timeframe:</span>
                      <span className="text-[#0D3B2E] font-bold">{years} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      step="1"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full accent-[#0D3B2E] cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1 font-mono">
                      <span>Fund Fee (OCF):</span>
                      <span className="text-stone-700 font-bold">{feePercent.toFixed(2)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="2.0"
                      step="0.05"
                      value={feePercent}
                      onChange={(e) => setFeePercent(Number(e.target.value))}
                      className="w-full accent-stone-700 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Live Output Metrics */}
              <div className="lg:col-span-6 bg-[#FAF9F5] border border-[#C5A869]/30 rounded-sm p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040] block mb-1">
                    Terminal Tax-Free Portfolio Value
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight tabular-nums">
                    {formatGBP(compoundResult.finalBalance)}
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Total accumulated capital in a 100% tax-sheltered UK Stocks & Shares ISA.
                  </p>
                </div>

                {/* Visual Proportion Bar */}
                <div>
                  <div className="h-4 w-full bg-stone-200 rounded-xs overflow-hidden flex">
                    <div
                      style={{
                        width: `${Math.min(100, (compoundResult.totalContributions / compoundResult.finalBalance) * 100)}%`
                      }}
                      className="bg-[#165342] transition-all duration-300"
                      title="Total Capital Contributed"
                    />
                    <div
                      style={{
                        width: `${Math.max(0, (compoundResult.totalGrowth / compoundResult.finalBalance) * 100)}%`
                      }}
                      className="bg-[#C5A869] transition-all duration-300"
                      title="Net Compounding Growth"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[#2B3632] mt-2 font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#165342] inline-block" />
                      Contributions: <strong>{formatGBP(compoundResult.totalContributions)}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#C5A869] inline-block" />
                      Compound Gain: <strong className="text-[#9E8040]">{formatGBP(compoundResult.totalGrowth)}</strong>
                    </span>
                  </div>
                </div>

                {/* UK ISA Tax Shield Value Callout */}
                <div className="p-4 rounded-sm bg-white border border-[#C5A869]/40 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0D3B2E]">
                    <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
                    <span>HMRC Tax Drag Shielding</span>
                  </div>
                  <p className="text-xs text-[#2B3632] leading-relaxed">
                    By holding these assets inside an ISA rather than a taxed account, you avoid approximately{' '}
                    <strong className="text-[#0D3B2E] font-bold">{formatGBP(compoundResult.estimatedTaxSavedInISA)}</strong> in UK capital gains and dividend taxes.
                  </p>
                </div>

                {/* Expandable Year-by-Year Schedule */}
                <div>
                  <button
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span>{showSchedule ? 'Hide' : 'View'} Annual Schedule Table ({years} Years)</span>
                    {showSchedule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showSchedule && (
                    <div className="mt-3 max-h-60 overflow-y-auto border border-stone-200 rounded-xs bg-white text-xs">
                      <table className="w-full text-left font-mono">
                        <thead className="bg-[#FAF9F5] border-b border-stone-200 text-stone-600 sticky top-0">
                          <tr>
                            <th className="p-2">Year</th>
                            <th className="p-2">Deposits</th>
                            <th className="p-2">Growth</th>
                            <th className="p-2">Total Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {compoundResult.schedule.map((row) => (
                            <tr key={row.year} className="hover:bg-stone-50">
                              <td className="p-2 font-bold text-[#0D3B2E]">{row.year}</td>
                              <td className="p-2 text-stone-600">{formatGBP(row.contributions)}</td>
                              <td className="p-2 text-[#9E8040]">{formatGBP(row.interestEarned)}</td>
                              <td className="p-2 font-bold text-[#0D3B2E]">{formatGBP(row.totalBalance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 2: SAVINGS GOAL CALCULATOR */}
        {/* ----------------------------------------------------------- */}
        {activeTab === 'savingsGoal' && (
          <div className="bg-white border border-[#C5A869]/35 rounded-sm p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                  Target Capital Goal Calculator
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Determine the exact monthly deposit needed to reach a specific financial target by a target date.
                </p>
              </div>

              {/* Target Amount */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                  <span>Target Amount:</span>
                  <span className="text-[#0D3B2E] font-bold tabular-nums">{formatGBP(goalTarget)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(Number(e.target.value))}
                  className="w-full accent-[#0D3B2E] cursor-pointer"
                />
              </div>

              {/* Current Savings */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                  <span>Current Starting Savings:</span>
                  <span className="text-stone-700 font-bold tabular-nums">{formatGBP(goalCurrentSavings)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={goalTarget}
                  step="1000"
                  value={goalCurrentSavings}
                  onChange={(e) => setGoalCurrentSavings(Number(e.target.value))}
                  className="w-full accent-stone-700 cursor-pointer"
                />
              </div>

              {/* Years to Goal */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                  <span>Timeframe to Goal:</span>
                  <span className="text-[#0D3B2E] font-bold">{goalYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={goalYears}
                  onChange={(e) => setGoalYears(Number(e.target.value))}
                  className="w-full accent-[#0D3B2E] cursor-pointer"
                />
              </div>

              {/* Assumed Return */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1.5 font-mono">
                  <span>Assumed Annual Return:</span>
                  <span className="text-[#9E8040] font-bold">{goalReturn.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={goalReturn}
                  onChange={(e) => setGoalReturn(Number(e.target.value))}
                  className="w-full accent-[#9E8040] cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-6 bg-[#FAF9F5] border border-[#C5A869]/30 rounded-sm p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040] block mb-1">
                  Required Monthly Contribution
                </span>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight tabular-nums">
                  {formatGBP(savingsResult.requiredMonthlyDeposit)}<span className="text-sm font-sans font-normal text-stone-500"> / mo</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Disciplined monthly investment to reach {formatGBP(goalTarget)} in {goalYears} years.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-sm border border-stone-200 text-xs font-mono">
                <div>
                  <div className="text-stone-500">Total Capital Contributed:</div>
                  <div className="font-bold text-[#0D3B2E] text-sm mt-0.5">{formatGBP(savingsResult.totalDeposited)}</div>
                </div>
                <div>
                  <div className="text-stone-500">Compound Growth Added:</div>
                  <div className="font-bold text-[#9E8040] text-sm mt-0.5">{formatGBP(savingsResult.totalGrowth)}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-500">Initial Progress toward Goal:</span>
                  <span className="font-bold text-[#0D3B2E]">{savingsResult.progressPercent}%</span>
                </div>
                <div className="h-3 w-full bg-stone-200 rounded-xs overflow-hidden">
                  <div
                    style={{ width: `${savingsResult.progressPercent}%` }}
                    className="h-full bg-[#165342]"
                  />
                </div>
              </div>

              <button
                onClick={() => onExploreProgram('academy')}
                className="w-full py-3.5 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A869]/40"
              >
                <span>Automate This Strategy with EB Academy</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 3: RETIREMENT SIPP POT CALCULATOR */}
        {/* ----------------------------------------------------------- */}
        {activeTab === 'retirement' && (
          <div className="bg-white border border-[#C5A869]/35 rounded-sm p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                  UK SIPP & Retirement Pot Forecaster
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Calculate projected terminal pension capital, tax relief leverage, and safe withdrawal income.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-semibold text-stone-700 block mb-1">
                    Current Age: <strong className="text-[#0D3B2E]">{currentAge}</strong>
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full accent-[#0D3B2E] cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-semibold text-stone-700 block mb-1">
                    Target Retirement: <strong className="text-[#0D3B2E]">{retirementAge}</strong>
                  </label>
                  <input
                    type="range"
                    min={currentAge + 1}
                    max="75"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full accent-[#0D3B2E] cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1 font-mono">
                  <span>Current Existing Pension Pot:</span>
                  <span className="text-[#0D3B2E] font-bold">{formatGBP(currentPensionPot)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="250000"
                  step="5000"
                  value={currentPensionPot}
                  onChange={(e) => setCurrentPensionPot(Number(e.target.value))}
                  className="w-full accent-[#0D3B2E] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1 font-mono">
                  <span>Monthly Pension Contribution (incl. Tax Relief):</span>
                  <span className="text-[#0D3B2E] font-bold">{formatGBP(monthlyPensionContribution)} / mo</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={monthlyPensionContribution}
                  onChange={(e) => setMonthlyPensionContribution(Number(e.target.value))}
                  className="w-full accent-[#0D3B2E] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1 font-mono">
                  <span>Expected Annual Growth:</span>
                  <span className="text-[#9E8040] font-bold">{pensionExpectedReturn.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={pensionExpectedReturn}
                  onChange={(e) => setPensionExpectedReturn(Number(e.target.value))}
                  className="w-full accent-[#9E8040] cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-6 bg-[#FAF9F5] border border-[#C5A869]/30 rounded-sm p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040] block mb-1">
                  Projected Terminal Pension Pot at Age {retirementAge}
                </span>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3B2E] tracking-tight tabular-nums">
                  {formatGBP(retirementResult.projectedPotAtRetirement)}
                </div>
                <p className="text-xs text-stone-600 mt-1 font-mono">
                  Compounding duration: {retirementResult.yearsToRetirement} years.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-sm border border-stone-200 text-xs font-mono">
                <div>
                  <div className="text-stone-500">25% UK Tax-Free Lump Sum:</div>
                  <div className="font-bold text-[#0D3B2E] text-sm mt-0.5">{formatGBP(retirementResult.taxFreeLumpSum)}</div>
                </div>
                <div>
                  <div className="text-stone-500">Estimated Annual Drawdown (4%):</div>
                  <div className="font-bold text-[#9E8040] text-sm mt-0.5">{formatGBP(retirementResult.estimatedAnnualRetirementIncome)}</div>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-[#C5A869]/30 rounded-sm text-xs text-stone-700">
                <strong className="text-[#0D3B2E]">Estimated Monthly Retirement Cash Flow:</strong>{' '}
                <span className="font-mono font-bold text-[#9E8040]">{formatGBP(retirementResult.estimatedMonthlyRetirementIncome)} / month</span>{' '}
                plus state pension entitlements.
              </div>

              <button
                onClick={() => onExploreProgram('coaching')}
                className="w-full py-3.5 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A869]/40"
              >
                <span>Book 1-on-1 SIPP Architecture Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 4: PORTFOLIO ALLOCATION SIMULATOR */}
        {/* ----------------------------------------------------------- */}
        {activeTab === 'portfolio' && (
          <div className="bg-white border border-[#C5A869]/35 rounded-sm p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                  Asset Allocation & Risk Simulator
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Adjust asset weights across global equities, UK dividends, sovereign gilts, cash, and gold to simulate risk and expected returns.
                </p>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-stone-400">Presets:</span>
                <button
                  onClick={() => applyPortfolioPreset('allWorld')}
                  className="px-2.5 py-1 text-[11px] font-mono bg-[#FAF9F5] border border-stone-300 hover:border-[#0D3B2E] text-[#0D3B2E] rounded-xs cursor-pointer"
                >
                  100% Global
                </button>
                <button
                  onClick={() => applyPortfolioPreset('growth')}
                  className="px-2.5 py-1 text-[11px] font-mono bg-[#FAF9F5] border border-stone-300 hover:border-[#0D3B2E] text-[#0D3B2E] rounded-xs cursor-pointer"
                >
                  85/15 Growth
                </button>
                <button
                  onClick={() => applyPortfolioPreset('classic')}
                  className="px-2.5 py-1 text-[11px] font-mono bg-[#FAF9F5] border border-stone-300 hover:border-[#0D3B2E] text-[#0D3B2E] rounded-xs cursor-pointer"
                >
                  60/40 Classic
                </button>
                <button
                  onClick={() => applyPortfolioPreset('defensive')}
                  className="px-2.5 py-1 text-[11px] font-mono bg-[#FAF9F5] border border-stone-300 hover:border-[#0D3B2E] text-[#0D3B2E] rounded-xs cursor-pointer"
                >
                  Defensive
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders */}
              <div className="lg:col-span-6 space-y-4">
                {portfolioResult.weights.map((asset) => (
                  <div key={asset.key}>
                    <div className="flex justify-between text-xs font-semibold text-[#111816] mb-1 font-mono">
                      <span>{asset.name}:</span>
                      <span className="font-bold text-[#0D3B2E]">{portfolioWeights[asset.key] || 0}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={portfolioWeights[asset.key] || 0}
                      onChange={(e) => {
                        setPortfolioWeights({
                          ...portfolioWeights,
                          [asset.key]: Number(e.target.value)
                        });
                      }}
                      className="w-full accent-[#0D3B2E] cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* Results & Risk Rating */}
              <div className="lg:col-span-6 bg-[#FAF9F5] border border-[#C5A869]/30 rounded-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-sm border border-stone-200">
                    <div className="text-[10px] font-mono uppercase text-stone-500">Expected Annual Return</div>
                    <div className="font-serif text-2xl font-bold text-[#0D3B2E] mt-0.5">{portfolioResult.weightedReturn}%</div>
                  </div>
                  <div className="p-4 bg-white rounded-sm border border-stone-200">
                    <div className="text-[10px] font-mono uppercase text-stone-500">Estimated Volatility</div>
                    <div className="font-serif text-2xl font-bold text-[#9E8040] mt-0.5">±{portfolioResult.estimatedVolatility}%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white rounded-sm border border-stone-200 text-xs">
                  <span className="font-mono text-stone-600">Risk Profile Classification:</span>
                  <span className="font-mono font-bold text-[#0D3B2E] uppercase px-2 py-0.5 bg-[#FAF5E8] border border-[#C5A869]/30 rounded-xs">
                    {portfolioResult.riskRating}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold text-stone-700 mb-2">Normalized Asset Mix:</div>
                  <div className="h-4 w-full rounded-xs overflow-hidden flex bg-stone-200">
                    {portfolioResult.weights.map((item) => (
                      <div
                        key={item.key}
                        style={{ width: `${item.weight}%`, backgroundColor: item.color }}
                        className="h-full transition-all duration-200"
                        title={`${item.name}: ${item.weight}%`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 text-[11px] font-mono">
                    {portfolioResult.weights.map((item) => (
                      <div key={item.key} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="truncate text-stone-600">{item.name.split('(')[0]}: <strong>{item.weight}%</strong></span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-sm border border-[#C5A869]/30 text-xs text-stone-700 font-mono">
                  10-Year Projected Capital Multiple: <strong className="text-[#0D3B2E] font-bold">{portfolioResult.projected10YearMultiple}x initial capital</strong>
                </div>

                <button
                  onClick={() => onExploreProgram('academy')}
                  className="w-full py-3 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A869]/40"
                >
                  <span>Study Level 4: Portfolio Construction</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 5: INVESTOR PATHWAY PROFILER */}
        {/* ----------------------------------------------------------- */}
        {activeTab === 'profiler' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#C5A869]/35 rounded-sm p-6 sm:p-10 shadow-sm">
            {!quizResult ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040]">
                    Question {quizStep + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs font-mono text-stone-400">Step {quizStep + 1}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E] mb-6">
                  {quizQuestions[quizStep].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      className="w-full p-4 text-left rounded-sm border border-stone-200 hover:border-[#C5A869] hover:bg-[#FAF5E8]/40 transition-all text-xs sm:text-sm font-medium text-[#111816] flex items-center justify-between group cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#0D3B2E] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-6">
                <div className="w-14 h-14 rounded-sm bg-[#FAF5E8] border border-[#C5A869]/40 text-[#0D3B2E] flex items-center justify-center mx-auto shadow-2xs">
                  <Sparkles className="w-7 h-7 text-[#9E8040]" />
                </div>

                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E8040] block mb-1">
                    Your Calibrated Recommendation
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3B2E]">
                    {quizResult === 'academy' && 'EB Wealth Academy (Foundations & UK Tax Wrappers)'}
                    {quizResult === 'mentorship' && 'Growth Mentorship Cohort & Masterclasses'}
                    {quizResult === 'coaching' && '1-to-1 Private Strategy Consultation'}
                    {quizResult === 'compound' && 'Compound Interest & ISA Model'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mt-2 leading-relaxed">
                    Based on your inputs, starting with this pillar gives you the highest return on your study time and capital.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      if (quizResult === 'compound') {
                        setActiveTab('compound');
                      } else {
                        onExploreProgram(quizResult as PageId);
                      }
                    }}
                    className="py-3.5 px-6 bg-[#0D3B2E] hover:bg-[#07251C] text-white font-semibold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer border border-[#C5A869]/40"
                  >
                    <span>Proceed to Recommendation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="py-3 px-5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#0D3B2E] flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Assessment</span>
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
