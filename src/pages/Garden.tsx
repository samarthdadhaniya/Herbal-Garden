
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantViewer3D from "@/components/PlantViewer3D";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Info, Leaf, Rotate3d } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample plant data for the virtual garden
const gardenPlants = [
  {
    id: 1,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    system: "Ayurveda",
    modelUrl: "/models/default-plant.glb", // Placeholder, replace with actual model
    description: "Known for its adaptogenic properties that help the body resist physiological and psychological stress.",
    uses: "Used for reducing stress and anxiety, improving energy levels and concentration.",
    growthInfo: "Perennial shrub that grows up to 1-2 feet tall in dry regions."
  },
  {
    id: 2,
    name: "Tulsi",
    scientificName: "Ocimum sanctum",
    system: "Ayurveda",
    modelUrl: "/models/default-plant.glb", // Placeholder, replace with actual model
    description: "Called 'Holy Basil', it's revered for its healing properties and religious significance in Hinduism.",
    uses: "Used for common colds, respiratory disorders, stress, and as an adaptogen.",
    growthInfo: "A perennial plant that grows up to 1-3 feet tall."
  }
];

const Garden = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlant, setSelectedPlant] = useState(gardenPlants[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
      
      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the Virtual Garden.",
          variant: "destructive"
        });
        navigate("/login", { state: { from: "/garden" } });
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    toast({
      title: `${plant.name} Selected`,
      description: `You are now viewing ${plant.name} (${plant.scientificName})`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <Leaf className="h-12 w-12 text-herbal-green mx-auto mb-4" />
              <p className="text-muted-foreground">Loading the garden...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 max-w-md mx-auto">
            <Leaf className="h-16 w-16 text-herbal-green mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
            <p className="mb-6 text-muted-foreground">
              You need to be logged in to access the Virtual AYUSH Garden and explore our collection of medicinal plants in 3D.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Go Back
              </Button>
              <Button onClick={() => navigate("/login", { state: { from: "/garden" } })}>
                Log In
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-herbal-cream py-10">
          <div className="container">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">Virtual AYUSH Garden</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar with plant selection */}
              <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-herbal-green-dark" />
                  Garden Plants
                </h3>
                
                <div className="space-y-3">
                  {gardenPlants.map((plant) => (
                    <div 
                      key={plant.id}
                      onClick={() => handlePlantSelect(plant)}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedPlant.id === plant.id 
                          ? "bg-herbal-green-light/20 border-l-4 border-herbal-green-dark" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <h4 className="font-medium">{plant.name}</h4>
                      <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
                      <div className="mt-1">
                        <span className="ayush-pill ayurveda">{plant.system}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 3D Viewer and Plant Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* 3D Viewer */}
                <div className="canvas-container h-[400px] lg:h-[500px] relative overflow-hidden rounded-lg bg-herbal-cream">
                  <PlantViewer3D modelUrl={selectedPlant.modelUrl} />
                  <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <Rotate3d className="h-6 w-6 text-herbal-green-dark" />
                  </div>
                </div>
                
                {/* Plant Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPlant.name}</h2>
                      <p className="text-muted-foreground italic">{selectedPlant.scientificName}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => navigate(`/plants/${selectedPlant.id}`)}
                    >
                      <Info className="h-5 w-5" />
                      <span className="sr-only">More Info</span>
                    </Button>
                  </div>
                  
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="uses">Uses</TabsTrigger>
                      <TabsTrigger value="growing">Growing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <p>{selectedPlant.description}</p>
                    </TabsContent>
                    <TabsContent value="uses">
                      <p>{selectedPlant.uses}</p>
                    </TabsContent>
                    <TabsContent value="growing">
                      <p>{selectedPlant.growthInfo}</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Garden;
