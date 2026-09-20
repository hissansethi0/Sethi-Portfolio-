import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { 
  Shield, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft, 
  KeyRound, Sparkles, UserPlus, CheckCircle2, RefreshCw, Copy, Check, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../firebase/config';

export const AdminLogin: React.FC = () => {
  const { user, login, register, loginGoogle, resetPassword, loginLocal } = useAuth();

  const [mode, setMode] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [email, setEmail] = useState('hissansethi0@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showRegisterSuggestion, setShowRegisterSuggestion] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isNetlifyLive = currentHostname.includes('hissansethi.netlify.app');

  // If already logged in, redirect directly to dashboard
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);
    setShowRegisterSuggestion(false);
    setLoading(true);

    try {
      await login(email.trim(), password);
    } catch (err: any) {
      console.warn('Login issue:', err);
      const rawMsg = err?.message || '';
      
      if (rawMsg.includes('auth/invalid-credential') || rawMsg.includes('auth/wrong-password') || rawMsg.includes('auth/user-not-found')) {
        setError('Invalid credentials. If you haven\'t created this administrator user in Firebase yet, you can create it below, or sign in via Local Sandbox mode.');
        setShowRegisterSuggestion(true);
      } else if (rawMsg.includes('auth/too-many-requests')) {
        setError('Access temporarily disabled due to many failed attempts. Try again later or use Local Sandbox mode.');
      } else {
        setError(rawMsg || 'Authentication failed. Please verify your credentials or network connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);
    setLoading(true);

    if (password.length < 6) {
      setError('Firebase requires passwords to be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      await register(email.trim(), password);
    } catch (err: any) {
      console.warn('Registration issue:', err);
      const rawMsg = err?.message || '';
      if (rawMsg.includes('auth/email-already-in-use')) {
        setError('This email is already registered in Firebase. Switch to Sign In or reset your password.');
      } else if (rawMsg.includes('auth/weak-password')) {
        setError('Password is too weak. Please use at least 6 characters.');
      } else {
        setError(rawMsg || 'Registration failed. Check Firebase Auth settings or try Local Sandbox.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);
    setLoading(true);

    try {
      await resetPassword(email.trim());
      setSuccessNotice('Password reset instructions dispatched to your email.');
    } catch (err: any) {
      console.warn('Password reset issue:', err);
      setError(err?.message || 'Failed to dispatch password reset email.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessNotice(null);
    setShowRegisterSuggestion(false);
    setLoading(true);

    try {
      await loginGoogle();
    } catch (err: any) {
      console.warn('Google sign-in issue:', err);
      const rawMsg = err?.message || '';
      if (rawMsg.includes('auth/popup-closed-by-user')) {
        setError('Google sign-in popup was closed before finishing.');
      } else {
        setError(rawMsg || 'Failed to authenticate with Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyHostname = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.hostname);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2000);
    }
  };

  const handleLocalBypass = async () => {
    setLoading(true);
    try {
      await loginLocal(email.trim() || 'hissansethi0@gmail.com');
    } catch (err: any) {
      setError(err?.message || 'Failed to enter sandbox mode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="ambient-glow w-96 h-96 bg-emerald-600/10 top-1/4 left-1/3 -translate-x-1/2" />
      <div className="ambient-glow w-72 h-72 bg-cyan-600/10 bottom-10 right-1/4" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Back to site link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* Monogram / Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 mx-auto shadow-[0_0_25px_rgba(16,185,129,0.2)]">
            <Shield className="w-7 h-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator Gateway
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Hissan Sethi Portfolio Control Suite
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 p-7 sm:p-8 rounded-2xl bg-[#0e1626]/95 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Status info */}
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono flex items-center justify-between text-slate-400">
              <span>Auth Engine:</span>
              <span className={isFirebaseConfigured() ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                {isFirebaseConfigured() ? '● Live Firebase Auth' : '● Local Sandbox Mode'}
              </span>
            </div>

            {/* Authorized Domain Status Card */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px]">
                  Authorized Domain: <strong className="text-white">hissansethi.netlify.app</strong>
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                Active
              </span>
            </div>

            {/* Note if viewing from dev preview URL */}
            {currentHostname && !currentHostname.includes('hissansethi.netlify.app') && currentHostname !== 'localhost' && (
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between gap-2">
                <div className="truncate">
                  <span className="text-slate-500">Preview Host: </span>
                  <span className="text-slate-300">{currentHostname}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyHostname}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                  title="Copy preview domain to add to Firebase Authorized domains if desired"
                >
                  {copiedDomain ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedDomain ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800/80 text-xs font-mono">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(null); setShowRegisterSuggestion(false); }}
              className={`py-2 rounded-lg transition-colors ${
                mode === 'signin'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); setShowRegisterSuggestion(false); }}
              className={`py-2 rounded-lg transition-colors ${
                mode === 'register'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register Admin
            </button>
          </div>

          {/* Success Alert */}
          {successNotice && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p>{error}</p>
                {showRegisterSuggestion && (
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register');
                        setError(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Register this user in Firebase Auth</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLocalBypass}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Access Dashboard via Local Sandbox Mode</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <div className="space-y-4">
              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.27 21.44 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.1z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.56 1.25 6.58l4.03 3.1c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-[#0e1626] px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 shrink-0">
                  Or with email
                </span>
                <div className="border-t border-slate-800 w-full" />
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="admin-email" className="block text-xs font-mono text-slate-300">
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hissansethi0@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="admin-password" className="block text-xs font-mono text-slate-300">
                    Admin Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(null); }}
                    className="text-[11px] font-mono text-emerald-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-98"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
          )}

          {/* REGISTER ADMIN USER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>First-Time Firebase Setup</span>
                </p>
                <p className="text-[11px] text-slate-300">
                  This creates your primary administrator account in Firebase Authentication so you can sign in anytime.
                </p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reg-email" className="block text-xs font-mono text-slate-300">
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hissansethi0@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reg-password" className="block text-xs font-mono text-slate-300">
                  Choose Master Password (min 6 chars)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-98"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Registering Account in Firebase...</span>
                  </>
                ) : (
                  <>
                    <span>Create Admin Account & Log In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="reset-email" className="block text-xs font-mono text-slate-300">
                  Enter Admin Email for Password Reset
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hissansethi0@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Dispatching Reset Link...</span>
                  </>
                ) : (
                  <span>Send Reset Email</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => { setMode('signin'); setError(null); }}
                className="w-full py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {/* Instant Local Sandbox Mode Button */}
          <div className="pt-4 border-t border-slate-800/80 text-center">
            <button
              type="button"
              onClick={handleLocalBypass}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Test Access (Local Sandbox Mode)</span>
            </button>
            <p className="text-[10px] font-mono text-slate-500 mt-1.5">
              Allows immediate access to all dashboard CRUD features without waiting for Firebase Auth.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
