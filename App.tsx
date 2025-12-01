
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Search, Settings, Building2, Plus, FileText, MonitorPlay, PenTool, LogOut } from 'lucide-react';
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
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { getJobs, addJob as apiAddJob, updateJob as apiUpdateJob, deleteJob as apiDeleteJob } from './services/jobService';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

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

  const { currentUser } = useAuth();

  useEffect(() => {
    // Hydrate companies from the OCR data
    const parsedCompanies = parseCompanyData(RAW_OCR_DATA);
    setCompanies(parsedCompanies);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      if (currentUser) {
        const userJobs = await getJobs();
        setJobs(userJobs);
      } else {
        setJobs([]);
      }
    };
    fetchJobs();
  }, [currentUser]);

  const addJob = async (job: Job) => {
    // Optimistic update or wait for server? Let's wait for server to get ID
    const { id, ...jobData } = job; // Remove ID if it's temporary
    const newJob = await apiAddJob(jobData);
    if (newJob) {
      setJobs(prev => [...prev, newJob]);
    }
  };

  const updateJobStatus = async (id: string, status: JobStatus) => {
    // Optimistic update
    setJobs(prev => prev.map(job => job.id === id ? { ...job, status } : job));
    await apiUpdateJob(id, { status });
  };

  const removeJob = async (id: string) => {
    // Optimistic update
    setJobs(prev => prev.filter(job => job.id !== id));
    await apiDeleteJob(id);
  };

  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
                  <Sidebar />
                  <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto p-4 md:p-8">
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
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
        <div className="flex items-center gap-3 px-4 py-3 text-sm text-slate-500 mt-2">
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
