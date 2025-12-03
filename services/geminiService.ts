
import { SearchResult, CVAnalysisResult, InterviewPrepResult, VideoResource, CoverLetterResult } from "../types";

import { auth } from "../firebase";

const API_URL = import.meta.env.VITE_API_URL || 'https://jobtrack-backend-955085072936.europe-west4.run.app/api';

const getAuthHeaders = async () => {
  const token = await auth.currentUser?.getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const searchJobsWithGemini = async (query: string, location: string = ""): Promise<SearchResult[]> => {
  try {
    const response = await fetch(`${API_URL}/search-jobs`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({ query, location })
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.warn("Search API failed, returning MOCK DATA for demo:", error);
    // Fallback mock data for demo purposes
    return [
      {
        title: "Senior Data Analyst",
        company: "FinTech Global",
        location: "London, UK",
        salary: "£65,000 - £85,000",
        postedAt: "2 days ago",
        snippet: "Looking for an experienced Data Analyst to join our growing team. SQL, Python, and Tableau skills required.",
        url: "https://example.com/job1",
        matchScore: 92
      },
      {
        title: "Data Scientist",
        company: "HealthAI Solutions",
        location: "Remote (UK)",
        salary: "£70,000 - £90,000",
        postedAt: "5 hours ago",
        snippet: "Join us to build the future of healthcare. Strong background in machine learning and statistical analysis needed.",
        url: "https://example.com/job2",
        matchScore: 88
      },
      {
        title: "Junior Data Analyst",
        company: "E-commerce Giant",
        location: "London, UK",
        salary: "£35,000 - £45,000",
        postedAt: "1 day ago",
        snippet: "Great opportunity for a graduate. You will be working with large datasets to optimize our supply chain.",
        url: "https://example.com/job3",
        matchScore: 75
      },
      {
        title: "Lead Data Engineer",
        company: "DataCorp",
        location: "London, UK",
        salary: "£90,000 - £110,000",
        postedAt: "3 days ago",
        snippet: "We need a leader to build our data infrastructure. Experience with AWS, Spark, and Airflow is a must.",
        url: "https://example.com/job4",
        matchScore: 85
      }
    ];
  }
};

export const calculateMatchScore = async (jobTitle: string, jobSnippet: string, userSkills: string[]): Promise<number> => {
  try {
    const response = await fetch(`${API_URL}/match-score`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({ jobTitle, jobSnippet, userSkills })
    });
    if (!response.ok) return 0;
    const data = await response.json();
    return data.score;
  } catch (e) {
    return 0;
  }
};

export const generateJobAdvice = async (jobTitle: string, company: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/job-advice`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({ jobTitle, company })
    });
    if (!response.ok) return "Error generating advice.";
    const data = await response.json();
    return data.advice;
  } catch (e) {
    return "Error generating advice.";
  }
};

export const analyzeCV = async (cvText: string): Promise<CVAnalysisResult | null> => {
  try {
    const response = await fetch(`${API_URL}/analyze-cv`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({ cvText })
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("CV Analysis Error:", error);
    return null;
  }
};

export const getInterviewPrep = async (role: string, company: string = ""): Promise<InterviewPrepResult | null> => {
  try {
    const response = await fetch(`${API_URL}/interview-prep`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({ role, company })
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Interview Prep Error:", error);
    return null;
  }
};

export const searchYoutubeVideos = async (query: string): Promise<VideoResource[]> => {
  try {
    const response = await fetch(`${API_URL}/search-videos`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({ query })
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("YouTube Search Error:", error);
    return [];
  }
};

export const generateCoverLetter = async (cvText: string, jobDescription: string, companyName: string): Promise<CoverLetterResult | null> => {
  try {
    const response = await fetch(`${API_URL}/cover-letter`, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({ cvText, jobDescription, companyName })
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Cover Letter Gen Error:", error);
    return null;
  }
};
