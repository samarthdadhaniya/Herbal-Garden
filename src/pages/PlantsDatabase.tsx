import { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/contexts/AuthContext";

interface Plant {
  id: string;
  name: string;
  scientific_name: string;
  system: string;
  category: string;
  image_url?: string;
  description?: string;
}

const systemNames: Record<string, string> = {
  ayurveda: "Ayurveda",
  yoga: "Yoga & Naturopathy",
  unani: "Unani",
  siddha: "Siddha",
  homeopathy: "Homeopathy",
};

const PlantsDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAdmin } = useContext(AuthContext);
  const userId = user?.id;
  const userRole = isAdmin ? "admin" : "user";

  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("plants")
          .select("id, name, scientific_name, system, category, image_url, description");

        if (error) throw error;
        if (data) {
          setPlants(data);

          // Extract unique, non-empty categories
          const uniqueCategories = [...new Set(data.map((plant) => plant.category))].filter(Boolean);
          setCategories(uniqueCategories);
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

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plant.description && plant.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSystem = !selectedSystem || plant.system === selectedSystem;
      const matchesCategory = !selectedCategory || plant.category === selectedCategory;
      return matchesSearch && matchesSystem && matchesCategory;
    });
  }, [plants, searchTerm, selectedSystem, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-herbal-cream py-10">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Medicinal Plants Database</h1>
            <p className="text-muted-foreground mb-8">Explore our collection of AYUSH medicinal plants and their healing properties</p>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="search">Search Plants</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="search" placeholder="Search by name..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                </div>
                {/* <div>
                  <Label htmlFor="system">AYUSH System</Label>
                  <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                    <SelectTrigger id="system">
                      <SelectValue placeholder="All Systems" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Systems</SelectItem>
                      {Object.keys(systemNames).map((key) => (
                        <SelectItem key={key} value={key}>{systemNames[key]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
                <div>
                  {/* <Label htmlFor="category">Plant Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading plants...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPlants.map((plant) => (
                  <div key={plant.id} className="plant-card">
                    <img src={plant.image_url || "/default-plant.jpg"} alt={plant.name} className="w-full h-[220px] object-cover rounded-t-lg" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{plant.name}</h3>
                      <p className="text-sm text-muted-foreground italic">{plant.scientific_name}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/plants/${plant.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlantsDatabase;
