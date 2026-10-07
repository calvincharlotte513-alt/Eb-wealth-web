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

export interface MentorshipTier {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  commitment: string;
  format: string;
  priceNote: string;
  deliverables: string[];
  idealFor: string;
  featured?: boolean;
}

export interface CoachingPackage {
  id: string;
  title: string;
  duration: string;
  accessTier: string;
  price?: number;
  description: string;
  features: string[];
  recommendedFor: string;
}

export interface AIService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  metricsImpact: string;
  deliverables: string[];
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
