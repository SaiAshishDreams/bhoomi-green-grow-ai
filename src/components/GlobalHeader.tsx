import AuthButton from "@/components/AuthButton";
import bhoomeLogo from "@/assets/bhoomi-logo.png";

interface GlobalHeaderProps {
  onGoHome?: () => void;
}

export default function GlobalHeader({ onGoHome }: GlobalHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border shadow-earth z-50 flex items-center justify-between px-4">
      <div 
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onGoHome || (() => window.location.href = '/')}
      >
        <img src={bhoomeLogo} alt="Bhoomi" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-foreground">Bhoomi</h1>
      </div>
      
      <AuthButton />
    </header>
  );
}