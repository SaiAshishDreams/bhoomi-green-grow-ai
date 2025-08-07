import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Droplets, 
  Power, 
  Clock, 
  Bell, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Gauge,
  Calendar,
  History
} from "lucide-react";

interface WaterControlData {
  motorStatus: 'on' | 'off' | 'checking';
  soilMoisture: number;
  waterFlow: 'ok' | 'low' | 'high';
  lastIrrigation: string;
  scheduledIrrigation: boolean;
  alertsEnabled: boolean;
}

interface IrrigationHistory {
  id: string;
  date: string;
  time: string;
  action: 'turned_on' | 'turned_off' | 'scheduled';
  duration?: string;
  status: 'success' | 'failed';
}

export default function SmartWaterControl() {
  const [waterData, setWaterData] = useState<WaterControlData>({
    motorStatus: 'off',
    soilMoisture: 34,
    waterFlow: 'ok',
    lastIrrigation: '2 days ago',
    scheduledIrrigation: false,
    alertsEnabled: true
  });

  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleInterval, setScheduleInterval] = useState('2');
  const [scheduleTime, setScheduleTime] = useState('06:00');

  const irrigationHistory: IrrigationHistory[] = [
    { id: '1', date: '2024-01-16', time: '06:00', action: 'turned_on', duration: '45 min', status: 'success' },
    { id: '2', date: '2024-01-15', time: '18:30', action: 'turned_off', status: 'success' },
    { id: '3', date: '2024-01-15', time: '06:00', action: 'turned_on', duration: '50 min', status: 'success' },
    { id: '4', date: '2024-01-14', time: '06:00', action: 'scheduled', status: 'failed' },
    { id: '5', date: '2024-01-13', time: '18:00', action: 'turned_off', status: 'success' },
  ];

  const handleMotorToggle = (action: 'on' | 'off') => {
    setWaterData(prev => ({ ...prev, motorStatus: 'checking' }));
    
    // Simulate checking status
    setTimeout(() => {
      setWaterData(prev => ({ ...prev, motorStatus: action }));
    }, 2000);
  };

  const handleScheduleSubmit = () => {
    setWaterData(prev => ({ ...prev, scheduledIrrigation: true }));
    setIsScheduling(false);
  };

  const getStatusIcon = () => {
    switch (waterData.motorStatus) {
      case 'on':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'off':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'checking':
        return <RotateCcw className="w-5 h-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (waterData.motorStatus) {
      case 'on':
        return 'Motor is ON';
      case 'off':
        return 'Motor is OFF';
      case 'checking':
        return 'Checking Status...';
    }
  };

  const getFlowColor = () => {
    switch (waterData.waterFlow) {
      case 'ok':
        return 'text-green-500';
      case 'low':
        return 'text-yellow-500';
      case 'high':
        return 'text-blue-500';
    }
  };

  return (
    <Card className="shadow-earth">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-primary" />
          Smart Water Control
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="control" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="control">Control</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="control" className="space-y-6">
            {/* Motor Status */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon()}
                <span className="font-semibold text-foreground">{getStatusText()}</span>
              </div>
              <Badge 
                variant={waterData.motorStatus === 'on' ? 'default' : 
                        waterData.motorStatus === 'off' ? 'secondary' : 'outline'}
              >
                {waterData.motorStatus.toUpperCase()}
              </Badge>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="default" 
                size="lg"
                disabled={waterData.motorStatus === 'checking' || waterData.motorStatus === 'on'}
                onClick={() => handleMotorToggle('on')}
                className="flex items-center gap-2"
              >
                <Power className="w-4 h-4" />
                Turn ON
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                disabled={waterData.motorStatus === 'checking' || waterData.motorStatus === 'off'}
                onClick={() => handleMotorToggle('off')}
                className="flex items-center gap-2"
              >
                <Power className="w-4 h-4" />
                Turn OFF
              </Button>
            </div>

            {/* Schedule Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">Schedule Irrigation</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsScheduling(!isScheduling)}
                >
                  {isScheduling ? 'Cancel' : 'Set Schedule'}
                </Button>
              </div>

              {isScheduling && (
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="interval">Every (days)</Label>
                      <Input
                        id="interval"
                        type="number"
                        value={scheduleInterval}
                        onChange={(e) => setScheduleInterval(e.target.value)}
                        placeholder="2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handleScheduleSubmit} className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Save Schedule
                  </Button>
                </div>
              )}

              {waterData.scheduledIrrigation && !isScheduling && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ⏰ Scheduled: Every {scheduleInterval} days at {scheduleTime}
                  </p>
                </div>
              )}
            </div>

            {/* Alerts Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <span className="font-medium">Irrigation Alerts</span>
              </div>
              <Switch 
                checked={waterData.alertsEnabled}
                onCheckedChange={(checked) => 
                  setWaterData(prev => ({ ...prev, alertsEnabled: checked }))
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-4">
            {/* Sensor Stats */}
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Soil Moisture</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{waterData.soilMoisture}%</div>
                  <Badge variant={waterData.soilMoisture > 50 ? 'default' : 'secondary'}>
                    {waterData.soilMoisture > 50 ? 'Good' : 'Low'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-primary" />
                  <span className="font-medium">Water Flow</span>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getFlowColor()}`}>
                    {waterData.waterFlow.toUpperCase()}
                  </div>
                  <Badge variant="outline">
                    Flow Rate
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <History className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Last Irrigation</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{waterData.lastIrrigation}</div>
                  <Badge variant="secondary">
                    Duration: 45 min
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-3">
              {irrigationHistory.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      record.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-sm">
                        {record.action === 'turned_on' ? '🔘 Turned ON' :
                         record.action === 'turned_off' ? '⭕ Turned OFF' : '⏰ Scheduled'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {record.date} at {record.time}
                        {record.duration && ` • ${record.duration}`}
                      </div>
                    </div>
                  </div>
                  <Badge variant={record.status === 'success' ? 'default' : 'destructive'}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}