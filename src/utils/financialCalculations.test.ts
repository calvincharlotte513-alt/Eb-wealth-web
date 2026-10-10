import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCompoundInterest,
  calculateSavingsGoal,
  calculateRetirement,
  simulatePortfolioAllocation,
  formatGBP
} from './financialCalculations.js';

test('Compound Interest - 0% growth matches contributions', () => {
  const result = calculateCompoundInterest({
    initialInvestment: 1000,
    regularContribution: 100,
    contributionFrequency: 'monthly',
    annualInterestRate: 0,
    durationYears: 1,
    compoundingFrequency: 'monthly',
    annualFeePercent: 0
  });

  assert.equal(result.totalContributions, 2200);
  assert.equal(result.finalBalance, 2200);
  assert.equal(result.totalGrowth, 0);
  assert.equal(result.schedule.length, 1);
});

test('Compound Interest - Standard 10-year growth calculation with fee drag', () => {
  const result = calculateCompoundInterest({
    initialInvestment: 5000,
    regularContribution: 250,
    contributionFrequency: 'monthly',
    annualInterestRate: 8,
    durationYears: 10,
    compoundingFrequency: 'monthly',
    annualFeePercent: 0.22
  });

  assert.ok(result.finalBalance > result.totalContributions);
  assert.equal(result.totalContributions, 35000);
  assert.ok(result.totalGrowth > 15000);
  assert.ok(result.estimatedTaxSavedInISA > 0);
  assert.equal(result.schedule.length, 10);
});

test('Savings Goal - Required deposit calculation', () => {
  const result = calculateSavingsGoal({
    targetAmount: 20000,
    currentSavings: 2000,
    yearsToGoal: 3,
    expectedAnnualReturn: 6
  });

  assert.ok(result.requiredMonthlyDeposit > 0);
  // Deposit + compound growth reaches the £20,000 target
  assert.ok(result.totalDeposited + result.totalGrowth >= 20000);
  assert.equal(result.progressPercent, 10);
});

test('Retirement SIPP - Projected pot and tax-free lump sum', () => {
  const result = calculateRetirement({
    currentAge: 35,
    retirementAge: 65,
    currentPensionPot: 30000,
    monthlyPensionContribution: 400,
    expectedAnnualReturn: 7,
    safeDrawdownRatePercent: 4
  });

  assert.equal(result.yearsToRetirement, 30);
  assert.ok(result.projectedPotAtRetirement > 300000);
  assert.ok(result.taxFreeLumpSum <= 268275);
  assert.ok(result.estimatedAnnualRetirementIncome > 0);
  assert.ok(result.estimatedMonthlyRetirementIncome > 0);
});

test('Portfolio Allocation - Normalized weights sum to 100', () => {
  const result = simulatePortfolioAllocation({
    globalEquities: 60,
    ukEquities: 10,
    bondsGilts: 20,
    cashEquivalents: 10,
    goldCommodities: 0
  });

  const sum = result.weights.reduce((acc, curr) => acc + curr.weight, 0);
  assert.equal(sum, 100);
  assert.ok(result.weightedReturn > 0);
  assert.ok(result.estimatedVolatility > 0);
  assert.ok(['Conservative', 'Balanced', 'Growth', 'High Growth'].includes(result.riskRating));
});

test('formatGBP - Formats accurately in British Pounds', () => {
  assert.equal(formatGBP(5000), '£5,000');
  assert.equal(formatGBP(0), '£0');
});
