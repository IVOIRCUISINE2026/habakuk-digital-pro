import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { AppDemoModal } from './components/AppDemoModal';
import { AppVideoModal } from './components/AppVideoModal';
import { ServicesSection } from './components/ServicesSection';
import { StepsSection } from './components/StepsSection';
import { OrderModule } from './components/OrderModule';
import { TrackingSection } from './components/TrackingSection';
import { StatisticsSection } from './components/StatisticsSection';
import { AdminSection } from './components/AdminSection';
import { AboutCreator } from './components/AboutCreator';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import { api } from './services/api';
import { ApplicationItem, Order } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('accueil');
  const [applications, setApplications] = useState<ApplicationItem[]>(api.getApplications());
  const [demoApp, setDemoApp] = useState<ApplicationItem | null>(null);
  const [videoApp, setVideoApp] = useState<ApplicationItem | null>(null);
  const [orderTargetAppId, setOrderTargetAppId] = useState<string | undefined>(undefined);
  const [trackingRef, setTrackingRef] = useState<string>('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(!!api.getStoredUser());
  const lastRecordedTabRef = useRef<string | null>(null);

  // Listen to hash / url changes or initial tab
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['accueil', 'applications', 'services', 'commande', 'suivi', 'statistiques', 'administration'].includes(hash)) {
        setCurrentTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Record real page visit when navigating between tabs
  useEffect(() => {
    if (lastRecordedTabRef.current === currentTab) return;
    lastRecordedTabRef.current = currentTab;
    api.recordVisit(currentTab);
  }, [currentTab]);

  const handleNavigate = (tab: string, param?: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    if (param && tab === 'commande') {
      setOrderTargetAppId(param);
    }
    if (param && tab === 'suivi') {
      setTrackingRef(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderApp = (app: ApplicationItem) => {
    setOrderTargetAppId(app.id);
    handleNavigate('commande', app.id);
  };

  const handlePreviewApp = (app: ApplicationItem) => {
    setDemoApp(app);
  };

  const handlePreviewVideo = (app: ApplicationItem) => {
    setVideoApp(app);
  };

  const handleSelectService = (_serviceName: string) => {
    setOrderTargetAppId('custom');
    handleNavigate('commande', 'custom');
  };

  const handleOrderSuccess = (order: Order) => {
    setTrackingRef(order.reference);
  };

  const handleTrackOrderFromConfirmation = (reference: string) => {
    setTrackingRef(reference);
    handleNavigate('suivi', reference);
  };

  const handleUpdateAppStatus = (appId: string, status: string) => {
    const updated = api.updateApplicationStatus(appId, status);
    setApplications(updated);
  };

  const handleResetCatalogStatuses = () => {
    const resetApps = api.resetApplicationsToDefault();
    setApplications(resetApps);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-white text-[#173528] font-body selection:bg-[#C9F0D5] selection:text-[#0B5D32]">
      {/* Fixed Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main View Area */}
      <main className="flex-1 pt-16 sm:pt-18">
        
        {/* TAB 1: ACCUEIL */}
        {currentTab === 'accueil' && (
          <div>
            <Hero
              onDiscoverClick={() => {
                const el = document.getElementById('applications-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleNavigate('applications');
                }
              }}
              onOrderClick={() => handleNavigate('commande')}
              onTrackClick={() => handleNavigate('suivi')}
            />

            <div id="applications-section">
              <CatalogSection
                applications={applications}
                onOrderApp={handleOrderApp}
                onPreviewApp={handlePreviewApp}
                onPreviewVideo={handlePreviewVideo}
              />
            </div>

            <ServicesSection onSelectService={handleSelectService} />

            <StepsSection
              onOrderClick={() => handleNavigate('commande')}
              onTrackClick={() => handleNavigate('suivi')}
            />

            <AboutCreator onContactClick={() => handleNavigate('commande')} />
          </div>
        )}

        {/* TAB 2: APPLICATIONS */}
        {currentTab === 'applications' && (
          <div>
            <CatalogSection
              applications={applications}
              onOrderApp={handleOrderApp}
              onPreviewApp={handlePreviewApp}
              onPreviewVideo={handlePreviewVideo}
            />
            <StepsSection
              onOrderClick={() => handleNavigate('commande')}
              onTrackClick={() => handleNavigate('suivi')}
            />
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {currentTab === 'services' && (
          <div>
            <ServicesSection onSelectService={handleSelectService} />
            <StepsSection
              onOrderClick={() => handleNavigate('commande')}
              onTrackClick={() => handleNavigate('suivi')}
            />
            <AboutCreator onContactClick={() => handleNavigate('commande')} />
          </div>
        )}

        {/* TAB 4: COMMANDE */}
        {currentTab === 'commande' && (
          <OrderModule
            applications={applications}
            preSelectedAppId={orderTargetAppId}
            onOrderSuccess={handleOrderSuccess}
            onTrackOrder={handleTrackOrderFromConfirmation}
          />
        )}

        {/* TAB 5: SUIVI DE COMMANDE */}
        {currentTab === 'suivi' && (
          <TrackingSection
            initialReference={trackingRef}
            onGoToOrder={() => handleNavigate('commande')}
          />
        )}

        {/* TAB 6: STATISTIQUES */}
        {currentTab === 'statistiques' && (
          <StatisticsSection />
        )}

        {/* TAB 7: ADMINISTRATION */}
        {currentTab === 'administration' && (
          <AdminSection
            applications={applications}
            onUpdateAppStatus={handleUpdateAppStatus}
            onResetCatalogStatuses={handleResetCatalogStatuses}
            onAdminAuthChange={setIsAdminLoggedIn}
          />
        )}

      </main>

      {/* Interactive App Demo Modal */}
      <AppDemoModal
        app={demoApp}
        onClose={() => setDemoApp(null)}
        onOrder={(app) => handleOrderApp(app)}
      />

      {/* Interactive App Video Overview Modal */}
      <AppVideoModal
        app={videoApp}
        onClose={() => setVideoApp(null)}
        onOpenDemo={(app) => {
          setVideoApp(null);
          setDemoApp(app);
        }}
        onOrder={(app) => handleOrderApp(app)}
      />

      {/* Floating Chatbot Assistant on Homepage */}
      {currentTab === 'accueil' && <ChatbotWidget />}

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
