import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, Phone, Users, Send, Paperclip, Mic, 
         User, Clock, CheckCircle, AlertCircle, Info, MapPin } from "lucide-react";

interface Farm {
  id: string;
  name: string;
  location: string;
}

interface Message {
  id: string;
  sender: 'user' | 'farmer' | 'support';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'voice';
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  created_at: string;
}

export default function FarmerConnect() {
  const { user } = useAuth();
  const [userFarms, setUserFarms] = useState<Farm[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState<'farmer' | 'support'>('farmer');
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
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'farmer',
        content: 'Good morning! I completed the irrigation for sector A today. The plants are looking healthy.',
        timestamp: '2024-01-16T09:30:00Z',
        type: 'text'
      },
      {
        id: '2',
        sender: 'user',
        content: 'Thanks Ravi! How about the fertilizer application for sector B?',
        timestamp: '2024-01-16T10:15:00Z',
        type: 'text'
      },
      {
        id: '3',
        sender: 'farmer',
        content: 'Will start that tomorrow morning. Weather looks good for the next 3 days.',
        timestamp: '2024-01-16T10:45:00Z',
        type: 'text'
      }
    ];

    const mockTickets: Ticket[] = [
      {
        id: '1',
        title: 'Drone inspection request',
        description: 'Need drone flyover for pest detection in sector C',
        priority: 'medium',
        status: 'in_progress',
        created_at: '2024-01-15T14:30:00Z'
      },
      {
        id: '2',
        title: 'Irrigation system issue',
        description: 'Sprinkler in sector A2 not working properly',
        priority: 'high',
        status: 'open',
        created_at: '2024-01-16T08:00:00Z'
      }
    ];

    setMessages(mockMessages);
    setTickets(mockTickets);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: activeChat,
        content: activeChat === 'farmer' 
          ? 'I understand. I will take care of this today.'
          : 'Thank you for contacting Bhoomi support. We will look into this and get back to you.',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const createTicket = (title: string, description: string, priority: 'low' | 'medium' | 'high') => {
    const ticket: Ticket = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: 'open',
      created_at: new Date().toISOString()
    };
    setTickets([ticket, ...tickets]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Alert className="border-primary/20 bg-primary/5">
          <Info className="h-4 w-4" />
          <AlertDescription>
            You're viewing demo chat capabilities. <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => window.location.href = '/auth'}>
              Login to chat with your assigned farmer and support team
            </Button>
          </AlertDescription>
        </Alert>
        
        <div className="max-w-4xl mx-auto mt-8">
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Connect with Your Farm Team</h3>
            <p className="text-muted-foreground mb-6">Chat with on-ground farmers and get support from Bhoomi experts</p>
            <Button variant="outline" onClick={() => window.location.href = '/auth'}>
              Login to Start Chatting
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Connect</h1>
            <p className="text-muted-foreground">Chat with your farm team and get support</p>
          </div>
          {selectedFarm && (
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">{selectedFarm.name}</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading chat...</p>
          </div>
        ) : userFarms.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Farms Found</h3>
            <p className="text-muted-foreground mb-6">Add your first farm to connect with farmers</p>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Add Farm
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Chat Options */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Chat Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant={activeChat === 'farmer' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setActiveChat('farmer')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Local Farmer
                    <Badge variant="secondary" className="ml-auto">2</Badge>
                  </Button>
                  <Button 
                    variant={activeChat === 'support' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setActiveChat('support')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Bhoomi Support
                    <Badge variant="secondary" className="ml-auto">1</Badge>
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => createTicket('Irrigation Request', 'Need irrigation in sector A', 'medium')}
                  >
                    💧 Request Irrigation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => createTicket('Drone Inspection', 'Need drone flyover', 'low')}
                  >
                    🚁 Request Drone Visit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => createTicket('Soil Check', 'Soil looks dry in sector B', 'high')}
                  >
                    🌱 Soil Check Request
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {activeChat === 'farmer' ? <User className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {activeChat === 'farmer' ? 'Ravi Kumar (Local Farmer)' : 'Bhoomi Support Team'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {activeChat === 'farmer' ? 'Managing your farm operations' : 'Available 24/7 for assistance'}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Online
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages Area */}
                  <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] mb-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder={`Type a message to ${activeChat === 'farmer' ? 'farmer' : 'support'}...`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Tickets & Tasks */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Open Tickets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={ticket.priority === 'high' ? 'destructive' :
                                  ticket.priority === 'medium' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge 
                          variant={ticket.status === 'open' ? 'destructive' :
                                  ticket.status === 'in_progress' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm">{ticket.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{ticket.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <h4 className="font-medium mb-1">Common Questions:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• How to schedule irrigation?</li>
                      <li>• Drone visit pricing</li>
                      <li>• Weather alerts setup</li>
                      <li>• Emergency contact</li>
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Full FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}