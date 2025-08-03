import { useState } from "react";
import Welcome from "@/components/Welcome";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import AICropPlanning from "@/components/AICropPlanning";
import RemoteMonitoring from "@/components/RemoteMonitoring";
import SmartIrrigation from "@/components/SmartIrrigation";
import FarmAnalytics from "@/components/FarmAnalytics";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleGoHome = () => {
    setShowWelcome(true);
    setCurrentSection('dashboard');
  };

  if (showWelcome) {
    return <Welcome onGetStarted={handleGetStarted} />;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'ai-planner':
        return <AICropPlanning />;
      case 'timeline':
        return <SmartIrrigation />;
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
