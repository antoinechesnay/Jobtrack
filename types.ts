
export enum JobStatus {
  TO_BE_APPLIED = 'To be applied',
  APPLIED = 'Applied',
  RESULT = 'Result', // Could mean waiting for result or initial screen
  NEXT_ROUND = 'Next round',
  DECLINED = 'Declined',
  OFFER = 'Offer'
}

export interface Company {
  name: string;
  website: string;
  description: string;
  country: string;
  headcount: string;
  founded: string;
  industry: string;
}

export interface Job {
  id: string;
  companyName: string;
  position: string;
  status: JobStatus;
  location?: string;
  url?: string;
  dateApplied?: string;
  notes?: string;
}

export interface SearchResult {
  title: string;
  company: string;
  url: string;
  snippet: string;
  location?: string;
  salary?: string;
  postedAt?: string;
  matchScore?: number; // 0-100
}

export interface CVAnalysisResult {
  summary: string;
  skills: string[];
  suggestedRoles: string[];
  strengths: string[];
  weaknesses: string[];
  mentorVerdict: string;
  searchQuery: string;
  experienceLevel: string;
}

export interface InterviewPrepResult {
  roleOverview: string;
  technicalQuestions: string[];
  behavioralQuestions: string[];
  tips: string[];
}

export interface VideoResource {
  title: string;
  url: string;
  channel?: string;
  thumbnail?: string;
}

export interface CoverLetterResult {
  letterContent: string;
  compatibilityScore: number;
  gapAnalysis: string;
  customizationTips: string[];
}
