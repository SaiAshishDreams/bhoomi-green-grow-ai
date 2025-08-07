import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bug, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Zap,
  Target,
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Lightbulb
} from "lucide-react";

export default function PestMonitor() {
  const pestAlerts = [
    { 
      id: 1, 
      pest: "Bollworm", 
      severity: "high", 
      location: "Field A - Zone 3", 
      detected: "2 hours ago",
      confidence: 95,
      action: "Immediate spraying required"
    },
    { 
      id: 2, 
      pest: "Aphids", 
      severity: "medium", 
      location: "Field B - Zone 1", 
      detected: "6 hours ago",
      confidence: 87,
      action: "Monitor closely"
    },
    { 
      id: 3, 
      pest: "Thrips", 
      severity: "low", 
      location: "Field A - Zone 1", 
      detected: "1 day ago",
      confidence: 78,
      action: "Preventive measures"
    }
  ];

  const sensorStats = [
    { id: 1, name: "Trap-01", status: "active", battery: 85, lastSync: "5 min ago", pests: 12 },
    { id: 2, name: "Trap-02", status: "active", battery: 92, lastSync: "3 min ago", pests: 8 },
    { id: 3, name: "Trap-03", status: "warning", battery: 23, lastSync: "1 hour ago", pests: 25 },
    { id: 4, name: "Trap-04", status: "active", battery: 67, lastSync: "2 min ago", pests: 5 }
  ];

  const actionPlans = [
    {
      pest: "Bollworm",
      priority: "urgent",
      steps: [
        "Apply Bt-based biopesticide in affected zones",
        "Increase trap density in high-risk areas",
        "Monitor egg laying patterns for 48 hours"
      ],
      timeline: "Immediate - 48 hours"
    },
    {
      pest: "Aphids", 
      priority: "medium",
      steps: [
        "Release ladybird beetles in affected areas",
        "Apply neem oil spray during evening hours",
        "Check for ant colonies (aphid farmers)"
      ],
      timeline: "24-72 hours"
    }
  ];

  const weeklyStats = {
    totalDetections: 156,
    activeThreats: 3,
    resolved: 12,
    prevention: 8
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">IoT Pest Detection Monitor</h1>
          <p className="text-muted-foreground mt-2">Real-time pest monitoring and AI-powered action recommendations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <MapPin className="w-4 h-4" />
            View Heat Map
          </Button>
          <Button className="gap-2">
            <Zap className="w-4 h-4" />
            Deploy Emergency Plan
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-earth">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Bug className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{weeklyStats.totalDetections}</p>
                <p className="text-sm text-muted-foreground">Total Detections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-earth">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{weeklyStats.activeThreats}</p>
                <p className="text-sm text-muted-foreground">Active Threats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-earth">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{weeklyStats.resolved}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-earth">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{weeklyStats.prevention}</p>
                <p className="text-sm text-muted-foreground">Prevented</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Alerts */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Live Pest Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pestAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'border-l-red-500 bg-red-50' :
                alert.severity === 'medium' ? 'border-l-orange-500 bg-orange-50' :
                'border-l-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{alert.pest}</h4>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                  <Badge variant={
                    alert.severity === 'high' ? 'destructive' :
                    alert.severity === 'medium' ? 'default' : 'secondary'
                  }>
                    {alert.severity}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium text-foreground">{alert.confidence}%</span>
                  </div>
                  <Progress value={alert.confidence} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{alert.detected}</span>
                    <Button size="sm" variant={alert.severity === 'high' ? 'destructive' : 'outline'}>
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sensor Status */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Sensor Network Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sensorStats.map((sensor) => (
              <div key={sensor.id} className="p-4 rounded-lg border bg-background">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      sensor.status === 'active' ? 'bg-green-500' :
                      sensor.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                    }`}></div>
                    <h4 className="font-semibold text-foreground">{sensor.name}</h4>
                  </div>
                  <Badge variant={sensor.status === 'active' ? 'default' : 'secondary'}>
                    {sensor.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Battery</p>
                    <div className="flex items-center gap-2">
                      <Progress value={sensor.battery} className="h-2 flex-1" />
                      <span className="font-medium text-foreground">{sensor.battery}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Sync</p>
                    <p className="font-medium text-foreground">{sensor.lastSync}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Detections</p>
                    <p className="font-medium text-foreground">{sensor.pests}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Action Plans */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            AI-Powered Action Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actionPlans.map((plan, index) => (
              <div key={index} className="p-4 rounded-lg border bg-background">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">{plan.pest} Control Plan</h4>
                  <Badge variant={plan.priority === 'urgent' ? 'destructive' : 'default'}>
                    {plan.priority}
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-4">
                  {plan.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">{stepIndex + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{plan.timeline}</span>
                  </div>
                  <Button size="sm">
                    Execute Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Conditions */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Environmental Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <Thermometer className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-lg font-semibold text-foreground">28°C</p>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="text-xs text-green-600">Optimal for pests</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <Droplets className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-lg font-semibold text-foreground">75%</p>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="text-xs text-orange-600">High risk</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <Wind className="w-8 h-8 text-gray-500" />
              <div>
                <p className="text-lg font-semibold text-foreground">12 km/h</p>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="text-xs text-green-600">Good for spraying</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
              <MapPin className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-lg font-semibold text-foreground">Zone 3</p>
                <p className="text-sm text-muted-foreground">Hotspot</p>
                <p className="text-xs text-red-600">Critical area</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}