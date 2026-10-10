/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EB Wealth Financial Calculation Engine
 * Rigorous, pure mathematical functions for UK investment education,
 * compound growth, savings goals, retirement projections, and portfolio asset allocation.
 */

export interface CompoundInterestInputs {
  initialInvestment: number;
  regularContribution: number;
  contributionFrequency: 'monthly' | 'annually';
  annualInterestRate: number; // in percent (e.g. 7.5 for 7.5%)
  durationYears: number;
  compoundingFrequency: 'monthly' | 'annually';
  annualFeePercent?: number; // ongoing fund charges e.g. 0.22%
}

export interface YearByYearEntry {
  year: number;
  contributions: number;
  interestEarned: number;
  totalBalance: number;
  totalWithTaxDrag: number; // estimated taxed GIA balance
}

export interface CompoundInterestResult {
  finalBalance: number;
  totalContributions: number;
  totalGrowth: number;
  totalFeeDragCost: number;
  estimatedTaxSavedInISA: number;
  schedule: YearByYearEntry[];
}

/**
 * Calculates compound interest with contributions, compounding frequency, and fee drag.
 */
export function calculateCompoundInterest(inputs: CompoundInterestInputs): CompoundInterestResult {
  const initial = Math.max(0, Number(inputs.initialInvestment) || 0);
  const contribution = Math.max(0, Number(inputs.regularContribution) || 0);
  const ratePct = Math.max(0, Number(inputs.annualInterestRate) || 0);
  const years = Math.max(1, Math.min(60, Math.round(Number(inputs.durationYears) || 1)));
  const feePct = Math.max(0, Number(inputs.annualFeePercent) || 0);

  const netAnnualRate = Math.max(0, (ratePct - feePct) / 100);
  const grossAnnualRate = ratePct / 100;
  // Estimated UK Dividend & CGT drag outside of ISA (~20% on growth)
  const taxedAnnualRate = Math.max(0, (ratePct * 0.8 - feePct) / 100);

  const isMonthlyContribution = inputs.contributionFrequency === 'monthly';
  const isMonthlyCompounding = inputs.compoundingFrequency === 'monthly';

  let currentBalance = initial;
  let currentTaxedBalance = initial;
  let currentGrossBalance = initial;
  let cumulativeContributions = initial;

  const schedule: YearByYearEntry[] = [];

  for (let year = 1; year <= years; year++) {
    const monthsInYear = 12;
    const monthlyRate = isMonthlyCompounding ? Math.pow(1 + netAnnualRate, 1 / 12) - 1 : netAnnualRate / 12;
    const monthlyTaxedRate = isMonthlyCompounding ? Math.pow(1 + taxedAnnualRate, 1 / 12) - 1 : taxedAnnualRate / 12;
    const monthlyGrossRate = isMonthlyCompounding ? Math.pow(1 + grossAnnualRate, 1 / 12) - 1 : grossAnnualRate / 12;

    if (isMonthlyContribution) {
      for (let m = 0; m < monthsInYear; m++) {
        currentBalance = (currentBalance + contribution) * (1 + monthlyRate);
        currentTaxedBalance = (currentTaxedBalance + contribution) * (1 + monthlyTaxedRate);
        currentGrossBalance = (currentGrossBalance + contribution) * (1 + monthlyGrossRate);
        cumulativeContributions += contribution;
      }
    } else {
      currentBalance = (currentBalance + contribution) * (1 + netAnnualRate);
      currentTaxedBalance = (currentTaxedBalance + contribution) * (1 + taxedAnnualRate);
      currentGrossBalance = (currentGrossBalance + contribution) * (1 + grossAnnualRate);
      cumulativeContributions += contribution;
    }

    schedule.push({
      year,
      contributions: Math.round(cumulativeContributions),
      interestEarned: Math.max(0, Math.round(currentBalance - cumulativeContributions)),
      totalBalance: Math.round(currentBalance),
      totalWithTaxDrag: Math.round(currentTaxedBalance)
    });
  }

  const finalBalance = Math.round(currentBalance);
  const totalContributions = Math.round(cumulativeContributions);
  const totalGrowth = Math.max(0, finalBalance - totalContributions);
  const totalFeeDragCost = Math.max(0, Math.round(currentGrossBalance - currentBalance));
  const estimatedTaxSavedInISA = Math.max(0, Math.round(finalBalance - currentTaxedBalance));

  return {
    finalBalance,
    totalContributions,
    totalGrowth,
    totalFeeDragCost,
    estimatedTaxSavedInISA,
    schedule
  };
}

/**
 * Calculates monthly savings contribution needed to achieve a target capital goal.
 */
export interface SavingsGoalInputs {
  targetAmount: number;
  currentSavings: number;
  yearsToGoal: number;
  expectedAnnualReturn: number; // in percent
}

export interface SavingsGoalResult {
  requiredMonthlyDeposit: number;
  totalDeposited: number;
  totalGrowth: number;
  progressPercent: number;
}

export function calculateSavingsGoal(inputs: SavingsGoalInputs): SavingsGoalResult {
  const target = Math.max(1, Number(inputs.targetAmount) || 0);
  const current = Math.max(0, Math.min(target, Number(inputs.currentSavings) || 0));
  const years = Math.max(1, Math.min(50, Math.round(Number(inputs.yearsToGoal) || 1)));
  const ratePct = Math.max(0, Number(inputs.expectedAnnualReturn) || 0);

  const months = years * 12;
  const r = ratePct > 0 ? (ratePct / 100) / 12 : 0;

  // Future value of existing savings: current * (1 + r)^months
  const fvCurrent = r > 0 ? current * Math.pow(1 + r, months) : current;
  const remainingTarget = Math.max(0, target - fvCurrent);

  let requiredMonthly = 0;
  if (remainingTarget > 0) {
    if (r > 0) {
      // Annuity formula: PMT = FV * r / ((1 + r)^n - 1)
      requiredMonthly = (remainingTarget * r) / (Math.pow(1 + r, months) - 1);
    } else {
      requiredMonthly = remainingTarget / months;
    }
  }

  const roundedMonthly = Math.ceil(requiredMonthly);
  const totalDeposited = Math.round(current + roundedMonthly * months);
  const totalGrowth = Math.max(0, Math.round(target - totalDeposited));
  const progressPercent = Math.min(100, Math.round((current / target) * 100));

  return {
    requiredMonthlyDeposit: roundedMonthly,
    totalDeposited,
    totalGrowth,
    progressPercent
  };
}

/**
 * Calculates UK Retirement SIPP Pension Pot & Safe Drawdown Projections.
 */
export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentPensionPot: number;
  monthlyPensionContribution: number;
  expectedAnnualReturn: number; // in percent
  safeDrawdownRatePercent?: number; // e.g. 4% safe withdrawal rate
}

export interface RetirementResult {
  yearsToRetirement: number;
  projectedPotAtRetirement: number;
  taxFreeLumpSum: number; // 25% tax-free in UK (up to statutory cap)
  estimatedAnnualRetirementIncome: number;
  estimatedMonthlyRetirementIncome: number;
  totalContributions: number;
  totalGrowth: number;
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const currentAge = Math.max(18, Math.min(75, Math.round(Number(inputs.currentAge) || 30)));
  const retirementAge = Math.max(currentAge + 1, Math.min(80, Math.round(Number(inputs.retirementAge) || 65)));
  const currentPot = Math.max(0, Number(inputs.currentPensionPot) || 0);
  const monthlyContribution = Math.max(0, Number(inputs.monthlyPensionContribution) || 0);
  const ratePct = Math.max(0, Number(inputs.expectedAnnualReturn) || 0);
  const drawdownRate = Math.max(2, Math.min(6, Number(inputs.safeDrawdownRatePercent) || 4)) / 100;

  const yearsToRetirement = retirementAge - currentAge;

  const compResult = calculateCompoundInterest({
    initialInvestment: currentPot,
    regularContribution: monthlyContribution,
    contributionFrequency: 'monthly',
    annualInterestRate: ratePct,
    durationYears: yearsToRetirement,
    compoundingFrequency: 'monthly',
    annualFeePercent: 0.25 // standard SIPP platform + index fund OCF
  });

  const projectedPot = compResult.finalBalance;
  // UK 25% tax-free lump sum allowance (statutory cap of £268,275)
  const taxFreeLumpSum = Math.min(268275, Math.round(projectedPot * 0.25));
  const remainingPot = projectedPot - taxFreeLumpSum;
  const estimatedAnnualIncome = Math.round(remainingPot * drawdownRate);
  const estimatedMonthlyIncome = Math.round(estimatedAnnualIncome / 12);

  return {
    yearsToRetirement,
    projectedPotAtRetirement: projectedPot,
    taxFreeLumpSum,
    estimatedAnnualRetirementIncome: estimatedAnnualIncome,
    estimatedMonthlyRetirementIncome: estimatedMonthlyIncome,
    totalContributions: compResult.totalContributions,
    totalGrowth: compResult.totalGrowth
  };
}

/**
 * Portfolio Asset Allocation Simulator
 */
export interface AssetClassWeight {
  key: string;
  name: string;
  weight: number; // percent e.g. 60
  expectedReturn: number; // historical nominal return e.g. 8.2%
  volatility: number; // annual std dev e.g. 15.5%
  dividendYield: number; // e.g. 2.1%
  category: 'Equities' | 'Fixed Income' | 'Real Assets' | 'Cash';
}

export interface PortfolioSimulationResult {
  weightedReturn: number;
  weightedYield: number;
  estimatedVolatility: number;
  riskRating: 'Conservative' | 'Balanced' | 'Growth' | 'High Growth';
  projected10YearMultiple: number;
  weights: { key: string; name: string; weight: number; color: string }[];
}

export function simulatePortfolioAllocation(weights: Record<string, number>): PortfolioSimulationResult {
  const assetCatalog: Record<string, AssetClassWeight> = {
    globalEquities: {
      key: 'globalEquities',
      name: 'Global All-World Index (e.g. VWRL / VWRP)',
      weight: 0,
      expectedReturn: 8.5,
      volatility: 15.2,
      dividendYield: 2.1,
      category: 'Equities'
    },
    ukEquities: {
      key: 'ukEquities',
      name: 'UK Large Cap Dividend (FTSE 100 / ISF)',
      weight: 0,
      expectedReturn: 7.2,
      volatility: 14.1,
      dividendYield: 3.8,
      category: 'Equities'
    },
    bondsGilts: {
      key: 'bondsGilts',
      name: 'UK Sovereign Gilts (10Y Benchmark)',
      weight: 0,
      expectedReturn: 4.2,
      volatility: 7.5,
      dividendYield: 4.1,
      category: 'Fixed Income'
    },
    cashEquivalents: {
      key: 'cashEquivalents',
      name: 'Money Market / Cash Buffer (BoE Rate)',
      weight: 0,
      expectedReturn: 4.5,
      volatility: 0.8,
      dividendYield: 4.5,
      category: 'Cash'
    },
    goldCommodities: {
      key: 'goldCommodities',
      name: 'Physical Gold / Real Assets (SGLN)',
      weight: 0,
      expectedReturn: 6.0,
      volatility: 13.0,
      dividendYield: 0.0,
      category: 'Real Assets'
    }
  };

  // Normalize weights so they sum to 100
  let totalRaw = 0;
  for (const k of Object.keys(assetCatalog)) {
    totalRaw += Math.max(0, Number(weights[k]) || 0);
  }

  const factor = totalRaw > 0 ? 100 / totalRaw : 1;
  let weightedReturn = 0;
  let weightedYield = 0;
  let weightedVol = 0;

  const weightsList = [
    { key: 'globalEquities', name: 'Global Index Equities', weight: 0, color: '#0D3B2E' },
    { key: 'ukEquities', name: 'UK Blue-Chip Equities', weight: 0, color: '#165342' },
    { key: 'bondsGilts', name: 'UK Sovereign Gilts', weight: 0, color: '#9E8040' },
    { key: 'cashEquivalents', name: 'Cash / Money Market', weight: 0, color: '#C5A869' },
    { key: 'goldCommodities', name: 'Physical Gold', weight: 0, color: '#DFCA96' }
  ];

  for (const item of weightsList) {
    const rawVal = Math.max(0, Number(weights[item.key]) || 0);
    const normalized = Math.round(rawVal * factor);
    item.weight = normalized;

    const asset = assetCatalog[item.key];
    if (asset) {
      weightedReturn += (asset.expectedReturn * normalized) / 100;
      weightedYield += (asset.dividendYield * normalized) / 100;
      weightedVol += (asset.volatility * normalized) / 100;
    }
  }

  // Determine risk rating
  let riskRating: 'Conservative' | 'Balanced' | 'Growth' | 'High Growth' = 'Balanced';
  if (weightedVol < 5.0) riskRating = 'Conservative';
  else if (weightedVol < 10.0) riskRating = 'Balanced';
  else if (weightedVol < 13.5) riskRating = 'Growth';
  else riskRating = 'High Growth';

  const projected10YearMultiple = Number(Math.pow(1 + weightedReturn / 100, 10).toFixed(2));

  return {
    weightedReturn: Number(weightedReturn.toFixed(2)),
    weightedYield: Number(weightedYield.toFixed(2)),
    estimatedVolatility: Number(weightedVol.toFixed(2)),
    riskRating,
    projected10YearMultiple,
    weights: weightsList
  };
}

/**
 * Utility currency formatter for British Pounds (GBP)
 */
export function formatGBP(val: number, options?: { maximumFractionDigits?: number }): string {
  const digits = options?.maximumFractionDigits ?? 0;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(val);
}
