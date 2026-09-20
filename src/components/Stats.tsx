import React from 'react';
import { Briefcase, Heart, Award, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Stats: React.FC = () => {
  const { profile, projects } = usePortfolio();

  const stats = [
    {
      value: `${Math.max(projects.length, 7)}+`,
      label: 'Projects Completed',
      icon: <Briefcase className="w-5 h-5 text-[#2D8CFF]" />,
    },
    {
      value: '5+',
      label: 'Happy Clients',
      icon: <Heart className="w-5 h-5 text-[#2D8CFF]" />,
    },
    {
      value: '1+',
      label: 'Years Experience',
      icon: <Award className="w-5 h-5 text-[#2D8CFF]" />,
    },
  ];

  return (
    <section className="relative z-20 -mt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-[#0D141E] border border-white/[0.08] shadow-2xl">
          
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-[#080C12]/60 border border-white/[0.04] hover:border-[#2D8CFF]/30 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1683FF]/10 border border-[#1683FF]/20 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-[#7F8A9A]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}

          {/* Availability Status Card */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#080C12]/60 border border-white/[0.04] hover:border-[#2D8CFF]/30 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-[#1683FF]/10 border border-[#1683FF]/20 flex items-center justify-center shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D8CFF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1683FF]"></span>
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Available</span>
                <span className="text-[10px] font-mono text-[#2D8CFF] px-1.5 py-0.5 rounded bg-[#1683FF]/15 border border-[#1683FF]/30">
                  Active
                </span>
              </div>
              <div className="text-xs font-medium text-[#7F8A9A]">
                Let's build something great together
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
