
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantViewer3D from "@/components/PlantViewer3D";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Info, Leaf, Rotate3d } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  const [selectedPlant, setSelectedPlant] = useState(gardenPlants[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in - this would be replaced with your actual auth check
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token");
      setIsAuthenticated(!!token);
      
      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the full Garden experience.",
          variant: "destructive"
        });
      }
    };
    
    checkAuth();
  }, []);

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    toast({
      title: `${plant.name} Selected`,
      description: `You are now viewing ${plant.name} (${plant.scientificName})`,
    });
  };

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
                
                {!isAuthenticated && (
                  <div className="mt-6 p-4 bg-amber-50 rounded border border-amber-200 text-sm">
                    <p className="font-medium text-amber-800 mb-2">Limited Garden Access</p>
                    <p className="text-amber-700 mb-3">Log in to access the full virtual garden with all plants and features.</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => navigate("/login")}
                      className="w-full"
                    >
                      Log In
                    </Button>
                  </div>
                )}
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
