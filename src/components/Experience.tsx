import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience: React.FC = () => {
  const { experience } = usePortfolio();

  return (
    <section id="experience" className="py-24 relative border-t border-white/[0.08] bg-[#05070A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-[#2D8CFF] uppercase">
            EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work & <span className="text-[#2D8CFF]">Development</span>
          </h2>
          <p className="text-[#7F8A9A] text-base max-w-2xl">
            Independent software development, real-world project builds, and client web solutions.
          </p>
        </div>

        {/* Experience Timeline */}
        {experience.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0D141E] border border-white/[0.08] text-center">
            <p className="text-sm text-[#7F8A9A] font-mono">No external employment records listed yet.</p>
            <p className="text-xs text-[#7F8A9A] mt-1">Additional milestones can be added in the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-8">
            {experience.map((item) => (
              <div key={item.id} className="relative group">
                
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full bg-[#05070A] border-2 border-[#1683FF] flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D8CFF]" />
                </div>

                <div className="p-6 sm:p-7 rounded-2xl bg-[#0D141E] border border-white/[0.08] hover:border-[#2D8CFF]/30 transition-all duration-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#2D8CFF] transition-colors">
                        {item.position}
                      </h3>
                      <p className="text-sm font-medium text-[#2D8CFF] font-mono">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#B7C1D1] bg-[#080C12] px-3 py-1.5 rounded-lg border border-white/[0.08] w-fit">
                      <Calendar className="w-3.5 h-3.5 text-[#2D8CFF]" />
                      <span>{item.startDate} — {item.current ? 'Present' : item.endDate}</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#B7C1D1] leading-relaxed">
                    {item.description}
                  </p>

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                      {item.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#080C12] text-[#7F8A9A] border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
