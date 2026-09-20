import type { User } from 'firebase/auth';
import { isFirebaseConfigured, getFirebaseAuth } from './config';

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isMock?: boolean;
}

const LOCAL_ADMIN_KEY = 'hissan_portfolio_admin_session';

export async function loginWithGoogle(): Promise<AdminUser> {
  if (isFirebaseConfigured()) {
    try {
      const auth = await getFirebaseAuth();
      if (auth) {
        const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
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
      }
    } catch (err: any) {
      const code = err?.code || '';
      const msg = err?.message || '';
      if (code === 'auth/unauthorized-domain' || msg.includes('auth/unauthorized-domain')) {
        console.warn('Firebase unauthorized domain detected on:', window.location.hostname);
        return loginLocalAdmin('hissansethi0@gmail.com');
      }
      throw err;
    }
  }

  return loginLocalAdmin('hissansethi0@gmail.com');
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  // If Firebase Auth is configured and initialized
  if (isFirebaseConfigured()) {
    try {
      const auth = await getFirebaseAuth();
      if (auth) {
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Hissan Sethi (Admin)',
          isMock: false,
        };
      }
    } catch (err: any) {
      throw err;
    }
  }

  // Fallback mode if Firebase Auth is not configured
  return loginLocalAdmin(email, password);
}

export async function registerAdmin(email: string, password: string): Promise<AdminUser> {
  if (isFirebaseConfigured()) {
    const auth = await getFirebaseAuth();
    if (auth) {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Hissan Sethi (Admin)',
        isMock: false,
      };
    }
  }

  return loginLocalAdmin(email, password);
}

export async function resetAdminPassword(email: string): Promise<void> {
  if (isFirebaseConfigured()) {
    const auth = await getFirebaseAuth();
    if (auth) {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
      return;
    }
  }
  throw new Error('Firebase Auth is not configured for password reset.');
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
  if (isFirebaseConfigured()) {
    try {
      const auth = await getFirebaseAuth();
      if (auth) {
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
      }
    } catch (e) {
      console.warn('Firebase signout warning:', e);
    }
  }
  localStorage.removeItem(LOCAL_ADMIN_KEY);
}

export function subscribeToAuthChanges(callback: (user: AdminUser | null) => void): () => void {
  // Check local session immediately for instant 0ms restoration
  const local = localStorage.getItem(LOCAL_ADMIN_KEY);
  if (local) {
    try {
      callback(JSON.parse(local));
    } catch {
      callback(null);
    }
  } else {
    callback(null);
  }

  if (isFirebaseConfigured()) {
    let unsubscribe = () => {};
    getFirebaseAuth().then(async (auth) => {
      if (!auth) return;
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
          if (firebaseUser) {
            callback({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'Hissan Sethi (Admin)',
              isMock: false,
            });
          }
        });
      } catch (err) {
        console.warn('Auth observer setup failed:', err);
      }
    });
    return () => unsubscribe();
  }

  const handleStorageChange = () => {
    const updated = localStorage.getItem(LOCAL_ADMIN_KEY);
    callback(updated ? JSON.parse(updated) : null);
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}
