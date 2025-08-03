import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, MapPin, Wheat, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Farm {
  id: string;
  user_id: string;
  name: string;
  location: string | null;
  size_acres: number | null;
  crop_types: string[] | null;
  created_at: string;
  updated_at: string;
}

const FarmManager = () => {
  const { user } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [sizeAcres, setSizeAcres] = useState('');
  const [cropTypes, setCropTypes] = useState('');

  useEffect(() => {
    if (user) {
      fetchFarms();
    }
  }, [user]);

  const fetchFarms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFarms(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading farms",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (farm?: Farm) => {
    if (farm) {
      setEditingFarm(farm);
      setName(farm.name);
      setLocation(farm.location || '');
      setSizeAcres(farm.size_acres?.toString() || '');
      setCropTypes(farm.crop_types?.join(', ') || '');
    } else {
      setEditingFarm(null);
      setName('');
      setLocation('');
      setSizeAcres('');
      setCropTypes('');
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingFarm(null);
    setName('');
    setLocation('');
    setSizeAcres('');
    setCropTypes('');
  };

  const saveFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      const farmData = {
        user_id: user.id,
        name: name.trim(),
        location: location.trim() || null,
        size_acres: sizeAcres ? parseFloat(sizeAcres) : null,
        crop_types: cropTypes ? cropTypes.split(',').map(c => c.trim()).filter(c => c) : null,
      };

      let error;
      if (editingFarm) {
        const { error: updateError } = await supabase
          .from('farms')
          .update(farmData)
          .eq('id', editingFarm.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('farms')
          .insert(farmData);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: editingFarm ? "Farm updated" : "Farm created",
        description: `Your farm has been successfully ${editingFarm ? 'updated' : 'created'}.`,
      });

      closeDialog();
      fetchFarms();
    } catch (error: any) {
      toast({
        title: `Error ${editingFarm ? 'updating' : 'creating'} farm`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteFarm = async (farmId: string) => {
    try {
      const { error } = await supabase
        .from('farms')
        .delete()
        .eq('id', farmId);

      if (error) throw error;

      toast({
        title: "Farm deleted",
        description: "Your farm has been successfully deleted.",
      });

      fetchFarms();
    } catch (error: any) {
      toast({
        title: "Error deleting farm",
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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Farms</h1>
          <p className="text-muted-foreground">Manage your agricultural properties</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="bg-gradient-forest hover:shadow-forest transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Farm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingFarm ? 'Edit Farm' : 'Add New Farm'}</DialogTitle>
              <DialogDescription>
                {editingFarm ? 'Update your farm details' : 'Enter details for your new farm'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={saveFarm} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="farm-name">Farm Name *</Label>
                <Input
                  id="farm-name"
                  placeholder="Enter farm name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="farm-location">Location</Label>
                <Input
                  id="farm-location"
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="farm-size">Size (Acres)</Label>
                <Input
                  id="farm-size"
                  type="number"
                  step="0.1"
                  placeholder="Enter size in acres"
                  value={sizeAcres}
                  onChange={(e) => setSizeAcres(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="crop-types">Crop Types</Label>
                <Input
                  id="crop-types"
                  placeholder="Wheat, Corn, Soybeans (comma-separated)"
                  value={cropTypes}
                  onChange={(e) => setCropTypes(e.target.value)}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-gradient-forest hover:shadow-forest transition-all duration-300"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingFarm ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingFarm ? 'Update Farm' : 'Create Farm'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {farms.length === 0 ? (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-earth">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Wheat className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No farms yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first farm to get started</p>
            <Button 
              onClick={() => openDialog()}
              className="bg-gradient-forest hover:shadow-forest transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Farm
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {farms.map((farm) => (
            <Card key={farm.id} className="bg-card/80 backdrop-blur-sm border-border/50 shadow-earth hover:shadow-forest transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-foreground">{farm.name}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDialog(farm)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteFarm(farm.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                {farm.location && (
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {farm.location}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {farm.size_acres && (
                  <div className="text-sm">
                    <span className="font-medium">Size:</span> {farm.size_acres} acres
                  </div>
                )}
                {farm.crop_types && farm.crop_types.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Crops:</div>
                    <div className="flex flex-wrap gap-1">
                      {farm.crop_types.map((crop, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                  Created {new Date(farm.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmManager;