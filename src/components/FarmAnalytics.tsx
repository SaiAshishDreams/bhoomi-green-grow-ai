import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Mail, MapPin, PieChart, AlertTriangle, ArrowRight, Target } from "lucide-react";

export default function FarmAnalytics() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="bg-gradient-harvest relative overflow-hidden py-16 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
            <span className="text-primary-foreground font-medium">Advanced Farm Analytics</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Know Your Farm,<br />
            <span className="text-accent-foreground">Grow Better</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            All your farm data in one place: insights, trends, and predictions. 
            Track crop health, yields, and profitability with detailed reports.
          </p>
          
          <Button variant="secondary" size="lg" className="animate-gentle-bounce">
            See Your Farm Analytics <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Comprehensive Farm Intelligence
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-forest rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Crop Health Index</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time monitoring of plant health, disease risk, and growth patterns
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-earth rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Yield Prediction</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered forecasts based on growth trends and historical data
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sky rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <PieChart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Cost Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed expense vs income charts with profitability insights
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-forest transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-harvest rounded-2xl flex items-center justify-center group-hover:animate-gentle-bounce">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Weekly Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Automated reports delivered via email or mobile app
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Reports */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Sample Analytics Dashboard
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            See how our analytics help you make better farming decisions
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Cost Distribution</h3>
                  <PieChart className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Seeds & Fertilizer</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">40%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Water & Irrigation</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">25%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Labor Costs</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">20%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Equipment & Tools</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">15%</Badge>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    💡 Tip: Consider bulk fertilizer purchase to reduce costs by 12%
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Yield by Crop</h3>
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Tomatoes</span>
                      <span className="text-sm font-medium">850 kg/acre</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Marigold</span>
                      <span className="text-sm font-medium">320 kg/acre</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Groundnut</span>
                      <span className="text-sm font-medium">220 kg/acre</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    📈 Projected yield increase: 15% with optimal irrigation
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Smart Alerts</h3>
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm font-medium text-red-800">Pest Risk Alert</p>
                    <p className="text-xs text-red-600">Aphid activity detected in Zone 2</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm font-medium text-yellow-800">Weather Warning</p>
                    <p className="text-xs text-yellow-600">Heavy rain expected in 2 days</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-medium text-green-800">Harvest Ready</p>
                    <p className="text-xs text-green-600">Zone 1 tomatoes ready for harvest</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Data-Driven Farming Benefits
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 bg-gradient-forest rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Make Informed Decisions</h3>
                <p className="text-muted-foreground">
                  Use real data instead of guesswork to make critical farming decisions 
                  that impact your bottom line.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 bg-gradient-earth rounded-2xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Identify Problem Areas</h3>
                <p className="text-muted-foreground">
                  Quickly spot unproductive zones, pest hotspots, and areas 
                  needing attention before problems spread.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 bg-gradient-sky rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Plan for Market Demand</h3>
                <p className="text-muted-foreground">
                  Predict harvest timing and quantities to align with market demand 
                  and maximize selling prices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Features */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Advanced Analytics Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Performance Tracking</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-green-500"></Badge>
                    Crop growth rate monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-green-500"></Badge>
                    Soil health trend analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-green-500"></Badge>
                    Water usage optimization reports
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-green-500"></Badge>
                    Seasonal performance comparisons
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-forest transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Predictive Insights</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-blue-500"></Badge>
                    Disease outbreak predictions
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-blue-500"></Badge>
                    Market price forecasting
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-blue-500"></Badge>
                    Weather impact analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 rounded-full p-0 bg-blue-500"></Badge>
                    Optimal harvest timing alerts
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-harvest">
        <Card className="max-w-4xl mx-auto shadow-glow">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              See Your Farm Analytics in Action
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Transform your farming with data-driven insights. Make smarter decisions, 
              increase yields, and boost profitability with Bhoomi Analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="forest" size="lg">
                Get Analytics Dashboard
              </Button>
              <Button variant="outline" size="lg">
                See Sample Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}