import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantViewer3D from "@/components/PlantViewer3D";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Info, Leaf, Rotate3d } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Garden = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("plants")
          .select("id, name, scientific_name, system, category, image_url, description, uses, growth_info")
          .order("name", { ascending: true });
        
        if (error) throw error;
        if (data) {
          setPlants(data);
          setSelectedPlant(data.length > 0 ? data[0] : null);
        }
      } catch (error) {
        console.error("Error fetching plants:", error.message);
        toast({
          title: "Error",
          description: "Failed to load plants. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlants();
  }, [toast]);

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    toast({
      title: `${plant.name} Selected`,
      description: `You are now viewing ${plant.name} (${plant.scientific_name})`,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-herbal-cream py-10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-herbal-green-dark" />
                  Garden Plants
                </h3>
                <div className="space-y-3">
                  {plants.map((plant) => (
                    <div 
                      key={plant.id}
                      onClick={() => handlePlantSelect(plant)}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedPlant?.id === plant.id 
                          ? "bg-herbal-green-light/20 border-l-4 border-herbal-green-dark" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <h4 className="font-medium">{plant.name}</h4>
                      <p className="text-sm text-muted-foreground italic">{plant.scientific_name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="canvas-container h-[400px] lg:h-[500px] relative overflow-hidden rounded-lg bg-herbal-cream">
                  {selectedPlant && <PlantViewer3D modelUrl={selectedPlant.image_url || "/models/default-plant.glb"} />}
                  <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <Rotate3d className="h-6 w-6 text-herbal-green-dark" />
                  </div>
                </div>
                {selectedPlant && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
                    <h2 className="text-2xl font-bold">{selectedPlant.name}</h2>
                    <p className="text-muted-foreground italic">{selectedPlant.scientific_name}</p>
                    <Tabs defaultValue="overview">
                      <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="uses">Uses</TabsTrigger>
                        <TabsTrigger value="growing">Growing</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview">
                        <p>{selectedPlant.description || "No overview available."}</p>
                      </TabsContent>
                      <TabsContent value="uses">
                        <p>{selectedPlant.uses || "No uses available."}</p>
                      </TabsContent>
                      <TabsContent value="growing">
                        <p>{selectedPlant.growth_info || "No growing information available."}</p>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
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
