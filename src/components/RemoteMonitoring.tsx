import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Camera, Smartphone, Thermometer, Droplets, Bell, Eye, ArrowRight, Play, Quote, Info,
         Video, Plane, AlertTriangle, CheckCircle, Clock, Wind } from "lucide-react";

interface Farm {
  id: string;
  name: string;
  location: string;
  size_acres: number;
}

interface WeatherData {
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  soilMoisture: number;
  severity: 'good' | 'warning' | 'critical';
}

interface Alert {
  id: string;
  type: 'pest' | 'crop_stress' | 'irrigation' | 'fertilizer';
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  acknowledged: boolean;
}

export default function RemoteMonitoring() {
  const { user } = useAuth();
  const [userFarms, setUserFarms] = useState<Farm[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [droneStatus, setDroneStatus] = useState({
    status: 'idle' as 'idle' | 'in_use' | 'scheduled',
    lastFlyover: '2024-01-15',
    nextScheduled: '2024-01-17'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserFarms();
      generateMockData();
    }
  }, [user]);

  const fetchUserFarms = async () => {
    setLoading(true);
    try {
      const { data: farms, error } = await supabase
        .from('farms')
        .select('*')
        .eq('user_id', user?.id);
      
      if (error) throw error;
      
      setUserFarms(farms || []);
      if (farms && farms.length > 0) {
        setSelectedFarm(farms[0]);
      }
    } catch (error) {
      console.error('Error fetching farms:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    // Generate 7 days of weather data
    const mockWeatherData: WeatherData[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const temp = 25 + Math.random() * 10;
      const humidity = 60 + Math.random() * 30;
      const rainfall = Math.random() * 10;
      const soilMoisture = 40 + Math.random() * 40;
      
      let severity: 'good' | 'warning' | 'critical' = 'good';
      if (temp > 35 || humidity < 30 || soilMoisture < 20) severity = 'critical';
      else if (temp > 32 || humidity < 50 || soilMoisture < 40) severity = 'warning';
      
      mockWeatherData.push({
        date: date.toISOString().split('T')[0],
        temperature: Math.round(temp),
        humidity: Math.round(humidity),
        rainfall: Math.round(rainfall * 10) / 10,
        soilMoisture: Math.round(soilMoisture),
        severity
      });
    }
    
    setWeatherData(mockWeatherData);
    
    // Generate mock alerts
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'pest',
        message: 'Aphids detected in sector A3 - Immediate action recommended',
        severity: 'high',
        timestamp: '2024-01-16T10:30:00Z',
        acknowledged: false
      },
      {
        id: '2',
        type: 'crop_stress',
        message: 'Crop stress indicators in sector B1 - Check irrigation',
        severity: 'medium',
        timestamp: '2024-01-16T08:15:00Z',
        acknowledged: false
      },
      {
        id: '3',
        type: 'irrigation',
        message: 'Missed irrigation schedule in sector C2',
        severity: 'medium',
        timestamp: '2024-01-15T18:00:00Z',
        acknowledged: true
      },
      {
        id: '4',
        type: 'fertilizer',
        message: 'Fertilizer application overdue by 3 days in sector A1',
        severity: 'low',
        timestamp: '2024-01-15T09:00:00Z',
        acknowledged: false
      }
    ];
    
    setAlerts(mockAlerts);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const requestDroneVisit = () => {
    setDroneStatus({
      ...droneStatus,
      status: 'scheduled',
      nextScheduled: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };
  
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
      {user ? (
        /* User Control Panel Dashboard */
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Control Panel</h1>
              <p className="text-muted-foreground">Real-time operations dashboard for all your farms</p>
            </div>
            {selectedFarm && (
              <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2">
                <Video className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{selectedFarm.name}</span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading farm data...</p>
            </div>
          ) : userFarms.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Farms Found</h3>
              <p className="text-muted-foreground mb-6">Add your first farm to start monitoring</p>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Add Farm
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Live Feed & Drone Status */}
              <div className="lg:col-span-2 space-y-6">
                {/* Live Feed */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Live Feed
                      {userFarms.length > 1 && (
                        <select 
                          value={selectedFarm?.id || ''} 
                          onChange={(e) => setSelectedFarm(userFarms.find(f => f.id === e.target.value) || null)}
                          className="ml-auto text-sm border rounded px-2 py-1"
                        >
                          {userFarms.map(farm => (
                            <option key={farm.id} value={farm.id}>{farm.name}</option>
                          ))}
                        </select>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20"></div>
                      <div className="relative z-10 text-center">
                        <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Live CCTV Feed - {selectedFarm?.name || 'Farm'}</p>
                        <p className="text-sm text-muted-foreground mt-2">Camera 1 (Main Field View)</p>
                      </div>
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        ● LIVE
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Drone Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="w-5 h-5" />
                      Drone Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={droneStatus.status === 'idle' ? 'secondary' : 
                                   droneStatus.status === 'in_use' ? 'destructive' : 'default'}
                        >
                          {droneStatus.status === 'idle' ? 'Available' :
                           droneStatus.status === 'in_use' ? 'In Use' : 'Scheduled'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Last flyover: {droneStatus.lastFlyover}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={requestDroneVisit}
                        disabled={droneStatus.status !== 'idle'}
                      >
                        Request Visit
                      </Button>
                    </div>
                    {droneStatus.status === 'scheduled' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          Next scheduled visit: {droneStatus.nextScheduled}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Weather & Alerts */}
              <div className="space-y-6">
                {/* Climate Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5" />
                      Climate (Last 7 Days)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weatherData.map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              day.severity === 'good' ? 'bg-green-500' :
                              day.severity === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm font-medium">{new Date(day.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <div>{day.temperature}°C | {day.humidity}% | {day.rainfall}mm</div>
                            <div>Soil: {day.soilMoisture}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Recent Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {alerts.map((alert) => (
                        <div key={alert.id} className={`p-3 rounded-lg border ${
                          alert.acknowledged ? 'bg-muted/50 border-muted' : 
                          alert.severity === 'high' ? 'bg-red-50 border-red-200' :
                          alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-blue-50 border-blue-200'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge 
                                  variant={alert.severity === 'high' ? 'destructive' :
                                          alert.severity === 'medium' ? 'secondary' : 'outline'}
                                  className="text-xs"
                                >
                                  {alert.type.replace('_', ' ')}
                                </Badge>
                                {alert.acknowledged && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </div>
                              <p className="text-sm text-foreground">{alert.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(alert.timestamp).toLocaleString()}
                              </p>
                            </div>
                            {!alert.acknowledged && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => acknowledgeAlert(alert.id)}
                              >
                                Acknowledge
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Demo Content for non-logged in users */
        <>
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
                Demo: See Farms<br />
                <span className="text-accent-foreground">from Anywhere</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                Experience how Bhoomi's monitoring system would let you watch your farm remotely with live feeds and sensor data.
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
        </>
      )}

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