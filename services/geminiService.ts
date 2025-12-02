
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
    console.error("Search Error:", error);
    return [];
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
