import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Smartphone, CloudRain, BarChart3, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";
import bhoomeLogo from "@/assets/bhoomi-logo.png";

const features = [
  {
    icon: Sprout,
    title: "AI Crop Planning",
    description: "Get personalized crop recommendations based on your location and soil conditions"
  },
  {
    icon: Smartphone,
    title: "Remote Monitoring",
    description: "Monitor your farm 24/7 with live camera feeds and sensor data"
  },
  {
    icon: CloudRain,
    title: "Smart Irrigation",
    description: "Automated watering systems that respond to weather and soil moisture"
  },
  {
    icon: BarChart3,
    title: "Farm Analytics",
    description: "Track crop health, yields, and profitability with detailed reports"
  }
];

interface WelcomeProps {
  onGetStarted: () => void;
}

export default function Welcome({ onGetStarted }: WelcomeProps) {
  const [currentFeature, setCurrentFeature] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-primary/5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4 px-6">
          <div className="flex items-center justify-center gap-3">
            <img src={bhoomeLogo} alt="Bhoomi" className="w-12 h-12" />
            <h1 className="text-3xl font-bold text-foreground">Bhoomi</h1>
          </div>
          <p className="text-center text-muted-foreground mt-2">Smart Remote Farming Platform</p>
        </header>

        {/* Hero Section */}
        <section className="px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-forest mb-8 animate-fade-in">
              <img 
                src={heroImage} 
                alt="Smart Farming" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            <div className="text-center animate-fade-in-scale">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Farm Smarter,<br />
                <span className="text-primary">Not Harder</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your agricultural land into a smart, profitable farm with AI-powered insights, 
                remote monitoring, and automated farming solutions.
              </p>
              
              <Button 
                onClick={onGetStarted}
                variant="harvest" 
                size="lg" 
                className="animate-gentle-bounce"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8 animate-fade-in">
              Everything You Need for Modern Farming
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="hover:shadow-forest transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setCurrentFeature(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-forest rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 pb-12">
          <Card className="max-w-4xl mx-auto bg-gradient-earth shadow-glow animate-fade-in-scale">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Transform Your Farm?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of farmers who are already using Bhoomi to increase their yields, 
                reduce costs, and farm more sustainably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="forest" size="lg">
                  Watch Demo
                </Button>
                <Button variant="outline" size="lg" onClick={onGetStarted}>
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}