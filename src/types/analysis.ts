export interface SectionFeedback {
  score: number;
  feedback: string;
}

export interface AnalysisResult {
  overall_score: number;
  sections: {
    summary: SectionFeedback;
    experience: SectionFeedback;
    skills: SectionFeedback;
    education: SectionFeedback;
  };
  strengths: string[];
  improvements: string[];
  suitable_roles: string[];
}

export interface AnalyzeErrorResponse {
  error: string;
}
