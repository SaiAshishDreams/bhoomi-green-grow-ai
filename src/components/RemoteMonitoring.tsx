import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, Smartphone, Thermometer, Droplets, Bell, Eye, ArrowRight, Play, Quote, Info } from "lucide-react";

export default function RemoteMonitoring() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Notice */}
      {!user && (
        <div className="p-6">
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              You're viewing demo monitoring capabilities. <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => window.location.href = '/auth'}>
                Login to see your real farm monitoring system
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
      {/* Hero Banner */}
      <section className="bg-gradient-sky relative overflow-hidden py-16 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Eye className="w-5 h-5 text-primary-foreground" />
            <span className="text-primary-foreground font-medium">24/7 Farm Monitoring</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {user ? 'See Your Farm' : 'Demo: See Farms'}<br />
            <span className="text-accent-foreground">from Anywhere</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            {user 
              ? 'Live drone and CCTV feeds, soil and climate stats at your fingertips. Monitor your farm 24/7 with real-time data and instant alerts.'
              : 'Experience how Bhoomi\'s monitoring system would let you watch your farm remotely with live feeds and sensor data.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="animate-gentle-bounce">
              <Play className="mr-2 w-5 h-5" />
              Watch Live Demo
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-primary-foreground hover:bg-white/10">
              Start Monitoring <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Complete Farm Visibility
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-forest rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Camera className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Live CCTV Feed</h3>
                <p className="text-sm text-muted-foreground">
                  High-quality cameras with zoom, timelapse, and night vision capabilities
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sky rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Smartphone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Drone Surveillance</h3>
                <p className="text-sm text-muted-foreground">
                  On-demand or scheduled aerial views of your entire farm
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-earth rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Thermometer className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Climate Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time temperature, humidity, and soil moisture data
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-harvest rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Bell className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Smart Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Instant mobile notifications for any farm abnormalities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Real-World Applications
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 bg-gradient-forest rounded-xl flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Irrigation Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor if crops are being watered on time and verify irrigation schedules 
                  are being followed correctly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 bg-gradient-earth rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Early Detection</h3>
                <p className="text-muted-foreground">
                  Spot pests, diseases, or livestock damage early before they spread 
                  and cause significant crop loss.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 bg-gradient-sky rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Work Verification</h3>
                <p className="text-muted-foreground">
                  Check if field workers have completed their assigned tasks 
                  and maintain quality standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-forest shadow-glow">
            <CardContent className="p-8 text-center">
              <Quote className="w-12 h-12 mx-auto mb-6 text-primary-foreground" />
              <blockquote className="text-2xl font-medium text-primary-foreground mb-6 italic">
                "I live in Mumbai but monitor my farm in Warangal daily – Bhoomi keeps me connected."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">RK</span>
                </div>
                <div className="text-left">
                  <p className="text-primary-foreground font-semibold">Rajesh Kumar</p>
                  <p className="text-primary-foreground/80 text-sm">Remote Farm Owner</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Monitoring System Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Camera System</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-green-500"></Badge>
                    4K HD resolution with night vision
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-green-500"></Badge>
                    360° rotation and 10x optical zoom
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-green-500"></Badge>
                    Weatherproof and solar-powered options
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-green-500"></Badge>
                    Motion detection and auto-alerts
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Sensor Network</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-blue-500"></Badge>
                    Soil moisture and pH monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-blue-500"></Badge>
                    Temperature and humidity sensors
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-blue-500"></Badge>
                    Wind speed and rainfall detection
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-blue-500"></Badge>
                    Real-time data transmission via 4G/WiFi
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-sky">
        <Card className="max-w-4xl mx-auto shadow-glow">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Experience Live Monitoring with Bhoomi
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Never miss a moment on your farm. Get complete visibility and control 
              with our advanced monitoring technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="harvest" size="lg">
                Schedule Live Demo
              </Button>
              <Button variant="outline" size="lg">
                Get Monitoring System
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}