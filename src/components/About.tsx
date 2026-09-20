import React from 'react';
import { MapPin, GraduationCap, Code2, Compass, Check, ArrowRight, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { scrollToSection } from '../utils/navigation';

export const About: React.FC = () => {
  const { profile } = usePortfolio();

  const corePrinciples = [
    {
      title: 'Deliberate Architecture',
      desc: 'Modular React & Next.js components with clean state separation, avoiding unneeded packages or bloated templates.',
    },
    {
      title: 'Responsive by Nature',
      desc: 'Ensuring typography, touch targets, and grid layouts adapt smoothly from 320px mobile screens up to ultrawide displays.',
    },
    {
      title: 'Real-World Functionality',
      desc: 'Building working applications with real data flows, database synchronization, and direct customer inquiry channels.',
    },
    {
      title: 'Fast & Optimized',
      desc: 'Prioritizing rapid initial paint, clean DOM structures, optimized media delivery, and zero lag interactions.',
    },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-white/[0.08] bg-[#05070A] scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-[#2D8CFF] uppercase">
            ABOUT ME
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Behind the <span className="text-[#2D8CFF]">Code</span>
          </h2>
          <p className="text-[#7F8A9A] text-base max-w-2xl">
            Computer science student and Full Stack Web Developer based in Peshawar, Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Story Column */}
          <div className="lg:col-span-7 space-y-6 text-[#B7C1D1] leading-relaxed text-base">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141E] border border-white/[0.08] shadow-xl space-y-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>The Developer Journey</span>
              </h3>
              
              <p>
                {profile.bio}
              </p>

              <p className="text-[#7F8A9A]">
                While actively pursuing my studies as a computer science student in Peshawar, I dedicate significant time to building and deploying functional web applications. Instead of sticking purely to classroom theory, I learn by shipping live projects—from cloud storage interfaces (<span className="text-[#2D8CFF] font-medium">HS Cloud</span>) and artisanal e-commerce portals (<span className="text-[#2D8CFF] font-medium">Charsadda Chapal</span>) to institutional web platforms (<span className="text-[#2D8CFF] font-medium">FGPBS</span>).
              </p>

              <div className="pt-3 border-t border-white/[0.06]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#7F8A9A] mb-2">
                  Development Philosophy
                </h4>
                <p className="text-sm text-[#B7C1D1] italic">
                  "{profile.philosophy}"
                </p>
              </div>
            </div>

            {/* What I Build Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corePrinciples.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#0D141E] border border-white/[0.06] hover:border-[#2D8CFF]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1683FF]/15 border border-[#1683FF]/30 flex items-center justify-center text-[#2D8CFF] mb-3">
                    <Check className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-xs text-[#7F8A9A] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Quick Profile Card & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Profile Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141E] border border-white/[0.08] shadow-xl space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={profile.avatarUrl || '/assets/hissan-portrait.jpg'}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover object-top border border-[#2D8CFF]/40 shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/hissan-portrait.jpg';
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1683FF] border-2 border-[#0D141E]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{profile.name}</h4>
                  <p className="text-xs font-mono text-[#2D8CFF]">{profile.title}</p>
                </div>
              </div>

              {/* Key Specs */}
              <div className="space-y-3 pt-4 border-t border-white/[0.06] text-xs">
                
                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#7F8A9A] flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#2D8CFF]" />
                    <span>Location</span>
                  </span>
                  <span className="font-semibold text-white">{profile.location}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#7F8A9A] flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-[#2D8CFF]" />
                    <span>Status</span>
                  </span>
                  <span className="font-semibold text-white">Student & Developer</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#7F8A9A] flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#2D8CFF]" />
                    <span>Focus</span>
                  </span>
                  <span className="font-semibold text-white">Full Stack Web Development</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#7F8A9A] flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#2D8CFF]" />
                    <span>Availability</span>
                  </span>
                  <span className="text-[#2D8CFF] font-mono font-semibold">Available for Work</span>
                </div>

              </div>

              {/* Core Stack Highlights */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#7F8A9A] mb-2.5">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#080C12] text-[#B7C1D1] border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection('#contact', e)}
                className="w-full py-3 rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(22,131,255,0.3)] transition-all cursor-pointer"
              >
                <span>Get in Touch with Hissan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
