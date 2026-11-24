import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, LogOut, Trash2 } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (defaultInterest?: string) => void;
  onOpenEstimator: () => void;
  currentPage?: 'home' | 'services' | 'work' | 'register';
  onNavigate?: (page: 'home' | 'services' | 'work' | 'register', sectionId?: string) => void;
  authUser?: { name: string; email: string } | null;
  onSignOut?: () => void;
  onDeleteUsers?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenEstimator,
  currentPage = 'home',
  onNavigate,
  authUser,
  onSignOut,
  onDeleteUsers,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F19]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-xl shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Company Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate ? onNavigate('home') : (window.location.hash = '');
            }}
            className="flex items-center gap-3 group"
          >
            {/* Empty image space for the company logo */}
            <div className="w-10 h-10 rounded-xl border border-dashed border-white/30 bg-white/5 flex items-center justify-center overflow-hidden group-hover:border-brand-400 transition-colors">
              <img
                src="/logo.png"
                alt="Lance Company Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Lance
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate ? onNavigate('services') : (window.location.hash = '/services')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'services'
                  ? 'text-brand-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => onNavigate ? onNavigate('work') : (window.location.hash = '/work')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'work'
                  ? 'text-brand-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Work
            </button>
            <a
              href="#calculator"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home', 'calculator');
                }
              }}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Cost Calculator</span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-full">New</span>
            </a>
            <a
              href="#process"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home', 'process');
                }
              }}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Process
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home', 'pricing');
                }
              }}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home', 'testimonials');
                }
              }}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            {authUser ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={onSignOut}
                  className="text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
                {onDeleteUsers && (
                  <button
                    onClick={onDeleteUsers}
                    title="Delete all registered users"
                    className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/20"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Users</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate ? onNavigate('register') : (window.location.hash = '/register')}
                  className={`text-sm font-semibold transition-colors ${
                    currentPage === 'register'
                      ? 'text-brand-400 font-bold'
                      : 'text-brand-300 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
                {onDeleteUsers && (
                  <button
                    onClick={onDeleteUsers}
                    title="Delete all registered users"
                    className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/20"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Users</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Action CTAs & Auth Profile */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenEstimator}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            >
              Estimate Price
            </button>
            <button
              onClick={() => onOpenContact()}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 rounded-lg shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center gap-1.5 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* User Auth Profile Status (if signed in) OR Sign Up Button (if not signed in) */}
            {authUser ? (
              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="relative">
                    <div
                      className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm"
                      title={authUser.email}
                    >
                      {authUser.name ? authUser.name.charAt(0) : 'U'}
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-[#0B0F19] animate-pulse" />
                  </div>
                  <div className="text-left block">
                    <span className="text-xs font-semibold text-white block leading-tight truncate max-w-[130px]">
                      {authUser.name}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium leading-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      Signed In
                    </span>
                  </div>
                </div>
                <button
                  onClick={onSignOut}
                  title="Sign out of your account"
                  className="px-2.5 py-1.5 text-xs text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
                {onDeleteUsers && (
                  <button
                    onClick={onDeleteUsers}
                    title="Delete all registered users"
                    className="p-1.5 text-xs text-slate-400 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 border border-white/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate ? onNavigate('register') : (window.location.hash = '/register')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  currentPage === 'register'
                    ? 'bg-brand-600 text-white border-brand-500 shadow-glow'
                    : 'text-brand-300 hover:text-white bg-brand-500/10 hover:bg-brand-500/25 border-brand-500/30'
                }`}
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate ? onNavigate('services') : (window.location.hash = '/services');
            }}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentPage === 'services'
                ? 'text-brand-400 bg-white/5 font-semibold'
                : 'text-slate-200 hover:bg-white/5'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate ? onNavigate('work') : (window.location.hash = '/work');
            }}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentPage === 'work'
                ? 'text-brand-400 bg-white/5 font-semibold'
                : 'text-slate-200 hover:bg-white/5'
            }`}
          >
            Work & Case Studies
          </button>
          <a
            href="#calculator"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (onNavigate) {
                e.preventDefault();
                onNavigate('home', 'calculator');
              }
            }}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5"
          >
            Project Cost Calculator
          </a>
          <a
            href="#process"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (onNavigate) {
                e.preventDefault();
                onNavigate('home', 'process');
              }
            }}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5"
          >
            How We Work
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (onNavigate) {
                e.preventDefault();
                onNavigate('home', 'pricing');
              }
            }}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5"
          >
            Pricing
          </a>
          {authUser ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSignOut?.();
              }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-semibold text-rose-400 hover:bg-white/5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate ? onNavigate('register') : (window.location.hash = '/register');
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                currentPage === 'register'
                  ? 'text-brand-400 bg-white/5 font-semibold'
                  : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Sign Up
            </button>
          )}
          {onDeleteUsers && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onDeleteUsers();
              }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-rose-400 hover:bg-rose-500/10 rounded-md"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Registered Users</span>
            </button>
          )}
          <div className="pt-4 flex flex-col gap-2">
            {authUser ? (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                      {authUser.name ? authUser.name.charAt(0) : 'U'}
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-[#0F172A]" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-white truncate max-w-[140px]">{authUser.name}</div>
                    <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      Signed In
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut?.();
                  }}
                  className="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg font-semibold shrink-0"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate ? onNavigate('register') : (window.location.hash = '/register');
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 rounded-lg shadow-md"
              >
                Sign Up
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-lg"
            >
              Instant Cost Calculator
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-brand-600 rounded-lg shadow-md"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
