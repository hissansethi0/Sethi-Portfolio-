import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, MessageSquare, Linkedin, Github, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { scrollToSection } from '../utils/navigation';

export const Footer: React.FC = () => {
  const { profile } = usePortfolio();
  const { user } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    scrollToSection(href, e);
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#05070A] text-[#7F8A9A] text-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Identity */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D141E] border border-[#1683FF]/40 flex items-center justify-center font-mono font-bold text-[#1683FF]">
                HS
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">{profile.name}</h3>
                <p className="text-xs font-mono text-[#2D8CFF]">Full Stack Web Developer</p>
              </div>
            </div>

            <p className="text-xs text-[#7F8A9A] max-w-md leading-relaxed">
              Crafting modern, fast and scalable web applications with a focus on clean code, thoughtful UX and real-world solutions.
            </p>

            <div className="text-xs font-mono text-[#7F8A9A] flex items-center gap-2">
              <span>Location: {profile.location}</span>
              <span>•</span>
              <span className="text-[#2D8CFF]">Available for freelance & contracts</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#7F8A9A] hover:text-[#2D8CFF] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Connect
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#7F8A9A] hover:text-[#2D8CFF] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2D8CFF]" />
                <span>WhatsApp: {profile.whatsapp}</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#7F8A9A] hover:text-[#2D8CFF] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#2D8CFF]" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#7F8A9A] hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repositories</span>
              </a>

              {user && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 text-[#2D8CFF] hover:text-white transition-colors pt-2"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7F8A9A]">
          <div>
            © {new Date().getFullYear()} Hissan Sethi. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Designed and built by Hissan Sethi</span>
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#0D141E] hover:bg-[#111A26] border border-white/[0.08] hover:border-[#2D8CFF]/40 text-[#7F8A9A] hover:text-white transition-colors"
              title="Return to top"
              aria-label="Return to top of page"
            >
              <ArrowUp className="w-4 h-4 text-[#2D8CFF]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
