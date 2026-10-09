import { ProfileData, Experience, Education, PortfolioSettings } from '../types';
import { DB_PATHS, getDatabaseData, setDatabaseData } from '../firebase/database';
import { INITIAL_PROFILE, INITIAL_EXPERIENCE, INITIAL_EDUCATION, INITIAL_SETTINGS } from '../data/initialData';
import { apiGet, apiPost, apiDelete } from './apiService';

const LOCAL_PROFILE_KEY = 'hissan_portfolio_profile';
const LOCAL_EXP_KEY = 'hissan_portfolio_experience';
const LOCAL_EDU_KEY = 'hissan_portfolio_education';
const LOCAL_SETTINGS_KEY = 'hissan_portfolio_settings';

// Profile
export async function fetchProfile(): Promise<ProfileData> {
  // 1. Try persistent full-stack server endpoint first (cross-device sync)
  try {
    const serverProfile = await apiGet<ProfileData>('/api/profile');
    if (serverProfile) {
      const merged = { ...INITIAL_PROFILE, ...serverProfile };
      if (merged.whatsapp && merged.whatsapp.includes('342')) {
        merged.whatsapp = '+92 313 3492982';
      }
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.warn('Server profile fetch failed:', err);
  }

  // 2. Try Firebase if available
  try {
    const remote = await getDatabaseData<ProfileData>(DB_PATHS.PROFILE);
    if (remote) {
      const merged = { ...INITIAL_PROFILE, ...remote };
      if (merged.whatsapp && merged.whatsapp.includes('342')) {
        merged.whatsapp = '+92 313 3492982';
      }
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Firebase profile fetch failed:', e);
  }

  // 3. Fallback to LocalStorage
  const stored = localStorage.getItem(LOCAL_PROFILE_KEY);
  if (stored) {
    try {
      const parsed = { ...INITIAL_PROFILE, ...JSON.parse(stored) };
      if (parsed.whatsapp && parsed.whatsapp.includes('342')) {
        parsed.whatsapp = '+92 313 3492982';
        localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      // fallback
    }
  }
  return INITIAL_PROFILE;
}

export async function saveProfile(profile: ProfileData): Promise<ProfileData> {
  // Always update local cache immediately
  localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));

  // 1. Save to persistent server endpoint (so mobile & all devices get the update)
  try {
    await apiPost('/api/profile', profile);
  } catch (err) {
    console.warn('Server profile write failed:', err);
  }

  // 2. Also save to Firebase if configured
  try {
    await setDatabaseData(DB_PATHS.PROFILE, profile);
  } catch (err) {
    console.warn('Firebase profile write failed, saved locally:', err);
  }

  return profile;
}

// Experience
export async function fetchExperience(): Promise<Experience[]> {
  try {
    const serverExp = await apiGet<Experience[]>('/api/experience');
    if (serverExp && Array.isArray(serverExp)) {
      localStorage.setItem(LOCAL_EXP_KEY, JSON.stringify(serverExp));
      return serverExp;
    }
  } catch (err) {
    console.warn('Server experience fetch failed:', err);
  }

  try {
    const remote = await getDatabaseData<Record<string, Experience> | Experience[]>(DB_PATHS.EXPERIENCE);
    if (remote) {
      const list = Array.isArray(remote) ? remote.filter(Boolean) : Object.values(remote);
      localStorage.setItem(LOCAL_EXP_KEY, JSON.stringify(list));
      return list;
    }
  } catch (e) {
    console.warn('Firebase experience fetch failed:', e);
  }

  const stored = localStorage.getItem(LOCAL_EXP_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  return INITIAL_EXPERIENCE;
}

export async function saveExperience(exp: Experience): Promise<Experience> {
  const current = await fetchExperience();
  const index = current.findIndex((item) => item.id === exp.id);
  const updated = index >= 0 ? [...current] : [exp, ...current];
  if (index >= 0) updated[index] = exp;

  localStorage.setItem(LOCAL_EXP_KEY, JSON.stringify(updated));

  try {
    await apiPost('/api/experience', exp);
  } catch (err) {
    console.warn('Server experience save failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.EXPERIENCE, updated);
  } catch (err) {
    console.warn('Firebase experience save failed, saved locally:', err);
  }
  return exp;
}

export async function deleteExperienceById(id: string): Promise<boolean> {
  const current = await fetchExperience();
  const updated = current.filter((item) => item.id !== id);

  localStorage.setItem(LOCAL_EXP_KEY, JSON.stringify(updated));

  try {
    await apiDelete(`/api/experience/${id}`);
  } catch (err) {
    console.warn('Server experience delete failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.EXPERIENCE, updated);
  } catch (err) {
    console.warn('Firebase experience delete failed, saved locally:', err);
  }
  return true;
}

// Education
export async function fetchEducation(): Promise<Education[]> {
  try {
    const serverEdu = await apiGet<Education[]>('/api/education');
    if (serverEdu && Array.isArray(serverEdu)) {
      localStorage.setItem(LOCAL_EDU_KEY, JSON.stringify(serverEdu));
      return serverEdu;
    }
  } catch (err) {
    console.warn('Server education fetch failed:', err);
  }

  try {
    const remote = await getDatabaseData<Record<string, Education> | Education[]>(DB_PATHS.EDUCATION);
    if (remote) {
      const list = Array.isArray(remote) ? remote.filter(Boolean) : Object.values(remote);
      localStorage.setItem(LOCAL_EDU_KEY, JSON.stringify(list));
      return list;
    }
  } catch (e) {
    console.warn('Firebase education fetch failed:', e);
  }

  const stored = localStorage.getItem(LOCAL_EDU_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  return INITIAL_EDUCATION;
}

export async function saveEducation(edu: Education): Promise<Education> {
  const current = await fetchEducation();
  const index = current.findIndex((item) => item.id === edu.id);
  const updated = index >= 0 ? [...current] : [edu, ...current];
  if (index >= 0) updated[index] = edu;

  localStorage.setItem(LOCAL_EDU_KEY, JSON.stringify(updated));

  try {
    await apiPost('/api/education', edu);
  } catch (err) {
    console.warn('Server education save failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.EDUCATION, updated);
  } catch (err) {
    console.warn('Firebase education save failed, saved locally:', err);
  }
  return edu;
}

export async function deleteEducationById(id: string): Promise<boolean> {
  const current = await fetchEducation();
  const updated = current.filter((item) => item.id !== id);

  localStorage.setItem(LOCAL_EDU_KEY, JSON.stringify(updated));

  try {
    await apiDelete(`/api/education/${id}`);
  } catch (err) {
    console.warn('Server education delete failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.EDUCATION, updated);
  } catch (err) {
    console.warn('Firebase education delete failed, saved locally:', err);
  }
  return true;
}

// Settings
export async function fetchSettings(): Promise<PortfolioSettings> {
  try {
    const serverSettings = await apiGet<PortfolioSettings>('/api/settings');
    if (serverSettings) {
      const merged = { ...INITIAL_SETTINGS, ...serverSettings };
      localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.warn('Server settings fetch failed:', err);
  }

  try {
    const remote = await getDatabaseData<PortfolioSettings>(DB_PATHS.SETTINGS);
    if (remote) {
      const merged = { ...INITIAL_SETTINGS, ...remote };
      localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Firebase settings fetch failed:', e);
  }

  const stored = localStorage.getItem(LOCAL_SETTINGS_KEY);
  if (stored) {
    try {
      return { ...INITIAL_SETTINGS, ...JSON.parse(stored) };
    } catch {
      // fallback
    }
  }
  return INITIAL_SETTINGS;
}

export async function saveSettings(settings: PortfolioSettings): Promise<PortfolioSettings> {
  localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));

  try {
    await apiPost('/api/settings', settings);
  } catch (err) {
    console.warn('Server settings write failed:', err);
  }

  try {
    await setDatabaseData(DB_PATHS.SETTINGS, settings);
  } catch (err) {
    console.warn('Firebase settings write failed, saved locally:', err);
  }
  return settings;
}
