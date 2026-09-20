import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Skill, Experience, Education, ContactMessage, ProfileData, PortfolioSettings } from '../types';
import { fetchProjects, saveProject, deleteProjectById } from '../services/projectService';
import { fetchSkills, saveSkill, deleteSkillById } from '../services/skillService';
import { fetchMessages, sendMessage, markMessageRead, deleteMessageById } from '../services/messageService';
import { 
  fetchProfile, saveProfile, 
  fetchExperience, saveExperience, deleteExperienceById, 
  fetchEducation, saveEducation, deleteEducationById, 
  fetchSettings, saveSettings 
} from '../services/profileService';
import { INITIAL_PROFILE, INITIAL_SETTINGS, INITIAL_PROJECTS, INITIAL_SKILLS, INITIAL_EXPERIENCE, INITIAL_EDUCATION } from '../data/initialData';
import { subscribeToDatabasePath, DB_PATHS } from '../firebase/database';

interface PortfolioContextType {
  profile: ProfileData;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  messages: ContactMessage[];
  settings: PortfolioSettings;
  loading: boolean;
  refreshAll: () => Promise<void>;
  updateProfile: (profile: ProfileData) => Promise<void>;
  addOrUpdateProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  addOrUpdateSkill: (skill: Skill) => Promise<void>;
  removeSkill: (id: string) => Promise<void>;
  addOrUpdateExperience: (exp: Experience) => Promise<void>;
  removeExperience: (id: string) => Promise<void>;
  addOrUpdateEducation: (edu: Education) => Promise<void>;
  removeEducation: (id: string) => Promise<void>;
  sendContactMessage: (data: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => Promise<ContactMessage>;
  toggleMessageRead: (id: string, read: boolean) => Promise<void>;
  removeMessage: (id: string) => Promise<void>;
  updatePortfolioSettings: (settings: PortfolioSettings) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const getInitialState = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch {
    return fallback;
  }
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => getInitialState('hissan_portfolio_profile', INITIAL_PROFILE));
  const [projects, setProjects] = useState<Project[]>(() => getInitialState('hissan_portfolio_projects', INITIAL_PROJECTS));
  const [skills, setSkills] = useState<Skill[]>(() => getInitialState('hissan_portfolio_skills', INITIAL_SKILLS));
  const [experience, setExperience] = useState<Experience[]>(() => getInitialState('hissan_portfolio_experience', INITIAL_EXPERIENCE));
  const [education, setEducation] = useState<Education[]>(() => getInitialState('hissan_portfolio_education', INITIAL_EDUCATION));
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<PortfolioSettings>(() => getInitialState('hissan_portfolio_settings', INITIAL_SETTINGS));
  // Instant readiness: Start with false so the site renders immediately with initial/cached data
  const [loading, setLoading] = useState<boolean>(false);

  const refreshAll = useCallback(async () => {
    try {
      // Primary critical view data
      const [profData, projData, skillData] = await Promise.all([
        fetchProfile(),
        fetchProjects(),
        fetchSkills(),
      ]);

      if (profData) setProfile(profData);
      if (projData && projData.length > 0) setProjects(projData);
      if (skillData && skillData.length > 0) setSkills(skillData);

      // Asynchronously fetch remaining secondary data without delaying main render
      Promise.all([
        fetchExperience(),
        fetchEducation(),
        fetchMessages(),
        fetchSettings(),
      ]).then(([expData, eduData, msgData, settData]) => {
        if (expData) setExperience(expData);
        if (eduData) setEducation(eduData);
        if (msgData) setMessages(msgData);
        if (settData) setSettings(settData);
      }).catch((err) => {
        console.warn('Secondary data fetch error:', err);
      });
    } catch (err) {
      console.warn('Error refreshing portfolio data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();

    // Setup live Firebase RTDB listeners where available
    const unsubProjects = subscribeToDatabasePath<Project[]>(DB_PATHS.PROJECTS, (data) => {
      if (data && Array.isArray(data)) setProjects(data.filter(Boolean));
    });

    const unsubMessages = subscribeToDatabasePath<Record<string, ContactMessage>>(DB_PATHS.MESSAGES, (data) => {
      if (data) {
        const list = Object.entries(data).map(([k, v]) => ({ ...v, id: k }));
        list.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
        setMessages(list);
      }
    });

    return () => {
      unsubProjects();
      unsubMessages();
    };
  }, [refreshAll]);

  const updateProfile = async (newProfile: ProfileData) => {
    setProfile(newProfile);
    await saveProfile(newProfile);
  };

  const addOrUpdateProject = async (project: Project) => {
    await saveProject(project);
    const updated = await fetchProjects();
    setProjects(updated);
  };

  const removeProject = async (id: string) => {
    await deleteProjectById(id);
    const updated = await fetchProjects();
    setProjects(updated);
  };

  const addOrUpdateSkill = async (skill: Skill) => {
    await saveSkill(skill);
    const updated = await fetchSkills();
    setSkills(updated);
  };

  const removeSkill = async (id: string) => {
    await deleteSkillById(id);
    const updated = await fetchSkills();
    setSkills(updated);
  };

  const addOrUpdateExperience = async (exp: Experience) => {
    await saveExperience(exp);
    const updated = await fetchExperience();
    setExperience(updated);
  };

  const removeExperience = async (id: string) => {
    await deleteExperienceById(id);
    const updated = await fetchExperience();
    setExperience(updated);
  };

  const addOrUpdateEducation = async (edu: Education) => {
    await saveEducation(edu);
    const updated = await fetchEducation();
    setEducation(updated);
  };

  const removeEducation = async (id: string) => {
    await deleteEducationById(id);
    const updated = await fetchEducation();
    setEducation(updated);
  };

  const sendContactMessage = async (data: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => {
    const newMsg = await sendMessage(data);
    setMessages((prev) => [newMsg, ...prev]);
    return newMsg;
  };

  const toggleMessageRead = async (id: string, read: boolean) => {
    await markMessageRead(id, read);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
  };

  const removeMessage = async (id: string) => {
    await deleteMessageById(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const updatePortfolioSettings = async (newSettings: PortfolioSettings) => {
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        skills,
        experience,
        education,
        messages,
        settings,
        loading,
        refreshAll,
        updateProfile,
        addOrUpdateProject,
        removeProject,
        addOrUpdateSkill,
        removeSkill,
        addOrUpdateExperience,
        removeExperience,
        addOrUpdateEducation,
        removeEducation,
        sendContactMessage,
        toggleMessageRead,
        removeMessage,
        updatePortfolioSettings,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
