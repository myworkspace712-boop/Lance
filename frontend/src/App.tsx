import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { RegisterPage, AuthUserData } from './pages/RegisterPage';
import { QuoteCalculator } from './components/QuoteCalculator';
import { Process } from './components/Process';
import { TechStack } from './components/TechStack';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'work' | 'register'>('home');
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [selectedEstimate, setSelectedEstimate] = useState<{
    totalPrice: number;
    estimatedDays: number;
    addons: string[];
    projectType: string;
  } | null>(null);

  // Authenticated user state
  const [authUser, setAuthUser] = useState<AuthUserData | null>(() => {
    try {
      const saved = localStorage.getItem('free_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#/services' || hash === '#services') {
        setCurrentPage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/work' || hash === '#work' || hash === '#/portfolio' || hash === '#portfolio') {
        setCurrentPage('work');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/signin' || hash === '#signin' || hash === '#/login' || hash === '#login') {
        setAuthMode('login');
        setCurrentPage('register');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/register' || hash === '#register' || hash === '#/signup' || hash === '#signup') {
        setAuthMode('register');
        setCurrentPage('register');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: 'home' | 'services' | 'work' | 'register', sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'services') {
      window.location.hash = '/services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'work') {
      window.location.hash = '/work';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'register') {
      window.location.hash = authMode === 'login' ? '/signin' : '/register';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = sectionId ? `#${sectionId}` : '';
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('free_auth_user');
    setAuthUser(null);
  };

  const handleDeleteRegisteredUsers = async () => {
    if (!window.confirm('Are you sure you want to delete all registered users? This will clear all registered accounts.')) {
      return;
    }

    try {
      await fetch('/api/users/delete', { method: 'POST' });
    } catch {
      // Offline fallback
    }

    localStorage.removeItem('free_registered_users');
    localStorage.removeItem('free_auth_user');
    setAuthUser(null);
    alert('All registered users have been deleted.');
  };

  const handleOpenContact = (defaultInterest?: string) => {
    setSelectedInterest(defaultInterest || '');
    setSelectedEstimate(null);
    setContactOpen(true);
  };

  const handleApplyEstimate = (data: {
    projectType: string;
    addons: string[];
    totalPrice: number;
    estimatedDays: number;
  }) => {
    setSelectedEstimate(data);
    setSelectedInterest(data.projectType);
    setContactOpen(true);
  };

  const scrollToCalculator = () => {
    if (currentPage !== 'home') {
      navigateTo('home', 'calculator');
    } else {
      const el = document.getElementById('calculator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenEstimator={scrollToCalculator}
        currentPage={currentPage}
        onNavigate={navigateTo}
        authUser={authUser}
        onSignOut={handleSignOut}
        onDeleteUsers={handleDeleteRegisteredUsers}
      />

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'register' ? (
          <RegisterPage
            currentUser={authUser}
            onSignOut={handleSignOut}
            onDeleteUsers={handleDeleteRegisteredUsers}
            initialMode={authMode}
            onRegisterSuccess={(user) => {
              setAuthUser(user);
              navigateTo('home');
            }}
            onContinueAsGuest={() => {
              navigateTo('home');
            }}
          />
        ) : currentPage === 'services' ? (
          <ServicesPage
            onSelectService={(serviceName) => handleOpenContact(`Service: ${serviceName}`)}
            onOpenEstimator={scrollToCalculator}
          />
        ) : currentPage === 'work' ? (
          <WorkPage
            onSelectProjectInquiry={(projectName) =>
              handleOpenContact(`Interested in project style similar to: ${projectName}`)
            }
            onOpenEstimator={scrollToCalculator}
          />
        ) : (
          <>
            <Hero
              onOpenContact={handleOpenContact}
              onOpenEstimator={scrollToCalculator}
            />

            <TechStack />

            <QuoteCalculator onApplyEstimate={handleApplyEstimate} />

            <Process />

            <Pricing
              onSelectTier={(tierName) => handleOpenContact(`Package: ${tierName}`)}
            />

            <Testimonials />

            <FAQ />
          </>
        )}
      </main>

      {/* Global Contact & Proposal Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        initialInterest={selectedInterest}
        initialEstimate={selectedEstimate}
      />

      {/* Footer */}
      <Footer
        onOpenContact={() => handleOpenContact()}
        onNavigate={navigateTo}
        onDeleteUsers={handleDeleteRegisteredUsers}
      />
    </div>
  );
}

export default App;
