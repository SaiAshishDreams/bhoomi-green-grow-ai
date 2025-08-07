import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Satellite,
  Eye,
  Zap,
  Umbrella,
  Sprout,
  Clock
} from "lucide-react";

export default function WeatherIntelligence() {
  const currentWeather = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
    conditions: "Partly Cloudy",
    uvIndex: 7
  };

  const weeklyForecast = [
    { day: "Today", high: 32, low: 22, rain: 20, condition: "Sunny", icon: Sun },
    { day: "Tomorrow", high: 30, low: 24, rain: 60, condition: "Rain", icon: CloudRain },
    { day: "Wed", high: 28, low: 20, rain: 80, condition: "Heavy Rain", icon: CloudRain },
    { day: "Thu", high: 29, low: 21, rain: 40, condition: "Cloudy", icon: CloudRain },
    { day: "Fri", high: 31, low: 23, rain: 10, condition: "Sunny", icon: Sun },
    { day: "Sat", high: 33, low: 25, rain: 5, condition: "Clear", icon: Sun },
    { day: "Sun", high: 30, low: 22, rain: 30, condition: "Partly Cloudy", icon: Sun }
  ];

  const alerts = [
    {
      type: "heavy-rain",
      severity: "high",
      title: "Heavy Rainfall Alert",
      message: "50-70mm rainfall expected in next 48 hours. Postpone spraying activities.",
      action: "Prepare drainage systems",
      time: "Next 48 hours"
    },
    {
      type: "drought",
      severity: "medium",
      title: "Moisture Stress Warning",
      message: "Soil moisture dropping below optimal levels in Zone A.",
      action: "Increase irrigation frequency",
      time: "Next 5 days"
    }
  ];

  const recommendations = [
    {
      category: "Sowing",
      crop: "Cotton",
      window: "March 15-25",
      confidence: 92,
      reason: "Optimal soil temperature and expected rainfall pattern"
    },
    {
      category: "Harvest",
      crop: "Wheat",
      window: "April 5-12",
      confidence: 88,
      reason: "Dry weather conditions expected, minimal harvest losses"
    },
    {
      category: "Spraying",
      crop: "Tomato",
      window: "Today 6-8 PM",
      confidence: 95,
      reason: "Low wind speed and no rain expected for 24 hours"
    }
  ];

  const satelliteData = {
    soilMoisture: 68,
    vegetationIndex: 0.75,
    cloudCover: 30,
    lastUpdated: "2 hours ago"
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Weather Intelligence</h1>
          <p className="text-muted-foreground mt-2">Satellite-powered weather insights and crop-specific advisories</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Satellite className="w-4 h-4" />
            Satellite View
          </Button>
          <Button className="gap-2">
            <AlertTriangle className="w-4 h-4" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* Current Weather */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-orange-500" />
            Current Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <Thermometer className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{currentWeather.temperature}°C</p>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <Droplets className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{currentWeather.humidity}%</p>
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <Wind className="w-8 h-8 text-gray-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{currentWeather.windSpeed}</p>
                <p className="text-sm text-muted-foreground">km/h Wind</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <CloudRain className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-foreground">{currentWeather.rainfall}</p>
                <p className="text-sm text-muted-foreground">mm Rain</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <Sun className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{currentWeather.uvIndex}</p>
                <p className="text-sm text-muted-foreground">UV Index</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <Eye className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-lg font-bold text-foreground">{currentWeather.conditions}</p>
                <p className="text-sm text-muted-foreground">Conditions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Forecast */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              7-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyForecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-background">
                  <div className="flex items-center gap-3">
                    <day.icon className={`w-6 h-6 ${
                      day.condition.includes('Rain') ? 'text-blue-500' : 'text-orange-500'
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">{day.day}</p>
                      <p className="text-xs text-muted-foreground">{day.condition}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{day.high}°/{day.low}°</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Umbrella className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">{day.rain}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Warnings */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'border-l-red-500 bg-red-50' :
                'border-l-orange-500 bg-orange-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{alert.title}</h4>
                  <Badge variant={alert.severity === 'high' ? 'destructive' : 'default'}>
                    {alert.severity}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{alert.time}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    {alert.action}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border bg-background">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      rec.category === 'Sowing' ? 'bg-green-100' :
                      rec.category === 'Harvest' ? 'bg-orange-100' : 'bg-blue-100'
                    }`}>
                      {rec.category === 'Sowing' ? <Sprout className="w-5 h-5 text-green-600" /> :
                       rec.category === 'Harvest' ? <Sun className="w-5 h-5 text-orange-600" /> :
                       <Zap className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{rec.category}</h4>
                      <p className="text-sm text-muted-foreground">{rec.crop}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{rec.confidence}%</Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended Window:</p>
                    <p className="font-semibold text-foreground">{rec.window}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence Level:</p>
                    <Progress value={rec.confidence} className="h-2 mt-1" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Satellite Data */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="w-5 h-5 text-primary" />
            Satellite Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg border bg-background">
              <div className="flex items-center gap-3 mb-3">
                <Droplets className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-lg font-bold text-foreground">{satelliteData.soilMoisture}%</p>
                  <p className="text-sm text-muted-foreground">Soil Moisture</p>
                </div>
              </div>
              <Progress value={satelliteData.soilMoisture} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Optimal range: 60-80%</p>
            </div>

            <div className="p-4 rounded-lg border bg-background">
              <div className="flex items-center gap-3 mb-3">
                <Sprout className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-lg font-bold text-foreground">{satelliteData.vegetationIndex}</p>
                  <p className="text-sm text-muted-foreground">Vegetation Index</p>
                </div>
              </div>
              <Progress value={satelliteData.vegetationIndex * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Healthy range: 0.6-0.9</p>
            </div>

            <div className="p-4 rounded-lg border bg-background">
              <div className="flex items-center gap-3 mb-3">
                <CloudRain className="w-8 h-8 text-gray-500" />
                <div>
                  <p className="text-lg font-bold text-foreground">{satelliteData.cloudCover}%</p>
                  <p className="text-sm text-muted-foreground">Cloud Cover</p>
                </div>
              </div>
              <Progress value={satelliteData.cloudCover} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Clear skies: <30%</p>
            </div>

            <div className="p-4 rounded-lg border bg-background">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-lg font-bold text-foreground">Live</p>
                  <p className="text-sm text-muted-foreground">Data Status</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Last updated: {satelliteData.lastUpdated}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}