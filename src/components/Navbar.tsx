import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { scrollToSection } from '../utils/navigation';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const logoClicksRef = useRef(0);
  const logoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  // Secret shortcut for Hissan: Press Ctrl+Shift+A (or Cmd+Shift+A) to open Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Clean up logo click timeout on unmount
  useEffect(() => {
    return () => {
      if (logoTimeoutRef.current) {
        clearTimeout(logoTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy for active section indicator
      if (isHomePage) {
        const sections = ['home', 'about', 'skills', 'projects', 'services', 'contact'];
        const scrollPosition = window.scrollY + 180;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (!isHomePage) {
      navigate('/' + href);
      return;
    }

    scrollToSection(href);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    // Secret Owner Trigger: 5 rapid clicks on "HS" logo navigates directly to Admin Login
    logoClicksRef.current += 1;
    if (logoTimeoutRef.current) {
      clearTimeout(logoTimeoutRef.current);
    }
    logoTimeoutRef.current = setTimeout(() => {
      logoClicksRef.current = 0;
    }, 2500);

    if (logoClicksRef.current >= 5) {
      e.preventDefault();
      logoClicksRef.current = 0;
      navigate('/admin/login');
      return;
    }

    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080C12]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/60 py-3.5'
          : 'bg-[#05070A]/80 backdrop-blur-sm border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: HS Monogram (with secret owner 5-click trigger) */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
          onClick={handleLogoClick}
          title="Hissan Sethi"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0D141E] border border-[#1683FF]/40 flex items-center justify-center font-mono font-bold text-lg text-[#1683FF] group-hover:border-[#2D8CFF] group-hover:shadow-[0_0_16px_rgba(22,131,255,0.4)] transition-all duration-200">
            <span>HS</span>
          </div>
          <span className="hidden sm:inline font-bold text-sm tracking-tight text-white group-hover:text-[#2D8CFF] transition-colors">
            Hissan Sethi
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D141E]/80 border border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = isHomePage && activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-[#1683FF] shadow-[0_0_12px_rgba(22,131,255,0.4)]'
                    : 'text-[#B7C1D1] hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Hire Me CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-5 py-2 rounded-full bg-[#1683FF] hover:bg-[#2D8CFF] text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_16px_rgba(22,131,255,0.35)] hover:shadow-[0_0_24px_rgba(45,140,255,0.5)] active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Admin link - ONLY visible when Hissan is logged in on his device */}
          {user && (
            <Link
              to="/admin/dashboard"
              title="Administrator Dashboard"
              className="p-2 rounded-xl bg-[#0D141E] hover:bg-[#111A26] border border-[#1683FF]/40 text-[#2D8CFF] hover:text-white transition-colors"
            >
              <Shield className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-3.5 py-1.5 rounded-full bg-[#1683FF] text-white text-xs font-semibold shadow-sm cursor-pointer"
          >
            Hire Me
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl bg-[#0D141E] border border-white/[0.08] text-[#F5F7FA] hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#2D8CFF]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pb-6 pt-3 bg-[#080C12] border-b border-white/[0.08] shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = isHomePage && activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#1683FF]/15 text-[#2D8CFF] border border-[#2D8CFF]/30 font-semibold'
                      : 'text-[#B7C1D1] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              );
            })}

            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center py-3 text-sm font-semibold rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(22,131,255,0.3)] cursor-pointer"
              >
                <span>Hire Me / Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Only show on mobile if user is authenticated */}
              {user && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-mono text-[#2D8CFF] hover:text-white rounded-xl bg-[#0D141E] border border-[#1683FF]/30"
                >
                  Admin Management Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
