import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderGit2, Code2, Briefcase, GraduationCap, 
  MessageSquare, User, Settings, LogOut, Plus, Trash2, Edit3, 
  ExternalLink, Upload, Star, CheckCircle, AlertCircle, Shield, 
  Menu, X, Eye, EyeOff, RefreshCw, Copy, Check, Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Skill, Experience, Education, ContactMessage, ProfileData } from '../types';
import { uploadImageToCloudinary } from '../services/cloudinaryService';
import { isFirebaseConfigured } from '../firebase/config';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { 
    profile, updateProfile, 
    projects, addOrUpdateProject, removeProject, 
    skills, addOrUpdateSkill, removeSkill, 
    experience, addOrUpdateExperience, removeExperience, 
    education, addOrUpdateEducation, removeEducation, 
    messages, toggleMessageRead, removeMessage, 
    settings, updatePortfolioSettings,
    refreshAll 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'skills' | 'experience' | 'education' | 'messages' | 'profile' | 'settings' | 'security'
  >('overview');
  
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Modals & form state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectUploadProgress, setProjectUploadProgress] = useState<number | null>(null);

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);

  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);

  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Cloudinary image upload handler for project modal
  const handleImageFileChange = async (file: File) => {
    try {
      setProjectUploadProgress(10);
      showNotification('Uploading image to Cloudinary...', 'success');
      const res = await uploadImageToCloudinary(file, (percent) => {
        setProjectUploadProgress(percent);
      });
      if (editingProject) {
        setEditingProject({ ...editingProject, image: res.secure_url });
      }
      setProjectUploadProgress(null);
      showNotification('Image uploaded to Cloudinary successfully!', 'success');
    } catch (err: any) {
      setProjectUploadProgress(null);
      showNotification(err?.message || 'Failed to upload image. Please verify unsigned upload preset.', 'error');
    }
  };

  // Firebase Realtime Database Security Rules text
  const realtimeRules = `{
  "rules": {
    "portfolio": {
      ".read": true,
      "messages": {
        ".read": "auth != null",
        "$messageId": {
          ".write": "auth != null || !data.exists()"
        }
      },
      "projects": {
        ".write": "auth != null"
      },
      "skills": {
        ".write": "auth != null"
      },
      "experience": {
        ".write": "auth != null"
      },
      "education": {
        ".write": "auth != null"
      },
      "profile": {
        ".write": "auth != null"
      },
      "settings": {
        ".write": "auth != null"
      }
    }
  }
}`;

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0c121d] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/40">
            HS
          </div>
          <span className="font-bold text-sm">Portfolio Admin</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#0a0f18] border-r border-slate-800 flex flex-col justify-between shrink-0 z-40`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 shadow-md">
                HS
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight">Hissan Sethi</h2>
                <p className="text-[11px] font-mono text-emerald-400">Admin Control Room</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs font-mono">
            <button
              onClick={() => { setActiveTab('overview'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'overview'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'projects'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4" />
                <span>Projects</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('skills'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'skills'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4" />
                <span>Skills</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                {skills.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('experience'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'experience'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                {experience.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('education'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'education'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                {education.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('messages'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'messages'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
              </span>
              {unreadMessagesCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                  {unreadMessagesCount} new
                </span>
              ) : (
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                  {messages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('profile'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'profile'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Profile Details</span>
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'settings'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Settings & CDN</span>
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('security'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'security'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Shield className="w-4 h-4" />
                <span>Firebase Rules</span>
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Portfolio</span>
            </span>
            <span className="text-[10px] text-slate-500">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top bar */}
        <header className="px-6 py-4 bg-[#0a0f18]/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Control Panel &gt;
            </span>
            <span className="text-sm font-bold text-white capitalize">
              {activeTab} Management
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Firebase Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${isFirebaseConfigured() ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="text-slate-400">
                {isFirebaseConfigured() ? 'Firebase RTDB Connected' : 'Local Sync Active'}
              </span>
            </div>

            <button
              onClick={() => {
                refreshAll();
                showNotification('Portfolio data synchronized from database.', 'success');
              }}
              title="Refresh Data"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Global Alert Notification */}
        {statusMessage && (
          <div className="px-6 pt-4">
            <div
              className={`p-3.5 rounded-xl text-xs font-mono flex items-center justify-between ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
              }`}
            >
              <span>{statusMessage.text}</span>
              <button onClick={() => setStatusMessage(null)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Views */}
        <main className="p-6 max-w-6xl space-y-8">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono">Total Projects</span>
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-mono">{projects.length}</span>
                  <p className="text-[11px] text-slate-500 mt-1">Live Netlify deployments</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono">Total Skills</span>
                    <Code2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-mono">{skills.length}</span>
                  <p className="text-[11px] text-slate-500 mt-1">Categorized technologies</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono">Inquiries Received</span>
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-mono">{messages.length}</span>
                  <p className="text-[11px] text-emerald-400 mt-1">{unreadMessagesCount} unread message(s)</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-mono">Milestone Records</span>
                    <Briefcase className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-mono">
                    {experience.length + education.length}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Experience & education</p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-5 rounded-2xl bg-[#0e1626] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Quick Administrative Actions</h3>
                  <p className="text-xs text-slate-400">Add new deployments, update skills, or inspect inquiries.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      setEditingProject({
                        id: 'proj-' + Date.now(),
                        title: '',
                        description: '',
                        longDescription: '',
                        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
                        technologies: ['React', 'JavaScript', 'Tailwind CSS'],
                        category: 'Web Application',
                        liveUrl: 'https://',
                        githubUrl: '',
                        featured: false,
                        order: projects.length + 1,
                        createdAt: new Date().toISOString().split('T')[0],
                        features: ['Responsive UI layout', 'Fast performance'],
                      });
                      setIsProjectModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingSkill({
                        id: 'skill-' + Date.now(),
                        name: '',
                        category: 'Frontend',
                        proficiency: 85,
                        description: '',
                      });
                      setIsSkillModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill</span>
                  </button>
                </div>
              </div>

              {/* Two columns: Recent Projects & Recent Messages */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Projects List */}
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-emerald-400" />
                      <span>Live Projects Overview</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-mono text-emerald-400 hover:underline"
                    >
                      Manage All
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800/80">
                    {projects.slice(0, 5).map((p) => (
                      <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{p.title}</p>
                            <p className="text-[11px] text-slate-400 font-mono truncate">{p.liveUrl}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                          {p.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Messages */}
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      <span>Recent Inquiries</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs font-mono text-emerald-400 hover:underline"
                    >
                      View All ({messages.length})
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <p className="text-xs text-slate-500 font-mono py-6 text-center">
                      No customer inquiries received yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-slate-800/80">
                      {messages.slice(0, 4).map((msg) => (
                        <div key={msg.id} className="py-3 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {!msg.read && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />}
                              <p className="text-xs font-bold text-white truncate">{msg.name}</p>
                              <span className="text-[10px] font-mono text-slate-500">({msg.email})</span>
                            </div>
                            <p className="text-[11px] text-slate-300 font-medium truncate mt-0.5">{msg.subject}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{msg.message}</p>
                          </div>

                          <button
                            onClick={() => {
                              setViewingMessage(msg);
                              toggleMessageRead(msg.id, true);
                            }}
                            className="text-[11px] font-mono text-emerald-400 hover:underline shrink-0"
                          >
                            Read
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Project Showcase Management</h3>
                  <p className="text-xs text-slate-400">Add, edit, reorder, and upload media for Hissan's portfolio projects.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject({
                      id: 'proj-' + Date.now(),
                      title: '',
                      description: '',
                      longDescription: '',
                      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
                      technologies: ['React', 'JavaScript'],
                      category: 'Web Application',
                      liveUrl: 'https://',
                      githubUrl: '',
                      featured: false,
                      order: projects.length + 1,
                      createdAt: new Date().toISOString().split('T')[0],
                      features: [],
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>

              {/* Projects Table */}
              <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="p-4">Project</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Live URL</th>
                        <th className="p-4">GitHub</th>
                        <th className="p-4">Featured</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-850/50 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={project.image} alt={project.title} className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0" />
                            <div>
                              <p className="font-bold text-white">{project.title}</p>
                              <span className="text-[10px] text-slate-500">Order: {project.order}</span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-400">{project.category}</td>
                          <td className="p-4">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
                              <span>{project.liveUrl.replace('https://', '')}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                          <td className="p-4">
                            {project.githubUrl ? (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline truncate max-w-[140px] block">
                                repo
                              </a>
                            ) : (
                              <span className="text-slate-500 italic">Coming soon</span>
                            )}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={async () => {
                                await addOrUpdateProject({ ...project, featured: !project.featured });
                                showNotification(`Toggled featured status for ${project.title}`);
                              }}
                              className={`p-1.5 rounded-lg border ${
                                project.featured
                                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                  : 'bg-slate-800 text-slate-500 border-slate-700'
                              }`}
                            >
                              <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-amber-400' : ''}`} />
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProject({ ...project });
                                  setIsProjectModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                                title="Edit Project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete ${project.title}?`)) {
                                    await removeProject(project.id);
                                    showNotification(`Deleted ${project.title}`);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                title="Delete Project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SKILLS MANAGEMENT */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Skills Matrix Management</h3>
                  <p className="text-xs text-slate-400">Manage technical stack categories and proficiency levels.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingSkill({
                      id: 'skill-' + Date.now(),
                      name: '',
                      category: 'Frontend',
                      proficiency: 85,
                      description: '',
                    });
                    setIsSkillModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{skill.name}</h4>
                      <span className="text-[11px] font-mono text-emerald-400">{skill.category}</span>
                      {skill.proficiency && (
                        <p className="text-[11px] font-mono text-slate-500">Proficiency: {skill.proficiency}%</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setIsSkillModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete skill ${skill.name}?`)) {
                            await removeSkill(skill.id);
                            showNotification(`Removed ${skill.name}`);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCE MANAGEMENT */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Experience Records</h3>
                  <p className="text-xs text-slate-400">Record independent projects, freelancing, or future company employment.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingExperience({
                      id: 'exp-' + Date.now(),
                      position: '',
                      company: '',
                      description: '',
                      startDate: '2024',
                      endDate: 'Present',
                      current: true,
                      technologies: ['React', 'JavaScript'],
                    });
                    setIsExpModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white">{exp.position}</h4>
                        <p className="text-xs font-mono text-emerald-400">{exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingExperience(exp);
                            setIsExpModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete experience ${exp.position}?`)) {
                              await removeExperience(exp.id);
                              showNotification(`Removed ${exp.position}`);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EDUCATION MANAGEMENT */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Education Milestones</h3>
                  <p className="text-xs text-slate-400">Current student status and academic records.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingEducation({
                      id: 'edu-' + Date.now(),
                      institution: '',
                      degree: '',
                      field: '',
                      startYear: '2022',
                      endYear: '2026',
                      current: true,
                      description: '',
                    });
                    setIsEduModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education Record</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                        <p className="text-xs font-mono text-emerald-400">{edu.institution}</p>
                        <p className="text-[11px] font-mono text-slate-500">Field: {edu.field} • {edu.startYear} - {edu.current ? 'Present' : edu.endYear}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingEducation(edu);
                            setIsEduModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete education record ${edu.degree}?`)) {
                              await removeEducation(edu.id);
                              showNotification(`Removed record`);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-xs text-slate-400">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Client & Contact Inquiries</h3>
                  <p className="text-xs text-slate-400">Messages sent via the contact form and logged to Firebase Realtime Database.</p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Total Messages: {messages.length}
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
                  <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">No inquiries recorded yet</p>
                  <p className="text-xs text-slate-400 mt-1">Visitors submitting the contact form will appear here in real-time.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-colors ${
                        !msg.read
                          ? 'bg-[#0d1626] border-emerald-500/40'
                          : 'bg-slate-900/40 border-slate-800'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500 text-slate-950 font-bold">
                              NEW
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                          <span className="text-xs font-mono text-slate-400">&lt;{msg.email}&gt;</span>
                        </div>

                        <span className="text-[11px] font-mono text-slate-500">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-emerald-300 font-mono mb-1">{msg.subject}</p>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <span>Reply via Email</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleMessageRead(msg.id, !msg.read)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                          >
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Delete this message?')) {
                                await removeMessage(msg.id);
                                showNotification('Message deleted');
                              }
                            }}
                            className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Profile Information</h3>
                <p className="text-xs text-slate-400">Update personal identity, contact handles, and developer biography.</p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await updateProfile(profile);
                  showNotification('Profile updated successfully!');
                }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Professional Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => updateProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Status</label>
                    <input
                      type="text"
                      value={profile.status}
                      onChange={(e) => updateProfile({ ...profile, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => updateProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">WhatsApp Number</label>
                    <input
                      type="text"
                      value={profile.whatsapp}
                      onChange={(e) => updateProfile({ ...profile, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Email Placeholder / Contact</label>
                    <input
                      type="text"
                      value={profile.email}
                      onChange={(e) => updateProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">LinkedIn URL</label>
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) => updateProfile({ ...profile, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">GitHub URL</label>
                    <input
                      type="text"
                      value={profile.github}
                      onChange={(e) => updateProfile({ ...profile, github: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Intro Highlight</label>
                  <input
                    type="text"
                    value={profile.introHighlight}
                    onChange={(e) => updateProfile({ ...profile, introHighlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Biography</label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => updateProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Philosophy</label>
                  <textarea
                    rows={2}
                    value={profile.philosophy}
                    onChange={(e) => updateProfile({ ...profile, philosophy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono hover:bg-emerald-400 transition-colors"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB: SETTINGS & CLOUDINARY */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Portfolio Settings & Cloudinary</h3>
                <p className="text-xs text-slate-400">Configure Cloudinary unsigned presets and client presentation options.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Cloudinary Media Settings</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Cloud Name</label>
                      <input
                        type="text"
                        value={settings.cloudinaryCloudName}
                        onChange={(e) => updatePortfolioSettings({ ...settings, cloudinaryCloudName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Unsigned Upload Preset</label>
                      <input
                        type="text"
                        value={settings.cloudinaryUploadPreset}
                        onChange={(e) => updatePortfolioSettings({ ...settings, cloudinaryUploadPreset: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                    <p className="text-slate-300 font-semibold">Cloudinary Security Standard:</p>
                    <p>• Only the Cloud Name & Unsigned Preset are stored on the frontend.</p>
                    <p>• The Cloudinary Secret API is never exposed to the client.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Direct Message Reception</p>
                    <p className="text-[11px] text-slate-400">Allow contact messages to be recorded in Firebase Realtime Database.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.allowDirectMessages}
                    onChange={(e) => updatePortfolioSettings({ ...settings, allowDirectMessages: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: FIREBASE RULES & SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Firebase Realtime Database Security Rules</h3>
                <p className="text-xs text-slate-400">
                  Copy and paste these exact rules into your Firebase Realtime Database Console under the "Rules" tab.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Shield className="w-4 h-4" />
                    <span>Realtime Database Rules (JSON)</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(realtimeRules);
                      showNotification('Firebase security rules copied to clipboard!');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copy Rules</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  {realtimeRules}
                </pre>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-400 space-y-2 leading-relaxed">
                  <p className="text-slate-200 font-semibold">How these rules protect your portfolio:</p>
                  <p>1. <span className="text-emerald-400">Public Read</span>: Normal visitors can read your projects, skills, education, experience, and profile.</p>
                  <p>2. <span className="text-emerald-400">Visitor Write to Messages</span>: Visitors can submit new messages into <code className="text-white">/portfolio/messages</code>, but cannot read or edit other people's messages.</p>
                  <p>3. <span className="text-emerald-400">Admin Only Modifications</span>: Only authenticated administrators (<code className="text-white">auth != null</code>) can read messages, update projects, modify skills, or delete content.</p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* PROJECT MODAL */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0e1626] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProject.id.startsWith('proj-') ? 'Add New Project' : `Edit: ${editingProject.title}`}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    placeholder="Web Application, E-Commerce..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Live Website URL</label>
                  <input
                    type="url"
                    required
                    value={editingProject.liveUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    placeholder="https://example.netlify.app"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">GitHub URL (Leave empty for "coming soon")</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload / URL */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <label className="text-slate-300 font-bold flex items-center justify-between">
                  <span>Project Image (Cloudinary or Direct URL)</span>
                  {projectUploadProgress !== null && (
                    <span className="text-emerald-400">{projectUploadProgress}%</span>
                  )}
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    placeholder="https://res.cloudinary.com/..."
                  />
                  
                  {/* File selector for Cloudinary unsigned upload */}
                  <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer whitespace-nowrap flex items-center gap-1.5 text-xs">
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageFileChange(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Short Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Detailed Long Description</label>
                <textarea
                  rows={3}
                  value={editingProject.longDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, longDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={editingProject.technologies.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  placeholder="React, JavaScript, Tailwind CSS..."
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <span>Mark as Featured Project</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-slate-400">Display Order:</label>
                  <input
                    type="number"
                    value={editingProject.order}
                    onChange={(e) => setEditingProject({ ...editingProject, order: Number(e.target.value) })}
                    className="w-16 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white text-center"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!editingProject.title || !editingProject.liveUrl) {
                    alert('Title and live URL are required.');
                    return;
                  }
                  await addOrUpdateProject(editingProject);
                  setIsProjectModalOpen(false);
                  showNotification(`Saved project: ${editingProject.title}`);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono hover:bg-emerald-400"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SKILL MODAL */}
      {isSkillModalOpen && editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e1626] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Configure Skill</h3>
              <button onClick={() => setIsSkillModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-400">Category</label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Deployment">Deployment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400">Proficiency ({editingSkill.proficiency || 80}%)</label>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={editingSkill.proficiency || 80}
                  onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                  className="w-full accent-emerald-500 mt-1"
                />
              </div>

              <div>
                <label className="text-slate-400">Short Description</label>
                <textarea
                  rows={2}
                  value={editingSkill.description || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsSkillModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!editingSkill.name) return;
                  await addOrUpdateSkill(editingSkill);
                  setIsSkillModalOpen(false);
                  showNotification(`Saved skill: ${editingSkill.name}`);
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPERIENCE MODAL */}
      {isExpModalOpen && editingExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e1626] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Experience Record</h3>
              <button onClick={() => setIsExpModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400">Position / Title</label>
                <input
                  type="text"
                  value={editingExperience.position}
                  onChange={(e) => setEditingExperience({ ...editingExperience, position: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-400">Company / Organization</label>
                <input
                  type="text"
                  value={editingExperience.company}
                  onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400">Start Date</label>
                  <input
                    type="text"
                    value={editingExperience.startDate}
                    onChange={(e) => setEditingExperience({ ...editingExperience, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-400">End Date</label>
                  <input
                    type="text"
                    value={editingExperience.endDate}
                    onChange={(e) => setEditingExperience({ ...editingExperience, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                    placeholder="Present"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400">Description</label>
                <textarea
                  rows={3}
                  value={editingExperience.description}
                  onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsExpModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await addOrUpdateExperience(editingExperience);
                  setIsExpModalOpen(false);
                  showNotification('Saved experience record');
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDUCATION MODAL */}
      {isEduModalOpen && editingEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e1626] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Education Record</h3>
              <button onClick={() => setIsEduModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400">Degree / Program</label>
                <input
                  type="text"
                  value={editingEducation.degree}
                  onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-400">Institution</label>
                <input
                  type="text"
                  value={editingEducation.institution}
                  onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                />
              </div>

              <div>
                <label className="text-slate-400">Field of Study</label>
                <input
                  type="text"
                  value={editingEducation.field}
                  onChange={(e) => setEditingEducation({ ...editingEducation, field: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400">Start Year</label>
                  <input
                    type="text"
                    value={editingEducation.startYear}
                    onChange={(e) => setEditingEducation({ ...editingEducation, startYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-400">End Year</label>
                  <input
                    type="text"
                    value={editingEducation.endYear}
                    onChange={(e) => setEditingEducation({ ...editingEducation, endYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white mt-1"
                    placeholder="2026"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsEduModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await addOrUpdateEducation(editingEducation);
                  setIsEduModalOpen(false);
                  showNotification('Saved education record');
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
