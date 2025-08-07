import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Award, 
  Filter, 
  Search,
  Plus,
  Calendar,
  MapPin,
  Star,
  Bookmark,
  Share,
  Users,
  TrendingUp,
  MessageCircle
} from "lucide-react";

export default function CommunityForum() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filters = ["all", "cotton", "rice", "organic", "pest-control", "irrigation"];
  
  const discussions = [
    {
      id: 1,
      title: "Best organic pesticides for cotton bollworm?",
      author: "Rajesh Kumar",
      expertBadge: false,
      location: "Karnataka",
      timestamp: "2 hours ago",
      category: "pest-control",
      upvotes: 23,
      downvotes: 2,
      replies: 8,
      content: "I'm facing severe bollworm attack in my cotton field. Looking for effective organic solutions that won't harm beneficial insects.",
      isBookmarked: false,
      tags: ["cotton", "organic", "bollworm"]
    },
    {
      id: 2,
      title: "Drip irrigation setup cost and ROI analysis",
      author: "Dr. Priya Sharma",
      expertBadge: true,
      location: "Pune",
      timestamp: "5 hours ago",
      category: "irrigation",
      upvotes: 45,
      downvotes: 1,
      replies: 15,
      content: "Based on my 10 years of research, here's a detailed cost-benefit analysis of drip irrigation systems for different crop types and farm sizes.",
      isBookmarked: true,
      tags: ["irrigation", "technology", "economics"]
    },
    {
      id: 3,
      title: "Organic certification process - Step by step guide",
      author: "Manoj Patel",
      expertBadge: false,
      location: "Gujarat",
      timestamp: "1 day ago",
      category: "organic",
      upvotes: 67,
      downvotes: 3,
      replies: 22,
      content: "Just completed my organic certification process. Sharing the complete documentation and timeline to help fellow farmers.",
      isBookmarked: false,
      tags: ["organic", "certification", "documentation"]
    }
  ];

  const experts = [
    { name: "Dr. Priya Sharma", specialty: "Crop Science", rating: 4.9, answers: 156 },
    { name: "Prof. Kumar Singh", specialty: "Soil Health", rating: 4.8, answers: 203 },
    { name: "Dr. Meera Reddy", specialty: "Pest Management", rating: 4.9, answers: 89 }
  ];

  const upcomingEvents = [
    { title: "Organic Farming Workshop", date: "Mar 15", type: "AMA", expert: "Dr. Priya Sharma" },
    { title: "Drone Technology Demo", date: "Mar 20", type: "Demo", expert: "Tech Team" },
    { title: "Q&A on Cotton Farming", date: "Mar 25", type: "AMA", expert: "Prof. Kumar Singh" }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Forum</h1>
          <p className="text-muted-foreground mt-2">Connect with farmers and experts, share experiences, and get real-time help</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Start Discussion
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-earth">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Discussions */}
        <div className="lg:col-span-2 space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="shadow-earth hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {discussion.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{discussion.author}</span>
                        {discussion.expertBadge && (
                          <Badge variant="default" className="text-xs gap-1">
                            <Award className="w-3 h-3" />
                            Expert
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {discussion.location}
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Bookmark className={`w-4 h-4 ${discussion.isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {discussion.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {discussion.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsDown className="w-4 h-4" />
                          {discussion.downvotes}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {discussion.replies} replies
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline">Load More Discussions</Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Experts */}
          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Featured Experts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {experts.map((expert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-background">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{expert.name}</p>
                    <p className="text-xs text-muted-foreground">{expert.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{expert.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{expert.answers} answers</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 rounded-lg border bg-background">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Date: {event.date}</p>
                    <p>Expert: {event.expert}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">2.5K</p>
                  <p className="text-xs text-muted-foreground">Active Farmers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-xs text-muted-foreground">Experts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">8.2K</p>
                  <p className="text-xs text-muted-foreground">Discussions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">25K</p>
                  <p className="text-xs text-muted-foreground">Solutions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Ask */}
          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Quick Ask
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea 
                placeholder="Ask your farming question here..."
                className="resize-none"
                rows={3}
              />
              <Button className="w-full">
                Post Question
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}