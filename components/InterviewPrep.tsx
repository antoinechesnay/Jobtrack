
import React, { useState } from 'react';
import { getInterviewPrep, searchYoutubeVideos } from '../services/geminiService';
import { InterviewPrepResult, VideoResource } from '../types';
import { MonitorPlay, BookOpen, MessageSquare, Briefcase, Loader2, Youtube, ExternalLink, Lightbulb, Video } from 'lucide-react';

export const InterviewPrep: React.FC = () => {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prepData, setPrepData] = useState<InterviewPrepResult | null>(null);
  const [videos, setVideos] = useState<VideoResource[]>([]);

  const handleGenerate = async () => {
    if (!role.trim()) return;
    setIsGenerating(true);
    setPrepData(null);
    setVideos([]);

    try {
      // Run both requests in parallel for speed
      const [prepResult, videoResult] = await Promise.all([
        getInterviewPrep(role, company),
        searchYoutubeVideos(role)
      ]);

      setPrepData(prepResult);
      setVideos(videoResult);
    } catch (error) {
      console.error("Error generating prep material:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <MonitorPlay className="text-red-600" size={32} />
          Interview Coach
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Prepare for your next big opportunity with AI-generated questions, role insights, and curated video tutorials.
        </p>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex-1 relative">
             <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Job Role (e.g. Product Manager)"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
             />
          </div>
          <div className="flex-1 relative">
             <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company (Optional)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
             />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !role.trim()}
            className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:bg-slate-300 transition-all flex items-center gap-2 justify-center"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : 'Start Prep'}
          </button>
        </div>
      </div>

      {(prepData || videos.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          
          {/* Left Column: Study Guide */}
          <div className="lg:col-span-2 space-y-6">
            {prepData && (
              <>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <BookOpen className="text-blue-600" size={24} />
                    Role Overview
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{prepData.roleOverview}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="text-indigo-600" size={24} />
                    Common Questions
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-3 uppercase text-xs tracking-wider border-b pb-1">Technical</h4>
                        <ul className="space-y-3">
                            {prepData.technicalQuestions.map((q, i) => (
                                <li key={i} className="flex gap-3 text-slate-700">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                    <span>{q}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-3 uppercase text-xs tracking-wider border-b pb-1">Behavioral</h4>
                        <ul className="space-y-3">
                            {prepData.behavioralQuestions.map((q, i) => (
                                <li key={i} className="flex gap-3 text-slate-700">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                    <span>{q}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100 shadow-sm">
                  <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="text-amber-600" size={20} />
                    Success Tips
                  </h3>
                  <ul className="grid gap-3">
                      {prepData.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-amber-800 text-sm">
                              <span className="text-amber-500 mt-1">●</span>
                              {tip}
                          </li>
                      ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Video Library */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Video className="text-red-600" size={24} />
                Selected Videos
            </h3>
            
            {videos.length === 0 && !isGenerating && prepData && (
                <div className="p-4 bg-slate-50 text-slate-500 text-sm rounded-lg">
                    No videos found specifically for this query. Try a broader search.
                </div>
            )}

            <div className="space-y-4">
                {videos.map((video, idx) => (
                    <a 
                        key={idx} 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all group"
                    >
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                                <Youtube size={20} className="text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-1 group-hover:text-red-700 line-clamp-2">
                                    {video.title}
                                </h4>
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <span>Watch on YouTube</span>
                                    <ExternalLink size={10} />
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-900 text-sm mb-2">Pro Tip</h4>
                <p className="text-blue-700 text-xs leading-relaxed">
                    These videos are selected by AI based on your target role. Watch the mock interviews to understand what top recruiters are looking for.
                </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
