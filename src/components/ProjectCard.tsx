import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onQuickView?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onQuickView }) => {
  return (
    <a
      href={project.liveUrl || '#'}
      target={project.liveUrl ? '_blank' : '_self'}
      rel="noopener noreferrer"
      onClick={(e) => {
        if (!project.liveUrl && onQuickView) {
          e.preventDefault();
          onQuickView(project);
        }
      }}
      className="group relative rounded-2xl bg-[#0D141E] border border-white/[0.08] hover:border-[#1683FF]/40 hover:bg-[#111A26] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[#1683FF]/10 block"
    >
      {/* Project Screenshot Showcase */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#080C12]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D141E] via-transparent to-transparent opacity-60" />
      </div>

      {/* Bottom Info Bar matching Mockup exactly */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-[#0D141E] group-hover:bg-[#111A26] transition-colors">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#2D8CFF] transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-xs text-[#7F8A9A] truncate mt-0.5 font-medium">
            {project.subtitle || project.category}
          </p>
        </div>

        {/* Circular Blue Action Button with Up-Right Arrow */}
        <div
          aria-label={`Open ${project.title} live demo`}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1683FF] hover:bg-[#2D8CFF] text-white flex items-center justify-center shrink-0 transition-all duration-200 shadow-[0_0_12px_rgba(22,131,255,0.35)] group-hover:scale-110 active:scale-95"
        >
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};

