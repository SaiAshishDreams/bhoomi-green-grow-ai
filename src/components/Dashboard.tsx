import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Thermometer, 
  Droplets, 
  Sun, 
  Wind, 
  Sprout, 
  Camera, 
  Zap,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  Info
} from "lucide-react";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();
  
  const weatherData = {
    temperature: "28°C",
    humidity: "65%",
    rainfall: "12mm",
    windSpeed: "8 km/h"
  };

  const farmStats = user ? [
    { label: "Soil Moisture", value: "72%", status: "good", icon: Droplets },
    { label: "Crop Health", value: "85%", status: "excellent", icon: Sprout },
    { label: "Temperature", value: "28°C", status: "optimal", icon: Thermometer },
    { label: "Growth Stage", value: "Flowering", status: "normal", icon: TrendingUp }
  ] : [
    { label: "Demo Soil Moisture", value: "68%", status: "good", icon: Droplets },
    { label: "Demo Crop Health", value: "82%", status: "excellent", icon: Sprout },
    { label: "Demo Temperature", value: "26°C", status: "optimal", icon: Thermometer },
    { label: "Demo Growth Stage", value: "Seedling", status: "normal", icon: TrendingUp }
  ];

  const alerts = user ? [
    { type: "warning", message: "Pest detected in Field A - Tomatoes", time: "2 hours ago" },
    { type: "info", message: "Irrigation scheduled for tomorrow morning", time: "4 hours ago" },
    { type: "success", message: "Harvest ready in Field C - Wheat", time: "1 day ago" }
  ] : [
    { type: "info", message: "Demo: Smart irrigation system active", time: "Demo data" },
    { type: "success", message: "Demo: Optimal growing conditions detected", time: "Demo data" },
    { type: "warning", message: "Demo: Weather alert - rain expected", time: "Demo data" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-500";
      case "good": return "bg-blue-500";
      case "optimal": return "bg-primary";
      case "warning": return "bg-yellow-500";
      default: return "bg-muted";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning": return "border-yellow-500 bg-yellow-50";
      case "success": return "border-green-500 bg-green-50";
      case "info": return "border-blue-500 bg-blue-50";
      default: return "border-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {user ? 'Farm Dashboard' : 'Demo Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {user ? 'Overview of your agricultural operations' : 'Experience Bhoomi\'s smart farming capabilities'}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="forest" onClick={() => onNavigate('control')}>
              <Zap className="mr-2" />
              Control Panel
            </Button>
            <Button variant="outline" onClick={() => onNavigate('farmer-connect')}>
              <MessageCircle className="mr-2" />
              {user ? 'Contact Farmer' : 'Demo Connect'}
            </Button>
          </div>
        </div>

        {/* Demo Notice */}
        {!user && (
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              You're viewing demo data. <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => window.location.href = '/auth'}>
                Login to see your real farm data
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Weather Card */}
        <Card className="shadow-earth animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="text-accent" />
              Today's Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Thermometer className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <p className="text-2xl font-bold text-foreground">{weatherData.temperature}</p>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
              <div className="text-center">
                <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold text-foreground">{weatherData.humidity}</p>
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
              <div className="text-center">
                <Droplets className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{weatherData.rainfall}</p>
                <p className="text-sm text-muted-foreground">Rainfall</p>
              </div>
              <div className="text-center">
                <Wind className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">{weatherData.windSpeed}</p>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Farm Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmStats.map((stat, index) => (
            <Card key={index} className="shadow-earth hover:shadow-forest transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                  <Badge className={getStatusColor(stat.status)} variant="secondary">
                    {stat.status}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live Feed */}
          <Card className="lg:col-span-2 shadow-earth animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="text-primary" />
                Live Farm Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-earth rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold text-foreground mb-2">
                    {user ? 'Camera Feed' : 'Demo Camera Feed'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user ? 'Field A - Tomato Plantation' : 'Demo Field - Sample Crops'}
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => onNavigate('control')}>
                    View All Cameras
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-earth animate-fade-in">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="earth" 
                  className="w-full justify-start" 
                  onClick={() => onNavigate('ai-planner')}
                >
                  <Sprout className="mr-2" />
                  AI Crop Planner
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('timeline')}
                >
                  <TrendingUp className="mr-2" />
                  View Timeline
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('reports')}
                >
                  <TrendingUp className="mr-2" />
                  Farm Reports
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="shadow-earth animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-accent" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}
                  >
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}