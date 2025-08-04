import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Brain, MapPin, Calendar, TrendingUp, Droplets, Star, ArrowRight, Info } from "lucide-react";

export default function AICropPlanning() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Notice */}
      {!user && (
        <div className="p-6">
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              You're viewing demo AI crop planning. <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => window.location.href = '/auth'}>
                Login to get personalized crop recommendations for your farm
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
      {/* Hero Banner */}
      <section className="bg-gradient-forest relative overflow-hidden py-16 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Brain className="w-5 h-5 text-primary-foreground" />
            <span className="text-primary-foreground font-medium">AI-Powered Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {user ? 'AI-Powered Crop' : 'Demo AI Crop'}<br />
            <span className="text-accent-foreground">Recommendations</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            {user 
              ? 'Plan the right crop at the right time with Bhoomi. Get personalized recommendations based on your location, soil conditions, and market trends.'
              : 'Experience how Bhoomi\'s AI would recommend crops for your specific farm location and conditions.'
            }
          </p>
          
          <Button 
            variant="secondary" 
            size="lg" 
            className="animate-gentle-bounce"
            onClick={() => user ? null : window.location.href = '/auth'}
          >
            {user ? 'Try the Crop Planner Now' : 'Login for Personalized Recommendations'} <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How Our AI Works for You
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-earth rounded-2xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Input Your Data</h3>
                <p className="text-muted-foreground">
                  Share your location, farm size, and crop preferences (optional) 
                  for personalized recommendations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-forest rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes soil type, weather forecasts, seasonal patterns, 
                  and historical crop performance data.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-sky rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Smart Recommendations</h3>
                <p className="text-muted-foreground">
                  Receive top 3 crop recommendations with ROI predictions, 
                  water requirements, and timing guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Output */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Sample AI Recommendations
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Here's what you can expect from our AI crop planner
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">🍅 Tomato</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    High ROI
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Growth: 90-120 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Sowing: June-July</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Profitability: ⭐⭐⭐⭐⭐</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Care Level: Medium</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">🌼 Marigold</h3>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Fast Growth
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Growth: 45-60 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Sowing: Year-round</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Profitability: ⭐⭐⭐⭐</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Care Level: Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">🥜 Groundnut</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Stable Market
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Growth: 120-140 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Sowing: May-June</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Profitability: ⭐⭐⭐⭐</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Care Level: Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose AI Crop Planning?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-earth rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Save Money</h3>
              <p className="text-muted-foreground">
                Choose crops that thrive locally and reduce the risk of crop failure
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-forest rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Maximize Yield</h3>
              <p className="text-muted-foreground">
                Get the highest possible ROI from your land investment
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-sky rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Reduce Trial & Error</h3>
              <p className="text-muted-foreground">
                Make data-driven decisions instead of guessing what might work
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
              Ready to Plan Your Next Harvest?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of farmers who trust Bhoomi's AI to make smarter crop decisions. 
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="harvest" size="lg">
                Try the Crop Planner Now
              </Button>
              <Button variant="outline" size="lg">
                Available on Bhoomi App
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}