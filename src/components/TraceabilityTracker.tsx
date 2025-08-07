import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  QrCode, 
  Leaf, 
  Calculator, 
  Timeline, 
  Upload, 
  Award,
  Truck,
  Sprout,
  Droplets,
  Shield,
  TrendingUp,
  FileText
} from "lucide-react";

export default function TraceabilityTracker() {
  const cropLifecycle = [
    { 
      stage: "Seed Purchase", 
      date: "2024-01-15", 
      status: "completed", 
      details: "Organic cotton seeds from certified supplier",
      documents: 2,
      carbonScore: 5
    },
    { 
      stage: "Land Preparation", 
      date: "2024-01-20", 
      status: "completed", 
      details: "No-till farming method used",
      documents: 1,
      carbonScore: 15
    },
    { 
      stage: "Sowing", 
      date: "2024-01-25", 
      status: "completed", 
      details: "Organic seeds planted with 30cm spacing",
      documents: 3,
      carbonScore: 8
    },
    { 
      stage: "Fertilization", 
      date: "2024-02-10", 
      status: "completed", 
      details: "Organic compost and bio-fertilizers applied",
      documents: 2,
      carbonScore: 25
    },
    { 
      stage: "Pest Management", 
      date: "2024-02-25", 
      status: "in-progress", 
      details: "Neem-based organic pesticide application",
      documents: 1,
      carbonScore: 10
    },
    { 
      stage: "Harvest", 
      date: "2024-04-15", 
      status: "pending", 
      details: "Expected harvest date",
      documents: 0,
      carbonScore: 0
    }
  ];

  const carbonCredits = {
    totalEarned: 125,
    currentCycle: 45,
    verified: 80,
    pending: 45,
    carbonPrice: 0.85 // USD per credit
  };

  const certifications = [
    { name: "Organic Certified", status: "active", expiry: "2024-12-31" },
    { name: "Fair Trade", status: "pending", expiry: "2025-06-30" },
    { name: "Carbon Neutral", status: "verified", expiry: "2024-10-15" }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blockchain Traceability & Carbon Tracker</h1>
          <p className="text-muted-foreground mt-2">Track your crop lifecycle and earn carbon credits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <QrCode className="w-4 h-4" />
            Generate QR Code
          </Button>
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop Lifecycle Timeline */}
        <Card className="lg:col-span-2 shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timeline className="w-5 h-5 text-primary" />
              Crop Lifecycle Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cropLifecycle.map((stage, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-background">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                    stage.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {stage.status === 'completed' ? <Shield className="w-5 h-5" /> :
                     stage.status === 'in-progress' ? <Sprout className="w-5 h-5" /> :
                     <Droplets className="w-5 h-5" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{stage.stage}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          stage.status === 'completed' ? 'default' :
                          stage.status === 'in-progress' ? 'secondary' : 'outline'
                        }>
                          {stage.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{stage.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{stage.details}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{stage.documents} docs</span>
                        </div>
                        {stage.carbonScore > 0 && (
                          <div className="flex items-center gap-1">
                            <Leaf className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">+{stage.carbonScore} credits</span>
                          </div>
                        )}
                      </div>
                      {stage.status === 'completed' && (
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carbon Credits & Certifications */}
        <div className="space-y-6">
          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" />
                Carbon Credits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{carbonCredits.totalEarned}</div>
                <p className="text-sm text-muted-foreground">Total Credits Earned</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Cycle</span>
                  <span className="font-semibold text-foreground">{carbonCredits.currentCycle}</span>
                </div>
                <Progress value={(carbonCredits.currentCycle / 100) * 100} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{carbonCredits.verified}</div>
                    <p className="text-xs text-muted-foreground">Verified</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">{carbonCredits.pending}</div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">Market Value</span>
                </div>
                <p className="text-lg font-bold text-green-700">
                  ${(carbonCredits.verified * carbonCredits.carbonPrice).toFixed(2)}
                </p>
                <p className="text-xs text-green-600">
                  ${carbonCredits.carbonPrice}/credit
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-background">
                  <div>
                    <p className="font-medium text-foreground text-sm">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">Expires: {cert.expiry}</p>
                  </div>
                  <Badge variant={
                    cert.status === 'active' ? 'default' :
                    cert.status === 'verified' ? 'default' : 'secondary'
                  } className="text-xs">
                    {cert.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* QR Code & Verification */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            Product Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">QR Code</p>
                <p className="text-sm text-muted-foreground">Scan for full traceability</p>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-background border">
                  <div className="flex items-center gap-2 mb-2">
                    <Sprout className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-foreground">Crop Type</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Organic Cotton</p>
                </div>
                
                <div className="p-3 rounded-lg bg-background border">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-foreground">Origin</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Karnataka, India</p>
                </div>
                
                <div className="p-3 rounded-lg bg-background border">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-foreground">Certified</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Organic & Fair Trade</p>
                </div>
                
                <div className="p-3 rounded-lg bg-background border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-foreground">Carbon Footprint</span>
                  </div>
                  <p className="text-sm text-muted-foreground">-125 kg CO2eq</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button className="flex-1">
                  <QrCode className="w-4 h-4 mr-2" />
                  Share Verification
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}