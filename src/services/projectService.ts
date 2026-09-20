import { Project } from '../types';
import { DB_PATHS, getDatabaseData, setDatabaseData } from '../firebase/database';
import { INITIAL_PROJECTS } from '../data/initialData';

const LOCAL_PROJECTS_KEY = 'hissan_portfolio_projects';

function getLocalProjects(): Project[] {
  const stored = localStorage.getItem(LOCAL_PROJECTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
  return INITIAL_PROJECTS;
}

function saveLocalProjects(projects: Project[]): void {
  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const remoteData = await getDatabaseData<Record<string, Project> | Project[]>(DB_PATHS.PROJECTS);
    if (remoteData) {
      if (Array.isArray(remoteData)) {
        return remoteData.filter(Boolean);
      }
      return Object.values(remoteData);
    }
  } catch (error) {
    console.warn('Could not fetch projects from Firebase, falling back to local storage:', error);
  }
  return getLocalProjects();
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const projects = await fetchProjects();
  return projects.find((p) => p.id === id) || null;
}

export async function saveProject(project: Project): Promise<Project> {
  const currentProjects = await fetchProjects();
  const existingIndex = currentProjects.findIndex((p) => p.id === project.id);

  let updatedProjects: Project[];
  if (existingIndex >= 0) {
    updatedProjects = [...currentProjects];
    updatedProjects[existingIndex] = project;
  } else {
    updatedProjects = [project, ...currentProjects];
  }

  // Update in Firebase Realtime Database
  try {
    await setDatabaseData(DB_PATHS.PROJECTS, updatedProjects);
  } catch (err) {
    console.warn('Firebase set failed, saved locally:', err);
  }

  // Always update local cache
  saveLocalProjects(updatedProjects);
  return project;
}

export async function deleteProjectById(id: string): Promise<boolean> {
  const currentProjects = await fetchProjects();
  const updatedProjects = currentProjects.filter((p) => p.id !== id);

  try {
    await setDatabaseData(DB_PATHS.PROJECTS, updatedProjects);
  } catch (err) {
    console.warn('Firebase delete failed, updated locally:', err);
  }

  saveLocalProjects(updatedProjects);
  return true;
}

export async function seedInitialProjects(): Promise<void> {
  try {
    await setDatabaseData(DB_PATHS.PROJECTS, INITIAL_PROJECTS);
    saveLocalProjects(INITIAL_PROJECTS);
  } catch (err) {
    saveLocalProjects(INITIAL_PROJECTS);
  }
}
