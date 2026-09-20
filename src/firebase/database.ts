import { isFirebaseConfigured, getFirebaseDatabase } from './config';

/**
 * Clean Realtime Database helper layer
 * Schema structure:
 * /portfolio
 *    /profile
 *    /skills
 *    /projects
 *    /experience
 *    /education
 *    /messages
 *    /settings
 */

export const DB_PATHS = {
  PORTFOLIO: 'portfolio',
  PROFILE: 'portfolio/profile',
  SKILLS: 'portfolio/skills',
  PROJECTS: 'portfolio/projects',
  EXPERIENCE: 'portfolio/experience',
  EDUCATION: 'portfolio/education',
  MESSAGES: 'portfolio/messages',
  SETTINGS: 'portfolio/settings',
};

// Generic read from Realtime Database with strict timeout to ensure lightning-fast initial renders
export async function getDatabaseData<T>(path: string, timeoutMs: number = 800): Promise<T | null> {
  if (!isFirebaseConfigured()) {
    return null;
  }
  try {
    const database = await getFirebaseDatabase();
    if (!database) return null;
    const { ref, get } = await import('firebase/database');
    const dbRef = ref(database, path);
    // Timeout promise to prevent blocking if connection takes too long
    const timeoutPromise = new Promise<null>((resolve) => 
      setTimeout(() => resolve(null), timeoutMs)
    );
    const fetchPromise = get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val() as T;
      }
      return null;
    });

    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    console.warn(`Error reading path ${path} from Firebase:`, error);
    return null;
  }
}

// Generic write / overwrite to Realtime Database
export async function setDatabaseData<T>(path: string, data: T): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    return false;
  }
  try {
    const database = await getFirebaseDatabase();
    if (!database) return false;
    const { ref, set } = await import('firebase/database');
    const dbRef = ref(database, path);
    await set(dbRef, data);
    return true;
  } catch (error) {
    console.error(`Error setting path ${path} in Firebase:`, error);
    throw error;
  }
}

// Push a new record with auto-generated key (e.g. for messages)
export async function pushDatabaseData<T>(path: string, data: T): Promise<string | null> {
  if (!isFirebaseConfigured()) {
    return null;
  }
  try {
    const database = await getFirebaseDatabase();
    if (!database) return null;
    const { ref, push, set } = await import('firebase/database');
    const dbRef = ref(database, path);
    const newRef = push(dbRef);
    await set(newRef, data);
    return newRef.key;
  } catch (error) {
    console.error(`Error pushing to path ${path} in Firebase:`, error);
    throw error;
  }
}

// Update partial fields
export async function updateDatabaseData(path: string, updates: Record<string, unknown>): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    return false;
  }
  try {
    const database = await getFirebaseDatabase();
    if (!database) return false;
    const { ref, update } = await import('firebase/database');
    const dbRef = ref(database, path);
    await update(dbRef, updates);
    return true;
  } catch (error) {
    console.error(`Error updating path ${path} in Firebase:`, error);
    throw error;
  }
}

// Delete a record
export async function deleteDatabaseData(path: string): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    return false;
  }
  try {
    const database = await getFirebaseDatabase();
    if (!database) return false;
    const { ref, remove } = await import('firebase/database');
    const dbRef = ref(database, path);
    await remove(dbRef);
    return true;
  } catch (error) {
    console.error(`Error deleting path ${path} in Firebase:`, error);
    throw error;
  }
}

// Real-time listener subscription
export function subscribeToDatabasePath<T>(
  path: string,
  callback: (data: T | null) => void
): () => void {
  if (!isFirebaseConfigured()) {
    return () => {};
  }
  let unsubscribe = () => {};
  getFirebaseDatabase().then(async (database) => {
    if (!database) return;
    try {
      const { ref, onValue, off } = await import('firebase/database');
      const dbRef = ref(database, path);
      const listener = onValue(
        dbRef,
        (snapshot) => {
          if (snapshot.exists()) {
            callback(snapshot.val() as T);
          } else {
            callback(null);
          }
        },
        (error) => {
          console.warn(`Realtime listener error on ${path}:`, error);
        }
      );
      unsubscribe = () => off(dbRef, 'value', listener);
    } catch (err) {
      console.warn('Realtime listener registration failed:', err);
    }
  });

  return () => {
    unsubscribe();
  };
}
