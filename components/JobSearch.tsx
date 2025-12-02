
import React, { useState, useEffect } from 'react';
import { Company, Job, JobStatus, SearchResult } from '../types';
import { searchJobsWithGemini, generateJobAdvice, calculateMatchScore } from '../services/geminiService';
import { Search, Loader2, PlusCircle, ExternalLink, Sparkles, UserCheck, TrendingUp, X, MapPin, Filter, CheckCircle, Building2, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface JobSearchProps {
    companies: Company[];
    onAddJob: (job: Job) => Promise<string | null>;
    onRemoveJob: (id: string) => Promise<void>;
    existingJobs: Map<string, string>;
    // Lifted state props
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    results: SearchResult[];
    setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
    matchScores: Record<string, number>;
    setMatchScores: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    advice: Record<string, string>;
    setAdvice: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    cvContext: { searchQuery: string, skills: string[] } | null;
    setCvContext: React.Dispatch<React.SetStateAction<{ searchQuery: string, skills: string[] } | null>>;
}

const LOCATION_DATA: Record<string, string[]> = {
    "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Bristol", "Leeds", "Cambridge", "Oxford", "Remote"],
    "United States": ["New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Boston, MA", "Chicago, IL", "Los Angeles, CA", "Remote"],
    "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Remote"],
    "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Remote"],
    "Canada": ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary", "Remote"],
    "Netherlands": ["Amsterdam", "Rotterdam", "Utrecht", "Eindhoven", "Remote"],
    "Remote": ["Worldwide"]
};

export const JobSearch: React.FC<JobSearchProps> = ({
    companies,
    onAddJob,
    onRemoveJob,
    existingJobs,
    query,
    setQuery,
    location: searchLocation,
    setLocation: setSearchLocation,
    results,
    setResults,
    matchScores,
    setMatchScores,
    advice,
    setAdvice,
    cvContext,
    setCvContext
}) => {
    const [isSearching, setIsSearching] = useState(false);
    const [minMatchFilter, setMinMatchFilter] = useState<number>(0);

    // Local state for dropdowns
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    const routerLocation = useLocation();

    useEffect(() => {
        // Check for state passed from CV Analyzer
        const state = routerLocation.state as { cvContext?: { searchQuery: string, skills: string[] } } | null;
        const searchParams = new URLSearchParams(routerLocation.search);
        const queryParam = searchParams.get('q') || searchParams.get('company');
        const locationParam = searchParams.get('loc');

        // Only update if we have NEW context passed via navigation
        if (state?.cvContext) {
            setCvContext(state.cvContext);
            setQuery(state.cvContext.searchQuery);
            // Automatically trigger search for new context
            handleSearch(state.cvContext.searchQuery, searchLocation, state.cvContext.skills);
        } else if (queryParam && (queryParam !== query || (locationParam && locationParam !== searchLocation))) {
            // Update params if different
            setQuery(queryParam || query);
            if (locationParam) setSearchLocation(locationParam);

            handleSearch(queryParam || query, locationParam || searchLocation);
        }
    }, [routerLocation]);

    const handleSearch = async (overrideQuery?: string, overrideLocation?: string, skillsContext?: string[]) => {
        const q = overrideQuery || query;
        const loc = overrideLocation !== undefined ? overrideLocation : searchLocation;

        if (!q.trim()) return;

        setIsSearching(true);
        setResults([]);
        setMatchScores({});

        // Fallback context if not passed directly but exists in state
        const skills = skillsContext || cvContext?.skills;

        const data = await searchJobsWithGemini(q, loc);
        setResults(data);

        // If we have CV skills, calculate match scores for the results
        if (skills && skills.length > 0) {
            const scores: Record<string, number> = {};
            // Process in parallel
            await Promise.all(data.map(async (job) => {
                const score = await calculateMatchScore(job.title, job.snippet, skills);
                scores[job.url] = score;
            }));
            setMatchScores(scores);
            // Set default filter to 60 if we have matches, to encourage user to see good fits
            if (Object.keys(scores).length > 0) {
                // We keep it at 0 initially so user sees everything, but they can filter up
            }
        }

        setIsSearching(false);
    };

    const handleClear = () => {
        setQuery('');
        setSearchLocation('');
    };

    const handleToggleTrack = async (result: SearchResult) => {
        // Normalize URL for comparison (remove query params and trailing slash)
        const normalizeUrl = (url: string) => {
            try {
                const u = new URL(url);
                return u.origin + u.pathname.replace(/\/$/, '');
            } catch {
                return url;
            }
        };

        const resultUrl = normalizeUrl(result.url);

        // Check against normalized existing URLs
        let existingId: string | undefined;
        for (const [url, id] of existingJobs.entries()) {
            if (normalizeUrl(url) === resultUrl) {
                existingId = id;
                break;
            }
        }

        if (existingId) {
            // Untrack
            await onRemoveJob(existingId);
        } else {
            // Track
            const newJob: Job = {
                id: Date.now().toString(), // Temporary ID
                companyName: result.company,
                position: result.title,
                status: JobStatus.TO_BE_APPLIED,
                url: result.url,
                dateApplied: new Date().toISOString().split('T')[0],
                location: searchLocation || 'Remote',
                notes: matchScores[result.url] ? `AI Match Score: ${matchScores[result.url]}% ` : undefined
            };
            await onAddJob(newJob);

            if (!advice[result.url]) {
                const tips = await generateJobAdvice(result.title, result.company);
                setAdvice(prev => ({ ...prev, [result.url]: tips }));
            }
        }
    };

    // Filter results based on minMatchFilter
    const filteredResults = results.filter(result => {
        // If we have no scores, show all. If we have scores, check threshold.
        if (Object.keys(matchScores).length === 0) return true;
        const score = matchScores[result.url] || 0;
        return score >= minMatchFilter;
    });

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-slate-800">
                    {cvContext ? 'Smart Job Matching' : 'AI Job Search'}
                </h2>
                <p className="text-slate-500">
                    {cvContext
                        ? 'We found these roles based on your CV profile. Match scores indicate relevance.'
                        : 'Find active, direct job listings using Gemini\'s Search Grounding.'}
                </p>

                {cvContext && (
                    <div className="bg-green-50 text-green-700 text-sm py-2 px-4 rounded-full inline-flex items-center gap-2 mb-4 border border-green-100">
                        <UserCheck size={16} />
                        <span>Personalized results active</span>
                    </div>
                )}

                {/* Search Bar Container */}
                <div className="flex flex-col md:flex-row gap-2 max-w-4xl mx-auto items-stretch">
                    {/* Main Query Input */}
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Job title, keywords, or company..."
                            className="w-full pl-5 pr-12 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-lg"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 p-1"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    {/* Location Selection */}
                    <div className="flex flex-col sm:flex-row gap-2 md:w-2/5">
                        {/* Country Dropdown */}
                        <div className="relative w-full">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <MapPin size={20} />
                            </div>
                            <select
                                value={selectedCountry}
                                onChange={(e) => {
                                    setSelectedCountry(e.target.value);
                                    setSelectedCity(''); // Reset city when country changes
                                    setSearchLocation(e.target.value); // Default to country if no city selected
                                }}
                                className="w-full pl-11 pr-8 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-lg appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Country</option>
                                {Object.keys(LOCATION_DATA).map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                        {/* City Dropdown */}
                        <div className="relative w-full">
                            <select
                                value={selectedCity}
                                onChange={(e) => {
                                    setSelectedCity(e.target.value);
                                    setSearchLocation(`${e.target.value}, ${selectedCountry} `);
                                }}
                                disabled={!selectedCountry}
                                className="w-full pl-4 pr-8 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-lg appearance-none cursor-pointer disabled:bg-slate-50 disabled:text-slate-400"
                            >
                                <option value="" disabled>Select City</option>
                                {selectedCountry && LOCATION_DATA[selectedCountry]?.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={() => handleSearch()}
                        disabled={isSearching}
                        className="bg-blue-600 text-white px-8 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 transition-colors flex items-center justify-center shadow-sm"
                    >
                        {isSearching ? <Loader2 className="animate-spin" /> : <Search size={24} />}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {results.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <h3 className="text-lg font-bold text-slate-800">Results</h3>
                            <span className="text-sm text-slate-500 hidden sm:inline">Found {results.length} active listings</span>
                        </div>

                        {/* Match Filter Control */}
                        {Object.keys(matchScores).length > 0 && (
                            <div className="flex items-center gap-2">
                                <Filter size={16} className="text-slate-400" />
                                <span className="text-sm text-slate-600 font-medium">Min Match:</span>
                                <select
                                    value={minMatchFilter}
                                    onChange={(e) => setMinMatchFilter(Number(e.target.value))}
                                    className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50 focus:outline-none focus:border-blue-500"
                                >
                                    <option value={0}>All Jobs</option>
                                    <option value={50}>50%+</option>
                                    <option value={60}>60%+</option>
                                    <option value={70}>70%+</option>
                                    <option value={80}>80%+</option>
                                    <option value={90}>90%+</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {results.length === 0 && !isSearching && query && (
                    <div className="text-center py-12 text-slate-400">
                        <p>No results found. Try specific job titles or check back later.</p>
                    </div>
                )}

                {results.length > 0 && filteredResults.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <p>No jobs match your filter criteria ({minMatchFilter}%+). Try lowering the match score.</p>
                    </div>
                )}

                <div className="grid gap-4">
                    {filteredResults
                        .sort((a, b) => (matchScores[b.url] || 0) - (matchScores[a.url] || 0)) // Sort by score descending
                        .map((result, index) => {
                            const score = matchScores[result.url];

                            // Normalize URL for comparison
                            const normalizeUrl = (url: string) => {
                                try {
                                    const u = new URL(url);
                                    return u.origin + u.pathname.replace(/\/$/, '');
                                } catch {
                                    return url;
                                }
                            };
                            const resultUrl = normalizeUrl(result.url);
                            let isTracked = false;
                            for (const url of existingJobs.keys()) {
                                if (normalizeUrl(url) === resultUrl) {
                                    isTracked = true;
                                    break;
                                }
                            }
                            return (
                                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors relative overflow-hidden group">
                                    {/* Match Badge */}
                                    {score !== undefined && (
                                        <div className={`absolute top - 0 right - 0 px - 3 py - 1 rounded - bl - xl text - xs font - bold flex items - center gap - 1 shadow - sm
                            ${score >= 80 ? 'bg-green-500 text-white' :
                                                score >= 60 ? 'bg-amber-500 text-white' :
                                                    score >= 50 ? 'bg-orange-400 text-white' : 'bg-slate-200 text-slate-600'
                                            } `}>
                                            <TrendingUp size={12} />
                                            {score}% Match
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-xl text-slate-900 mb-1 leading-tight">{result.title}</h4>
                                            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mb-3 text-slate-600 font-medium text-sm">
                                                <div className="flex items-center gap-1.5">
                                                    <Building2 size={16} className="text-blue-600" />
                                                    {result.company}
                                                </div>

                                                {(result.location || searchLocation) && (
                                                    <div className="flex items-center gap-1.5 text-slate-500">
                                                        <MapPin size={16} className="text-slate-400" />
                                                        {result.location || searchLocation}
                                                    </div>
                                                )}

                                                {result.salary && (
                                                    <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                                                        <span className="font-bold">£</span>
                                                        {result.salary}
                                                    </div>
                                                )}

                                                {result.postedAt && (
                                                    <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                                        <Clock size={14} />
                                                        {result.postedAt}
                                                    </div>
                                                )}
                                            </div>
                                            <a
                                                href={result.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 hover:underline mb-4 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                <ExternalLink size={14} />
                                                Apply on Company Site
                                            </a>

                                            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{result.snippet}</p>

                                            {advice[result.url] && (
                                                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800 flex gap-2 animate-fade-in">
                                                    <Sparkles size={16} className="shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-bold block text-xs uppercase tracking-wider mb-1">AI Interview Tips</span>
                                                        {advice[result.url]}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleToggleTrack(result)}
                                            className={`shrink - 0 flex items - center gap - 2 px - 6 py - 2.5 rounded - lg transition - all text - sm font - medium sm: mt - 0 mt - 2 w - full sm: w - auto justify - center shadow - sm
                            ${isTracked
                                                    ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                                                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md'
                                                } `}
                                        >
                                            {isTracked ? (
                                                <>
                                                    <CheckCircle size={16} className="group-hover:hidden" />
                                                    <X size={16} className="hidden group-hover:block" />
                                                    <span className="group-hover:hidden">Tracked</span>
                                                    <span className="hidden group-hover:inline">Untrack</span>
                                                </>
                                            ) : (
                                                <>
                                                    <PlusCircle size={16} />
                                                    Track Job
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
