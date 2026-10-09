import { Project } from '../types';
import { DB_PATHS, getDatabaseData, setDatabaseData } from '../firebase/database';
import { INITIAL_PROJECTS } from '../data/initialData';
import { apiGet, apiPost, apiDelete } from './apiService';

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
  // 1. Try server endpoint first for instant multi-device sync
  try {
    const serverProjects = await apiGet<Project[]>('/api/projects');
    if (serverProjects && Array.isArray(serverProjects) && serverProjects.length > 0) {
      saveLocalProjects(serverProjects);
      return serverProjects;
    }
  } catch (err) {
    console.warn('Server projects fetch failed:', err);
  }

  // 2. Try Firebase
  try {
    const remoteData = await getDatabaseData<Record<string, Project> | Project[]>(DB_PATHS.PROJECTS);
    if (remoteData) {
      const list = Array.isArray(remoteData) ? remoteData.filter(Boolean) : Object.values(remoteData);
      saveLocalProjects(list);
      return list;
    }
  } catch (error) {
    console.warn('Could not fetch projects from Firebase, falling back to local storage:', error);
  }

  // 3. Fallback to LocalStorage
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

  // Update local cache
  saveLocalProjects(updatedProjects);

  // Update on persistent server
  try {
    await apiPost('/api/projects', project);
  } catch (err) {
    console.warn('Server project save failed:', err);
  }

  // Update in Firebase Realtime Database
  try {
    await setDatabaseData(DB_PATHS.PROJECTS, updatedProjects);
  } catch (err) {
    console.warn('Firebase set failed, saved locally:', err);
  }

  return project;
}

export async function deleteProjectById(id: string): Promise<boolean> {
  const currentProjects = await fetchProjects();
  const updatedProjects = currentProjects.filter((p) => p.id !== id);

  saveLocalProjects(updatedProjects);

  try {
    await apiDelete(`/api/projects/${id}`);
  } catch (err) {
    console.warn('Server project delete failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.PROJECTS, updatedProjects);
  } catch (err) {
    console.warn('Firebase delete failed, saved locally:', err);
  }

  return true;
}
