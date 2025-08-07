import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Sprout,
  Plus,
  Globe,
  Star,
  Clock
} from "lucide-react";

export default function ClusterFarming() {
  const nearbyFarms = [
    { id: 1, name: "Rajesh Kumar", distance: "2.3 km", crops: ["Rice", "Wheat"], rating: 4.8, avatar: null },
    { id: 2, name: "Priya Sharma", distance: "3.1 km", crops: ["Cotton", "Sugarcane"], rating: 4.6, avatar: null },
    { id: 3, name: "Manoj Patel", distance: "4.7 km", crops: ["Tomato", "Onion"], rating: 4.9, avatar: null },
  ];

  const clusters = [
    { id: 1, name: "North Valley Farmers", members: 12, area: "250 acres", status: "Active" },
    { id: 2, name: "Organic Growers Circle", members: 8, area: "180 acres", status: "Recruiting" },
  ];

  const recommendations = [
    { title: "Optimal Sowing Window", desc: "Next 5-7 days ideal for cotton sowing based on weather forecast", priority: "high" },
    { title: "Shared Drone Service", desc: "Coordinate with cluster for spraying operations this weekend", priority: "medium" },
    { title: "Bulk Fertilizer Purchase", desc: "20% cost saving available for group purchase of NPK fertilizer", priority: "medium" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cluster Farming Intelligence</h1>
          <p className="text-muted-foreground mt-2">Collaborate with nearby farmers for better yields and cost optimization</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Cluster
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cluster Map */}
        <Card className="lg:col-span-2 shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Nearby Farms & Clusters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 mb-4 min-h-[300px] flex items-center justify-center border">
              <div className="text-center">
                <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground">Interactive Cluster Map</p>
                <p className="text-muted-foreground">Geolocation-based farm visualization</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Nearby Farmers</h4>
              {nearbyFarms.map((farm) => (
                <div key={farm.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={farm.avatar} />
                      <AvatarFallback>{farm.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{farm.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {farm.distance}
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {farm.rating}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {farm.crops.map((crop) => (
                      <Badge key={crop} variant="secondary" className="text-xs">{crop}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <div className="space-y-6">
          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-3 rounded-lg border bg-background">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{rec.title}</h4>
                    <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                My Clusters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {clusters.map((cluster) => (
                <div key={cluster.id} className="p-3 rounded-lg border bg-background">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{cluster.name}</h4>
                    <Badge variant={cluster.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                      {cluster.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>{cluster.members} members • {cluster.area}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cluster Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Cluster Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Rajesh Kumar</p>
                  <p className="text-sm text-muted-foreground">Planning drone spray for Monday. Anyone wants to join?</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">Weather looks good. Count me in!</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Join Conversation
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Shared Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Drone Spraying</p>
                  <p className="text-xs text-muted-foreground">Monday, 6:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Fertilizer Delivery</p>
                  <p className="text-xs text-muted-foreground">Wednesday, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Harvest Planning</p>
                  <p className="text-xs text-muted-foreground">Next Week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}