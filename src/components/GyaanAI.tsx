import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Upload, 
  Send, 
  Mic, 
  Image as ImageIcon,
  Bot,
  Languages,
  Lightbulb,
  MapPin,
  Sun,
  DollarSign,
  X,
  Maximize2,
  Minimize2
} from "lucide-react";

interface GyaanAIProps {
  isFloating?: boolean;
  onToggleSize?: () => void;
  onClose?: () => void;
}

export default function GyaanAI({ isFloating = false, onToggleSize, onClose }: GyaanAIProps) {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("English");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const languages = ["English", "हिंदी", "తెలుగు", "ಕನ್ನಡ", "मराठी", "ગુજરાતી"];
  
  const chatHistory = [
    { 
      type: "bot", 
      message: "Hello! I'm Gyān AI, your farming assistant. How can I help you today?",
      time: "10:30 AM"
    },
    { 
      type: "user", 
      message: "What's the best time to plant tomatoes in Karnataka?",
      time: "10:32 AM"
    },
    { 
      type: "bot", 
      message: "In Karnataka, the best time to plant tomatoes is during Kharif season (June-July) and Rabi season (October-November). Current weather conditions favor planting in the next 2 weeks.",
      time: "10:32 AM",
      suggestions: ["Weather forecast", "Tomato varieties", "Soil preparation"]
    }
  ];

  const quickActions = [
    { icon: ImageIcon, label: "Pest ID", desc: "Upload crop image" },
    { icon: Sun, label: "Weather", desc: "Today's forecast" },
    { icon: DollarSign, label: "Prices", desc: "Market rates" },
    { icon: Lightbulb, label: "Tips", desc: "Daily advice" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const containerClass = isFloating 
    ? "fixed bottom-4 right-4 w-80 h-96 z-50 shadow-2xl" 
    : "w-full h-full";

  return (
    <Card className={`${containerClass} shadow-earth`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Gyān AI Assistant
          </CardTitle>
          <div className="flex items-center gap-2">
            {isFloating && (
              <>
                <Button variant="ghost" size="sm" onClick={onToggleSize}>
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
            {!isFloating && onToggleSize && (
              <Button variant="ghost" size="sm" onClick={onToggleSize}>
                <Minimize2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-muted-foreground" />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm bg-transparent border-none focus:outline-none text-muted-foreground"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-full p-4 space-y-4">
        {/* Quick Actions - Only show in full screen */}
        {!isFloating && (
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex-col h-auto p-3 text-xs"
              >
                <action.icon className="w-4 h-4 mb-1" />
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        )}

        {/* Chat Area */}
        <div className={`flex-1 overflow-y-auto space-y-3 ${isFloating ? 'max-h-48' : 'max-h-96'}`}>
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${chat.type === 'user' ? 'order-1' : 'order-2'}`}>
                {chat.type === 'bot' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        GA
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">Gyān AI</span>
                  </div>
                )}
                <div className={`p-3 rounded-lg text-sm ${
                  chat.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-2' 
                    : 'bg-muted text-foreground mr-2'
                }`}>
                  {chat.message}
                </div>
                {chat.suggestions && (
                  <div className="flex flex-wrap gap-1 mt-2 mr-2">
                    {chat.suggestions.map((suggestion, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs cursor-pointer">
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {chat.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Upload Preview */}
        {selectedImage && (
          <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm flex-1">{selectedImage.name}</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedImage(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              placeholder="Ask me anything about farming..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-20"
            />
          </div>
          <div className="flex items-center gap-1">
            <label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button variant="ghost" size="sm" type="button">
                <Upload className="w-4 h-4" />
              </Button>
            </label>
            <Button variant="ghost" size="sm">
              <Mic className="w-4 h-4" />
            </Button>
            <Button size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Karnataka, India</span>
            </div>
          </div>
          <span>Powered by AI</span>
        </div>
      </CardContent>
    </Card>
  );
}