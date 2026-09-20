import React, { useState } from 'react';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ResumeModal } from './ResumeModal';
import { scrollToSection } from '../utils/navigation';

export const Hero: React.FC = () => {
  const { profile } = usePortfolio();
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // 6 Core Tech Stack items matching mockup exactly
  const coreTech = [
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#00D8FF]" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Next.js',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.5" />
          <path d="M9 8h2v8H9z" fill="#fff" />
          <path d="M11 8l4.5 7.5V8h1.8v8h-1.8L11 8.5z" fill="#fff" />
        </svg>
      ),
    },
    {
      name: 'Node.js',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#68A063]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l8 4.6v9.2l-8 4.6-8-4.6V6.6L12 2z" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Express',
      icon: (
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white font-mono font-bold text-[11px]">
          ex
        </div>
      ),
    },
    {
      name: 'MongoDB',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#13AA52]" fill="currentColor">
          <path d="M12 2.5s-4.5 4.5-4.5 10c0 4 3 6.8 4.5 7.5 1.5-.7 4.5-3.5 4.5-7.5 0-5.5-4.5-10-4.5-10zm0 15.5c-1-1-2-2.8-2-5.5 0-2.5 1.5-5 2-6 0.5 1 2 3.5 2 6 0 2.7-1 4.5-2 5.5z" />
        </svg>
      ),
    },
    {
      name: 'Tailwind',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#38BDF8]" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      ),
    },
  ];

  // Bulletproof smooth scroll handler that never fails in iframes
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.hash = '#projects';
    }
  };

  // Opens the 100% original CV modal with direct download and print options
  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    setResumeModalOpen(true);
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-[#05070A]">
      
      {/* Background ambient lighting - subtle electric blue glow */}
      <div className="ambient-glow w-[550px] h-[550px] bg-[#1683FF]/15 top-10 left-1/4 -translate-x-1/2" />
      <div className="ambient-glow w-[500px] h-[500px] bg-[#2D8CFF]/10 top-20 right-10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: HERO CONTENT (matches mockup text exactly) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 order-1">
            
            {/* Greeting */}
            <div className="text-sm sm:text-base font-mono text-[#2D8CFF] font-medium tracking-wide">
              Hello, I'm
            </div>

            {/* Name Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Hissan <span className="text-[#2D8CFF]">Sethi</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#B7C1D1] tracking-tight">
                Full Stack Web Developer
              </p>
            </div>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-[#7F8A9A] max-w-2xl leading-relaxed">
              I build modern, fast and scalable web applications with a focus on clean code, great user experience and real-world solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* Primary: View My Projects */}
              <a
                href="#projects"
                onClick={(e) => scrollToSection('#projects', e)}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#1683FF] hover:bg-[#2D8CFF] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(22,131,255,0.4)] hover:shadow-[0_0_30px_rgba(45,140,255,0.6)] active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Hire Me / Contact CTA */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection('#contact', e)}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#0D141E] hover:bg-[#111A26] text-white border border-[#1683FF]/40 hover:border-[#2D8CFF] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Hire Me</span>
              </a>

              {/* Secondary: Download CV */}
              <button
                onClick={handleDownloadCV}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-transparent hover:bg-white/[0.06] text-[#B7C1D1] hover:text-white border border-white/20 hover:border-white/40 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>CV</span>
              </button>
            </div>

            {/* 6 Technology Icons Grid (2x3 on mobile, 1x6 on desktop) */}
            <div className="pt-6 w-full">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 max-w-xl">
                {coreTech.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-[#0D141E]/90 border border-white/[0.08] hover:border-[#1683FF]/40 hover:bg-[#111A26] transition-all duration-200 group"
                  >
                    <div className="w-7 h-7 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      {tech.icon}
                    </div>
                    <span className="text-[11px] font-medium text-[#B7C1D1] group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HISSAN'S PORTRAIT & MOTTO (Exact Mockup Layout) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 relative">
            
            <div className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center">
              
              {/* Soft Electric Blue Rim Glow behind Hissan */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1683FF]/30 via-[#2D8CFF]/15 to-transparent rounded-full blur-3xl opacity-80 pointer-events-none scale-110" />

              {/* 100% Original Portrait Presentation - No filters, no masking */}
              <div className="relative w-full aspect-[3/4] max-w-[340px] sm:max-w-[380px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#0d141e]">
                <img
                  src="/assets/hissan-portrait.jpg"
                  alt="Hissan Sethi - Full Stack Web Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/hissan_sunglasses_portrait_1789814046078.jpg';
                  }}
                />
              </div>

              {/* Typography Banner beside/below portrait matching mockup */}
              <div className="mt-4 text-center lg:text-right w-full pr-2">
                <div className="text-sm sm:text-base font-bold text-[#F5F7FA] tracking-tight leading-snug">
                  Turning Ideas
                  <br />
                  into Scalable
                  <br />
                  Web Solutions
                </div>
                <div className="flex items-center justify-center lg:justify-end gap-1 mt-1.5">
                  <div className="w-8 h-0.5 bg-[#1683FF] rounded-full" />
                  <div className="w-2 h-0.5 bg-[#2D8CFF] rounded-full" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Interactive Resume Modal for CV downloads & previews */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </section>
  );
};
