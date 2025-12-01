import React from 'react';
import { Job, Company, JobStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { STATUS_COLORS } from '../constants';

interface DashboardProps {
  jobs: Job[];
  companies: Company[];
}

export const Dashboard: React.FC<DashboardProps> = ({ jobs, companies }) => {
  const statusData = Object.values(JobStatus).map(status => ({
    name: status,
    value: jobs.filter(j => j.status === status).length,
    color: getStatusColor(status)
  })).filter(d => d.value > 0);

  const totalApplications = jobs.length;
  const activeApplications = jobs.filter(j => j.status !== JobStatus.DECLINED && j.status !== JobStatus.OFFER && j.status !== JobStatus.TO_BE_APPLIED).length;
  const interviews = jobs.filter(j => j.status === JobStatus.NEXT_ROUND || j.status === JobStatus.RESULT).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Tracked" value={totalApplications} subtitle="Jobs in your pipeline" color="bg-blue-500" />
        <StatCard title="Active Applications" value={activeApplications} subtitle="In progress" color="bg-indigo-500" />
        <StatCard title="Interviews" value={interviews} subtitle="Scheduled or completed" color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Application Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Pipeline Health</h3>
          <div className="flex flex-col justify-center h-64 space-y-4">
             {statusData.map((item) => (
                 <div key={item.name} className="space-y-1">
                     <div className="flex justify-between text-sm">
                         <span className="font-medium text-slate-600">{item.name}</span>
                         <span className="text-slate-400">{item.value}</span>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-2">
                         <div 
                            className="h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${(item.value / totalApplications) * 100}%`, backgroundColor: item.color }}
                         />
                     </div>
                 </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, color }: { title: string, value: number, subtitle: string, color: string }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-10 ${color}`}></div>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <h2 className="text-3xl font-bold text-slate-800 mt-2">{value}</h2>
    <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
  </div>
);

const getStatusColor = (status: JobStatus) => {
    switch (status) {
        case JobStatus.TO_BE_APPLIED: return '#94a3b8'; // slate-400
        case JobStatus.APPLIED: return '#3b82f6'; // blue-500
        case JobStatus.RESULT: return '#a855f7'; // purple-500
        case JobStatus.NEXT_ROUND: return '#f59e0b'; // amber-500
        case JobStatus.OFFER: return '#22c55e'; // green-500
        case JobStatus.DECLINED: return '#ef4444'; // red-500
        default: return '#cbd5e1';
    }
}
