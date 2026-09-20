import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AdminUser, 
  loginAdmin, 
  loginWithGoogle,
  registerAdmin, 
  resetAdminPassword, 
  loginLocalAdmin, 
  logoutAdmin, 
  subscribeToAuthChanges 
} from '../firebase/auth';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginLocal: (email?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((adminUser) => {
      setUser(adminUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const loggedUser = await loginAdmin(email, pass);
      setUser(loggedUser);
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    setLoading(true);
    try {
      const loggedUser = await loginWithGoogle();
      setUser(loggedUser);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const registeredUser = await registerAdmin(email, pass);
      setUser(registeredUser);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await resetAdminPassword(email);
  };

  const loginLocal = async (email?: string) => {
    setLoading(true);
    try {
      const localUser = await loginLocalAdmin(email);
      setUser(localUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginGoogle, register, resetPassword, loginLocal, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
