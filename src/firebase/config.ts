import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Database } from 'firebase/database';

/**
 * =========================================================================
 * FIREBASE CONFIGURATION SECTION
 * =========================================================================
 * 
 * INSERT YOUR FIREBASE CONFIGURATION HERE:
 * 
 * You can either:
 * 1. Insert your keys directly into the firebaseConfig object below, OR
 * 2. Set the corresponding VITE_FIREBASE_* environment variables in your .env file.
 * 
 * To obtain your configuration:
 * - Go to https://console.firebase.google.com/
 * - Select project "portfolio-15c32" (or your project)
 * - Project Settings -> General -> Your Apps -> Web App
 * - Copy and paste your keys into the blank quotes below.
 */

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-15c32.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://portfolio-15c32-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-15c32",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-15c32.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "990200514914",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

/**
 * Helper to check whether Firebase credentials are provided.
 */
export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey.trim() !== '' && 
    firebaseConfig.databaseURL &&
    firebaseConfig.databaseURL.trim() !== ''
  );
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let database: Database | null = null;

export async function getFirebaseApp(): Promise<FirebaseApp | null> {
  if (!isFirebaseConfigured()) return null;
  if (!app) {
    try {
      const { initializeApp, getApps, getApp } = await import('firebase/app');
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    } catch (err) {
      console.warn('Firebase app initialization failed:', err);
      return null;
    }
  }
  return app;
}

export async function getFirebaseAuth(): Promise<Auth | null> {
  if (!isFirebaseConfigured()) return null;
  const firebaseApp = await getFirebaseApp();
  if (!firebaseApp) return null;
  if (!auth) {
    try {
      const { getAuth } = await import('firebase/auth');
      auth = getAuth(firebaseApp);
    } catch (err) {
      console.warn('Firebase auth initialization failed:', err);
      return null;
    }
  }
  return auth;
}

export async function getFirebaseDatabase(): Promise<Database | null> {
  if (!isFirebaseConfigured()) return null;
  const firebaseApp = await getFirebaseApp();
  if (!firebaseApp) return null;
  if (!database) {
    try {
      const { getDatabase } = await import('firebase/database');
      database = getDatabase(firebaseApp);
    } catch (err) {
      console.warn('Firebase database initialization failed:', err);
      return null;
    }
  }
  return database;
}

export { app, auth, database, firebaseConfig };
