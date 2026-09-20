import React from 'react';
import { 
  Code2, 
  Smartphone, 
  ShoppingBag, 
  LayoutDashboard, 
  Server, 
  Database, 
  PenTool, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { scrollToSection } from '../utils/navigation';

export const Services: React.FC = () => {
  const servicesList = [
    {
      title: 'Full Stack Web Development',
      description: 'End-to-end web applications built using React, Node.js, Express, and modern architectural standards.',
      icon: <Code2 className="w-6 h-6 text-[#2D8CFF]" />,
    },
    {
      title: 'Responsive Website Development',
      description: 'Clean layouts engineered to render fluidly across mobile phones, tablets, laptops, and ultra-wide displays.',
      icon: <Smartphone className="w-6 h-6 text-[#2D8CFF]" />,
    },
    {
      title: 'E-commerce Development',
      description: 'Product catalogs, intuitive cart workflows, checkout processes, and direct customer communication channels.',
      icon: <ShoppingBag className="w-6 h-6 text-[#2D8CFF]" />,
    },
    {
      title: 'Admin Dashboard Development',
      description: 'Structured control panels for content management, realtime telemetry, asset uploads, and database operations.',
      icon: <LayoutDashboard className="w-6 h-6 text-[#2D8CFF]" />,
    },
    {
      title: 'API & Backend Development',
      description: 'Scalable RESTful API endpoints, request validation, structured error handling, and secure JSON payload schemas.',
      icon: <Server className="w-6 h-6 text-[#2D8CFF]" />,
    },
    {
      title: 'Database Integration',
      description: 'Database schema design and synchronization using MongoDB and Firebase Realtime Database with live listeners.',
      icon: <Database className="w-6 h-6 text-[#2D8CFF]" />,
    },
    {
      title: 'UI/UX Implementation',
      description: 'Translating design concepts into accessible, pixel-accurate Tailwind CSS components with purposeful interactions.',
      icon: <PenTool className="w-6 h-6 text-[#2D8CFF]" />,
    },
    {
      title: 'Website Optimization',
      description: 'Lighthouse audit improvements, asset optimization via Cloudinary, and code splitting for rapid load times.',
      icon: <Zap className="w-6 h-6 text-[#2D8CFF]" />,
    },
  ];

  return (
    <section id="services" className="py-24 relative border-t border-white/[0.08] bg-[#05070A] scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-[#2D8CFF] uppercase">
            SERVICES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What I <span className="text-[#2D8CFF]">Build & Deliver</span>
          </h2>
          <p className="text-[#7F8A9A] text-base max-w-2xl">
            Clean, modular web development services focused on real-world reliability, performance, and practical user experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <a
              key={index}
              href="#contact"
              onClick={(e) => scrollToSection('#contact', e)}
              className="p-6 rounded-2xl bg-[#0D141E] border border-white/[0.08] hover:border-[#1683FF]/40 hover:bg-[#111A26] transition-all duration-300 flex flex-col justify-between group shadow-lg cursor-pointer block"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#080C12] border border-white/[0.08] group-hover:border-[#1683FF]/40 flex items-center justify-center mb-5 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#2D8CFF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7F8A9A] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center gap-1 text-xs font-semibold text-[#7F8A9A] group-hover:text-[#2D8CFF] transition-colors">
                <span>Inquire details</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
