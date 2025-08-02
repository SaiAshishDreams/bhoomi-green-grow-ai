import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Smartphone, Thermometer, CloudRain, Zap, Leaf, ArrowRight, CheckCircle } from "lucide-react";

export default function SmartIrrigation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="bg-gradient-earth relative overflow-hidden py-16 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M25 0C11.2 0 0 11.2 0 25s11.2 25 25 25 25-11.2 25-25S38.8 0 25 0zm0 3c12.1 0 22 9.9 22 22s-9.9 22-22 22S3 37.1 3 25 12.9 3 25 3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Droplets className="w-5 h-5 text-primary-foreground" />
            <span className="text-primary-foreground font-medium">Smart Water Management</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Water When Needed,<br />
            <span className="text-accent-foreground">Save Every Drop</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Smart irrigation that adapts to real-time soil and weather data. 
            Automated watering systems that save water and boost crop health.
          </p>
          
          <Button variant="secondary" size="lg" className="animate-gentle-bounce">
            Automate Your Watering <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How Smart Irrigation Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-forest rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Thermometer className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Soil Sensors</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced sensors continuously track moisture levels and soil conditions
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sky rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <CloudRain className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Weather Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  AI checks live weather forecasts and rainfall predictions
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-earth rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Auto Activation</h3>
                <p className="text-sm text-muted-foreground">
                  System activates irrigation only when crops actually need water
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-harvest rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Smartphone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Mobile Control</h3>
                <p className="text-sm text-muted-foreground">
                  Get notifications and manual override controls on your phone
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Smart Irrigation Benefits
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 bg-gradient-sky rounded-2xl flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">30%</h3>
                <h4 className="text-lg font-semibold text-foreground mb-3">Water Savings</h4>
                <p className="text-muted-foreground">
                  Reduce water consumption with precision irrigation that delivers exactly 
                  what your crops need, when they need it.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 bg-gradient-forest rounded-2xl flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Zero</h3>
                <h4 className="text-lg font-semibold text-foreground mb-3">Over/Under Watering</h4>
                <p className="text-muted-foreground">
                  Prevent crop stress and root rot with intelligent watering that maintains 
                  optimal soil moisture levels.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 bg-gradient-earth rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">24/7</h3>
                <h4 className="text-lg font-semibold text-foreground mb-3">Automated Care</h4>
                <p className="text-muted-foreground">
                  Keep your crops healthy even when you're away with fully automated 
                  irrigation scheduling.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Setup */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Complete Irrigation System
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Hardware Components</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span className="text-muted-foreground">Smart soil moisture sensors</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span className="text-muted-foreground">Automated valve controllers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span className="text-muted-foreground">Solar-powered pump systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span className="text-muted-foreground">Drip irrigation kit (optional)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span className="text-muted-foreground">Weather station integration</span>
                </div>
              </div>
            </div>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Mobile App Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="w-3 h-3 rounded-full p-0 bg-green-500"></Badge>
                    <span className="text-muted-foreground">Remote on/off control</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="w-3 h-3 rounded-full p-0 bg-green-500"></Badge>
                    <span className="text-muted-foreground">Real-time soil moisture data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="w-3 h-3 rounded-full p-0 bg-green-500"></Badge>
                    <span className="text-muted-foreground">Irrigation schedule management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="w-3 h-3 rounded-full p-0 bg-green-500"></Badge>
                    <span className="text-muted-foreground">Water usage analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="w-3 h-3 rounded-full p-0 bg-green-500"></Badge>
                    <span className="text-muted-foreground">Smart alerts and notifications</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Simple Installation Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-forest rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Site Assessment</h3>
              <p className="text-muted-foreground">
                Our team visits your farm to assess water sources, crop layout, and optimal sensor placement
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-earth rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Hardware Setup</h3>
              <p className="text-muted-foreground">
                Professional installation of sensors, valves, and irrigation lines with complete testing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-sky rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">App Training</h3>
              <p className="text-muted-foreground">
                Complete training on the mobile app and system maintenance for optimal performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-earth">
        <Card className="max-w-4xl mx-auto shadow-glow">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Automate Your Irrigation?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join farmers who are saving water, reducing costs, and improving crop yields 
              with Bhoomi's smart irrigation technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="harvest" size="lg">
                Get Smart Irrigation System
              </Button>
              <Button variant="outline" size="lg">
                Calculate Water Savings
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}