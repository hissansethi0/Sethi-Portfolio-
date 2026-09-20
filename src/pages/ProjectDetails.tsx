import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, Github, Star, Calendar, 
  Layers, CheckCircle2, Globe, Sparkles 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from '../components/ProjectCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, loading } = usePortfolio();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const project = useMemo(() => {
    return projects.find((p) => p.id === id);
  }, [projects, id]);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects
      .filter((p) => p.id !== project.id && (p.category === project.category || p.featured))
      .slice(0, 3);
  }, [projects, project]);

  const hasValidGithub = project?.githubUrl && project.githubUrl.trim().startsWith('http');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#1683FF]/20 border-t-[#2D8CFF] rounded-full animate-spin" />
          <p className="text-xs font-mono text-[#7F8A9A]">Loading project case study...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#05070A] text-[#F5F7FA] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center space-y-6">
          <div className="p-4 rounded-2xl bg-[#0D141E] border border-white/[0.08] w-fit mx-auto text-[#2D8CFF]">
            <Globe className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Project Not Found</h1>
          <p className="text-sm text-[#7F8A9A]">
            The project record you requested may have been re-indexed or removed.
          </p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1683FF] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2D8CFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-[#F5F7FA] flex flex-col selection:bg-[#1683FF]/30 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D141E] hover:bg-[#111A26] border border-white/[0.08] text-xs font-mono text-[#B7C1D1] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#2D8CFF]" />
              <span>Back to Projects</span>
            </button>
          </div>

          {/* Project Header Banner */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#1683FF]/15 border border-[#1683FF]/30 text-[#2D8CFF] text-xs font-mono">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>Featured Project</span>
                </span>
              )}
              {project.createdAt && (
                <span className="text-xs font-mono text-[#7F8A9A] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{project.createdAt}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-[#B7C1D1] leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Project Action Bar */}
          <div className="flex flex-wrap items-center gap-4 pb-8 mb-8 border-b border-white/[0.08]">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(22,131,255,0.35)] flex items-center gap-2 active:scale-95"
            >
              <span>Launch Live Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {hasValidGithub ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#0D141E] hover:bg-[#111A26] border border-white/[0.08] text-white font-medium text-sm transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            ) : (
              <div className="px-4 py-3 rounded-xl bg-[#0D141E] border border-white/[0.08] text-[#7F8A9A] text-xs font-mono flex items-center gap-2">
                <Github className="w-4 h-4 text-[#7F8A9A]" />
                <span>GitHub coming soon</span>
              </div>
            )}
          </div>

          {/* Large Project Image Showcase */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-[#080C12] mb-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[520px] object-cover"
            />
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-[#05070A]/80 backdrop-blur-md border border-white/[0.1] text-[11px] font-mono text-[#B7C1D1]">
              {project.liveUrl}
            </div>
          </div>

          {/* Detailed Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            
            {/* Left: Detailed Overview & Features */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Detailed writeup */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141E] border border-white/[0.08] space-y-4">
                <h3 className="text-xl font-bold text-white">Project Overview</h3>
                <p className="text-sm text-[#B7C1D1] leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Key Features List */}
              {project.features && project.features.length > 0 && (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141E] border border-white/[0.08] space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#2D8CFF]" />
                    <span>Key Architectural Features</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#080C12] border border-white/[0.04] text-xs text-[#B7C1D1] flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1683FF] mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional screenshots if present */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Additional Previews</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.screenshots.map((shot, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#080C12]">
                        <img src={shot} alt={`Preview ${idx + 1}`} className="w-full h-auto object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right: Metadata, Technologies & Links */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Technologies Card */}
              <div className="p-6 rounded-2xl bg-[#0D141E] border border-white/[0.08] space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#7F8A9A]">
                  Stack & Tooling
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-[#080C12] text-[#2D8CFF] border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Project Snapshot */}
              <div className="p-6 rounded-2xl bg-[#0D141E] border border-white/[0.08] space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#7F8A9A]">
                  Quick Launch
                </h4>
                <p className="text-xs text-[#7F8A9A]">
                  Check out the live interactive website running in production on Netlify.
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(22,131,255,0.3)]"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <div className="pt-12 border-t border-white/[0.08] space-y-6">
              <h3 className="text-xl font-bold text-white">More Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};
