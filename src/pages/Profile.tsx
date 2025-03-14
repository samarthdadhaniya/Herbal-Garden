
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Bookmark, Edit, Leaf, Loader2, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface WatchlistPlant {
  id: string;
  name: string;
  scientific_name: string;
  system: string;
  category: string;
  image_url: string;
}

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
}

const Profile = () => {
  const { user, getUserProfile } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [watchlist, setWatchlist] = useState<WatchlistPlant[]>([]);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(true);

  // Form state
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      const profileData = await getUserProfile();
      
      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || "");
        setUsername(profileData.username || "");
      }
      
      setIsLoading(false);
    };
    
    fetchProfile();
  }, [user, getUserProfile]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) return;
      
      setIsWatchlistLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('watchlist')
          .select('plant_id')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          const plantIds = data.map(item => item.plant_id);
          
          const { data: plantsData, error: plantsError } = await supabase
            .from('plants')
            .select('*')
            .in('id', plantIds);
            
          if (plantsError) throw plantsError;
          
          setWatchlist(plantsData || []);
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        toast({
          title: "Error",
          description: "Failed to load your plant watchlist.",
          variant: "destructive",
        });
      } finally {
        setIsWatchlistLoading(false);
      }
    };
    
    fetchWatchlist();
  }, [user, toast]);

  const handleUpdateProfile = async () => {
    if (!user || !profile) return;
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: username,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      // Update local profile state
      setProfile({
        ...profile,
        full_name: fullName,
        username: username
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveFromWatchlist = async (plantId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', user.id)
        .eq('plant_id', plantId);
        
      if (error) throw error;
      
      // Update local state
      setWatchlist(prev => prev.filter(plant => plant.id !== plantId));
      
      toast({
        title: "Removed from watchlist",
        description: "The plant has been removed from your watchlist.",
      });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove the plant from your watchlist.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-herbal-cream py-12">
        <div className="container">
          <div className="bg-white rounded-lg shadow-lg border border-herbal-sage/20 overflow-hidden">
            <div className="md:flex">
              {/* Sidebar */}
              <div className="md:w-1/3 bg-herbal-green-light/10 p-6 md:p-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-herbal-green-light mb-4">
                    <User className="h-12 w-12 text-herbal-green-dark" />
                  </div>
                  <h2 className="text-2xl font-bold">{profile?.full_name || 'User'}</h2>
                  <p className="text-muted-foreground">@{profile?.username || user?.email}</p>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-2">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link 
                        to="/garden" 
                        className="flex items-center text-herbal-green-dark hover:underline"
                      >
                        <Leaf className="h-4 w-4 mr-2" />
                        Virtual Garden
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/plants" 
                        className="flex items-center text-herbal-green-dark hover:underline"
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Explore Plants
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/tours" 
                        className="flex items-center text-herbal-green-dark hover:underline"
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Virtual Tours
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="md:w-2/3 p-6 md:p-8">
                <Tabs defaultValue="watchlist">
                  <TabsList className="mb-6">
                    <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
                    <TabsTrigger value="profile">Profile Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="watchlist">
                    <h3 className="text-xl font-semibold mb-4">Plants Watchlist</h3>
                    
                    {isWatchlistLoading ? (
                      <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                        <p className="text-muted-foreground">Loading your watchlist...</p>
                      </div>
                    ) : watchlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {watchlist.map((plant) => (
                          <div 
                            key={plant.id} 
                            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex h-32">
                              <div className="w-1/3">
                                <img 
                                  src={plant.image_url || "https://images.unsplash.com/photo-1615485291926-85b21f3cc1e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} 
                                  alt={plant.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="w-2/3 p-3 flex flex-col">
                                <div className="flex-grow">
                                  <h4 className="font-medium">{plant.name}</h4>
                                  <p className="text-sm text-muted-foreground italic mb-1">
                                    {plant.scientific_name}
                                  </p>
                                  <span className="inline-block text-xs bg-herbal-green-light/20 text-herbal-green-dark px-2 py-0.5 rounded">
                                    {plant.system}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <Button variant="outline" size="sm" asChild className="text-xs px-2">
                                    <Link to={`/plants/${plant.id}`}>
                                      View Details
                                    </Link>
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleRemoveFromWatchlist(plant.id)}
                                    className="h-8 w-8 text-red-500"
                                  >
                                    <Bookmark className="h-4 w-4" fill="currentColor" />
                                    <span className="sr-only">Remove from watchlist</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-muted/20 rounded-lg">
                        <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="text-lg font-medium mb-2">Your watchlist is empty</h4>
                        <p className="text-muted-foreground mb-4">
                          Start exploring plants and add them to your watchlist
                        </p>
                        <Button asChild>
                          <Link to="/plants">
                            Browse Plants
                          </Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="profile">
                    <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                    
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={user?.email || ""}
                            disabled
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Email address cannot be changed
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleUpdateProfile} 
                        disabled={isUpdating}
                        className="flex items-center"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Edit className="mr-2 h-4 w-4" />
                            Update Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
