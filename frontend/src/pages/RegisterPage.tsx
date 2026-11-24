import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, Sparkles, ShieldCheck, Trash2 } from 'lucide-react';

export interface AuthUserData {
  id: string;
  name: string;
  email: string;
  company?: string;
  token?: string;
}

interface RegisterPageProps {
  onRegisterSuccess: (user: AuthUserData) => void;
  onContinueAsGuest: () => void;
  currentUser?: AuthUserData | null;
  onSignOut?: () => void;
  onDeleteUsers?: () => void;
  initialMode?: 'register' | 'login';
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onContinueAsGuest,
  currentUser,
  onSignOut,
  onDeleteUsers,
  initialMode = 'register',
}) => {
  const [isLoginMode, setIsLoginMode] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setIsLoginMode(initialMode === 'login');
  }, [initialMode]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.email || !formData.password) {
      setErrorMsg('Please enter all required fields.');
      return;
    }

    if (!isLoginMode) {
      if (!formData.name) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!formData.confirmPassword) {
        setErrorMsg('Please confirm your password.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLoginMode ? '/api/login' : '/api/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const loggedUser: AuthUserData = data.user || {
          id: `usr_${Date.now()}`,
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          company: formData.company,
        };

        localStorage.setItem('free_auth_user', JSON.stringify(loggedUser));
        setSuccessMsg(isLoginMode ? 'Welcome back! You are now signed in.' : 'Registration successful! You are now signed in.');

        setTimeout(() => {
          onRegisterSuccess(loggedUser);
        }, 500);
      } else {
        // Fallback for local / offline mode
        const localUsers = JSON.parse(localStorage.getItem('free_registered_users') || '[]');
        const existing = localUsers.find((u: any) => u.email === formData.email);

        if (isLoginMode) {
          if (existing && existing.password === formData.password) {
            const user: AuthUserData = {
              id: existing.id,
              name: existing.name,
              email: existing.email,
              company: existing.company,
            };
            localStorage.setItem('free_auth_user', JSON.stringify(user));
            setSuccessMsg('Welcome back! You are now signed in.');
            setTimeout(() => {
              onRegisterSuccess(user);
            }, 500);
          } else {
            setErrorMsg(data.message || 'Invalid credentials or user not registered yet.');
          }
        } else {
          const newUser = {
            id: `usr_${Date.now()}`,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            company: formData.company,
            createdAt: new Date().toISOString(),
          };
          localUsers.push(newUser);
          localStorage.setItem('free_registered_users', JSON.stringify(localUsers));
          
          const user: AuthUserData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            company: newUser.company,
          };
          localStorage.setItem('free_auth_user', JSON.stringify(user));

          setSuccessMsg('Registration successful! You are now signed in.');
          setTimeout(() => {
            onRegisterSuccess(user);
          }, 500);
        }
      }
    } catch {
      // Local storage fallback when backend API is offline
      const localUsers = JSON.parse(localStorage.getItem('free_registered_users') || '[]');
      const user: AuthUserData = {
        id: `usr_${Date.now()}`,
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        company: formData.company,
      };

      localUsers.push({ ...formData, id: user.id });
      localStorage.setItem('free_registered_users', JSON.stringify(localUsers));
      localStorage.setItem('free_auth_user', JSON.stringify(user));

      setSuccessMsg(isLoginMode ? 'Welcome back! You are now signed in.' : 'Registration successful! You are now signed in.');
      setTimeout(() => {
        onRegisterSuccess(user);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative mesh-grid">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Back to Home button */}
        <div className="mb-4 text-center">
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-all"
          >
            <span>← Back to Homepage</span>
          </button>
        </div>

        {/* Brand Logo and Title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl border border-dashed border-white/30 bg-white/5 flex items-center justify-center overflow-hidden shadow-glow">
            <img
              src="/logo.png"
              alt="Lance Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-white">
            Lance
          </span>
        </div>

        {currentUser ? (
          <>
            <h1 className="text-center text-2xl font-bold text-white tracking-tight">
              You are Signed In
            </h1>
            <p className="mt-2 text-center text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Your session is active. You can browse the portal or return to the homepage anytime.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-center text-2xl font-bold text-white tracking-tight">
              {isLoginMode ? 'Sign in to access your portal' : 'Register to access Lance'}
            </h1>
            <p className="mt-2 text-center text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              {isLoginMode
                ? 'Enter your credentials to access our engineering showcase and quote tools.'
                : 'Create an account to explore custom web applications, instant quote calculators, and project blueprints.'}
            </p>

            {/* Auth Mode Toggle Tabs */}
            <div className="mt-6 flex rounded-xl bg-white/5 p-1 border border-white/10 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(false);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`w-1/2 py-2 text-xs font-semibold rounded-lg transition-all ${
                  !isLoginMode
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`w-1/2 py-2 text-xs font-semibold rounded-lg transition-all ${
                  isLoginMode
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {currentUser ? (
          /* Prominent Signed-In Status Card */
          <div className="glass-panel p-8 rounded-2xl border border-emerald-500/30 bg-[#0F172A]/80 shadow-2xl text-center">
            <div className="relative inline-block mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold uppercase mx-auto shadow-lg ring-4 ring-emerald-500/20">
                {currentUser.name ? currentUser.name.charAt(0) : 'U'}
              </div>
              <span className="w-4 h-4 rounded-full bg-emerald-400 absolute bottom-0 right-0 ring-4 ring-[#0F172A] animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Signed In</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-1">
              {currentUser.name}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              {currentUser.email}
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 mb-6 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Account Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active & Signed In
                </span>
              </div>
              {currentUser.company && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Company</span>
                  <span className="text-slate-200 font-medium">{currentUser.company}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Portal Access</span>
                <span className="text-brand-300 font-medium">Full Access</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onContinueAsGuest}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30"
              >
                <span>Go to Homepage</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onSignOut && (
                <button
                  type="button"
                  onClick={onSignOut}
                  className="w-full py-2.5 rounded-xl font-medium text-xs text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                >
                  Sign Out / Switch Account
                </button>
              )}

              {onDeleteUsers && (
                <button
                  type="button"
                  onClick={onDeleteUsers}
                  className="w-full py-2.5 rounded-xl font-medium text-xs text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all flex items-center justify-center gap-1.5"
                  title="Delete all registered users from the website"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Registered Users</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl">
            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required={!isLoginMode}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {isLoginMode ? 'Password *' : 'Create Password *'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {!isLoginMode && (
                  <p className="text-[11px] text-slate-500 mt-1">Must be at least 6 characters</p>
                )}
              </div>

              {!isLoginMode && (
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-brand-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 disabled:opacity-50"
              >
                <span>{loading ? 'Processing...' : isLoginMode ? 'Sign In & Enter' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Value note */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Full Portfolio Tools</span>
              </div>
            </div>

            {onDeleteUsers && (
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <button
                  type="button"
                  onClick={onDeleteUsers}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
                  title="Delete all registered users from the website"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Registered Users</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Skip / Guest Link */}
        {!currentUser && (
          <div className="mt-4 text-center">
            <button
              onClick={onContinueAsGuest}
              className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Looking to preview first? Continue as Guest →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
