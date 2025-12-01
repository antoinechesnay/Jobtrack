import React from 'react';
import { Job, JobStatus } from '../types';
import { STATUS_COLORS } from '../constants';
import { MoreHorizontal, MapPin, Calendar, Trash2, ExternalLink } from 'lucide-react';

interface JobBoardProps {
  jobs: Job[];
  onUpdateStatus: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}

export const JobBoard: React.FC<JobBoardProps> = ({ jobs, onUpdateStatus, onDelete }) => {
  const columns = Object.values(JobStatus);

  return (
    <div className="h-full overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-[1200px]">
        {columns.map((status) => (
          <div key={status} className="flex-1 min-w-[280px]">
            <div className={`flex items-center justify-between mb-4 px-2 py-1 border-b-2 ${getStatusBorderColor(status)}`}>
              <h3 className="font-semibold text-slate-700">{status}</h3>
              <span className="text-xs font-medium bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">
                {jobs.filter(j => j.status === status).length}
              </span>
            </div>
            
            <div className="space-y-3">
              {jobs.filter(j => j.status === status).map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onUpdateStatus={onUpdateStatus}
                  onDelete={onDelete}
                />
              ))}
              {jobs.filter(j => j.status === status).length === 0 && (
                <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                  No jobs
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobCard: React.FC<{ 
  job: Job; 
  onUpdateStatus: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}> = ({ job, onUpdateStatus, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow group relative">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-slate-800 leading-tight">{job.position}</h4>
          <p className="text-sm text-blue-600 font-medium">{job.companyName}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={() => onDelete(job.id)}
             className="text-slate-400 hover:text-red-500 p-1"
           >
             <Trash2 size={14} />
           </button>
        </div>
      </div>

      <div className="space-y-2 mt-3">
        {job.location && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={12} />
            <span>{job.location}</span>
          </div>
        )}
        {job.dateApplied && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar size={12} />
            <span>Applied: {job.dateApplied}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
        {job.url && (
            <a href={job.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs flex items-center gap-1">
                View <ExternalLink size={10} />
            </a>
        )}
        
        <select 
          value={job.status}
          onChange={(e) => onUpdateStatus(job.id, e.target.value as JobStatus)}
          className="text-xs border border-slate-200 rounded px-2 py-1 bg-slate-50 text-slate-600 focus:outline-none focus:border-blue-300 ml-auto"
        >
          {Object.values(JobStatus).map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const getStatusBorderColor = (status: JobStatus) => {
    switch (status) {
        case JobStatus.TO_BE_APPLIED: return 'border-slate-300';
        case JobStatus.APPLIED: return 'border-blue-300';
        case JobStatus.RESULT: return 'border-purple-300';
        case JobStatus.NEXT_ROUND: return 'border-amber-300';
        case JobStatus.OFFER: return 'border-green-300';
        case JobStatus.DECLINED: return 'border-red-300';
        default: return 'border-slate-200';
    }
}