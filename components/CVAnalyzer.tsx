
import React, { useState } from 'react';
import { analyzeCV } from '../services/geminiService';
import { CVAnalysisResult } from '../types';
import { FileText, Sparkles, Briefcase, ChevronRight, Loader2, CheckCircle, AlertCircle, TrendingUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CVAnalyzer: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CVAnalysisResult | null>(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!cvText.trim()) return;
    setIsAnalyzing(true);
    const analysis = await analyzeCV(cvText);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const handleFindJobs = () => {
    if (result) {
      navigate('/search', {
        state: {
          cvContext: {
            searchQuery: result.searchQuery,
            skills: result.skills
          }
        }
      });
    }
  };

  const handleSearchRole = (role: string) => {
    navigate(`/search?q=${encodeURIComponent(role)}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <FileText className="text-blue-600" size={32} />
          AI Mentor CV Review
        </h2>
        <p className="text-slate-500 mt-2">
          Get deep, actionable feedback from an AI Career Mentor and find jobs that match your exact skill profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-700">Resume / CV Content</label>
              <div className="relative">
                <input
                  type="file"
                  id="cv-upload"
                  className="hidden"
                  accept=".pdf,.docx,.txt,.md"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append('file', file);

                    try {
                      setIsAnalyzing(true);

                      // Get auth token
                      const { auth } = await import('../firebase');
                      const token = await auth.currentUser?.getIdToken();

                      if (!token) {
                        alert("You must be logged in to upload files.");
                        return;
                      }

                      // Use the same base URL logic as jobService
                      const API_URL = import.meta.env.VITE_API_URL || 'https://jobtrack-backend-955085072936.europe-west4.run.app/api';

                      const response = await fetch(`${API_URL}/parse-cv`, {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${token}`
                        },
                        body: formData,
                      });

                      if (!response.ok) {
                        const errData = await response.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to parse file');
                      }

                      const data = await response.json();
                      setCvText(data.text);
                    } catch (error: any) {
                      console.error("Error uploading file:", error);
                      alert(`Error: ${error.message || "Failed to read file"}`);
                    } finally {
                      setIsAnalyzing(false);
                    }
                  }}
                />
                <label
                  htmlFor="cv-upload"
                  className="text-xs text-blue-600 font-medium hover:text-blue-800 cursor-pointer flex items-center gap-1 bg-blue-50 px-2 py-1 rounded"
                >
                  <Sparkles size={12} />
                  Upload File (PDF/Docx)
                </label>
              </div>
            </div>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste your full resume text here or upload a file..."
              className="w-full flex-grow min-h-[400px] p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 text-sm leading-relaxed resize-none font-mono"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !cvText.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Get Mentor Feedback
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {!result && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-12 text-center min-h-[400px]">
              <Briefcase size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">Waiting for Candidate</p>
              <p className="text-sm max-w-xs mx-auto mt-2">Paste your CV to receive a SWOT analysis, role suggestions, and a hirability score.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center text-blue-600 rounded-xl bg-white p-12 min-h-[400px]">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="font-medium text-lg">AI Mentor is reading your CV...</p>
              <p className="text-slate-400 text-sm mt-2">Analyzing skills, gaps, and market fit.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fade-in pb-12">
              {/* Verdict Card */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg text-white">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="text-amber-400" size={20} />
                    Mentor Verdict
                  </h3>
                  <button
                    onClick={handleFindJobs}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-white/10"
                  >
                    <Search size={16} />
                    Find High Match Jobs
                  </button>
                </div>
                <p className="text-slate-200 italic leading-relaxed text-sm">"{result.mentorVerdict}"</p>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm">
                  <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                    <TrendingUp size={18} /> Strengths
                  </h4>
                  <ul className="space-y-2">
                    {result.strengths?.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
                  <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} /> Development Areas
                  </h4>
                  <ul className="space-y-2">
                    {result.weaknesses?.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0"></span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggested Roles */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-500" />
                  Recommended Roles
                </h3>
                <div className="space-y-3">
                  {result.suggestedRoles.map((role, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg group hover:bg-blue-50 hover:border-blue-100 transition-colors">
                      <span className="font-medium text-slate-700">{role}</span>
                      <button
                        onClick={() => handleSearchRole(role)}
                        className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:text-blue-700 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm"
                      >
                        Search <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
