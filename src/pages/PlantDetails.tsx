import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Bookmark, 
  ExternalLink, 
  FileText, 
  Heart, 
  Leaf,
  Share2,
  Loader2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Plant {
  id: string;
  name: string;
  scientific_name: string;
  description: string;
  system: string;
  category: string;
  image_url: string;
  uses: string;
  benefits: string;
  usage: string;
  growth_info: string;
  history: string;
  precautions: string;
  model_url: string;
}

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [plant, setPlant] = useState<Plant | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingWatchlist, setIsCheckingWatchlist] = useState(true);
  
  useEffect(() => {
    const fetchPlant = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('plants')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setPlant(data);
          setActiveImage(0);
        } else {
          // Handle plant not found
          toast({
            title: "Plant not found",
            description: "The requested plant information could not be found.",
            variant: "destructive"
          });
          // Redirect to plants database after a short delay
          setTimeout(() => navigate("/plants"), 2000);
        }
      } catch (error) {
        console.error('Error fetching plant:', error);
        toast({
          title: "Error",
          description: "Failed to load plant information.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlant();
  }, [id, navigate, toast]);

  // Check if plant is in watchlist
  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user || !id) {
        setIsCheckingWatchlist(false);
        return;
      }
      
      setIsCheckingWatchlist(true);
      
      try {
        const { data, error } = await supabase
          .from('watchlist')
          .select('*')
          .eq('user_id', user.id)
          .eq('plant_id', id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          // PGRST116 is the error code for no rows returned
          console.error('Error checking watchlist:', error);
        }
        
        setIsBookmarked(!!data);
      } catch (error) {
        console.error('Error checking watchlist:', error);
      } finally {
        setIsCheckingWatchlist(false);
      }
    };
    
    checkWatchlist();
  }, [user, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <Leaf className="h-12 w-12 text-herbal-green mx-auto mb-4" />
              <p className="text-muted-foreground">Loading plant information...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-2">Plant not found</h2>
            <p className="text-muted-foreground mb-6">The requested plant information could not be found.</p>
            <Button onClick={() => navigate("/plants")}>
              Browse All Plants
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleFavorite = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add plants to favorites.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? `${plant.name} has been removed from your favorites` : `${plant.name} has been added to your favorites`,
    });
  };

  const handleBookmark = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add plants to your watchlist.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    
    try {
      if (isBookmarked) {
        // Remove from watchlist
        const { error } = await supabase
          .from('watchlist')
          .delete()
          .eq('user_id', user.id)
          .eq('plant_id', plant.id);
          
        if (error) throw error;
        
        setIsBookmarked(false);
        toast({
          title: "Removed from watchlist",
          description: `${plant.name} has been removed from your watchlist.`,
        });
      } else {
        // Add to watchlist
        const { error } = await supabase
          .from('watchlist')
          .insert({
            user_id: user.id,
            plant_id: plant.id
          });
          
        if (error) throw error;
        
        setIsBookmarked(true);
        toast({
          title: "Added to watchlist",
          description: `${plant.name} has been added to your watchlist.`,
        });
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
      toast({
        title: "Error",
        description: "Failed to update your watchlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    // In a real app, we would use the Web Share API or a social sharing library
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Plant details link has been copied to your clipboard",
    });
  };

  // Split plant description into paragraphs for better readability
  const descriptionParagraphs = plant.description?.split('\n').filter(Boolean) || [];
  
  // Break down uses text into bullet points if it contains semicolons or newlines
  const usesList = plant.uses?.split(/[;\n]/).filter(Boolean).map(use => use.trim()) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-herbal-cream py-10">
          <div className="container">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{plant.name}</h1>
                <p className="text-muted-foreground italic">{plant.scientific_name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Images and Quick Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Main Image */}
                <div className="bg-white p-2 rounded-lg shadow-sm border border-herbal-sage/20">
                  <div className="relative h-[300px] overflow-hidden rounded-md">
                    <img 
                      src={plant.image_url || "https://images.unsplash.com/photo-1615485291926-85b21f3cc1e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} 
                      alt={plant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Quick Info */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
                  <h3 className="text-lg font-semibold mb-4">Plant Information</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AYUSH System:</span>
                      <span className="font-medium capitalize">{plant.system}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium capitalize">{plant.category}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col space-y-3">
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/garden?plant=${plant.id}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View in 3D Garden
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="w-full">
                      <Link to="#" onClick={() => window.print()}>
                        <FileText className="mr-2 h-4 w-4" />
                        Print Information
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Detailed Information */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20 mb-6">
                  {/* Action buttons */}
                  <div className="flex justify-end mb-4 space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleFavorite}
                      className={isFavorite ? "text-red-500" : ""}
                    >
                      <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                      <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBookmark}
                      className={isBookmarked ? "text-primary" : ""}
                      disabled={isCheckingWatchlist}
                    >
                      {isCheckingWatchlist ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
                      )}
                      <span className="sr-only">{isBookmarked ? "Remove bookmark" : "Bookmark"}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShare}
                    >
                      <Share2 className="h-5 w-5" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                  
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      <TabsTrigger value="uses">Uses</TabsTrigger>
                      <TabsTrigger value="growing">Growing</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                      {plant.precautions && (
                        <TabsTrigger value="precautions">Precautions</TabsTrigger>
                      )}
                    </TabsList>
                    
                    <TabsContent value="overview">
                      <h2 className="text-xl font-semibold mb-3">About {plant.name}</h2>
                      {descriptionParagraphs.length > 0 ? (
                        descriptionParagraphs.map((paragraph, idx) => (
                          <p key={idx} className="mb-4">{paragraph}</p>
                        ))
                      ) : (
                        <p className="mb-4">{plant.description || "No description available for this plant."}</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="benefits">
                      <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                      {plant.benefits ? (
                        <p className="mb-4">{plant.benefits}</p>
                      ) : (
                        <p>No benefits information available for this plant.</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="uses">
                      <h2 className="text-xl font-semibold mb-3">Medicinal Uses</h2>
                      {usesList.length > 0 ? (
                        <ul className="space-y-2">
                          {usesList.map((use, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-herbal-green-light/20 text-herbal-green-dark text-xs font-medium mr-3 mt-0.5">
                                {index + 1}
                              </span>
                              <span>{use}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No specific uses have been documented for this plant.</p>
                      )}
                      
                      {plant.usage && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-2">How to Use</h3>
                          <p>{plant.usage}</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="growing">
                      <h2 className="text-xl font-semibold mb-3">Growing Information</h2>
                      <p>{plant.growth_info || "No growing information is available for this plant."}</p>
                    </TabsContent>
                    
                    <TabsContent value="history">
                      <h2 className="text-xl font-semibold mb-3">Historical Context</h2>
                      <p>{plant.history || "No historical information is available for this plant."}</p>
                    </TabsContent>
                    
                    {plant.precautions && (
                      <TabsContent value="precautions">
                        <h2 className="text-xl font-semibold mb-3 text-amber-700">Precautions</h2>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                          <p>{plant.precautions}</p>
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlantDetails;
