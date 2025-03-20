import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const FeaturedPlants = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("plants")
          .select("id, name, scientific_name, system, image_url, description");

        if (error) throw error;
        if (data) {
          // Shuffle and pick 3 random plants
          const shuffledPlants = data.sort(() => 0.5 - Math.random()).slice(0, 3);
          setPlants(shuffledPlants);
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
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Medicinal Plants</h2>
            <p className="text-muted-foreground mt-2">Explore some of our highlighted healing plants</p>
          </div>
          <Button variant="link" asChild>
            <Link to="/plants" className="flex items-center">
              View all plants
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <p>Loading plants...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plants.map((plant) => (
              <div key={plant.id} className="plant-card group">
                <div className="relative h-[280px] overflow-hidden rounded-t-lg">
                  <img 
                    src={plant.image_url || "https://via.placeholder.com/300"} 
                    alt={plant.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="ayush-pill ayurveda">{plant.system}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{plant.name}</h3>
                  <p className="text-sm text-muted-foreground italic mb-3">{plant.scientific_name}</p>
                  <p className="text-sm text-muted-foreground mb-4">{plant.description}</p>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/plants/${plant.id}`}>View Details</Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View in 3D Garden</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPlants;