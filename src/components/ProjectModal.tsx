import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Layers, Calendar, Tag } from 'lucide-react';
import { Project } from '../types';
import { Link } from 'react-router-dom';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasValidGithub = project.githubUrl && project.githubUrl.trim().startsWith('http');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0D141E] border border-white/[0.1] shadow-2xl text-[#F5F7FA] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-[#080C12]/80 hover:bg-[#1683FF] text-[#B7C1D1] hover:text-white border border-white/[0.1] transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#080C12]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D141E] via-transparent to-black/40" />

          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1683FF]/20 text-[#2D8CFF] border border-[#1683FF]/40">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {project.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(22,131,255,0.4)] transition-all"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#7F8A9A] mb-2">
              Project Overview
            </h3>
            <p className="text-sm sm:text-base text-[#B7C1D1] leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#7F8A9A] mb-3">
                Key Features & Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#080C12] border border-white/[0.04]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2D8CFF] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#B7C1D1]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#7F8A9A] mb-2.5">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-[#080C12] text-[#2D8CFF] border border-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer / Actions */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(22,131,255,0.3)] transition-all"
              >
                <span>Launch Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {hasValidGithub ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#080C12] hover:bg-white/[0.05] text-[#B7C1D1] hover:text-white border border-white/[0.1] text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              ) : (
                <span className="px-3 py-2 rounded-xl bg-[#080C12] text-[#7F8A9A] border border-white/[0.04] text-xs font-mono">
                  GitHub coming soon
                </span>
              )}
            </div>

            <Link
              to={`/project/${project.id}`}
              onClick={onClose}
              className="text-xs font-semibold text-[#2D8CFF] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Full Case Study Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
