import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle } from "lucide-react";
import GyaanAI from "./GyaanAI";

export default function FloatingGyaanAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        <Bot className="w-6 h-6" />
      </Button>
    );
  }

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <GyaanAI 
          isFloating={false}
          onToggleSize={() => setIsFullScreen(false)}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  }

  return (
    <GyaanAI 
      isFloating={true}
      onToggleSize={() => setIsFullScreen(true)}
      onClose={() => setIsOpen(false)}
    />
  );
}