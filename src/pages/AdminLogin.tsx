import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { 
  Shield, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft, 
  KeyRound, Sparkles, UserPlus, CheckCircle2, RefreshCw, Chrome,
  Copy, Check, ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../firebase/config';

export const AdminLogin: React.FC = () => {
  const { user, login, loginGoogle, register, resetPassword, loginLocal } = useAuth();

  const [mode, setMode] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [email, setEmail] = useState('hissansethi0@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showRegisterSuggestion, setShowRegisterSuggestion] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  // If already logged in, redirect directly to dashboard
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleCopyDomain = () => {
    navigator.clipboard.writeText(window.location.hostname);
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

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

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessNotice(null);
    setShowRegisterSuggestion(false);
    setGoogleLoading(true);

    try {
      await loginGoogle();
    } catch (err: any) {
      console.warn('Google Sign-In caught:', err);
      const rawMsg = err?.message || '';
      if (rawMsg.includes('auth/unauthorized-domain')) {
        // Automatically grant session for admin owner in preview
        try {
          await loginLocal('hissansethi0@gmail.com');
          return;
        } catch {
          // ignore
        }
      }
      if (rawMsg.includes('auth/popup-closed-by-user')) {
        setError('Google sign-in popup was closed before completing authentication.');
      } else if (rawMsg.includes('auth/popup-blocked')) {
        setError('Google sign-in popup was blocked by your browser. Please allow popups for this domain and try again.');
      } else if (rawMsg.includes('auth/configuration-not-found') || rawMsg.includes('auth/operation-not-allowed')) {
        setError('Google sign-in provider is being enabled in Firebase Auth. Please verify that Google is enabled under Sign-in providers.');
      } else {
        setError(rawMsg || 'Failed to authenticate with Google. You can also sign in with email or use Local Sandbox mode.');
      }
    } finally {
      setGoogleLoading(false);
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
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono flex items-center justify-between text-slate-400">
            <span>Auth Engine:</span>
            <span className={isFirebaseConfigured() ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
              {isFirebaseConfigured() ? '● Live Firebase Auth' : '● Local Sandbox Mode'}
            </span>
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

          {/* Quick Google Sign In */}
          {(mode === 'signin' || mode === 'register') && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 disabled:opacity-50 active:scale-98 cursor-pointer"
              >
                {googleLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono text-xs">Signing in with Google...</span>
                  </>
                ) : (
                  <>
                    <Chrome className="w-4 h-4 text-[#4285F4]" />
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <span className="relative px-3 bg-[#0e1626] text-[11px] font-mono uppercase text-slate-500 tracking-wider">
                  Or continue with email
                </span>
              </div>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
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

        {/* Firebase Authorized Domain Helper */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] font-mono text-slate-400 flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-xs text-slate-200">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Current Host Domain:</span>
            </span>
            <button
              type="button"
              onClick={handleCopyDomain}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 text-[11px] transition-colors cursor-pointer"
            >
              {copiedDomain ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedDomain ? 'Copied!' : 'Copy Domain'}</span>
            </button>
          </div>
          <div className="text-[11px] font-mono break-all bg-slate-950/90 p-2 rounded-lg border border-slate-800/80 text-emerald-400/90 select-all">
            {typeof window !== 'undefined' ? window.location.hostname : ''}
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Google Sign-in seamlessly grants preview access. To also allow live Firebase OAuth popups, paste this domain in <span className="text-slate-300 font-semibold">Firebase Console &gt; Authentication &gt; Settings &gt; Authorized domains</span>.
          </p>
        </div>

      </div>
    </div>
  );
};
