import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Leaf, Route } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const VirtualTours = () => {
  const [tours, setTours] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data, error } = await supabase
          .from("tours")
          .select("id, name, description, duration, plant_count, image_url");

        if (error) throw error;
        if (data) {
          setTours(data);
        }
      } catch (error) {
        console.error("Error fetching tours:", error.message);
      }
    };

    fetchTours();
  }, []);

  const categories = ["All", ...new Set(tours.map(tour => tour.category))];

  // Filter tours based on selected category
  const filteredTours = selectedCategory === "All"
    ? tours
    : tours.filter(tour => tour.category === selectedCategory);

  // Get featured tours
  const featuredTours = tours.filter(tour => tour.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="relative py-16 bg-herbal-cream overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533038590840-1f704af5abb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-[0.03]"></div>
          <div className="container relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Virtual AYUSH Garden Tours</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Experience guided tours of our medicinal plant collection. Learn about their properties, uses, and significance in traditional medicine systems.
              </p>
              <Button asChild>
                <Link to="/garden">
                  Enter Virtual Garden
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Tours */}
        {featuredTours.length > 0 && (
          <section className="py-16">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Featured Tours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredTours.map((tour) => (
                  <div key={tour.id} className="group relative h-80 overflow-hidden rounded-xl">
                    <img 
                      src={tour.image_url} 
                      alt={tour.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-herbal-green-light/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                          {tour.category}
                        </span>
                        <span className="bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {tour.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{tour.name}</h3>
                      <p className="text-white/80 mb-4 line-clamp-2">{tour.description}</p>
                      <Button asChild size="sm">
                        <Link to={`/tours/${tour.id}`}>
                          Start Tour
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Tours */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <h2 className="text-3xl font-bold">Explore All Tours</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center"
                  >
                    {category === "All" ? (
                      <Route className="mr-1 h-4 w-4" />
                    ) : (
                      <Leaf className="mr-1 h-4 w-4" />
                    )}
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <div 
                    key={tour.id} 
                    className="bg-white rounded-lg shadow-sm border border-herbal-sage/20 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={tour.image_url} 
                        alt={tour.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="ayush-pill ayurveda">
                          {tour.category}
                        </span>
                        <span className="inline-flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {tour.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {tour.plant_count} plants
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/tours/${tour.id}`}>
                            View Tour
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No tours available.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualTours;
