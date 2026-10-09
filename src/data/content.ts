import { Course, MentorshipTier, CoachingPackage, Testimonial } from '../types';

export const FOUNDER_IMAGE_URL = 'https://res.cloudinary.com/frl7thhq/image/upload/v1791447447/9a493f0e-a0ed-4fd1-ae45-37d9f285a283.png';

// Cloudinary Hero Backgrounds specifically provided for all pages
export const HERO_BACKGROUNDS = {
  home: 'https://res.cloudinary.com/frl7thhq/image/upload/v1791465333/e6cc4392-70e8-45cc-91ed-c9e870a8bd7f.png',
  about: 'https://res.cloudinary.com/frl7thhq/image/upload/v1791465314/f95bb6fb-06c5-468b-b068-12d5e4127cab.png',
  academy: 'https://res.cloudinary.com/frl7thhq/image/upload/v1791465292/a796c6bb-aebc-46cd-888a-0c68d1ebd91b.png',
  mentorship: 'https://res.cloudinary.com/frl7thhq/image/upload/v1791465221/199519bd-f834-4298-a101-ba8d2acd129e.png',
  coaching: 'https://res.cloudinary.com/frl7thhq/image/upload/v1791465195/ab32930a-ff39-4e0c-a137-2530d3c40363.png',
  tools: 'https://res.cloudinary.com/frl7thhq/image/upload/v1791465292/a796c6bb-aebc-46cd-888a-0c68d1ebd91b.png',
  compliance: 'https://res.cloudinary.com/frl7thhq/image/upload/v1791465314/f95bb6fb-06c5-468b-b068-12d5e4127cab.png'
};

// Local bundled fallbacks matching Goldman Sachs institutional aesthetic
export const HERO_FALLBACKS = {
  home: '/images/gs_institutional_hero_1791537955295.jpg',
  about: '/images/hero_eb_wealth_1791394753165.jpg',
  academy: '/images/gs_academy_seminar_1791537976945.jpg',
  mentorship: '/images/mentorship_coaching_1791394783951.jpg',
  coaching: '/images/gs_research_briefing_1791537967314.jpg',
  tools: '/images/wealth_tools_analytics_1791462515697.jpg',
  compliance: '/images/hero_eb_wealth_1791394753165.jpg'
};

export interface MarketIndicator {
  symbol: string;
  name: string;
  value: string;
  change: string;
  positive: boolean;
  context: string;
}

export const MARKET_INDICATORS: MarketIndicator[] = [
  {
    symbol: 'FTSE 100',
    name: 'UK Large-Cap Benchmark',
    value: '8,245.80',
    change: '+0.42%',
    positive: true,
    context: 'Top 100 dividend-paying blue-chip corporations listed on the London Stock Exchange.'
  },
  {
    symbol: 'S&P 500',
    name: 'US Enterprise Index',
    value: '5,782.10',
    change: '+0.58%',
    positive: true,
    context: 'Core engine of global innovation and corporate earnings compounding over 50+ years.'
  },
  {
    symbol: 'UK 10Y Gilt',
    name: 'HM Treasury Sovereign Yield',
    value: '4.12%',
    change: '-0.03%',
    positive: true,
    context: 'The risk-free baseline yield that establishes borrowing costs and valuation multiples in the UK.'
  },
  {
    symbol: 'BoE Base Rate',
    name: 'Bank of England Benchmark',
    value: '4.75%',
    change: 'HOLD',
    positive: true,
    context: 'Official interest rate set by the Monetary Policy Committee; dictates cash savings yields.'
  },
  {
    symbol: 'Gold (GBP)',
    name: 'Monetary Store of Value',
    value: '£2,084.50',
    change: '+0.71%',
    positive: true,
    context: 'Historical purchasing power hedge against sovereign currency debasement.'
  },
  {
    symbol: 'Global P/E',
    name: 'MSCI World Valuation',
    value: '18.4x',
    change: 'Fair',
    positive: true,
    context: 'Price-to-Earnings ratio of world equity markets; key gauge of long-term expected returns.'
  }
];

export interface ResearchBriefing {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  summary: string;
  takeaway: string;
  fullContent: string[];
}

export const RESEARCH_BRIEFINGS: ResearchBriefing[] = [
  {
    id: 'briefing-compounding-horizon',
    tag: 'Macro Research',
    title: 'The 20-Year Compounding Horizon: Holding Periods vs Market Timing',
    subtitle: 'Why time in the market mathematically dominates market timing across 100+ years of equity data.',
    readTime: '6 min read',
    date: 'Autumn 2026',
    summary: 'An empirical analysis of equity market returns showing that individual investors who attempt to time market dips systematically miss the sharpest upside recovery clusters, severely impairing long-term terminal capital.',
    takeaway: 'Missing just the 10 best trading days across a 20-year horizon cuts total compound return by over 54%. True wealth is generated through unyielding holding duration, not tactical market prediction.',
    fullContent: [
      'Over a 100-year historical dataset across UK and US public equities, equity returns are characterized by intense temporal clustering. The vast majority of cumulative capital appreciation occurs during short, sudden trading windows that occur amidst periods of elevated volatility.',
      'According to multi-decade institutional research, an investor who remained continuously invested in a global index over a 20-year period generated an annualized total return exceeding 8.2%. Conversely, an investor who attempted to time cyclical drawdowns and missed just the 10 strongest days experienced an annualized return of merely 3.8%—a cumulative net wealth differential of over 54%.',
      'At EB Wealth, our core curriculum stresses that volatility is not risk; volatility is the price of admission for long-term real purchasing power expansion. The bedrock of institutional wealth building is structural holding power—having an emergency cash buffer that guarantees you never become a forced seller during inevitable market corrections.'
    ]
  },
  {
    id: 'briefing-uk-tax-shield',
    tag: 'Tax Architecture',
    title: 'The UK Tax Shield Architecture: Maximising Lifetime ISAs & SIPPs',
    subtitle: 'How eliminating dividend tax and capital gains tax drag compounds into an extra £240,000 over a 25-year horizon.',
    readTime: '8 min read',
    date: 'Autumn 2026',
    summary: 'A mathematical breakdown of UK tax wrappers (Stocks & Shares ISA, Junior ISA, LISA, SIPP) and the compounding penalty imposed by tax leakage inside standard General Investment Accounts (GIAs).',
    takeaway: 'Maxing out the annual £20,000 Stocks & Shares ISA allowance prevents up to 39.35% dividend tax and 20% capital gains drag from degrading your multi-decade compounding velocity.',
    fullContent: [
      'In the United Kingdom, tax drag is the single largest silent erosive force on personal capital formation. In an unsheltered General Investment Account (GIA), higher-rate taxpayers surrender up to 33.75% (or 39.35% for additional-rate taxpayers) of dividend payouts, alongside annual capital gains taxes on rebalanced holdings.',
      'Over a 25-year investing lifecycle with a £1,000 monthly contribution at a 7% nominal annual return, the compound wealth differential between a 100% tax-free ISA environment and a taxed GIA exceeds £240,000. That is quarter of a million pounds preserved purely through legal structural choice.',
      'EB Wealth provides complete masterclasses on sequencing allowances: deploying the £20,000 adult ISA, the £9,000 Junior ISA (JISA) for children, and matching higher-rate pension tax relief via Self-Invested Personal Pensions (SIPPs) to achieve generational capital immunity.'
    ]
  },
  {
    id: 'briefing-passive-indexing',
    tag: 'Portfolio Construction',
    title: 'Global Factor Allocation: Low-Cost Index Funds vs Active Stock Picking',
    subtitle: 'Why 89% of active fund managers underperform simple broad-market global indices after accounting for fees.',
    readTime: '7 min read',
    date: 'Autumn 2026',
    summary: 'The empirical reality behind active management fees and why a globally diversified, low-cost index ETF portfolio provides the mathematical foundation for sustainable wealth.',
    takeaway: 'A seemingly small 1.5% annual management fee takes away more than one-third of your total portfolio value over a 30-year investing lifecycle.',
    fullContent: [
      'The S&P Dow Jones Indices SPIVA report consistently reveals an uncomfortable truth for high-fee wealth managers: across a 15-year measurement window, approximately 89% of active large-cap equity fund managers fail to beat their benchmark index after fund costs are deducted.',
      'The mathematics of investment fees are non-linear. A 1.5% ongoing fund charge does not merely reduce your annual return by 1.5%; through compounding drag, it extracts over 33% of your terminal wealth after 30 years compared to a low-cost 0.15% passive index ETF.',
      'We educate investors to construct institutional-grade, low-cost core-and-satellite portfolios: capturing broad global GDP expansion through low-cost index ETFs across thousands of resilient companies, while retaining clear risk management and fee discipline.'
    ]
  }
];

export const CORE_PHILOSOPHY = [
  { step: '01', name: 'EDUCATE', desc: 'Clear, foundational financial literacy stripped of confusing industry jargon.' },
  { step: '02', name: 'UNDERSTAND', desc: 'Deep comprehension of assets, UK tax wrappers, business models, and market mechanics.' },
  { step: '03', name: 'ANALYSE', desc: 'Critical evaluation of asset allocation, risk-reward ratios, and fund fees.' },
  { step: '04', name: 'BUILD', desc: 'Constructing robust, diversified portfolios tailored to personal long-term goals.' },
  { step: '05', name: 'TRACK', desc: 'Disciplined performance monitoring, annual rebalancing, and fee minimization.' },
  { step: '06', name: 'COMPOUND', desc: 'Harnessing the mathematics of compound interest over multi-decade horizons.' },
];

export const FIVE_PILLARS = [
  {
    key: 'learn',
    title: 'Learn',
    subtitle: 'Financial Education',
    description: 'Foundational investing principles designed to make complex market concepts simple, actionable, and jargon-free.',
    topics: ['Investing Foundations', 'Inflation vs Cash Savings', 'Compounding Mathematics', 'Investor Psychology & Risk'],
    icon: 'BookOpen'
  },
  {
    key: 'invest',
    title: 'Invest',
    subtitle: 'Asset Mastery',
    description: 'Learn how stocks, ETFs, index funds, REITs, bonds, and balanced multi-asset portfolios work in practice.',
    topics: ['Index Funds & ETFs', 'Dividend Stocks vs Growth', 'Fixed Income & Gilts', 'Global Market Exposure'],
    icon: 'TrendingUp'
  },
  {
    key: 'shelter',
    title: 'Tax Shelters',
    subtitle: 'UK ISAs & Wrappers',
    description: 'Master HMRC tax-efficient accounts to legally protect capital gains and dividend returns from tax drag.',
    topics: ['Stocks & Shares ISA (£20k/yr)', 'Junior ISA for Children', 'Lifetime ISA (25% Bonus)', 'SIPP Pension Compounding'],
    icon: 'ShieldCheck'
  },
  {
    key: 'analyse',
    title: 'Analyse',
    subtitle: 'Valuation & Fundamentals',
    description: 'Learn to read financial statements, understand company competitive moats, and assess valuation metrics.',
    topics: ['Company Fundamentals (P/E, FCF)', 'Economic Moats & Defensibility', 'Fund Fee Drag Audits', 'Solvency & Debt Analysis'],
    icon: 'PieChart'
  },
  {
    key: 'grow',
    title: 'Grow',
    subtitle: 'Portfolio Architecture',
    description: 'Construct resilient, diversified portfolios with clear risk parameters and disciplined accountability.',
    topics: ['True Diversification vs Overlap', 'Asset Allocation Models', 'Rebalancing Schedules', 'Long-Horizon Compounding'],
    icon: 'Compass'
  }
];

export const ACADEMY_LEVELS = [
  {
    levelNumber: 1,
    title: 'Level 1 — Investing Foundations',
    headline: 'Foundations of Long-Term Wealth',
    description: 'Designed for complete beginners wanting to master the bedrock principles of investing before committing capital.',
    badge: 'Foundations',
    topics: [
      'What investing actually is and why saving cash alone guarantees loss through inflation',
      'Stocks: What owning a fractional share of a real enterprise truly means',
      'ETFs & Index Funds: Low-cost, passive, broad-market diversification explained simply',
      'The mathematics of compounding returns over 5, 10, 20, and 30-year horizons',
      'Understanding risk, market volatility, drawdowns, and emotional psychology',
      'How stock markets function: Exchanges, brokers, bid-ask spreads, and order types'
    ],
    duration: '6 Weeks · Self-Paced + Live Q&A',
    targetAudience: 'Beginners & savers seeking clarity'
  },
  {
    levelNumber: 2,
    title: 'Level 2 — Understanding Investments',
    headline: 'Asset Classes & Cash-Flow Vehicles',
    description: 'A comprehensive deep dive into the different investment instruments available and how they generate returns.',
    badge: 'Asset Classes',
    topics: [
      'Individual Stocks vs Exchange-Traded Funds (ETFs) vs Mutual Funds',
      'Real Estate Investment Trusts (REITs) and property exposure without physical landlording',
      'Bonds & Fixed Income: Sovereign gilts, treasury yields, and credit risk fundamentals',
      'Active Fund Management vs Passive Index Investing: The truth about fund fees',
      'Dividends: Cash distributions, payout ratios, dividend growth, and DRIP reinvestment',
      'Commodities and alternative assets: Role in an all-weather portfolio'
    ],
    duration: '5 Weeks · Video Modules + Checklists',
    targetAudience: 'Beginner to Intermediate Investors'
  },
  {
    levelNumber: 3,
    title: 'Level 3 — UK Investing & Tax Shelters',
    headline: 'UK Tax Wrappers & HMRC Rules',
    description: 'How to legally shield your investments from capital gains and dividend taxes using UK government tax wrappers.',
    badge: 'UK Tax Shelters',
    topics: [
      'Stocks & Shares ISA: Maximizing your £20,000 annual tax-free allowance without penalties',
      'Junior ISA (JISA): Building tax-free generational wealth for your children (£9,000 allowance)',
      'Lifetime ISA (LISA): The 25% government bonus for first-time home buyers or retirement',
      'Self-Invested Personal Pension (SIPP): 20% to 45% tax relief and long-term pension compounding',
      'General Investment Account (GIA): When and how to use it once ISA limits are maximized',
      'UK Tax basics: Capital Gains Tax allowance, dividend tax allowances, and HMRC reporting'
    ],
    duration: '4 Weeks · Practical UK Guide',
    targetAudience: 'UK Residents, Expats & Earners'
  },
  {
    levelNumber: 4,
    title: 'Level 4 — Portfolio Construction',
    headline: 'Architecture, Diversification & Risk',
    description: 'Learn how to construct a personalized, resilient portfolio suited to your personal timeframe and risk appetite.',
    badge: 'Portfolio Design',
    topics: [
      'Asset Allocation: Equities, bonds, cash buffers, and real assets balancing',
      'True Diversification vs Diworsification: Avoiding redundant overlapping funds (e.g. S&P 500 + MSCI World)',
      'Geographic Exposure: UK home bias vs US equity dominance vs Emerging Markets',
      'Sector Exposure: Technology, healthcare, consumer staples, financials, and utilities',
      'Risk Management: Drawdown defense, rebalancing schedules, and volatility buffers',
      'Platform comparison: Vanguard, Trading 212, Hargreaves Lansdown, AJ Bell, Freetrade'
    ],
    duration: '6 Weeks · Frameworks & Templates',
    targetAudience: 'Intermediate Investors'
  },
  {
    levelNumber: 5,
    title: 'Level 5 — Understanding Companies',
    headline: 'Fundamental Analysis & Business Valuation',
    description: 'Learn to read real company reports, understand balance sheets, and evaluate competitive advantages.',
    badge: 'Company Analysis',
    topics: [
      'Revenue, Gross Margins, and Operating Earnings explained simply',
      'Cash Flow: Why Free Cash Flow matters far more than accounting net income',
      'Debt & Solvency: Interest coverage, debt-to-equity, and assessing corporate health',
      'Valuation Multiples: P/E (Price-to-Earnings), PEG, EV/EBITDA, and what they reveal',
      'Economic Moats: Brand pricing power, network effects, high switching costs, and scale',
      'Management Track Record, capital allocation discipline, and shareholder alignment'
    ],
    duration: '8 Weeks · Case Studies & Live Analysis',
    targetAudience: 'Serious Stock & Business Evaluators'
  },
  {
    levelNumber: 6,
    title: 'Level 6 — Advanced Long-Term Compounding',
    headline: 'Macroeconomics & Capital Sovereignty',
    description: 'For experienced investors seeking advanced capital allocation, interest rate cycle understanding, and wealth preservation.',
    badge: 'Advanced Strategy',
    topics: [
      'Macroeconomic indicators: Yield curves, interest rate cycles, and central bank monetary policy',
      'Valuation multiples across different market cycles and historical regimes',
      'Asymmetric risk-reward setups and defensive portfolio tilt strategies',
      'Disciplined quarterly rebalancing and tax-loss harvesting logic where applicable',
      'Intergenerational wealth preservation and capital sovereignty philosophy'
    ],
    duration: '8 Weeks · Advanced Masterclass',
    targetAudience: 'Experienced Investors & Operators'
  }
];

export const COURSES: Course[] = ACADEMY_LEVELS.map((lvl) => ({
  id: `course-level-${lvl.levelNumber}`,
  title: lvl.title,
  subtitle: lvl.headline,
  level: lvl.levelNumber <= 2 ? 'Beginner' : lvl.levelNumber <= 4 ? 'Intermediate' : 'Advanced',
  duration: lvl.duration,
  modulesCount: lvl.topics.length,
  accessTier: 'EB Wealth Academy',
  description: lvl.description,
  keyOutcomes: lvl.topics.slice(0, 4),
  modules: lvl.topics.map((top, idx) => ({
    title: `Lesson ${idx + 1}`,
    topics: [top]
  })),
  featured: lvl.levelNumber === 1 || lvl.levelNumber === 3
}));

export const MENTORSHIP_TIERS: MentorshipTier[] = [
  {
    id: 'mentorship-foundation',
    title: 'Foundation Mentorship',
    badge: 'Core Accountability',
    tagline: 'Build foundational financial clarity, eliminate costly beginner mistakes, and establish your core long-term investment plan.',
    commitment: '3-Month Structured Cohort',
    format: 'Bi-Weekly Group Strategy Sessions + Community Forum',
    priceNote: 'Accessible cohort entry · Limited spots per intake',
    deliverables: [
      'Bi-weekly group investment education and live Q&A sessions',
      'Full unrestricted access to all 6 EB Wealth Academy curriculum levels',
      'Personal portfolio structure audit and goal setting template',
      'Active peer accountability community for consistent monthly investing habits',
      'Monthly macroeconomic and UK market educational briefing'
    ],
    idealFor: 'Beginners, professionals, and savers seeking structured investment guidance and accountability.'
  },
  {
    id: 'mentorship-growth',
    title: 'Growth Mentorship',
    badge: 'Active Investor Circle',
    tagline: 'Deepen your analysis, review company fundamentals, and master portfolio asset allocation with consistent mentorship.',
    commitment: '6-Month Partnership',
    format: 'Bi-Weekly Interactive Strategy Labs + Direct Group Feedback',
    priceNote: 'Application required · Capped at 20 participants',
    featured: true,
    deliverables: [
      'Everything in Foundation Mentorship',
      'Bi-weekly deep-dive company analysis and ETF valuation labs',
      'Quarterly 1-on-1 portfolio logic review with senior investment educators',
      'Direct WhatsApp accountability group for prompt answers to investing questions',
      'Custom investment tracking and dividend projection spreadsheets',
      'Exclusive guest sessions with experienced long-term value investors'
    ],
    idealFor: 'Intermediate investors and professionals scaling their capital allocation and ETF portfolios.'
  },
  {
    id: 'mentorship-executive',
    title: 'Executive Mastermind',
    badge: 'Private 1-on-1 & Advisory',
    tagline: 'Direct, tailored partnership with senior investment educators. Bespoke wealth strategy, family capital architecture, and long-horizon preservation.',
    commitment: '6 to 12-Month Private Retainer',
    format: '1-on-1 Private Sessions + Direct Mentor Access',
    priceNote: 'Confidential application & interview required',
    deliverables: [
      'Private bi-weekly 1-on-1 strategy sessions with senior investment educators',
      'Bespoke wealth roadmap integrating corporate cash reserves, UK tax wrappers, and private assets',
      'Direct priority VIP messaging channel for critical strategic investment decisions',
      'Complete portfolio fee leakage and diversification audit',
      'Confidential deal analysis and risk review before making major asset allocations',
      'Invitations to annual private EB Wealth closed-door roundtable dinners'
    ],
    idealFor: 'Entrepreneurs, executives, and high-earning individuals seeking multi-generational capital stewardship.'
  }
];

export const COACHING_PACKAGES: CoachingPackage[] = [
  {
    id: 'coaching-clarity-60',
    title: '60-Minute Investment Strategy Intensive',
    duration: '60 Minutes (1:1 Video Call)',
    accessTier: 'Private 1-on-1 Coaching',
    description: 'A focused, objective deep dive into your current investment portfolio, asset allocation questions, and UK tax wrapper strategy.',
    features: [
      'Comprehensive pre-call questionnaire to understand your goals, timeline, and current knowledge',
      '60 minutes of uninterrupted one-on-one video guidance with an investment educator',
      'Objective educational review of your current asset allocation and fee leakages',
      'Clarity on UK tax wrappers (Stocks & Shares ISA vs Junior ISA vs SIPP vs GIA)',
      'Actionable written summary roadmap and call recording delivered within 24 hours'
    ],
    recommendedFor: 'Those wanting immediate clarity and an educational sounding board for their personal investment plan.'
  },
  {
    id: 'coaching-portfolio-90',
    title: '90-Minute Portfolio Architecture Deep Dive',
    duration: '90 Minutes (Comprehensive 1:1)',
    accessTier: 'Premier 1-on-1 Coaching',
    description: 'An expansive session covering your entire asset allocation, ETF selections, platform costs, and long-term compounding trajectory.',
    features: [
      'Detailed pre-session audit of your investment portfolio, fund holdings, and fee structures',
      '90 minutes of dedicated, bespoke strategy with senior investment leadership',
      'Clear evaluation of asset diversification, risk exposures, and platform fee drag',
      'Analysis of index funds vs dividend stocks vs fixed income allocation',
      'Custom 30-day and 90-day execution checklist for tax-efficient compounding'
    ],
    recommendedFor: 'Investors and self-employed professionals needing a holistic, structured investment strategy.'
  },
  {
    id: 'coaching-quarterly-sprint',
    title: '90-Day Investor Mentoring Sprint',
    duration: '3 Months (Bi-Weekly Support)',
    accessTier: 'Private Retainer',
    description: 'Consistent execution builds lasting wealth. A 90-day coaching journey to implement sustainable, automated investing habits.',
    features: [
      'Initial 75-minute onboarding and investment goal calibration session',
      'Six bi-weekly 45-minute coaching check-ins over 12 weeks',
      'Continuous review of financial milestones, monthly contribution rates, and portfolio discipline',
      'Ongoing asynchronous messaging support between calls for urgent investment queries',
      'Final milestone evaluation and multi-decade wealth trajectory blueprint'
    ],
    recommendedFor: 'Individuals committed to transforming their investment habits and compounding consistency over 90 focused days.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus V.',
    title: 'Managing Director & Business Owner',
    organization: 'Logistics & Distribution',
    verifiedResult: 'Full ISA & SIPP Optimization + Automated Portfolio',
    quote: 'Before EB Wealth, my surplus money was sitting in commercial bank cash earning near zero, losing real purchasing power every single year to inflation. The education gave me the exact framework to build a balanced, tax-efficient index fund portfolio across my Stocks & Shares ISA and SIPP.',
    program: 'Growth Mentorship'
  },
  {
    id: 'test-2',
    name: 'Sophie T.',
    title: 'NHS Consultant & Private Practitioner',
    organization: 'Healthcare',
    verifiedResult: 'Mastered Index Investing from Ground Zero',
    quote: 'I used to find financial discussions intimidating and loaded with jargon. The EB Wealth Academy broke down stocks, ETFs, and UK tax wrappers into clear, logical steps. I now manage my own Stocks & Shares ISA with complete confidence.',
    program: 'EB Wealth Academy'
  },
  {
    id: 'test-3',
    name: 'David A.',
    title: 'Senior Software Engineer',
    organization: 'FinTech',
    verifiedResult: 'Disciplined Global Asset Allocation Framework',
    quote: 'Having the accountability and objective feedback in 1-on-1 coaching kept me on track. I stopped chasing speculative trends and built a solid, long-term portfolio backed by real research, low fund fees, and broad global diversification.',
    program: '1-to-1 Coaching'
  },
  {
    id: 'test-4',
    name: 'Amir K.',
    title: 'Commercial Finance Director',
    organization: 'Real Estate & Construction',
    verifiedResult: 'Clarity on Junior ISAs & Intergenerational Wealth',
    quote: 'The level of practical education on UK tax wrappers is unmatched. EB Wealth showed us how to structure Junior ISAs for our children while maximizing our personal annual allowances. Straightforward, professional, and zero fluff.',
    program: 'Foundation Mentorship'
  }
];

export const REGULATORY_DISCLAIMER_SHORT =
  'EB Wealth provides investment education, conceptual workshops, educational masterclasses and mentorship. We do not provide regulated financial advice, personal investment recommendations or asset management services. Investments can rise and fall in value, and you may get back less than you invest. You should consider your own circumstances, objectives and risk tolerance and seek FCA-regulated financial advice where appropriate.';

export const REGULATORY_DISCLAIMER_FULL = `
EB WEALTH REGULATORY DISCLAIMER & IMPORTANT DISCLOSURES

1. Educational & Informational Nature
EB Wealth is an investment education and financial literacy organization. EB Wealth is NOT authorised or regulated by the UK Financial Conduct Authority (FCA), nor is it a licensed financial advisory firm, broker, bank, investment manager, or tax advisory practice. 

2. No Regulated Financial Advice
Nothing on this website, in our Academy courses, mobile application, mentorship cohorts, coaching sessions, or supplementary tools constitutes regulated financial advice, investment advice, tax advice, or a personal recommendation to buy, hold, or sell any financial instrument. All information is provided strictly for general educational, conceptual, and informational purposes.

3. Investment Risk Warning
Investments can rise and fall in value. You may get back less than you invest. Past performance is never a reliable guide to future returns. Different financial instruments carry varying degrees of risk, volatility, and liquidity. You should carefully consider your own financial circumstances, objectives, time horizon, and risk tolerance before making any investment decision.

4. Seek Independent Advice
Where personal financial, investment, pension, legal, or tax advice is required, you should always consult an FCA-authorised Independent Financial Adviser (IFA), qualified tax specialist, or legal solicitor.

5. Accuracy of Content
While all educational materials are prepared with diligence and care to reflect current UK market structures and HMRC rules, tax rules and regulations are subject to government change. EB Wealth makes no warranty as to the completeness or applicability to your specific individual circumstances.
`;
