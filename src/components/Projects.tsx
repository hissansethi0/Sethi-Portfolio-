import React, { useState, useMemo } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { scrollToSection } from '../utils/navigation';

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Derive unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  const displayedProjects = useMemo(() => {
    let list = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    } else if (!showAll) {
      // By default show top 4 featured projects matching the 4-column layout in the mockup
      const featured = list.filter((p) => p.featured);
      list = featured.length >= 4 ? featured.slice(0, 4) : list.slice(0, 4);
    }

    return list;
  }, [projects, selectedCategory, showAll]);

  const handleContactScroll = (e: React.MouseEvent) => {
    scrollToSection('#contact', e);
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative border-t border-white/[0.08] bg-[#05070A] scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Mockup exactly */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="text-xs font-mono font-semibold tracking-wider text-[#1683FF] uppercase">
              MY WORK
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-[#1683FF]">Projects</span>
            </h2>
            <p className="text-[#7F8A9A] text-sm sm:text-base max-w-2xl">
              Here are some of the projects I've worked on. Each one helped me learn, grow and build real-world solutions.
            </p>
          </div>

          {/* Action button: View All Projects */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowAll(!showAll);
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-full bg-[#0D141E] hover:bg-[#111A26] border border-white/[0.1] text-xs font-semibold text-[#F5F7FA] hover:text-[#2D8CFF] hover:border-[#1683FF]/40 transition-all flex items-center gap-2 group cursor-pointer shadow-md"
            >
              <span>{showAll ? 'Show Top 4' : 'View All Projects'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(true);
              }}
              className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all whitespace-nowrap border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1683FF] text-white border-[#1683FF] font-semibold shadow-[0_0_12px_rgba(22,131,255,0.4)]'
                  : 'bg-[#0D141E] text-[#B7C1D1] hover:text-white border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid: 4 columns on desktop matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onQuickView={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>

        {/* Bottom CTA prompt */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0D141E] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Have a custom project requirement?</h3>
            <p className="text-xs sm:text-sm text-[#7F8A9A] mt-1">
              From fast single-page web utilities to full-stack e-commerce platforms and databases.
            </p>
          </div>
          <button
            onClick={handleContactScroll}
            className="px-6 py-3 rounded-full bg-[#1683FF] hover:bg-[#2D8CFF] text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_16px_rgba(22,131,255,0.35)] shrink-0 cursor-pointer"
          >
            Start a Conversation →
          </button>
        </div>

      </div>

      {/* Quick Interactive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
