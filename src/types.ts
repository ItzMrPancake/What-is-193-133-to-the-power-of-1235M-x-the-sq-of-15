export type PlanId = 'basic' | 'plus' | 'custom';

export interface MaintenancePlan {
  id: PlanId;
  name: string;
  price: number;
  period: string;
  badge?: string;
  tagline: string;
  features: string[];
  smallUpdatesLimit: number;
  layoutEditsLimit: number;
  extraSmallEditCost: number;
  extraBigEditCost?: number;
  extraEditCostNote: string;
  idealFor: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  summary: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  maintenancePlanUsed: string;
  liveUrlMock?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'plans' | 'process' | 'technical';
}

export interface IntakeFormData {
  planId: PlanId;
  name: string;
  email: string;
  websiteUrl: string;
  monthlyUpdatesEstimate: number;
  notes: string;
}
