import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Camera, 
  Gauge, 
  Droplets, 
  Cpu, 
  Clock, 
  MapPin,
  CheckCircle,
  Sprout,
  Eye,
  Zap
} from "lucide-react";

interface DroneType {
  id: string;
  name: string;
  category: string;
  icon: any;
  features: string[];
  specifications: {
    range: string;
    battery: string;
    payload?: string;
    camera?: string;
  };
  examples: string[];
  useCase: string;
  benefits: string[];
  color: string;
  emoji: string;
}

export default function DroneInformation() {
  const droneTypes: DroneType[] = [
    {
      id: 'surveillance',
      name: 'Surveillance Drones',
      category: 'Basic Monitoring',
      icon: Eye,
      emoji: '📹',
      color: 'text-blue-500',
      features: [
        '1080p/4K live video',
        'Real-time feed to Bhoomi app',
        'Auto return to home',
      ],
      specifications: {
        range: '1–3 km',
        battery: '20–30 mins',
        camera: '1080p/4K'
      },
      examples: ['DJI Mini 2', 'Garuda Kisan Drone (lite)'],
      useCase: 'See your farm daily without visiting it. Track animal intrusions, unauthorized access, or plant growth.',
      benefits: ['Daily farm visibility', 'Security monitoring', 'Remote surveillance']
    },
    {
      id: 'multispectral',
      name: 'Multispectral Drones',
      category: 'AI Crop Health Detection',
      icon: Gauge,
      emoji: '🌾',
      color: 'text-green-500',
      features: [
        'Multispectral + thermal camera',
        'Generates NDVI, NDRE, chlorophyll maps',
        'Used for AI-based recommendations in Bhoomi',
      ],
      specifications: {
        range: '2–7 km',
        battery: '25–35 mins',
        camera: 'Multispectral + Thermal'
      },
      examples: ['DJI Phantom 4 Multispectral', 'Pixhawk Custom Builds'],
      useCase: 'Monitor health before it becomes a visible issue. Detect diseases, stress, and irrigation needs.',
      benefits: ['Early disease detection', 'Crop stress monitoring', 'AI-powered insights']
    },
    {
      id: 'spraying',
      name: 'Spraying Drones',
      category: 'Fertilizers & Pesticides',
      icon: Droplets,
      emoji: '🧪',
      color: 'text-purple-500',
      features: [
        'Precision nozzle system',
        'Auto path programming',
        'Obstacle sensors',
      ],
      specifications: {
        range: '1–5 km',
        battery: '15–20 mins per tank',
        payload: '10–30L chemical tank'
      },
      examples: ['Kisan Drone by Garuda', 'Krishak Agri Drone', 'DJI Agras T10/T20'],
      useCase: 'Reduces chemical use by 30–40%, labor-free spraying in minutes, perfect for large acreage.',
      benefits: ['30-40% chemical reduction', 'Labor-free operation', 'Precision application']
    },
    {
      id: 'watering',
      name: 'Watering Drones',
      category: 'Drip/Orchard Alternative',
      icon: Droplets,
      emoji: '💧',
      color: 'text-cyan-500',
      features: [
        'Flow-controlled spraying',
        'Programmable per crop/row',
        'Ideal for orchards',
      ],
      specifications: {
        range: '1–3 km',
        battery: '18–25 mins',
        payload: '10–15L water tank'
      },
      examples: ['BharatRohan water drones', 'Skydrone AquaX'],
      useCase: 'Ideal when daily watering is a challenge, especially for orchards. Perfect for Mango, Sapota, Banana, Chilli plantations.',
      benefits: ['Orchard irrigation', 'Daily watering automation', 'Crop-specific control']
    },
    {
      id: 'hybrid',
      name: 'Hybrid Drones',
      category: 'All-in-One',
      icon: Cpu,
      emoji: '🔄',
      color: 'text-orange-500',
      features: [
        'Dual camera (HD + Multispectral)',
        'Smart AI flight planning',
        'Multi-purpose functionality',
      ],
      specifications: {
        range: '2–8 km',
        battery: '20–30 mins',
        payload: '10L–20L tank',
        camera: 'HD + Multispectral'
      },
      examples: ['Custom drones via startups', 'Agribotix', 'IoTechWorld', 'Marut'],
      useCase: 'Best suited for automation-centric farmers using Bhoomi AI Planner. Perfect for farms adopting full automation and remote control.',
      benefits: ['Full automation', 'Multi-functionality', 'AI integration']
    }
  ];

  return (
    <Card className="shadow-earth">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-6 h-6 text-primary" />
          Drone Information & Use Cases
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {droneTypes.map((drone) => (
            <Card key={drone.id} className="border-l-4 border-l-primary/50 hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center`}>
                      <drone.icon className={`w-6 h-6 ${drone.color}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{drone.emoji}</span>
                        <h3 className="text-xl font-bold text-foreground">{drone.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {drone.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{drone.useCase}</p>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Features:</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {drone.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Range</div>
                          <div className="text-sm text-muted-foreground">{drone.specifications.range}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Battery</div>
                          <div className="text-sm text-muted-foreground">{drone.specifications.battery}</div>
                        </div>
                      </div>
                      {drone.specifications.payload && (
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-primary" />
                          <div>
                            <div className="text-sm font-medium">Payload</div>
                            <div className="text-sm text-muted-foreground">{drone.specifications.payload}</div>
                          </div>
                        </div>
                      )}
                      {drone.specifications.camera && (
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-primary" />
                          <div>
                            <div className="text-sm font-medium">Camera</div>
                            <div className="text-sm text-muted-foreground">{drone.specifications.camera}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Examples */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Examples:</h4>
                      <div className="flex flex-wrap gap-2">
                        {drone.examples.map((example, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Why use?
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {drone.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Call to Action */}
          <div className="text-center p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ready to Deploy Drones for Your Farm?
            </h3>
            <p className="text-muted-foreground mb-4">
              Contact us to discuss which drone solution best fits your farming needs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="default">
                <Plane className="w-4 h-4 mr-2" />
                Get Drone Consultation
              </Button>
              <Button variant="outline">
                Calculate ROI
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}