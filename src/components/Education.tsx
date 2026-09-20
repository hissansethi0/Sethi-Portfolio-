import React from 'react';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Education: React.FC = () => {
  const { education } = usePortfolio();

  return (
    <section id="education" className="py-24 relative border-t border-white/[0.08] bg-[#05070A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-[#2D8CFF] uppercase">
            EDUCATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Academic <span className="text-[#2D8CFF]">Progression</span>
          </h2>
          <p className="text-[#7F8A9A] text-base max-w-2xl">
            Currently enrolled as a student in Peshawar, Pakistan, bridging computer science principles with practical web development.
          </p>
        </div>

        {/* Education Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#0D141E] border border-white/[0.08] hover:border-[#2D8CFF]/40 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#080C12] border border-white/[0.08] flex items-center justify-center text-[#2D8CFF]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-[#1683FF]/15 border border-[#1683FF]/30 text-[#2D8CFF]">
                    {item.current ? 'Currently Enrolled' : 'Completed'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-medium text-[#2D8CFF] font-mono">
                    {item.institution}
                  </p>
                  <p className="text-xs text-[#7F8A9A] mt-0.5">
                    Field: {item.field}
                  </p>
                </div>

                {item.description && (
                  <p className="text-xs sm:text-sm text-[#B7C1D1] leading-relaxed pt-2 border-t border-white/[0.04]">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#7F8A9A] pt-4 border-t border-white/[0.06]">
                <Calendar className="w-3.5 h-3.5 text-[#2D8CFF]" />
                <span>
                  {item.startYear} — {item.current ? 'Present' : item.endYear}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
