import React, { useState } from 'react';
import { Company } from '../types';
import { Search, Globe, MapPin, Users, Calendar, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompanyListProps {
  companies: Company[];
  onFindJobs: (company: string) => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFindJobs = (companyName: string) => {
      navigate(`/search?company=${encodeURIComponent(companyName)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Researched Companies</h2>
            <p className="text-slate-500 text-sm mt-1">Database of companies extracted from your research.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search companies, industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 flex flex-col h-full group relative">
            <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0">
                    {company.name.charAt(0)}
                </div>
                {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors p-1">
                        <ExternalLink size={18} />
                    </a>
                )}
            </div>
            
            <a href={company.website || '#'} target="_blank" rel="noopener noreferrer" className="block group-hover:text-blue-600 transition-colors">
                <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1 flex items-center gap-2">
                    {company.name}
                </h3>
            </a>
            
            <p className="text-xs text-blue-600 font-medium bg-blue-50 inline-block px-2 py-1 rounded-md mb-3 self-start">
                {company.industry}
            </p>
            
            <div className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">
                {company.description}
            </div>

            <div className="space-y-2 mb-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{company.country}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users size={14} className="text-slate-400" />
                    <span>{company.headcount !== 'N/A' ? company.headcount : '-'} employees</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar size={14} className="text-slate-400" />
                    <span>Est. {company.founded}</span>
                </div>
            </div>

            <button 
                onClick={() => handleFindJobs(company.name)}
                className="w-full mt-auto py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 hover:shadow-md flex items-center justify-center gap-2 transition-all"
            >
                <Briefcase size={16} />
                Find Jobs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};