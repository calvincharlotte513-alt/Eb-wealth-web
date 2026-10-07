import { Course, MentorshipTier, CoachingPackage, AIService, Testimonial } from '../types';

export const COURSES: Course[] = [
  {
    id: 'course-foundations',
    title: 'Foundations of Sovereign Capital',
    subtitle: 'Modern Portfolio Architecture & Dynamic Asset Allocation',
    level: 'Beginner',
    duration: '6 Weeks (Self-Paced + Live Q&A)',
    modulesCount: 8,
    accessTier: 'Executive Member Pass',
    description:
      'A structured, institutional-grade masterclass designed to take you from foundational financial literacy to confident, self-directed capital allocation without relying on high-fee intermediaries.',
    keyOutcomes: [
      'Master modern portfolio theory (MPT) and asymmetrical risk-reward ratios',
      'Construct a bulletproof diversified core portfolio across equities, debt, and cash reserves',
      'Eliminate predatory advisor fees and automate dollar-cost averaging pipelines',
      'Develop psychological emotional resilience during high-volatility market cycles'
    ],
    modules: [
      {
        title: 'Module 1: The Macroeconomic Landscape & Capital Preservation',
        topics: ['Fiat currency debasement', 'Inflation hedged assets', 'Central bank interest rate cycles']
      },
      {
        title: 'Module 2: Balance Sheet Restructuring & Liquidity Architecture',
        topics: ['Liquid reserves staging', 'Debt optimization', 'Emergency capital vs opportunistic dry powder']
      },
      {
        title: 'Module 3: Global Equity Index Alpha & ETF Selection',
        topics: ['Broad-market indexes', 'Factor tilts (Value, Quality, Momentum)', 'Expense ratio minimization']
      },
      {
        title: 'Module 4: Fixed Income & Yield Instruments',
        topics: ['Treasury ladders', 'Corporate credit risk evaluation', 'Money market liquidity mechanics']
      }
    ],
    featured: true
  },
  {
    id: 'course-alternatives',
    title: 'Alternative Assets & Private Market Alpha',
    subtitle: 'Real Estate Syndication, Private Credit & Strategic Equity',
    level: 'Intermediate',
    duration: '8 Weeks (Interactive Labs)',
    modulesCount: 10,
    accessTier: 'Accredited Investor Pass',
    description:
      'Go beyond traditional 60/40 index models. Learn how ultra-wealthy family offices allocate into cash-flowing private debt, commercial real estate syndications, and unlisted business acquisitions.',
    keyOutcomes: [
      'Evaluate private credit deals, cap rates, and preferred equity waterfalls',
      'Conduct rigorous due diligence on real estate syndications and private funds',
      'Structure passive cashflow vehicles generating consistent annual distributions',
      'Stress-test private asset liquidity horizons against economic downturns'
    ],
    modules: [
      {
        title: 'Module 1: Private Debt & Asset-Backed Lending Mechanics',
        topics: ['First-lien security', 'LTV covenants', 'Underwriting private borrower risks']
      },
      {
        title: 'Module 2: Real Estate Syndication Underwriting',
        topics: ['Pro forma financial models', 'Cap rate compression analysis', 'Sponsor track record audits']
      },
      {
        title: 'Module 3: Small Business Acquisitions (Micro-PE)',
        topics: ['SBA-leveraged buyouts', 'EBITDA multiples', 'Post-acquisition operational levers']
      },
      {
        title: 'Module 4: Gold, Commodities & Digital Store-of-Value',
        topics: ['Physical bullion custody', 'Commodity cycles', 'Digital asset allocation boundaries']
      }
    ]
  },
  {
    id: 'course-generational',
    title: 'Generational Wealth & Entity Blueprint',
    subtitle: 'Trust Structures, Tax Optimization & Legacy Governance',
    level: 'Advanced',
    duration: '6 Weeks (Executive Cohort)',
    modulesCount: 6,
    accessTier: 'Family Office & Trust Pass',
    description:
      'Wealth creation is only half the battle; retention and multi-generational compounding require institutional legal, tax, and trust architecture that insulates assets from liability and erosion.',
    keyOutcomes: [
      'Design corporate entity holding structures that shield personal liability',
      'Understand revocable vs irrevocable trust frameworks for intergenerational transfer',
      'Implement lawful tax reduction strategies utilizing depreciation and asset protection',
      'Draft a binding Family Wealth Constitution and governance doctrine'
    ],
    modules: [
      {
        title: 'Module 1: Holding Companies & Asset Protection Firewalls',
        topics: ['Dual-tier LLC structures', 'Foreign vs domestic jurisdictions', 'Piercing the veil protection']
      },
      {
        title: 'Module 2: Trust Architectures & Estate Governance',
        topics: ['Spendthrift provisions', 'Dynasty trusts', 'Successor trustee management protocols']
      },
      {
        title: 'Module 3: Tax-Advantaged Compounding & Capital Gains Optimization',
        topics: ['Asset restructuring', 'Cost segregation', 'Charitable trust frameworks']
      }
    ]
  },
  {
    id: 'course-ai-investing',
    title: 'AI Intelligence for Market Research',
    subtitle: 'Algorithmic Screening, SEC Filing Parsing & Prompt Engineering',
    level: 'All Levels',
    duration: '4 Weeks (Practical Hands-On)',
    modulesCount: 6,
    accessTier: 'Applied AI Masterclass Pass',
    description:
      'Harness customized AI prompt engineering workflows to read 10-K filings in seconds, extract competitor moat indicators, and automate macro data scraping for faster, smarter investment decisions.',
    keyOutcomes: [
      'Deploy custom LLM prompts tailored for forensic financial statement analysis',
      'Automate earnings call sentiment extraction and management guidance tracking',
      'Build your own private market intelligence vector database without coding',
      'Synthesize complex multi-source analyst notes into high-clarity 1-page investment briefs'
    ],
    modules: [
      {
        title: 'Module 1: Financial Prompt Engineering Architecture',
        topics: ['Context window management', 'Zero-shot vs few-shot financial reasoning', 'Hallucination defense']
      },
      {
        title: 'Module 2: Automated SEC 10-K & 10-Q Deep Auditing',
        topics: ['Footnote parsing', 'Executive compensation triggers', 'Related-party transaction flags']
      },
      {
        title: 'Module 3: Macro & Industry Competitive Landscape Intelligence',
        topics: ['Supply chain bottleneck screening', 'Consumer trend scraping', 'Synthesized risk matrices']
      }
    ]
  }
];

export const MENTORSHIP_TIERS: MentorshipTier[] = [
  {
    id: 'mentorship-accelerator',
    title: 'Advisory Circle',
    badge: 'Cohort Mentorship',
    tagline: 'Direct monthly strategy labs, curated group accountability, and vetted deal discussions.',
    commitment: '3-Month Immersion',
    format: 'Bi-Weekly Live Masterminds + Private Forum',
    priceNote: 'Application required · Limited to 15 seats per cohort',
    deliverables: [
      'Bi-weekly group portfolio review & macro strategy sessions',
      'Full, unrestricted access to EB Wealth Academy curricula & tools',
      'Private peer mastermind network of verified investors & operators',
      'Vetted deal breakdown tear-downs (real estate & private equity)',
      'Direct monthly Q&A with Founder & CEO and guest institutional managers'
    ],
    idealFor: 'High-earning professionals & emerging founders scaling liquid capital allocation.'
  },
  {
    id: 'mentorship-executive',
    title: 'Private Executive Mentorship',
    badge: 'Premier 1-on-1 Advisory',
    tagline: 'Private, tailored partnership with the Founder & CEO. Bespoke portfolio design, capital strategy, and enterprise expansion.',
    commitment: '6-Month Private Retainer',
    format: '1-on-1 Private Sessions + Direct VIP Communications',
    priceNote: 'Selective admission · Confidential interview required',
    featured: true,
    deliverables: [
      'Private bi-weekly 60-minute strategic sessions directly with the Founder & CEO',
      'Dedicated bespoke portfolio blueprint customized to your tax & family profile',
      'Direct priority WhatsApp & Signal private advisory channel for time-sensitive decisions',
      'Complete private equity and syndication deal analysis prior to capital commitment',
      'Custom AI business architecture blueprint tailored to your primary revenue engine',
      'Invitations to annual private EB Wealth closed-door investor retreats'
    ],
    idealFor: 'Accredited investors, executives, and high-net-worth business owners scaling sovereign capital.'
  }
];

export const COACHING_PACKAGES: CoachingPackage[] = [
  {
    id: 'coaching-clarity',
    title: '90-Minute Strategic Wealth Blueprint',
    duration: '90 Minutes (Intensive 1:1)',
    accessTier: 'Private Consultation',
    description:
      'A forensic 1-on-1 deep dive into your existing asset allocation, cash flow bottlenecks, and risk vulnerabilities. Walk away with an actionable 3-phase execution roadmap.',
    features: [
      'Comprehensive pre-call financial audit questionnaire analysis',
      '90 minutes of dedicated one-on-one video consultation',
      'Identification of fee leakages, redundant funds, and tax inefficiencies',
      'Customized asset allocation target model (conservative, balanced, or alpha-focused)',
      'Full session recording + annotated PDF action plan delivered within 24 hours'
    ],
    recommendedFor: 'Those seeking immediate clarity before making major portfolio moves or reallocating capital.'
  },
  {
    id: 'coaching-retainer',
    title: 'Executive Accountability & Business Sprint',
    duration: '90-Day Sprint (Weekly Check-ins)',
    accessTier: 'Executive Retainer',
    description:
      'Consistent execution produces compounding wealth. Weekly high-level check-ins to hold you accountable to your capital targets, enterprise margins, and investment allocations.',
    features: [
      'Initial 75-minute onboarding & goals calibration session',
      'Weekly 30-minute high-focus accountability check-ins (12 total sessions)',
      'KPI and cash reserve tracking dashboards',
      'Continuous review of prospective deals and business operational bottlenecks',
      'Mid-sprint strategy recalibration and ongoing asynchronous advisory support'
    ],
    recommendedFor: 'Entrepreneurs and business leaders balancing company scaling with disciplined personal investing.'
  }
];

export const AI_GROWTH_SERVICES: AIService[] = [
  {
    id: 'ai-prompt-engineering',
    title: 'High-Impact Prompt Architecture',
    tagline: 'Bespoke prompt systems that turn generic AI outputs into high-precision commercial work.',
    description:
      'We engineer domain-specific system prompts, contextual memory structures, and verification loops that empower your team to produce executive-grade research, marketing copy, and customer correspondence effortlessly.',
    metricsImpact: 'Save 15+ hours/week per operator while boosting communication consistency',
    deliverables: [
      'Proprietary executive prompt library tailored to your specific industry',
      'Contextual system instruction templates designed to prevent hallucination',
      'Structured few-shot prompt workflows for complex sales proposals and reports',
      'Live hands-on team enablement training session with recorded playbooks'
    ]
  },
  {
    id: 'ai-autonomous-workflows',
    title: 'Autonomous Client Acquisition & Qualification',
    tagline: 'Transform inbound leads into booked high-ticket discovery calls on autopilot.',
    description:
      'Deploy intelligent AI conversational agents that nurture, pre-qualify, and schedule prospective high-value clients across email, web forms, and messaging channels with personalized human-level nuance.',
    metricsImpact: 'Increase lead-to-call conversion rates by up to 34% with sub-2-minute response times',
    deliverables: [
      'Multi-channel inbound lead screening pipeline integrated with your CRM',
      'Dynamic qualification rubric scoring client budget, readiness, and fit',
      'Automated calendar scheduling integration with reminder sequences',
      'Analytics dashboard tracking lead velocity, qualification rate, and revenue pipeline'
    ]
  },
  {
    id: 'ai-operations-scaling',
    title: 'Operations Optimization & Custom Agent Tooling',
    tagline: 'Scale revenue without proportional headcount increases through AI agent workflows.',
    description:
      'From automated invoice auditing and contract data extraction to internal team knowledge synthesis, we build end-to-end operational intelligence that frees founders from repetitive friction.',
    metricsImpact: 'Reduce administrative overhead costs by up to 45% in the first 90 days',
    deliverables: [
      'Full operational friction audit and AI automation opportunity matrix',
      'Custom retrieval-augmented generation (RAG) agent for your internal SOPs',
      'Document parsing pipelines for financial statements, receipts, and client filings',
      'Ongoing workflow maintenance, security audits, and latency optimization'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    title: 'Founder & CEO',
    organization: 'Vance Logistics Group',
    verifiedResult: 'Significant Allocation Shift & 42% Tax Drag Reduction',
    quote:
      'Working directly with the Founder & CEO of EB Wealth completely reshaped how I think about liquidity. For years my wealth was trapped solely inside my company. Today, I have a diversified private portfolio and an entity structure that protects my family.',
    program: 'Private Executive Mentorship'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    title: 'Principal Architect & Investor',
    organization: 'Rostova Design Lab',
    verifiedResult: '3 Syndication Deals Closed with Consistent Net Yield',
    quote:
      'The EB Wealth Academy demystified private market deals in a way no financial blog ever could. The due diligence models and underwriting criteria alone saved me from a catastrophic real estate sponsor blunder.',
    program: 'EB Wealth Academy'
  },
  {
    id: 'test-3',
    name: 'David Adeleke',
    title: 'Managing Director',
    organization: 'Apex Media & Software',
    verifiedResult: '18 Hours/Week Saved & Substantial Revenue Lift via AI',
    quote:
      'The AI business growth systems implemented by EB Wealth transformed our client acquisition. Their prompt engineering frameworks and workflow automation allowed us to double deal volume without hiring new managers.',
    program: 'AI Business Growth Advisory'
  }
];

export const REGULATORY_DISCLAIMER_SHORT =
  'EB Wealth is an educational and business consultancy platform. All content, mentorship, and coaching are provided solely for informational and educational purposes and do not constitute individualized investment, legal, tax, or regulatory advice. Investing involves risk of capital loss. Past performance does not guarantee future results.';

export const REGULATORY_DISCLAIMER_FULL = `
REGULATORY DISCLOSURES & RISK DISCLAIMERS
Last Updated: October 2026

1. Educational & Consultancy Nature
EB Wealth ("Empowerment Body", "EB Wealth", "we", "us", or "our") provides educational curricula, mentorship frameworks, strategic business coaching, and AI automation consulting. EB Wealth is NOT a registered investment adviser (RIA), broker-dealer, commodity trading advisor, legal firm, or certified public accounting practice with the U.S. Securities and Exchange Commission (SEC), Financial Industry Regulatory Authority (FINRA), UK Financial Conduct Authority (FCA), or any other regulatory body.

2. No Personalized Investment or Financial Advice
Nothing on this website, in our Academy courses, mentorship sessions, or coaching materials should be construed as personalized investment, financial, legal, or tax advice. Any strategies, hypothetical portfolio weights, or case studies presented are for illustrative, instructional, and conceptual purposes only. You must consult a licensed independent financial advisor, certified tax specialist, and legal counsel prior to making any financial commitments.

3. Inherent Risks of Investing
All investments—including public equities, index funds, private credit, commercial real estate syndications, and alternative assets—carry substantial risk of loss, including the potential loss of principal invested. Market conditions fluctuate unpredictably, and diversification cannot guarantee profits or insulate against market downturns.

4. Testimonials & Performance Statements
Testimonials, endorsements, and case studies featured on this website reflect the real-world experiences of specific individuals and organizations. These outcomes are not typical, cannot be guaranteed, and do not represent a promise that any current or future client will achieve similar investment returns, tax savings, or business revenues.

5. Technology & AI Capabilities
Our AI business growth guidance and prompt engineering frameworks are provided to enhance productivity and organizational workflow efficiency. EB Wealth does not guarantee specific software uptime, third-party AI provider behavior, or algorithmic investment efficacy. Users remain solely responsible for validating all AI-generated outputs and maintaining compliance with applicable consumer protection and privacy standards.
`;
