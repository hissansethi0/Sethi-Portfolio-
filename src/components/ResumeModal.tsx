import React, { useState } from 'react';
import { X, Download, Copy, Check, Printer, FileText, ExternalLink, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { profile, projects, skills } = usePortfolio();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cvText = `================================================
HISSAN SETHI — FULL STACK WEB DEVELOPER
================================================
Location: Peshawar, Pakistan
WhatsApp: ${profile.whatsapp}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}
Email: ${profile.email !== '[Add email]' ? profile.email : 'hissansethi0@gmail.com'}
Website: https://hissansethi.dev

------------------------------------------------
PROFESSIONAL SUMMARY
------------------------------------------------
Full Stack Web Developer and computer science student based in Peshawar, Pakistan. Dedicated to creating high-performance, responsive web applications with clean code, modern architectures, and thoughtful UX. Specializes in modern JavaScript, React, Next.js, Node.js, Express, MongoDB, and Tailwind CSS.

------------------------------------------------
CORE TECHNICAL COMPETENCIES
------------------------------------------------
• Frontend: React, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Vite, Responsive Design
• Backend & APIs: Node.js, Express.js, RESTful Architecture, Server-Side Logic
• Database & Auth: MongoDB, Firebase Realtime Database, Firebase Authentication
• Tooling & Cloud: Git, GitHub, Cloudinary, Netlify, Vercel

------------------------------------------------
FEATURED PRODUCTION PROJECTS
------------------------------------------------
1. HS Cloud (https://hs-cloud.netlify.app)
   - Modern cloud file management and storage workspace with instant filtering and storage telemetry.
   - Built with React, Tailwind CSS, Vite, and JavaScript.

2. HS Restaurant (https://hs-restaurant.netlify.app)
   - Responsive culinary showcase with interactive menus, chef highlights, and reservation inquiries.
   - Built with React, CSS3, and JavaScript.

3. HS Fragrances (https://hs-fragrances.netlify.app)
   - Luxury perfumery showcase with olfactory pyramid breakdown (top, heart, base notes).
   - Built with React, Tailwind CSS, and E-Commerce UX.

4. HS Weathering (https://hs-weathering.netlify.app)
   - Live atmospheric weather application with REST meteorological APIs and multi-day forecasts.
   - Built with JavaScript, Weather API, and CSS3.

5. Charsadda Chapal (https://charsadda-chapal.netlify.app)
   - Artisanal Pakistani leather footwear catalog with custom size guides and WhatsApp ordering.

6. FGPBS Web Portal (https://fgpbs.netlify.app)
   - Official educational institution web portal for student circulars and academic directories.

------------------------------------------------
EDUCATION
------------------------------------------------
Federal Government Post Graduate College (FGPBS)
Location: Peshawar, Pakistan
Field: Computer Science & Higher Secondary Education
Status: Active Student
================================================`;

  const handleDownload = () => {
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Hissan-Sethi-Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cvText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Clipboard copy failed', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0D141E] border border-white/[0.1] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#F5F7FA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#080C12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1683FF]/15 border border-[#1683FF]/30 flex items-center justify-center text-[#2D8CFF]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Curriculum Vitae</h3>
              <p className="text-xs text-[#7F8A9A]">Hissan Sethi — Full Stack Web Developer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(22,131,255,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-[#15202e] hover:bg-[#1e2e42] border border-white/[0.08] text-[#B7C1D1] hover:text-white transition-colors"
              title="Copy resume text to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-[#15202e] hover:bg-[#1e2e42] border border-white/[0.08] text-[#B7C1D1] hover:text-white transition-colors"
              title="Print Resume"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#15202e] hover:bg-rose-500/20 text-[#7F8A9A] hover:text-rose-400 border border-white/[0.08] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm leading-relaxed text-[#B7C1D1]">
          {/* Top Identity Block */}
          <div className="border-b border-white/[0.08] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Hissan Sethi</h1>
              <p className="text-[#2D8CFF] font-medium text-sm mt-0.5">Full Stack Web Developer &amp; Student</p>
              <p className="text-xs text-[#7F8A9A] mt-1">Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
            </div>
            <div className="flex flex-col text-xs space-y-1 font-mono text-[#7F8A9A]">
              <div>WhatsApp: <span className="text-white">{profile.whatsapp}</span></div>
              <div>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="text-[#2D8CFF] hover:underline">hissansethi0</a></div>
              <div>Status: <span className="text-emerald-400">Available for Work</span></div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#2D8CFF] font-bold">Profile Summary</h4>
            <p className="text-xs sm:text-sm text-[#F5F7FA] leading-relaxed">
              Full Stack Web Developer and computer science student based in Peshawar, Pakistan. Dedicated to creating high-performance, responsive web applications with clean code, modern architectures, and thoughtful UX. Specializes in modern JavaScript, React, Next.js, Node.js, Express, MongoDB, and Tailwind CSS.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#2D8CFF] font-bold">Technical Skills</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#080C12] border border-white/[0.06]">
                <div className="font-semibold text-white mb-1">Frontend Engineering</div>
                <div className="text-[#7F8A9A]">React, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Vite, Responsive Design</div>
              </div>
              <div className="p-3 rounded-xl bg-[#080C12] border border-white/[0.06]">
                <div className="font-semibold text-white mb-1">Backend &amp; Databases</div>
                <div className="text-[#7F8A9A]">Node.js, Express.js, REST APIs, MongoDB, Firebase Realtime Database, Firebase Auth</div>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#2D8CFF] font-bold">Featured Production Projects</h4>
            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-[#080C12] border border-white/[0.06] flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{p.title}</span>
                      <span className="text-[11px] font-mono text-[#2D8CFF]">• {p.subtitle || p.category}</span>
                    </div>
                    <p className="text-xs text-[#7F8A9A] mt-1">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.technologies.slice(0, 4).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] font-mono text-[#B7C1D1]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 p-1.5 rounded-lg bg-[#1683FF]/15 text-[#2D8CFF] hover:bg-[#1683FF] hover:text-white transition-colors"
                    title="Visit project"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#2D8CFF] font-bold">Education</h4>
            <div className="p-3.5 rounded-xl bg-[#080C12] border border-white/[0.06]">
              <div className="font-bold text-white text-sm">Federal Government Post Graduate College (FGPBS)</div>
              <div className="text-xs text-[#2D8CFF]">Computer Science &amp; Higher Secondary Studies</div>
              <div className="text-[11px] text-[#7F8A9A] mt-0.5">Peshawar, Pakistan • Active Student</div>
            </div>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="p-4 bg-[#080C12] border-t border-white/[0.08] flex items-center justify-between text-xs">
          <span className="text-[#7F8A9A]">Available for contract, freelance &amp; full-time roles</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
