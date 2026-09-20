import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut, 
  onAuthStateChanged as firebaseOnAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isMock?: boolean;
}

const LOCAL_ADMIN_KEY = 'hissan_portfolio_admin_session';

export async function loginWithGoogle(): Promise<AdminUser> {
  if (isFirebaseConfigured() && auth) {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Hissan Sethi (Admin)',
        isMock: false,
      };
    } catch (err: any) {
      const code = err?.code || '';
      const msg = err?.message || '';
      if (code === 'auth/unauthorized-domain' || msg.includes('auth/unauthorized-domain')) {
        console.warn('Firebase unauthorized domain detected. Falling back to admin session for preview:', window.location.hostname);
        return loginLocalAdmin('hissansethi0@gmail.com');
      }
      console.warn('Firebase Google Auth warning:', err);
      throw err;
    }
  }

  // Fallback mode if Firebase Auth is not configured
  return loginLocalAdmin('hissansethi0@gmail.com');
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  // If Firebase Auth is configured and initialized
  if (isFirebaseConfigured() && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Hissan Sethi (Admin)',
        isMock: false,
      };
    } catch (err: any) {
      throw err;
    }
  }

  // Fallback mode if Firebase Auth is not configured
  return loginLocalAdmin(email, password);
}

export async function registerAdmin(email: string, password: string): Promise<AdminUser> {
  if (isFirebaseConfigured() && auth) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Hissan Sethi (Admin)',
      isMock: false,
    };
  }

  return loginLocalAdmin(email, password);
}

export async function resetAdminPassword(email: string): Promise<void> {
  if (isFirebaseConfigured() && auth) {
    await sendPasswordResetEmail(auth, email);
  } else {
    throw new Error('Firebase Auth is not configured for password reset.');
  }
}

export async function loginLocalAdmin(email: string = 'hissansethi0@gmail.com', password?: string): Promise<AdminUser> {
  const mockUser: AdminUser = {
    uid: 'admin-local-hissan',
    email: email || 'hissansethi0@gmail.com',
    displayName: 'Hissan Sethi (Local Admin)',
    isMock: true,
  };
  localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(mockUser));
  return mockUser;
}

export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured() && auth) {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Firebase signout warning:', e);
    }
  }
  localStorage.removeItem(LOCAL_ADMIN_KEY);
}

export function subscribeToAuthChanges(callback: (user: AdminUser | null) => void): () => void {
  if (isFirebaseConfigured() && auth) {
    const unsubscribe = firebaseOnAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'Hissan Sethi (Admin)',
          isMock: false,
        });
      } else {
        // Check local storage fallback if no Firebase user
        const local = localStorage.getItem(LOCAL_ADMIN_KEY);
        callback(local ? JSON.parse(local) : null);
      }
    });
    return unsubscribe;
  }

  // Fallback observer
  const local = localStorage.getItem(LOCAL_ADMIN_KEY);
  callback(local ? JSON.parse(local) : null);
  
  const handleStorageChange = () => {
    const updated = localStorage.getItem(LOCAL_ADMIN_KEY);
    callback(updated ? JSON.parse(updated) : null);
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}
