
import React, { useState } from 'react';
import { generateCoverLetter } from '../services/geminiService';
import { CoverLetterResult } from '../types';
import { PenTool, Loader2, Copy, FileText, Building2, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

export const CoverLetterGenerator: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CoverLetterResult | null>(null);

  const handleGenerate = async () => {
    if (!cvText.trim() || !jobDescription.trim() || !companyName.trim()) return;
    setIsGenerating(true);
    const data = await generateCoverLetter(cvText, jobDescription, companyName);
    setResult(data);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    if (result?.letterContent) {
      navigator.clipboard.writeText(result.letterContent);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <PenTool className="text-blue-600" size={32} />
          Cover Letter Specialist
        </h2>
        <p className="text-slate-500 mt-2">
          Generate highly compatible cover letters following industry "Gold Standard" guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Left: Inputs */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Building2 size={16} /> Target Company
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <FileText size={16} /> Job Description (JD)
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full flex-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-sm"
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <FileText size={16} /> Your CV / Resume
            </label>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste your CV text here..."
              className="w-full flex-1 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-sm"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !cvText.trim() || !jobDescription.trim() || !companyName.trim()}
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : 'Analyze & Generate Letter'}
          </button>
        </div>

        {/* Right: Output */}
        <div className="flex flex-col gap-4 overflow-y-auto">
            {!result && !isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-12 text-center">
                    <PenTool size={48} className="mb-4 opacity-50" />
                    <p className="font-medium">Ready to write</p>
                    <p className="text-sm mt-2">Fill in the details to generate a tailored cover letter.</p>
                </div>
            )}

            {isGenerating && (
                 <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-slate-100 p-12 text-center">
                    <Loader2 size={48} className="animate-spin text-blue-600 mb-4" />
                    <p className="font-medium text-lg text-slate-800">Consulting Guidelines...</p>
                    <p className="text-sm text-slate-500 mt-2">Connecting your skills to {companyName}'s needs.</p>
                </div>
            )}

            {result && (
                <div className="space-y-4 animate-fade-in">
                    {/* Compatibility Score */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Role Compatibility</h3>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className={`text-3xl font-bold ${getScoreColor(result.compatibilityScore)}`}>
                                    {result.compatibilityScore}%
                                </span>
                                <span className="text-sm text-slate-400">match</span>
                            </div>
                        </div>
                        <div className="text-right max-w-xs">
                             <p className="text-xs text-slate-600 leading-snug">{result.gapAnalysis}</p>
                        </div>
                    </div>

                    {/* Editor / Preview */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
                        <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Generated Draft</span>
                            <button 
                                onClick={copyToClipboard}
                                className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm transition-all hover:shadow"
                            >
                                <Copy size={14} /> Copy Text
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={result.letterContent}
                            className="flex-1 p-6 w-full resize-none focus:outline-none text-slate-700 text-sm leading-relaxed font-serif"
                        />
                    </div>

                    {/* Tips */}
                    <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                        <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2 text-sm">
                            <AlertTriangle size={16} />
                            Customization Tips
                        </h4>
                        <ul className="space-y-2">
                            {result.customizationTips.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-amber-800">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
};
