import { useState } from "react";
import Welcome from "@/components/Welcome";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  if (showWelcome) {
    return <Welcome onGetStarted={handleGetStarted} />;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'ai-planner':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">AI Crop Planner</h1>
            <p className="text-muted-foreground">Coming soon - AI-powered crop recommendations</p>
          </div>
        );
      case 'timeline':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Farm Activity Timeline</h1>
            <p className="text-muted-foreground">Coming soon - Calendar view of farm activities</p>
          </div>
        );
      case 'control':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Control Panel</h1>
            <p className="text-muted-foreground">Coming soon - IoT device controls</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Farm Reports</h1>
            <p className="text-muted-foreground">Coming soon - Analytics and insights</p>
          </div>
        );
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
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
      <main className="lg:ml-0">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
