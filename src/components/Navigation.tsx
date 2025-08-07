import { Button } from "@/components/ui/button";
import { 
  Home, 
  Brain, 
  Calendar, 
  Settings, 
  FileText, 
  MessageCircle,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthButton from "@/components/AuthButton";
import bhoomeLogo from "@/assets/bhoomi-logo.png";

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onGoHome?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, public: true },
  { id: 'farms', label: 'My Farms', icon: Calendar, public: false },
  { id: 'cluster-farming', label: 'Cluster Farming', icon: Users, public: true },
  { id: 'ai-planner', label: 'AI Planner', icon: Brain, public: true },
  { id: 'control', label: 'Control Panel', icon: Settings, public: true },
  { id: 'reports', label: 'Reports', icon: FileText, public: true },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, public: true },
  { id: 'community', label: 'Community', icon: MessageCircle, public: true },
  { id: 'profile', label: 'Profile', icon: User, public: false },
];

export default function Navigation({ currentSection, onNavigate, onGoHome }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  // Always show navigation, but hide some items for non-authenticated users

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-card border-r border-border shadow-earth z-40">
        <div className="flex flex-col w-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onGoHome}
            >
              <img src={bhoomeLogo} alt="Bhoomi" className="w-8 h-8" />
              <h1 className="text-xl font-bold text-foreground">Bhoomi</h1>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2">
            {navItems
              .filter(item => item.public || user)
              .map((item) => (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? "forest" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => onNavigate(item.id)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
          </div>

          {/* User Menu */}
          <div className="p-4 border-t border-border">
            {user ? (
              <AuthButton onNavigate={onNavigate} />
            ) : (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/auth'}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border shadow-earth z-50 flex items-center justify-between px-4">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onGoHome}
          >
            <img src={bhoomeLogo} alt="Bhoomi" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-foreground">Bhoomi</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <AuthButton onNavigate={onNavigate} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-forest animate-slide-up">
              <div className="p-4 space-y-2">
                {navItems
                  .filter(item => item.public || user)
                  .map((item) => (
                    <Button
                      key={item.id}
                      variant={currentSection === item.id ? "forest" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        onNavigate(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Spacer */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
      <div className="lg:hidden h-16 flex-shrink-0" />
    </>
  );
}