import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Welcome from "@/components/Welcome";
import Navigation from "@/components/Navigation";
import GlobalHeader from "@/components/GlobalHeader";
import Dashboard from "@/components/Dashboard";
import AICropPlanning from "@/components/AICropPlanning";
import RemoteMonitoring from "@/components/RemoteMonitoring";
import SmartIrrigation from "@/components/SmartIrrigation";
import FarmAnalytics from "@/components/FarmAnalytics";
import UserProfile from "@/components/UserProfile";
import FarmManager from "@/components/FarmManager";
import NotificationSettings from "@/components/NotificationSettings";

const Index = () => {
  const { user, loading } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Check URL params for authentication redirect and show welcome toast
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('authenticated') === 'true' && user) {
      setShowWelcome(false);
      // Clean up URL
      window.history.replaceState({}, document.title, '/');
      
      // Show welcome toast after a brief delay to ensure the page is loaded
      setTimeout(() => {
        import("@/hooks/use-toast").then(({ toast }) => {
          toast({
            title: "Welcome back!",
            description: "Your farm data is now visible.",
          });
        });
      }, 500);
    }
  }, [user]);

  const handleGetStarted = () => {
    // Always show the dashboard, regardless of login status
    // Public users see demo content, logged-in users see personalized data
    setShowWelcome(false);
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleGoHome = () => {
    setShowWelcome(true);
    setCurrentSection('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show welcome page only if explicitly requested
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader onGoHome={handleGoHome} />
        <div className="pt-16">
          <Welcome onGetStarted={handleGetStarted} />
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'farms':
        return <FarmManager />;
      case 'ai-planner':
        return <AICropPlanning />;
      case 'control':
        return <RemoteMonitoring />;
      case 'reports':
        return <FarmAnalytics />;
      case 'farmer-connect':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Farmer Connect</h1>
            <p className="text-muted-foreground">Coming soon - Chat and call features</p>
          </div>
        );
      case 'marketplace':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Marketplace</h1>
            <p className="text-muted-foreground">Coming soon - Sell your harvest</p>
          </div>
        );
      case 'profile':
        return <UserProfile />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentSection={currentSection} 
        onNavigate={handleNavigate}
        onGoHome={handleGoHome}
      />
      <main className="lg:ml-64 pt-16 lg:pt-0">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
