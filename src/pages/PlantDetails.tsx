
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  Share2 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Sample plant data for the details page
const plantDatabase = [
  {
    id: "1",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    system: "Ayurveda",
    category: "Herb",
    images: [
      "https://images.unsplash.com/photo-1625178551411-62eea1351c37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1062&q=80",
      "https://images.unsplash.com/photo-1618758785996-ed474061f8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80"
    ],
    description: "Ashwagandha is one of the most important herbs in Ayurveda, a form of alternative medicine based on Indian principles of natural healing. People have used ashwagandha for thousands of years to relieve stress, increase energy levels, and improve concentration.",
    benefits: [
      "Reduces stress and anxiety",
      "May improve physical performance",
      "Might improve brain function",
      "May help reduce blood sugar levels",
      "Has anti-inflammatory properties"
    ],
    usage: "Traditionally, ashwagandha root is ground into a powder and consumed with warm milk and honey before bedtime. It's also available in capsule, tincture, and tea forms.",
    dosage: "The recommended dosage is typically 300–500 mg of ashwagandha root extract taken twice daily with meals.",
    precautions: "Pregnant women should avoid ashwagandha as it may cause early delivery. People with autoimmune diseases should also avoid it unless authorized by a healthcare provider.",
    growingInfo: "Ashwagandha is a perennial shrub that grows in dry regions of India, the Middle East, and parts of Africa. It can grow up to 2-3 feet tall and prefers well-drained soil and full sun exposure.",
    history: "Ashwagandha has been used for over 3,000 years in Ayurvedic medicine. Its Sanskrit name means 'smell of the horse,' which refers to both its unique smell and its ability to increase strength."
  },
  {
    id: "2",
    name: "Tulsi",
    scientificName: "Ocimum sanctum",
    system: "Ayurveda",
    category: "Herb",
    images: [
      "https://images.unsplash.com/photo-1622210445677-7ec164723bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    ],
    description: "Tulsi, also known as Holy Basil, is a sacred plant in Hindu tradition and is often planted around Hindu shrines. The plant is an aromatic perennial plant in the Lamiaceae family. It has a strong, pleasant smell and a characteristic taste loved by many around the globe.",
    benefits: [
      "Fights infections",
      "Lowers blood sugar",
      "Protects against heart disease",
      "Reduces anxiety and stress",
      "Supports respiratory health"
    ],
    usage: "Tulsi can be consumed as an herbal tea, added to salads, or taken as a supplement in capsule form. Fresh tulsi leaves are also often chewed for their medicinal properties.",
    dosage: "For tea, steep 1-2 teaspoons of dried tulsi leaves in hot water for 5-10 minutes. For capsules, follow the manufacturer's instructions.",
    precautions: "Tulsi may slow blood clotting, so avoid taking it before surgery. Pregnant and breastfeeding women should consult a healthcare provider before using it.",
    growingInfo: "Tulsi grows well in moist, well-drained soil in a sunny location. It's a perennial in warm climates but can be grown as an annual in cooler regions.",
    history: "Tulsi has been revered in India for over 5,000 years as a healing balm for body, mind, and spirit. In Hindu mythology, it's believed to be an incarnation of the goddess Lakshmi."
  }
];

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    // Find the plant with the matching ID
    const foundPlant = plantDatabase.find(p => p.id === id);
    
    if (foundPlant) {
      setPlant(foundPlant);
      setActiveImage(0); // Reset active image when plant changes
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
  }, [id, navigate]);

  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-2">Loading plant information...</h2>
            <p className="text-muted-foreground">Please wait while we fetch the details.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? `${plant.name} has been removed from your favorites` : `${plant.name} has been added to your favorites`,
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? `${plant.name} has been removed from your bookmarks` : `${plant.name} has been added to your bookmarks`,
    });
  };

  const handleShare = () => {
    // In a real app, we would use the Web Share API or a social sharing library
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Plant details link has been copied to your clipboard",
    });
  };

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
                <p className="text-muted-foreground italic">{plant.scientificName}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Images and Quick Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Main Image */}
                <div className="bg-white p-2 rounded-lg shadow-sm border border-herbal-sage/20">
                  <div className="relative h-[300px] overflow-hidden rounded-md">
                    <img 
                      src={plant.images[activeImage]} 
                      alt={plant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Image Thumbnails */}
                  {plant.images.length > 1 && (
                    <div className="flex gap-2 mt-2">
                      {plant.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                            activeImage === index ? 'border-herbal-green-dark' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${plant.name} view ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Quick Info */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
                  <h3 className="text-lg font-semibold mb-4">Plant Information</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AYUSH System:</span>
                      <span className="font-medium">{plant.system}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{plant.category}</span>
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
                    >
                      <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
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
                      <TabsTrigger value="usage">Usage</TabsTrigger>
                      <TabsTrigger value="growing">Growing</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview">
                      <h2 className="text-xl font-semibold mb-3">About {plant.name}</h2>
                      <p className="mb-4">{plant.description}</p>
                      
                      {plant.precautions && (
                        <div className="mt-6 p-4 bg-amber-50 rounded border border-amber-200">
                          <h3 className="font-medium text-amber-800 mb-2">Precautions</h3>
                          <p className="text-amber-700">{plant.precautions}</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="benefits">
                      <h2 className="text-xl font-semibold mb-3">Health Benefits</h2>
                      <ul className="space-y-2">
                        {plant.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-herbal-green-light/20 text-herbal-green-dark text-xs font-medium mr-3 mt-0.5">
                              {index + 1}
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="usage">
                      <h2 className="text-xl font-semibold mb-3">Usage & Dosage</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">How to Use</h3>
                          <p>{plant.usage}</p>
                        </div>
                        
                        {plant.dosage && (
                          <div>
                            <h3 className="font-medium mb-2">Recommended Dosage</h3>
                            <p>{plant.dosage}</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="growing">
                      <h2 className="text-xl font-semibold mb-3">Growing Information</h2>
                      <p>{plant.growingInfo}</p>
                    </TabsContent>
                    
                    <TabsContent value="history">
                      <h2 className="text-xl font-semibold mb-3">Historical Background</h2>
                      <p>{plant.history}</p>
                    </TabsContent>
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
