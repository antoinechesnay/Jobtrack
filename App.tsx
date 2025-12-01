
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Search, Settings, Building2, Plus, FileText, MonitorPlay, PenTool } from 'lucide-react';
import { CompanyList } from './components/CompanyList';
import { JobBoard } from './components/JobBoard';
import { Dashboard } from './components/Dashboard';
import { JobSearch } from './components/JobSearch';
import { CVAnalyzer } from './components/CVAnalyzer';
import { InterviewPrep } from './components/InterviewPrep';
import { CoverLetterGenerator } from './components/CoverLetterGenerator';
import { parseCompanyData } from './utils';
import { RAW_OCR_DATA } from './constants';
import { Company, Job, JobStatus, SearchResult } from './types';

const App: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);

  // -- Job Search Persistence State --
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchMatchScores, setSearchMatchScores] = useState<Record<string, number>>({});
  const [searchAdvice, setSearchAdvice] = useState<Record<string, string>>({});
  const [searchCvContext, setSearchCvContext] = useState<{ searchQuery: string, skills: string[] } | null>(null);

  useEffect(() => {
    // Hydrate companies from the OCR data
    const parsedCompanies = parseCompanyData(RAW_OCR_DATA);
    setCompanies(parsedCompanies);

    // Load initial sample jobs or locaStorage (mock for now)
    const initialJobs: Job[] = [
      {
        id: '1',
        companyName: 'Google',
        position: 'Senior React Engineer',
        status: JobStatus.APPLIED,
        dateApplied: '2023-10-25',
        location: 'London, UK',
        notes: 'Referral from John Doe'
      },
      {
        id: '2',
        companyName: 'Microsoft',
        position: 'Frontend Developer',
        status: JobStatus.TO_BE_APPLIED,
        location: 'Remote',
        notes: 'Need to update CV first'
      },
      {
        id: '3',
        companyName: 'Amazon',
        position: 'UX Enineer',
        status: JobStatus.NEXT_ROUND,
        dateApplied: '2023-10-20',
        location: 'Berlin, DE',
        notes: 'Interview scheduled for Friday'
      }
    ];
    setJobs(initialJobs);

    // Check for API Key
    if (process.env.API_KEY) {
      setIsApiKeySet(true);
    }
  }, []);

  const addJob = (job: Job) => {
    setJobs(prev => [...prev, job]);
  };

  const updateJobStatus = (id: string, status: JobStatus) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, status } : job));
  };

  const removeJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <HashRouter>
      <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <ApiKeyBanner isSet={isApiKeySet} />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard jobs={jobs} companies={companies} />} />
              <Route path="/companies" element={<CompanyList companies={companies} onFindJobs={(company) => console.log(company)} />} />
              <Route path="/board" element={<JobBoard jobs={jobs} onUpdateStatus={updateJobStatus} onDelete={removeJob} />} />
              <Route
                path="/search"
                element={
                  <JobSearch
                    companies={companies}
                    onAddJob={addJob}
                    // Pass persisted state
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    location={searchLocation}
                    setLocation={setSearchLocation}
                    results={searchResults}
                    setResults={setSearchResults}
                    matchScores={searchMatchScores}
                    setMatchScores={setSearchMatchScores}
                    advice={searchAdvice}
                    setAdvice={setSearchAdvice}
                    cvContext={searchCvContext}
                    setCvContext={setSearchCvContext}
                  />
                }
              />
              <Route path="/cv-analysis" element={<CVAnalyzer />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/cover-letter" element={<CoverLetterGenerator />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/search', icon: Search, label: 'AI Search' },
    { path: '/cv-analysis', icon: FileText, label: 'CV Analyzer' },
    { path: '/cover-letter', icon: PenTool, label: 'Cover Letter Gen' },
    { path: '/interview-prep', icon: MonitorPlay, label: 'Interview Coach' },
    { path: '/board', icon: Briefcase, label: 'My Applications' },
    { path: '/companies', icon: Building2, label: 'Researched Companies' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          JobTrack AI
        </h1>
        <p className="text-xs text-slate-500 mt-1">Smart Application Tracker</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                ? 'bg-blue-50 text-blue-700 shadow-sm font-medium'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <item.icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-3 text-sm text-slate-500">
          <Settings size={18} />
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};

const ApiKeyBanner = ({ isSet }: { isSet: boolean }) => {
  if (isSet) return null;
  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
      <span className="font-bold">⚠️ API Key Missing:</span>
      <span>Please ensure `process.env.API_KEY` is set to use AI features.</span>
    </div>
  );
};

export default App;
