import { Course, MentorshipTier, CoachingPackage, AIService, Testimonial } from '../types';

export const FOUNDER_IMAGE_URL = 'https://res.cloudinary.com/frl7thhq/image/upload/v1791447447/9a493f0e-a0ed-4fd1-ae45-37d9f285a283.png';

export const CORE_PHILOSOPHY = [
  { step: '01', name: 'EDUCATE', desc: 'Clear, foundational financial literacy stripped of confusing industry jargon.' },
  { step: '02', name: 'UNDERSTAND', desc: 'Deep comprehension of assets, UK tax wrappers, business models, and market mechanics.' },
  { step: '03', name: 'ANALYSE', desc: 'Critical evaluation of balance sheets, risk-reward ratios, and valuation metrics.' },
  { step: '04', name: 'BUILD', desc: 'Constructing robust, diversified portfolios and automated business systems.' },
  { step: '05', name: 'TRACK', desc: 'Disciplined performance monitoring, rebalancing, and fee minimization.' },
  { step: '06', name: 'GROW', desc: 'Compounding long-term wealth, personal sovereignty, and enterprise leverage.' },
];

export const FIVE_PILLARS = [
  {
    key: 'learn',
    title: 'Learn',
    subtitle: 'Financial Education',
    description: 'Investment and financial education designed to make complex concepts simple, actionable, and jargon-free.',
    topics: ['Investing Foundations', 'UK Tax Wrappers (ISA, SIPP)', 'Compounding & Inflation', 'Psychology of Wealth'],
    icon: 'BookOpen'
  },
  {
    key: 'invest',
    title: 'Invest',
    subtitle: 'Asset Mastery',
    description: 'Learn how stocks, ETFs, index funds, REITs, ISAs, and balanced multi-asset portfolios work in practice.',
    topics: ['Index Funds & ETFs', 'Stocks & Dividend Growth', 'Asset Allocation Models', 'Execution & Order Types'],
    icon: 'TrendingUp'
  },
  {
    key: 'analyse',
    title: 'Analyse',
    subtitle: 'Research & Valuation',
    description: 'Understand businesses, investments, risk profiles, valuation multiples, and structural diversification.',
    topics: ['Company Fundamentals (P/E, Cash Flow)', 'Moats & Competitive Advantage', 'Risk vs Reward Evaluation', 'Debt & Solvency Audits'],
    icon: 'PieChart'
  },
  {
    key: 'grow',
    title: 'Grow',
    subtitle: 'Habits & Mentorship',
    description: 'Develop better financial habits, disciplined accountability, and resilient long-term wealth strategies.',
    topics: ['Peer Mastermind Circles', 'Executive 1-on-1 Coaching', 'Accountability Check-ins', 'Long-Horizon Compounding'],
    icon: 'Compass'
  },
  {
    key: 'build',
    title: 'Build',
    subtitle: 'AI & Business Systems',
    description: 'Use practical AI, technology, and automated business workflows to create commercial leverage.',
    topics: ['High-Impact Prompt Architecture', 'Automated Lead Qualification', 'Internal Operations Scaling', 'AI Readiness Audits'],
    icon: 'Cpu'
  }
];

export const ACADEMY_LEVELS = [
  {
    levelNumber: 1,
    title: 'Level 1 — Investing Foundations',
    headline: 'Foundations of Long-Term Wealth',
    description: 'Designed for complete beginners and those wanting to master the bedrock principles of capital before investing.',
    badge: 'Foundations',
    topics: [
      'What investing actually is and why saving cash alone guarantees loss through inflation',
      'Stocks: What owning a share of a real enterprise truly means',
      'ETFs & Index Funds: Low-cost, passive, broad-market diversification',
      'The mathematics of compounding returns over 5, 10, and 30-year horizons',
      'Understanding risk, volatility, and emotional investor psychology',
      'Inflation mechanics and purchasing power preservation'
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
      'Individual Stocks vs Exchange-Traded Funds (ETFs)',
      'Real Estate Investment Trusts (REITs) and property exposure without physical landlording',
      'Bonds & Fixed Income: Sovereign gilts, treasury yields, and credit risk',
      'Mutual Funds vs Active Management: The truth about high fund manager fees',
      'Dividends: Cash distributions, yield vs growth, and dividend reinvestment plans (DRIP)'
    ],
    duration: '5 Weeks · Video Modules + Checklists',
    targetAudience: 'Beginner to Intermediate Investors'
  },
  {
    levelNumber: 3,
    title: 'Level 3 — UK Investing',
    headline: 'UK Tax Wrappers & HMRC Rules',
    description: 'How to legally shield your investments from capital gains and dividend taxes using UK government schemes.',
    badge: 'UK Tax Shelters',
    topics: [
      'Stocks & Shares ISA: Maximizing your £20,000 annual tax-free allowance',
      'Junior ISA (JISA): Building tax-free generational wealth for your children',
      'Lifetime ISA (LISA): The 25% government bonus for first-time buyers or retirement',
      'Self-Invested Personal Pension (SIPP): 20% to 45% tax relief and pension compounding',
      'General Investment Account (GIA): When and how to use it once ISA limits are maximized',
      'UK Tax basics: Capital Gains Tax allowance, dividend allowances, and reporting'
    ],
    duration: '4 Weeks · Practical UK Guide',
    targetAudience: 'UK Residents, Expats & Earners'
  },
  {
    levelNumber: 4,
    title: 'Level 4 — Portfolio Building',
    headline: 'Architecture, Diversification & Risk',
    description: 'Learn how to construct a personalized, resilient portfolio suited to your personal timeframe and risk appetite.',
    badge: 'Portfolio Design',
    topics: [
      'Asset Allocation: Equities, bonds, real assets, and liquidity staging',
      'True Diversification vs Diworsification: Avoiding redundant overlapping funds',
      'Geographic Exposure: UK bias vs US equity dominance vs Emerging Markets',
      'Sector Exposure: Technology, healthcare, financials, and consumer cyclicals',
      'Risk Management: Drawdown defense, rebalancing schedules, and volatility buffers'
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
      'Revenue, Profit Margins, and Operating Earnings explained simply',
      'Cash Flow: Why Free Cash Flow matters far more than reported accounting profit',
      'Debt & Solvency: Interest coverage, debt-to-equity, and bankruptcy avoidance',
      'Valuation Multiples: P/E (Price-to-Earnings), P/S, EV/EBITDA, and what they tell you',
      'Economic Moats: Brand pricing power, network effects, high switching costs, and cost leadership',
      'Management Track Record, capital allocation discipline, and shareholder alignment'
    ],
    duration: '8 Weeks · Case Studies & Live Analysis',
    targetAudience: 'Serious Stock & Business Evaluators'
  },
  {
    levelNumber: 6,
    title: 'Level 6 — Advanced Investing',
    headline: 'Macroeconomics & Capital Sovereignty',
    description: 'For experienced investors seeking advanced capital allocation, interest rate cycle mastery, and wealth preservation.',
    badge: 'Advanced Strategy',
    topics: [
      'Macroeconomic indicators: Yield curves, interest rate shifts, and central bank liquidity',
      'Valuation multiples across different market cycles and regime changes',
      'Asymmetric risk-reward setups and defensive portfolio tilt strategies',
      'Disciplined quarterly rebalancing and tax-loss harvesting logic',
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
    tagline: 'Build foundational financial clarity, eliminate costly mistakes, and establish your core long-term investment plan.',
    commitment: '3-Month Structured Cohort',
    format: 'Bi-Weekly Group Strategy Sessions + Community Forum',
    priceNote: 'Accessible cohort entry · Limited spots per intake',
    deliverables: [
      'Bi-weekly group financial strategy and Q&A sessions',
      'Full unrestricted access to all 6 EB Wealth Academy levels',
      'Personal portfolio structure audit and goal setting template',
      'Active peer accountability community for consistent habits',
      'Monthly macroeconomic and UK market educational brief'
    ],
    idealFor: 'Beginners, professionals, and savers seeking structured guidance and accountability.'
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
      'Bi-weekly deep-dive company analysis and valuation labs',
      'Quarterly 1-on-1 portfolio logic review with senior mentors',
      'Direct WhatsApp accountability group for prompt answers',
      'Custom investment tracking and dividend projection spreadsheets',
      'Exclusive guest sessions with experienced entrepreneurs and investors'
    ],
    idealFor: 'Intermediate investors, business owners, and professionals scaling their capital allocation.'
  },
  {
    id: 'mentorship-executive',
    title: 'Executive Mastermind',
    badge: 'Private 1-on-1 & Advisory',
    tagline: 'Direct, tailored partnership with the Founder & CEO. Bespoke wealth strategy, AI business leverage, and long-term capital architecture.',
    commitment: '6 to 12-Month Private Retainer',
    format: '1-on-1 Private Sessions + Direct Founder Access',
    priceNote: 'Confidential application & interview required',
    deliverables: [
      'Private bi-weekly 1-on-1 strategy sessions directly with the Founder & CEO',
      'Bespoke wealth roadmap integrating corporate cashflow, UK tax wrappers, and private assets',
      'Direct priority VIP messaging channel for critical strategic decisions',
      'Complete business operations & AI leverage audit for your company',
      'Confidential deal analysis and risk review before making major moves',
      'Invitations to annual private EB Wealth closed-door roundtable dinners'
    ],
    idealFor: 'Established entrepreneurs, executives, and high-earning business owners seeking total sovereign growth.'
  }
];

export const COACHING_PACKAGES: CoachingPackage[] = [
  {
    id: 'coaching-clarity-60',
    title: '60-Minute Strategy & Roadmap Intensive',
    duration: '60 Minutes (1:1 Video Call)',
    accessTier: 'Private 1-on-1 Coaching',
    description: 'A focused, objective deep dive into your current financial situation, investment questions, and long-term targets.',
    features: [
      'Comprehensive pre-call questionnaire to understand your goals and current knowledge',
      '60 minutes of uninterrupted one-on-one video guidance',
      'Objective educational review of your asset allocation and fee leakages',
      'Clarity on UK tax wrappers (Stocks & Shares ISA vs SIPP vs GIA)',
      'Actionable written summary and recording delivered within 24 hours'
    ],
    recommendedFor: 'Those wanting immediate clarity and an educational sounding board for their financial plan.'
  },
  {
    id: 'coaching-portfolio-90',
    title: '90-Minute Wealth & Business Deep Dive',
    duration: '90 Minutes (Comprehensive 1:1)',
    accessTier: 'Premier 1-on-1 Coaching',
    description: 'An expansive session covering both personal investing systems and business cash flow / AI leverage opportunities.',
    features: [
      'Detailed pre-session audit of your investment portfolio and business workflow',
      '90 minutes of dedicated, bespoke strategy with senior leadership',
      'Clear evaluation of company diversification, risk exposures, and fee drag',
      'Tailored AI leverage recommendations for business owners and freelancers',
      'Custom 30-day and 90-day execution checklist'
    ],
    recommendedFor: 'Entrepreneurs, self-employed professionals, and active investors needing a holistic strategy.'
  },
  {
    id: 'coaching-quarterly-sprint',
    title: '90-Day Transformation & Accountability Sprint',
    duration: '3 Months (Weekly / Bi-Weekly Support)',
    accessTier: 'Private Retainer',
    description: 'Consistent execution builds lasting wealth. A 90-day coaching journey to implement sustainable investing and business habits.',
    features: [
      'Initial 75-minute onboarding and financial goal calibration session',
      'Six bi-weekly 45-minute coaching check-ins over 12 weeks',
      'Continuous review of financial milestones, savings rates, and portfolio discipline',
      'Ongoing asynchronous messaging support between calls',
      'Final milestone evaluation and multi-year trajectory blueprint'
    ],
    recommendedFor: 'Individuals committed to transforming their financial habits and business leverage over 90 focused days.'
  }
];

export const AI_GROWTH_SERVICES: AIService[] = [
  {
    id: 'ai-prompt-engineering',
    title: 'High-Impact Prompt Architecture',
    tagline: 'Bespoke prompt engineering systems that transform generic AI tools into precision business assets.',
    description: 'We design custom prompt libraries, contextual instructions, and structured frameworks so you and your team produce executive-grade research, copy, and operational outputs in minutes.',
    metricsImpact: 'Saves 10–15 hours per week per team member while maintaining consistent tone and accuracy.',
    deliverables: [
      'Proprietary prompt library tailored specifically to your business niche and workflows',
      'Context-dense system prompts that eliminate generic hallucinations',
      'Multi-step reasoning frameworks for market research, proposals, and customer communications',
      'Live team training session with recorded playbooks and SOP documents'
    ]
  },
  {
    id: 'ai-autonomous-workflows',
    title: 'Workflow & Lead Automation',
    tagline: 'Streamline client acquisition, lead qualification, and repetitive operational tasks.',
    description: 'Connect your CRM, email, calendar, and AI agents into a seamless pipeline that nurtures leads, qualifies prospects, and frees up your time for high-value strategic work.',
    metricsImpact: 'Reduces lead response times from hours to under 3 minutes, significantly boosting conversion.',
    deliverables: [
      'Automated lead intake and intelligent pre-qualification system',
      'Smart appointment booking flows integrated directly with your calendar',
      'Email follow-up and nurture sequences powered by contextual AI',
      'Real-time pipeline alerts and performance tracking dashboard'
    ]
  },
  {
    id: 'ai-operations-scaling',
    title: 'Operational Efficiency Audits',
    tagline: 'Identify time drains, automate administrative friction, and scale without bloating overhead.',
    description: 'A comprehensive operational audit of your business processes. We pinpoint where manual repetitive tasks are costing you money and install proven AI-driven solutions.',
    metricsImpact: 'Typically frees up 30% to 50% of founder and managerial time spent on low-leverage admin.',
    deliverables: [
      'End-to-end operational bottleneck and friction audit',
      'Prioritized AI automation opportunity roadmap with estimated ROI',
      'Implementation of internal knowledge-base search and SOP assistant',
      'Security, privacy, and data-protection compliance checklist'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus V.',
    title: 'Managing Director & Business Owner',
    organization: 'Logistics & Distribution',
    verifiedResult: 'Full ISA & SIPP Optimization + Automated Cash Flow',
    quote: 'Before EB Wealth, all my money was sitting in business cash earning near zero, losing purchasing power every year. The mentorship gave me the exact framework to separate business capital from personal wealth and build a balanced, tax-efficient portfolio.',
    program: 'Growth Mentorship'
  },
  {
    id: 'test-2',
    name: 'Sophie T.',
    title: 'NHS Consultant & Private Practitioner',
    organization: 'Healthcare',
    verifiedResult: 'Mastered Index Investing from Ground Zero',
    quote: 'I used to find financial discussions intimidating and full of jargon. The EB Wealth Academy broke down stocks, ETFs, and UK tax wrappers into clear, logical steps. I now manage my own Stocks & Shares ISA with complete confidence.',
    program: 'EB Wealth Academy'
  },
  {
    id: 'test-3',
    name: 'David A.',
    title: 'Founder & Agency Operator',
    organization: 'Creative & Tech Agency',
    verifiedResult: '15+ Hours Saved Weekly via AI Workflows',
    quote: 'The AI business growth advisory was worth every penny. EB Wealth showed us how to build custom prompt systems and automate our client onboarding. We increased our output without hiring additional staff.',
    program: 'AI Business Growth'
  },
  {
    id: 'test-4',
    name: 'Amir K.',
    title: 'Senior Software Engineer',
    organization: 'FinTech',
    verifiedResult: 'Disciplined Investment Strategy & Accountability',
    quote: 'Having the accountability and objective feedback in 1-on-1 coaching kept me on track. I stopped chasing speculative trends and built a solid, long-term portfolio backed by real research.',
    program: '1-to-1 Coaching'
  }
];

export const REGULATORY_DISCLAIMER_SHORT =
  'EB Wealth provides financial education, personal development, mentorship and business growth consulting. We do not provide regulated financial advice, personal investment recommendations or asset management services. Investments can rise and fall in value, and you may get back less than you invest. You should consider your own circumstances, objectives and risk tolerance and seek regulated financial advice where appropriate.';

export const REGULATORY_DISCLAIMER_FULL = `
EB WEALTH REGULATORY DISCLAIMER & IMPORTANT DISCLOSURES

1. Educational & Informational Nature
EB Wealth (operating under the Empowerment Body brand) is a financial education, personal development, mentorship and business consultancy organization. EB Wealth is NOT authorised or regulated by the UK Financial Conduct Authority (FCA), nor is it a licensed financial advisory firm, broker, bank, investment manager, or tax advisory practice. 

2. No Regulated Financial Advice
Nothing on this website, in our Academy courses, mobile application, mentorship programs, coaching sessions, or supplementary tools constitutes regulated financial advice, investment advice, tax advice, or a personal recommendation to buy, hold, or sell any financial instrument. All information is provided strictly for general educational, conceptual, and informational purposes.

3. Investment Risk Warning
Investments can rise and fall in value. You may get back less than you invest. Past performance is never a reliable guide to future returns. Different financial instruments carry varying degrees of risk, volatility, and liquidity. You should carefully consider your own financial circumstances, objectives, time horizon, and risk tolerance before making any investment decision.

4. Seek Independent Advice
Where personal financial, investment, pension, legal, or tax advice is required, you should always consult an FCA-authorised Independent Financial Adviser (IFA), qualified tax specialist, or legal solicitor.

5. AI & Business Consulting
AI business growth frameworks, prompt engineering templates, and automation workflows are provided to assist productivity and business efficiency. Results may vary depending on business model, execution, and external market factors. EB Wealth makes no guarantees of specific revenue or financial returns.
`;
