import { Skill } from '../types';
import { DB_PATHS, getDatabaseData, setDatabaseData } from '../firebase/database';
import { INITIAL_SKILLS } from '../data/initialData';
import { apiGet, apiPost, apiDelete } from './apiService';

const LOCAL_SKILLS_KEY = 'hissan_portfolio_skills';

function getLocalSkills(): Skill[] {
  const stored = localStorage.getItem(LOCAL_SKILLS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  localStorage.setItem(LOCAL_SKILLS_KEY, JSON.stringify(INITIAL_SKILLS));
  return INITIAL_SKILLS;
}

function saveLocalSkills(skills: Skill[]): void {
  localStorage.setItem(LOCAL_SKILLS_KEY, JSON.stringify(skills));
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const serverSkills = await apiGet<Skill[]>('/api/skills');
    if (serverSkills && Array.isArray(serverSkills) && serverSkills.length > 0) {
      saveLocalSkills(serverSkills);
      return serverSkills;
    }
  } catch (err) {
    console.warn('Server skills fetch failed:', err);
  }

  try {
    const remoteData = await getDatabaseData<Record<string, Skill> | Skill[]>(DB_PATHS.SKILLS);
    if (remoteData) {
      const list = Array.isArray(remoteData) ? remoteData.filter(Boolean) : Object.values(remoteData);
      saveLocalSkills(list);
      return list;
    }
  } catch (error) {
    console.warn('Could not fetch skills from Firebase, falling back to local storage:', error);
  }
  return getLocalSkills();
}

export async function saveSkill(skill: Skill): Promise<Skill> {
  const currentSkills = await fetchSkills();
  const existingIndex = currentSkills.findIndex((s) => s.id === skill.id);

  let updatedSkills: Skill[];
  if (existingIndex >= 0) {
    updatedSkills = [...currentSkills];
    updatedSkills[existingIndex] = skill;
  } else {
    updatedSkills = [...currentSkills, skill];
  }

  saveLocalSkills(updatedSkills);

  try {
    await apiPost('/api/skills', skill);
  } catch (err) {
    console.warn('Server skill save failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.SKILLS, updatedSkills);
  } catch (err) {
    console.warn('Firebase set failed for skills, saved locally:', err);
  }

  return skill;
}

export async function deleteSkillById(id: string): Promise<boolean> {
  const currentSkills = await fetchSkills();
  const updatedSkills = currentSkills.filter((s) => s.id !== id);

  saveLocalSkills(updatedSkills);

  try {
    await apiDelete(`/api/skills/${id}`);
  } catch (err) {
    console.warn('Server skill delete failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.SKILLS, updatedSkills);
  } catch (err) {
    console.warn('Firebase delete skill failed, saved locally:', err);
  }

  return true;
}
