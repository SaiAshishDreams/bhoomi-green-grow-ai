import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, Bell, Mail, MessageSquare, CloudRain, Droplets, Leaf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NotificationPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  weather_alerts: boolean;
  irrigation_alerts: boolean;
  crop_health_alerts: boolean;
  created_at: string;
  updated_at: string;
}

const NotificationSettings = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setPreferences(data);
      } else {
        // Create default preferences if they don't exist
        const defaultPrefs = {
          user_id: user?.id,
          email_notifications: true,
          sms_notifications: false,
          weather_alerts: true,
          irrigation_alerts: true,
          crop_health_alerts: true,
        };
        
        const { data: newPrefs, error: insertError } = await supabase
          .from('notification_preferences')
          .insert(defaultPrefs)
          .select()
          .single();

        if (insertError) throw insertError;
        setPreferences(newPrefs);
      }
    } catch (error: any) {
      toast({
        title: "Error loading preferences",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (field: keyof NotificationPreferences, value: boolean) => {
    if (!preferences || !user) return;

    try {
      const updatedPrefs = { ...preferences, [field]: value };
      
      const { error } = await supabase
        .from('notification_preferences')
        .update({ [field]: value })
        .eq('user_id', user.id);

      if (error) throw error;

      setPreferences(updatedPrefs);
      
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating preferences",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-earth">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No preferences found</h3>
            <p className="text-muted-foreground">Unable to load your notification preferences</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const notificationSettings = [
    {
      id: 'email_notifications',
      title: 'Email Notifications',
      description: 'Receive updates and alerts via email',
      icon: Mail,
      value: preferences.email_notifications,
    },
    {
      id: 'sms_notifications',
      title: 'SMS Notifications',
      description: 'Get important alerts via text message',
      icon: MessageSquare,
      value: preferences.sms_notifications,
    },
  ];

  const alertSettings = [
    {
      id: 'weather_alerts',
      title: 'Weather Alerts',
      description: 'Get notified about severe weather conditions',
      icon: CloudRain,
      value: preferences.weather_alerts,
    },
    {
      id: 'irrigation_alerts',
      title: 'Irrigation Alerts',
      description: 'Receive notifications about irrigation schedules and issues',
      icon: Droplets,
      value: preferences.irrigation_alerts,
    },
    {
      id: 'crop_health_alerts',
      title: 'Crop Health Alerts',
      description: 'Get alerts about pest detection and crop health issues',
      icon: Leaf,
      value: preferences.crop_health_alerts,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Notification Settings</h1>
        <p className="text-muted-foreground">Manage how you receive important updates and alerts</p>
      </div>

      <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            General Notifications
          </CardTitle>
          <CardDescription>
            Choose how you want to receive general notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationSettings.map((setting, index) => (
            <div key={setting.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <setting.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={setting.id} className="text-sm font-medium cursor-pointer">
                      {setting.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={setting.id}
                  checked={setting.value}
                  onCheckedChange={(checked) => 
                    updatePreference(setting.id as keyof NotificationPreferences, checked)
                  }
                />
              </div>
              {index < notificationSettings.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            Smart Alerts
          </CardTitle>
          <CardDescription>
            Configure alerts for farm monitoring and automation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {alertSettings.map((setting, index) => (
            <div key={setting.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <setting.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={setting.id} className="text-sm font-medium cursor-pointer">
                      {setting.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={setting.id}
                  checked={setting.value}
                  onCheckedChange={(checked) => 
                    updatePreference(setting.id as keyof NotificationPreferences, checked)
                  }
                />
              </div>
              {index < alertSettings.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;