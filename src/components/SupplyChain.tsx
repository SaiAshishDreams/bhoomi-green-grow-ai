import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Store, 
  TrendingUp, 
  Truck, 
  Users, 
  DollarSign, 
  Package, 
  MapPin,
  Calendar,
  Star,
  Phone,
  Plus,
  Search,
  Filter
} from "lucide-react";

export default function SupplyChain() {
  const marketRates = [
    { crop: "Cotton", rate: 6800, unit: "per quintal", change: +5.2, market: "Hubli APMC" },
    { crop: "Rice", rate: 2100, unit: "per quintal", change: -2.1, market: "Raichur Mandi" },
    { crop: "Sugarcane", rate: 320, unit: "per ton", change: +1.8, market: "Belgaum Market" },
    { crop: "Tomato", rate: 45, unit: "per kg", change: +12.5, market: "Bangalore Market" }
  ];

  const myListings = [
    { 
      id: 1, 
      crop: "Organic Cotton", 
      quantity: "50 quintals", 
      price: "₹7200/quintal", 
      status: "active",
      views: 23,
      inquiries: 5,
      quality: "A Grade"
    },
    { 
      id: 2, 
      crop: "Basmati Rice", 
      quantity: "100 quintals", 
      price: "₹2500/quintal", 
      status: "sold",
      views: 45,
      inquiries: 12,
      quality: "Premium"
    }
  ];

  const buyerInquiries = [
    {
      id: 1,
      buyer: "Mahalakshmi Traders",
      crop: "Organic Cotton",
      quantity: "30 quintals",
      offerPrice: "₹7000/quintal",
      rating: 4.8,
      location: "Hubli",
      phone: "+91 98765 43210"
    },
    {
      id: 2,
      buyer: "Karnataka Co-op",
      crop: "Organic Cotton", 
      quantity: "50 quintals",
      offerPrice: "₹7200/quintal",
      rating: 4.9,
      location: "Bangalore",
      phone: "+91 98765 43211"
    }
  ];

  const transporters = [
    {
      id: 1,
      name: "Express Logistics",
      rating: 4.7,
      rate: "₹15/km",
      vehicle: "Truck (20 tons)",
      availability: "Available",
      location: "Dharwad"
    },
    {
      id: 2,
      name: "Farm Fresh Transport",
      rating: 4.9,
      rate: "₹18/km",
      vehicle: "Refrigerated (15 tons)",
      availability: "Booked",
      location: "Hubli"
    }
  ];

  const orderTracking = [
    {
      id: "ORD001",
      buyer: "Mahalakshmi Traders",
      crop: "Organic Cotton",
      quantity: "30 quintals",
      status: "dispatched",
      location: "En route to Hubli",
      eta: "2 hours"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supply Chain & Marketplace</h1>
          <p className="text-muted-foreground mt-2">Connect with buyers, check market rates, and manage your produce sales</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Search className="w-4 h-4" />
            Find Buyers
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            List Produce
          </Button>
        </div>
      </div>

      {/* Market Rates */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Live Market Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketRates.map((rate, index) => (
              <div key={index} className="p-4 rounded-lg border bg-background hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{rate.crop}</h4>
                  <Badge variant={rate.change > 0 ? 'default' : 'destructive'} className="text-xs">
                    {rate.change > 0 ? '+' : ''}{rate.change}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">₹{rate.rate.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{rate.unit}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{rate.market}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Listings */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              My Produce Listings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myListings.map((listing) => (
              <div key={listing.id} className="p-4 rounded-lg border bg-background">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{listing.crop}</h4>
                    <p className="text-sm text-muted-foreground">{listing.quantity} • {listing.quality}</p>
                  </div>
                  <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                    {listing.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-bold text-primary">{listing.price}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{listing.views} views</span>
                    <span>{listing.inquiries} inquiries</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Listing
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Buyer Inquiries */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Buyer Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {buyerInquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-4 rounded-lg border bg-background">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{inquiry.buyer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground">{inquiry.buyer}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{inquiry.rating}</span>
                        <span className="text-xs text-muted-foreground">• {inquiry.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Crop:</span>
                    <span className="font-medium text-foreground">{inquiry.crop}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium text-foreground">{inquiry.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Offer:</span>
                    <span className="font-bold text-primary">{inquiry.offerPrice}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" className="flex-1">
                    Accept Offer
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transporters */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Available Transporters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {transporters.map((transporter) => (
              <div key={transporter.id} className="p-4 rounded-lg border bg-background">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{transporter.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{transporter.rating}</span>
                      <span>• {transporter.location}</span>
                    </div>
                  </div>
                  <Badge variant={transporter.availability === 'Available' ? 'default' : 'secondary'}>
                    {transporter.availability}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-medium text-foreground">{transporter.vehicle}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-bold text-primary">{transporter.rate}</span>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full" 
                  disabled={transporter.availability !== 'Available'}
                >
                  Book Transport
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Tracking */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderTracking.map((order) => (
              <div key={order.id} className="p-4 rounded-lg border bg-background">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">Order #{order.id}</h4>
                    <p className="text-sm text-muted-foreground">{order.buyer}</p>
                  </div>
                  <Badge variant="default">
                    {order.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Product:</span>
                    <span className="font-medium text-foreground">{order.crop}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium text-foreground">{order.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{order.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ETA:</span>
                    <span className="font-bold text-green-600">{order.eta}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Track Live Location
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}