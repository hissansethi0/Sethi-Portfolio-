import React, { useState } from 'react';
import { 
  X, Download, Copy, Check, Printer, FileText, 
  MapPin, Phone, Mail, Globe, Github, Linkedin, 
  Code2, Languages, User, Briefcase, GraduationCap, Calendar, ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cvText = `================================================
HISSAN SETHI — Full Stack Web Developer
================================================
Location: Peshawar, Pakistan
Phone: +92 313 3492982
Email: hissansethi0@gmail.com
Website: https://hs-cloud.netlify.app
GitHub: https://github.com/hissansethi0
LinkedIn: https://linkedin.com/in/hissan-sethi-7a3682415

------------------------------------------------
PROFESSIONAL SUMMARY
------------------------------------------------
Full Stack Web Developer and Computer Science student based in Peshawar, Pakistan. Dedicated to engineering high-performance, responsive web applications utilizing clean code principles, modern architectural patterns, and user-centric UI design. Proficient in modern JavaScript ecosystems including React, Next.js, Node.js, Express.js, MongoDB, and Tailwind CSS.

------------------------------------------------
FEATURED PROJECTS
------------------------------------------------
1. HS Cloud
   React, Tailwind CSS, Vite, JavaScript
   Links: https://hs-cloud.netlify.app | https://github.com/hissansethi0
   • Cloud file management workspace with instant search, dynamic file filtering and real-time storage telemetry.
   • Clean component state management for a responsive UI.

2. Charsadda Chapal
   React, Tailwind CSS, Web APIs
   Links: https://charsadda-chapal.netlify.app | https://github.com/hissansethi0/charsadda-chapal
   • Artisanal Pakistani leather footwear catalog with dynamic size selection guides.
   • Direct WhatsApp order dispatch routing.

3. FGPBS Web Portal
   React, JavaScript, CSS3
   Links: https://fgpbs.netlify.app | https://github.com/hissansethi0/FG
   • Educational institution web portal for circulars and directories.
   • Responsive layout optimized for mobile and desktop.

4. HS Fragrances
   React, Tailwind CSS, E-Commerce UX
   Links: https://hs-fragrances.netlify.app | https://github.com/hissansethi0/hs-fragrances
   • Luxury perfumery showcase with olfactory pyramid breakdown.
   • Dynamic product discovery with high-end aesthetic.

5. HS Weathering
   JavaScript, REST Weather API, CSS3
   Links: https://hs-weathering.netlify.app | https://github.com/hissansethi0/hs-weathering
   • Live atmospheric tracking with multi-day forecasts.
   • Async data fetching, error handling, responsive displays.

6. HS Restaurant
   React, CSS3, JavaScript
   Links: https://hs-restaurant.netlify.app | https://github.com/hissansethi0/hs-restaurant
   • Digital menus, chef spotlights and online reservation forms.
   • Interactive culinary showcase with clean UI.

------------------------------------------------
SKILLS
------------------------------------------------
• React
• Next.js
• JavaScript (ES6+)
• HTML5
• CSS3
• Tailwind CSS
• Vite
• Node.js
• Express.js
• MongoDB
• Firebase
• Git
• GitHub
• Cloudinary
• Netlify
• Vercel

------------------------------------------------
EDUCATION
------------------------------------------------
FG Public School (Boys), Khyber Road Peshawar Cantt
Higher Secondary Education & Computer Science
Current Student | Class 8

------------------------------------------------
LANGUAGES
------------------------------------------------
• English
• Urdu
================================================`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hissan Sethi - Full Stack Web Developer - CV</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0b111e;
      color: #1e293b;
      display: flex;
      justify-content: center;
      padding: 30px 15px;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .cv-container {
      width: 100%;
      max-width: 860px;
      background: #ffffff;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
      border-radius: 4px;
      overflow: hidden;
    }
    .header {
      background: #0b1728;
      color: #ffffff;
      padding: 36px 40px;
      display: flex;
      align-items: center;
      gap: 30px;
    }
    .avatar-wrap {
      flex-shrink: 0;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 4px solid #de1b39;
      overflow: hidden;
      background: #8b0000;
      box-shadow: 0 8px 24px rgba(222, 27, 57, 0.35);
    }
    .avatar-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .header-info {
      flex: 1;
    }
    .name {
      font-size: 34px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #ffffff;
      line-height: 1.1;
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 20px;
      font-weight: 500;
      color: #e2e8f0;
      margin-bottom: 16px;
    }
    .meta-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 16px;
      font-size: 12px;
      color: #cbd5e1;
    }
    .meta-row a {
      color: #cbd5e1;
      text-decoration: none;
    }
    .meta-row span.sep {
      color: #475569;
    }
    .body-content {
      display: flex;
      min-height: 800px;
    }
    .sidebar {
      width: 32%;
      background: #ebf1f7;
      padding: 32px 24px;
      border-right: 1px solid #e2e8f0;
    }
    .main {
      width: 68%;
      background: #ffffff;
      padding: 32px 36px;
    }
    .sec-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #0b1728;
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 8px;
      border-bottom: 1.5px solid #0b1728;
      margin-bottom: 18px;
    }
    .contact-item {
      font-size: 11.5px;
      color: #334155;
      margin-bottom: 14px;
      word-break: break-all;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .contact-item a {
      color: #1e293b;
      text-decoration: none;
    }
    .contact-item a:hover {
      text-decoration: underline;
    }
    .bullet-list {
      list-style: none;
      padding: 0;
    }
    .bullet-list li {
      font-size: 12px;
      color: #334155;
      padding-left: 14px;
      position: relative;
      margin-bottom: 7px;
    }
    .bullet-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #0b1728;
      font-weight: bold;
    }
    .summary-text {
      font-size: 12.5px;
      line-height: 1.7;
      color: #334155;
      margin-bottom: 26px;
    }
    .timeline {
      position: relative;
      padding-left: 20px;
      border-left: 1.5px solid #cbd5e1;
      margin-left: 4px;
    }
    .project-card {
      position: relative;
      margin-bottom: 22px;
    }
    .project-card::before {
      content: "";
      position: absolute;
      left: -26px;
      top: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #0b1728;
    }
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 4px 10px;
      margin-bottom: 2px;
    }
    .project-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0b1728;
    }
    .project-links {
      font-size: 11px;
      display: flex;
      gap: 12px;
    }
    .project-links a {
      color: #0b1728;
      text-decoration: none;
      font-weight: 500;
    }
    .project-links a:hover {
      text-decoration: underline;
    }
    .project-stack {
      font-size: 11.5px;
      color: #475569;
      font-style: italic;
      margin-bottom: 6px;
    }
    .project-bullets {
      list-style: none;
    }
    .project-bullets li {
      font-size: 11.5px;
      line-height: 1.55;
      color: #334155;
      padding-left: 14px;
      position: relative;
      margin-bottom: 3px;
    }
    .project-bullets li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #64748b;
    }
    .edu-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0b1728;
      margin-bottom: 2px;
    }
    .edu-sub {
      font-size: 12px;
      color: #475569;
      margin-bottom: 6px;
    }
    .edu-badge {
      font-size: 11.5px;
      color: #334155;
      font-weight: 500;
    }
    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
      }
      .cv-container {
        box-shadow: none !important;
        border-radius: 0 !important;
        max-width: 100% !important;
        width: 100% !important;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="cv-container">
    <div class="header">
      <div class="avatar-wrap">
        <img src="${profile.avatarUrl || '/assets/hissan-cv-avatar.jpg'}" onerror="this.onerror=null; this.src='/assets/hissan-cv-avatar.jpg';" alt="${profile.name || 'Hissan Sethi'}" />
      </div>
      <div class="header-info">
        <h1 class="name">HISSAN SETHI</h1>
        <div class="subtitle">Full Stack Web Developer</div>
        <div class="meta-row">
          <span>Peshawar, Pakistan</span>
          <span class="sep">|</span>
          <span>+92 313 3492982</span>
          <span class="sep">|</span>
          <span>hissansethi0@gmail.com</span>
        </div>
        <div class="meta-row" style="margin-top: 6px;">
          <a href="https://hs-cloud.netlify.app" target="_blank">hs-cloud.netlify.app</a>
          <span class="sep">|</span>
          <a href="https://github.com/hissansethi0" target="_blank">https://github.com/hissansethi0</a>
          <span class="sep">|</span>
          <a href="https://linkedin.com/in/hissan-sethi-7a3682415" target="_blank">linkedin.com/in/hissan-sethi-7a3682415</a>
        </div>
      </div>
    </div>

    <div class="body-content">
      <!-- SIDEBAR -->
      <div class="sidebar">
        <!-- CONTACT -->
        <div style="margin-bottom: 28px;">
          <div class="sec-title">CONTACT</div>
          <div class="contact-item"><strong>Phone:</strong> +92 313 3492982</div>
          <div class="contact-item"><strong>Email:</strong> hissansethi0@gmail.com</div>
          <div class="contact-item"><strong>Location:</strong> Peshawar, Pakistan</div>
          <div class="contact-item"><strong>Web:</strong> <a href="https://hs-cloud.netlify.app" target="_blank">hs-cloud.netlify.app</a></div>
          <div class="contact-item"><strong>GitHub:</strong> <a href="https://github.com/hissansethi0" target="_blank">github.com/hissansethi0</a></div>
          <div class="contact-item"><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/hissan-sethi-7a3682415" target="_blank">linkedin.com/in/hissan-sethi</a></div>
        </div>

        <!-- SKILLS -->
        <div style="margin-bottom: 28px;">
          <div class="sec-title">SKILLS</div>
          <ul class="bullet-list">
            <li>React</li>
            <li>Next.js</li>
            <li>JavaScript (ES6+)</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Tailwind CSS</li>
            <li>Vite</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>Firebase</li>
            <li>Git</li>
            <li>GitHub</li>
            <li>Cloudinary</li>
            <li>Netlify</li>
            <li>Vercel</li>
          </ul>
        </div>

        <!-- LANGUAGES -->
        <div>
          <div class="sec-title">LANGUAGES</div>
          <ul class="bullet-list">
            <li>English</li>
            <li>Urdu</li>
          </ul>
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <div class="main">
        <!-- PROFESSIONAL SUMMARY -->
        <div style="margin-bottom: 26px;">
          <div class="sec-title">PROFESSIONAL SUMMARY</div>
          <p class="summary-text">
            Full Stack Web Developer and Computer Science student based in Peshawar, Pakistan. Dedicated to engineering high-performance, responsive web applications utilizing clean code principles, modern architectural patterns, and user-centric UI design. Proficient in modern JavaScript ecosystems including React, Next.js, Node.js, Express.js, MongoDB, and Tailwind CSS.
          </p>
        </div>

        <!-- FEATURED PROJECTS -->
        <div style="margin-bottom: 26px;">
          <div class="sec-title">FEATURED PROJECTS</div>
          <div class="timeline">
            <!-- 1. HS Cloud -->
            <div class="project-card">
              <div class="project-header">
                <span class="project-title">HS Cloud</span>
                <div class="project-links">
                  <a href="https://hs-cloud.netlify.app" target="_blank">hs-cloud.netlify.app</a>
                  <a href="https://github.com/hissansethi0" target="_blank">github.com/hissansethi0</a>
                </div>
              </div>
              <div class="project-stack">React, Tailwind CSS, Vite, JavaScript</div>
              <ul class="project-bullets">
                <li>Cloud file management workspace with instant search, dynamic file filtering and real-time storage telemetry.</li>
                <li>Clean component state management for a responsive UI.</li>
              </ul>
            </div>

            <!-- 2. Charsadda Chapal -->
            <div class="project-card">
              <div class="project-header">
                <span class="project-title">Charsadda Chapal</span>
                <div class="project-links">
                  <a href="https://charsadda-chapal.netlify.app" target="_blank">charsadda-chapal.netlify.app</a>
                  <a href="https://github.com/hissansethi0/charsadda-chapal" target="_blank">github.com/hissansethi0/charsadda-chapal</a>
                </div>
              </div>
              <div class="project-stack">React, Tailwind CSS, Web APIs</div>
              <ul class="project-bullets">
                <li>Artisanal Pakistani leather footwear catalog with dynamic size selection guides.</li>
                <li>Direct WhatsApp order dispatch routing.</li>
              </ul>
            </div>

            <!-- 3. FGPBS Web Portal -->
            <div class="project-card">
              <div class="project-header">
                <span class="project-title">FGPBS Web Portal</span>
                <div class="project-links">
                  <a href="https://fgpbs.netlify.app" target="_blank">fgpbs.netlify.app</a>
                  <a href="https://github.com/hissansethi0/FG" target="_blank">github.com/hissansethi0/FG</a>
                </div>
              </div>
              <div class="project-stack">React, JavaScript, CSS3</div>
              <ul class="project-bullets">
                <li>Educational institution web portal for circulars and directories.</li>
                <li>Responsive layout optimized for mobile and desktop.</li>
              </ul>
            </div>

            <!-- 4. HS Fragrances -->
            <div class="project-card">
              <div class="project-header">
                <span class="project-title">HS Fragrances</span>
                <div class="project-links">
                  <a href="https://hs-fragrances.netlify.app" target="_blank">hs-fragrances.netlify.app</a>
                  <a href="https://github.com/hissansethi0/hs-fragrances" target="_blank">github.com/hissansethi0/hs-fragrances</a>
                </div>
              </div>
              <div class="project-stack">React, Tailwind CSS, E-Commerce UX</div>
              <ul class="project-bullets">
                <li>Luxury perfumery showcase with olfactory pyramid breakdown.</li>
                <li>Dynamic product discovery with high-end aesthetic.</li>
              </ul>
            </div>

            <!-- 5. HS Weathering -->
            <div class="project-card">
              <div class="project-header">
                <span class="project-title">HS Weathering</span>
                <div class="project-links">
                  <a href="https://hs-weathering.netlify.app" target="_blank">hs-weathering.netlify.app</a>
                  <a href="https://github.com/hissansethi0/hs-weathering" target="_blank">github.com/hissansethi0/hs-weathering</a>
                </div>
              </div>
              <div class="project-stack">JavaScript, REST Weather API, CSS3</div>
              <ul class="project-bullets">
                <li>Live atmospheric tracking with multi-day forecasts.</li>
                <li>Async data fetching, error handling, responsive displays.</li>
              </ul>
            </div>

            <!-- 6. HS Restaurant -->
            <div class="project-card">
              <div class="project-header">
                <span class="project-title">HS Restaurant</span>
                <div class="project-links">
                  <a href="https://hs-restaurant.netlify.app" target="_blank">hs-restaurant.netlify.app</a>
                  <a href="https://github.com/hissansethi0/hs-restaurant" target="_blank">github.com/hissansethi0/hs-restaurant</a>
                </div>
              </div>
              <div class="project-stack">React, CSS3, JavaScript</div>
              <ul class="project-bullets">
                <li>Digital menus, chef spotlights and online reservation forms.</li>
                <li>Interactive culinary showcase with clean UI.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- EDUCATION -->
        <div>
          <div class="sec-title">EDUCATION</div>
          <div class="edu-title">FG Public School (Boys), Khyber Road Peshawar Cantt</div>
          <div class="edu-sub">Higher Secondary Education & Computer Science</div>
          <div class="edu-badge">📅 Current Student | Class 8</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Hissan-Sethi-CV.html';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Global Print-only Stylesheet to ensure 100% original reproduction on A4 print/PDF */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #original-cv-document, #original-cv-document * {
            visibility: visible;
          }
          #original-cv-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print-area {
            display: none !important;
          }
        }
      `}</style>

      <div 
        className="relative w-full max-w-4xl max-h-[95vh] bg-[#0A0F1D] border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Screen only) */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between bg-[#080D18] no-print-area">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Hissan Sethi</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-medium">Original CV</span>
              </h3>
              <p className="text-[11px] text-slate-400">Full Stack Web Developer &amp; Student</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Download as PDF Button */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            {/* Download Standalone Offline HTML */}
            <button
              onClick={handleDownloadHtml}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download offline HTML document"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Download CV</span>
            </button>

            {/* Copy CV Text */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Copy plain text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer ml-1"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document Viewport */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#060A13] flex justify-center">
          
          {/* THE 100% ORIGINAL CV DOCUMENT */}
          <div 
            id="original-cv-document"
            className="w-full max-w-[850px] bg-white text-[#1e293b] shadow-2xl rounded-sm overflow-hidden select-text text-left font-sans"
            style={{ 
              WebkitPrintColorAdjust: 'exact', 
              printColorAdjust: 'exact',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* Top Navy Blue Header */}
            <div className="bg-[#0B1728] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8">
              {/* Circular Avatar with Red Ring */}
              <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[4px] border-[#DE1B39] overflow-hidden bg-[#8b0000] shadow-[0_4px_20px_rgba(222,27,57,0.4)]">
                <img 
                  src={profile.avatarUrl || '/assets/hissan-cv-avatar.jpg'} 
                  alt={profile.name || 'Hissan Sethi'} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/hissan-portrait.jpg';
                  }}
                />
              </div>

              {/* Header Titles & Metadata */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wider uppercase text-white leading-tight">
                  HISSAN SETHI
                </h1>
                <p className="text-base sm:text-xl font-medium text-slate-200 mt-1 mb-3">
                  Full Stack Web Developer
                </p>

                {/* Contact Row 1 */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs text-slate-300 font-normal">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>Peshawar, Pakistan</span>
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>+92 313 3492982</span>
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>hissansethi0@gmail.com</span>
                  </span>
                </div>

                {/* Contact Row 2 */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs text-slate-300 font-normal mt-2">
                  <a 
                    href="https://hs-cloud.netlify.app" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-white hover:underline transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>hs-cloud.netlify.app</span>
                  </a>
                  <span className="text-slate-500">|</span>
                  <a 
                    href="https://github.com/hissansethi0" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-white hover:underline transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>https://github.com/hissansethi0</span>
                  </a>
                  <span className="text-slate-500">|</span>
                  <a 
                    href="https://linkedin.com/in/hissan-sethi-7a3682415" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-white hover:underline transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>linkedin.com/in/hissan-sethi-7a3682415</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 2-Column Body Layout */}
            <div className="flex flex-col sm:flex-row min-h-[750px]">
              
              {/* LEFT SIDEBAR (Light ice-blue background #EBF1F7) */}
              <div className="w-full sm:w-[32%] bg-[#EBF1F7] p-6 sm:p-7 border-b sm:border-b-0 sm:border-r border-slate-200">
                
                {/* CONTACT */}
                <div className="mb-7">
                  <div className="flex items-center gap-2 pb-1.5 border-b-[1.5px] border-[#0B1728] mb-3">
                    <User className="w-4 h-4 text-[#0B1728]" />
                    <h2 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0B1728]">
                      CONTACT
                    </h2>
                  </div>
                  
                  <div className="space-y-2.5 text-[11.5px] text-slate-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#0B1728] shrink-0" />
                      <span>+92 313 3492982</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#0B1728] shrink-0" />
                      <a href="mailto:hissansethi0@gmail.com" className="hover:underline break-all">
                        hissansethi0@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0B1728] shrink-0" />
                      <span>Peshawar, Pakistan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-[#0B1728] shrink-0" />
                      <a href="https://hs-cloud.netlify.app" target="_blank" rel="noreferrer" className="hover:underline">
                        hs-cloud.netlify.app
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Github className="w-3.5 h-3.5 text-[#0B1728] shrink-0 mt-0.5" />
                      <a href="https://github.com/hissansethi0" target="_blank" rel="noreferrer" className="hover:underline break-all">
                        https://github.com/hissansethi0
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Linkedin className="w-3.5 h-3.5 text-[#0B1728] shrink-0 mt-0.5" />
                      <a href="https://www.linkedin.com/in/hissan-sethi-7a3682415" target="_blank" rel="noreferrer" className="hover:underline break-all">
                        https://www.linkedin.com/in/hissan-sethi-7a3682415
                      </a>
                    </div>
                  </div>
                </div>

                {/* SKILLS */}
                <div className="mb-7">
                  <div className="flex items-center gap-2 pb-1.5 border-b-[1.5px] border-[#0B1728] mb-3">
                    <Code2 className="w-4 h-4 text-[#0B1728]" />
                    <h2 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0B1728]">
                      SKILLS
                    </h2>
                  </div>
                  
                  <ul className="space-y-1.5 text-[12px] text-slate-800">
                    {[
                      'React',
                      'Next.js',
                      'JavaScript (ES6+)',
                      'HTML5',
                      'CSS3',
                      'Tailwind CSS',
                      'Vite',
                      'Node.js',
                      'Express.js',
                      'MongoDB',
                      'Firebase',
                      'Git',
                      'GitHub',
                      'Cloudinary',
                      'Netlify',
                      'Vercel'
                    ].map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B1728] shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* LANGUAGES */}
                <div>
                  <div className="flex items-center gap-2 pb-1.5 border-b-[1.5px] border-[#0B1728] mb-3">
                    <Languages className="w-4 h-4 text-[#0B1728]" />
                    <h2 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0B1728]">
                      LANGUAGES
                    </h2>
                  </div>
                  
                  <ul className="space-y-1.5 text-[12px] text-slate-800">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B1728] shrink-0" />
                      <span>English</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B1728] shrink-0" />
                      <span>Urdu</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* RIGHT MAIN CONTENT (Pure white background #FFFFFF) */}
              <div className="w-full sm:w-[68%] bg-white p-6 sm:p-8">
                
                {/* PROFESSIONAL SUMMARY */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 pb-1.5 border-b-[1.5px] border-[#0B1728] mb-3">
                    <User className="w-4 h-4 text-[#0B1728]" />
                    <h2 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0B1728]">
                      PROFESSIONAL SUMMARY
                    </h2>
                  </div>
                  <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-slate-700">
                    Full Stack Web Developer and Computer Science student based in Peshawar, Pakistan. Dedicated to engineering high-performance, responsive web applications utilizing clean code principles, modern architectural patterns, and user-centric UI design. Proficient in modern JavaScript ecosystems including React, Next.js, Node.js, Express.js, MongoDB, and Tailwind CSS.
                  </p>
                </div>

                {/* FEATURED PROJECTS */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 pb-1.5 border-b-[1.5px] border-[#0B1728] mb-4">
                    <Briefcase className="w-4 h-4 text-[#0B1728]" />
                    <h2 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0B1728]">
                      FEATURED PROJECTS
                    </h2>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative pl-5 ml-1.5 border-l-[1.5px] border-slate-300 space-y-4">
                    
                    {/* Project 1: HS Cloud */}
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0B1728]" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-[13.5px] font-bold text-[#0B1728]">HS Cloud</h3>
                        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-700">
                          <a href="https://hs-cloud.netlify.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Globe className="w-3 h-3" />
                            <span>hs-cloud.netlify.app</span>
                          </a>
                          <a href="https://github.com/hissansethi0" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Github className="w-3 h-3" />
                            <span>github.com/hissansethi0</span>
                          </a>
                        </div>
                      </div>
                      <p className="text-[11.5px] italic text-slate-500 mb-1">React, Tailwind CSS, Vite, JavaScript</p>
                      <ul className="space-y-1 text-[11.5px] text-slate-700">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Cloud file management workspace with instant search, dynamic file filtering and real-time storage telemetry.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Clean component state management for a responsive UI.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Project 2: Charsadda Chapal */}
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0B1728]" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-[13.5px] font-bold text-[#0B1728]">Charsadda Chapal</h3>
                        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-700">
                          <a href="https://charsadda-chapal.netlify.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Globe className="w-3 h-3" />
                            <span>charsadda-chapal.netlify.app</span>
                          </a>
                          <a href="https://github.com/hissansethi0/charsadda-chapal" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Github className="w-3 h-3" />
                            <span>github.com/hissansethi0/charsadda-chapal</span>
                          </a>
                        </div>
                      </div>
                      <p className="text-[11.5px] italic text-slate-500 mb-1">React, Tailwind CSS, Web APIs</p>
                      <ul className="space-y-1 text-[11.5px] text-slate-700">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Artisanal Pakistani leather footwear catalog with dynamic size selection guides.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Direct WhatsApp order dispatch routing.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Project 3: FGPBS Web Portal */}
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0B1728]" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-[13.5px] font-bold text-[#0B1728]">FGPBS Web Portal</h3>
                        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-700">
                          <a href="https://fgpbs.netlify.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Globe className="w-3 h-3" />
                            <span>fgpbs.netlify.app</span>
                          </a>
                          <a href="https://github.com/hissansethi0/FG" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Github className="w-3 h-3" />
                            <span>github.com/hissansethi0/FG</span>
                          </a>
                        </div>
                      </div>
                      <p className="text-[11.5px] italic text-slate-500 mb-1">React, JavaScript, CSS3</p>
                      <ul className="space-y-1 text-[11.5px] text-slate-700">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Educational institution web portal for circulars and directories.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Responsive layout optimized for mobile and desktop.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Project 4: HS Fragrances */}
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0B1728]" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-[13.5px] font-bold text-[#0B1728]">HS Fragrances</h3>
                        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-700">
                          <a href="https://hs-fragrances.netlify.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Globe className="w-3 h-3" />
                            <span>hs-fragrances.netlify.app</span>
                          </a>
                          <a href="https://github.com/hissansethi0/hs-fragrances" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Github className="w-3 h-3" />
                            <span>github.com/hissansethi0/hs-fragrances</span>
                          </a>
                        </div>
                      </div>
                      <p className="text-[11.5px] italic text-slate-500 mb-1">React, Tailwind CSS, E-Commerce UX</p>
                      <ul className="space-y-1 text-[11.5px] text-slate-700">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Luxury perfumery showcase with olfactory pyramid breakdown.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Dynamic product discovery with high-end aesthetic.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Project 5: HS Weathering */}
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0B1728]" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-[13.5px] font-bold text-[#0B1728]">HS Weathering</h3>
                        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-700">
                          <a href="https://hs-weathering.netlify.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Globe className="w-3 h-3" />
                            <span>hs-weathering.netlify.app</span>
                          </a>
                          <a href="https://github.com/hissansethi0/hs-weathering" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Github className="w-3 h-3" />
                            <span>github.com/hissansethi0/hs-weathering</span>
                          </a>
                        </div>
                      </div>
                      <p className="text-[11.5px] italic text-slate-500 mb-1">JavaScript, REST Weather API, CSS3</p>
                      <ul className="space-y-1 text-[11.5px] text-slate-700">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Live atmospheric tracking with multi-day forecasts.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Async data fetching, error handling, responsive displays.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Project 6: HS Restaurant */}
                    <div className="relative">
                      <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0B1728]" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-[13.5px] font-bold text-[#0B1728]">HS Restaurant</h3>
                        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-700">
                          <a href="https://hs-restaurant.netlify.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Globe className="w-3 h-3" />
                            <span>hs-restaurant.netlify.app</span>
                          </a>
                          <a href="https://github.com/hissansethi0/hs-restaurant" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0B1728] hover:underline">
                            <Github className="w-3 h-3" />
                            <span>github.com/hissansethi0/hs-restaurant</span>
                          </a>
                        </div>
                      </div>
                      <p className="text-[11.5px] italic text-slate-500 mb-1">React, CSS3, JavaScript</p>
                      <ul className="space-y-1 text-[11.5px] text-slate-700">
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Digital menus, chef spotlights and online reservation forms.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>Interactive culinary showcase with clean UI.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* EDUCATION */}
                <div>
                  <div className="flex items-center gap-2 pb-1.5 border-b-[1.5px] border-[#0B1728] mb-3">
                    <GraduationCap className="w-4 h-4 text-[#0B1728]" />
                    <h2 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0B1728]">
                      EDUCATION
                    </h2>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-bold text-[#0B1728]">
                      FG Public School (Boys), Khyber Road Peshawar Cantt
                    </h3>
                    <p className="text-[12px] text-slate-600 mt-0.5">
                      Higher Secondary Education &amp; Computer Science
                    </p>
                    <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Current Student &nbsp;|&nbsp; Class 8</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Footer Info / Action Bar */}
        <div className="p-3 sm:p-4 bg-[#080D18] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 no-print-area">
          <span className="text-[11px] sm:text-xs">
            100% Original Resume &bull; Peshawar, Pakistan &bull; Full Stack Web Developer
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
