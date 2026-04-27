import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  colorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => (
  <div className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <span className="text-2xl">{icon}</span>
      <span className={`text-2xl font-black ${colorClass}`}>{value}</span>
    </div>
    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.1em]">{title}</p>
  </div>
);