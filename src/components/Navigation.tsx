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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import bhoomeLogo from "@/assets/bhoomi-logo.png";

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onGoHome?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'farms', label: 'My Farms', icon: Calendar },
  { id: 'ai-planner', label: 'AI Planner', icon: Brain },
  { id: 'control', label: 'Control Panel', icon: Settings },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'farmer-connect', label: 'Connect', icon: MessageCircle },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Navigation({ currentSection, onNavigate, onGoHome }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {user?.user_metadata?.full_name ? 
                user.user_metadata.full_name.charAt(0).toUpperCase() : 
                user?.email?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user?.user_metadata?.full_name || 'User'}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onNavigate('profile')}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
            {navItems.map((item) => (
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {user?.user_metadata?.full_name ? 
                      user.user_metadata.full_name.charAt(0).toUpperCase() : 
                      user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="h-8 w-8"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
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
            <UserMenu />
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
                {navItems.map((item) => (
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