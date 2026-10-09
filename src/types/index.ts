export interface Course {
  id: string;
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  modulesCount: number;
  accessTier: string;
  price?: number;
  description: string;
  keyOutcomes: string[];
  modules: {
    title: string;
    topics: string[];
  }[];
  featured?: boolean;
}

export interface Masterclass {
  id: string;
  title: string;
  tagline: string;
  category: 'Beginners' | 'Stocks & Shares' | 'ETFs & Index Investing' | 'ISAs & Tax Shelters' | 'Portfolio Building';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  format: string;
  description: string;
  whatYouWillLearn: string[];
  whoItIsFor: string;
  prerequisites: string;
  featured?: boolean;
}

export interface MentorshipTier {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  commitment: string;
  format: string;
  priceNote: string;
  featured?: boolean;
  deliverables: string[];
  idealFor: string;
}

export interface CoachingPackage {
  id: string;
  title: string;
  duration: string;
  accessTier: string;
  description: string;
  features: string[];
  recommendedFor: string;
}

export interface EducationalResource {
  id: string;
  title: string;
  category: 'Beginner Guide' | 'ETF Education' | 'Stock Education' | 'ISA Education' | 'Portfolio Construction' | 'Glossary' | 'Checklist';
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  contentSnippet?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'All Levels';
}

export interface InvestmentTopic {
  id: string;
  name: string;
  headline: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyPoints: string[];
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  verifiedResult: string;
  quote: string;
  program: string;
}
