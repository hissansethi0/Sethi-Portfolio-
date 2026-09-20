import React, { useState } from 'react';
import { 
  Code2, Layout, Database, Server, Terminal, Cloud, Wrench, 
  Cpu, Zap, Layers, CheckCircle2, ShieldCheck, GitBranch, Github, Palette, Atom
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const getSkillIcon = (name: string, category: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('react')) return <Atom className="w-5 h-5 text-[#00D8FF]" />;
    if (lower.includes('next')) return <Layers className="w-5 h-5 text-white" />;
    if (lower.includes('tailwind')) return <Palette className="w-5 h-5 text-[#38BDF8]" />;
    if (lower.includes('javascript')) return <Code2 className="w-5 h-5 text-[#F7DF1E]" />;
    if (lower.includes('html') || lower.includes('css')) return <Layout className="w-5 h-5 text-[#E34F26]" />;
    if (lower.includes('node')) return <Server className="w-5 h-5 text-[#68A063]" />;
    if (lower.includes('express')) return <Cpu className="w-5 h-5 text-white" />;
    if (lower.includes('api')) return <Zap className="w-5 h-5 text-[#2D8CFF]" />;
    if (lower.includes('mongo')) return <Database className="w-5 h-5 text-[#13AA52]" />;
    if (lower.includes('firebase')) return <Database className="w-5 h-5 text-[#FFCA28]" />;
    if (lower.includes('auth')) return <ShieldCheck className="w-5 h-5 text-[#2D8CFF]" />;
    if (lower.includes('git') && !lower.includes('hub')) return <GitBranch className="w-5 h-5 text-[#F05032]" />;
    if (lower.includes('github')) return <Github className="w-5 h-5 text-white" />;
    if (lower.includes('code') || lower.includes('vs')) return <Terminal className="w-5 h-5 text-[#007ACC]" />;
    if (lower.includes('cloud') || lower.includes('netlify')) return <Cloud className="w-5 h-5 text-[#00C7B7]" />;
    
    return <Cpu className="w-5 h-5 text-[#2D8CFF]" />;
  };

  return (
    <section id="skills" className="py-24 relative border-t border-white/[0.08] bg-[#05070A] scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-[#2D8CFF] uppercase">
            EXPERTISE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-[#2D8CFF]">Technologies</span>
          </h2>
          <p className="text-[#7F8A9A] text-base max-w-2xl">
            Core stack and tooling used to engineer responsive frontends, backend logic, and production deployments.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono rounded-xl transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-[#1683FF] text-white border-[#1683FF] font-semibold shadow-[0_0_12px_rgba(22,131,255,0.3)]'
                  : 'bg-[#0D141E] text-[#B7C1D1] hover:text-white border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-xl bg-[#0D141E] border border-white/[0.08] hover:border-[#2D8CFF]/40 hover:bg-[#111A26] transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#080C12] border border-white/[0.08] group-hover:border-[#2D8CFF]/30 flex items-center justify-center shrink-0">
                  {getSkillIcon(skill.name, skill.category)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#2D8CFF] transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#7F8A9A]">
                    {skill.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#7F8A9A] leading-relaxed mt-3 pt-3 border-t border-white/[0.04]">
                {skill.description || 'Production-tested implementation with clean patterns and modular architecture.'}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
