import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Leaf, Route, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const VirtualTours = () => {
  const [tours, setTours] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const categories = ["All", ...new Set(tours.map((tour) => tour.category))];

  // Filter tours based on selected category
  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === selectedCategory);

  // Get featured tours
  const featuredTours = tours.filter((tour) => tour.featured);

  const [selectedTourPlants, setSelectedTourPlants] = useState([]);

  const openModal = async (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);

    try {
      const { data, error } = await supabase
        .from("tour_plants")
        .select("plants(id, name, scientific_name, image_url, benefits)")
        .eq("tour_id", tour.id);

      if (error) throw error;
      setSelectedTourPlants(data.map((tp) => tp.plants)); // Extracting plant details
    } catch (error) {
      console.error("Error fetching tour plants:", error.message);
    }
  };

  const closeModal = () => {
    setSelectedTour(null);
    setSelectedTourPlants([]);
    setIsModalOpen(false);
  };

  // const openModal = (tour) => {
  //   setSelectedTour(tour);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setSelectedTour(null);
  //   setIsModalOpen(false);
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="relative py-16 bg-herbal-cream overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533038590840-1f704af5abb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-[0.03]"></div>
          <div className="container relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">
                Virtual AYUSH Garden Tours
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Experience guided tours of our medicinal plant collection. Learn
                about their properties, uses, and significance in traditional
                medicine systems.
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
                  <div
                    key={tour.id}
                    className="group relative h-80 overflow-hidden rounded-xl"
                  >
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
                      <h3 className="text-xl font-bold text-white mb-2">
                        {tour.name}
                      </h3>
                      <p className="text-white/80 mb-4 line-clamp-2">
                        {tour.description}
                      </p>
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
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
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
                      <h3 className="text-xl font-semibold mb-2">
                        {tour.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {tour.description}
                      </p>
                      <div className="flex justify-between items-center">
                       
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openModal(tour)}
                        >
                          View Tour
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

      {/* Modal */}
      {isModalOpen && selectedTour && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
            <button
              className="absolute top-4 right-4 z-10 hover:bg-gray-100 rounded-full p-2 transition-colors"
              onClick={closeModal}
            >
              <X className="h-6 w-6 text-gray-600 hover:text-gray-900" />
            </button>

            <div className="space-y-6">
              {/* Tour Image and Header */}
              <div className="relative h-64 overflow-hidden rounded-xl">
                <img
                  src={selectedTour.image_url}
                  alt={selectedTour.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">
                    {selectedTour.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="ayush-pill ayurveda">
                      {selectedTour.category}
                    </span>
                    <span className="inline-flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedTour.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full-Width Description */}
              <div className="bg-muted/10 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Tour Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedTour.description}
                </p>
              </div>

              {/* Recommended Plants Section */}
              {selectedTourPlants.length > 0 && (
                <div>
                  <h4 className="text-2xl font-semibold mb-6 flex items-center">
                    <Leaf className="mr-3 h-6 w-6 text-herbal-green" />
                    Included Plants
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedTourPlants.map((plant) => (
                      <div
                        key={plant.id}
                        className="bg-white border border-herbal-sage/20 rounded-lg overflow-hidden hover:shadow-md transition-all group"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={plant.image_url}
                            alt={plant.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="text-lg font-semibold mb-2">
                            {plant.name}
                          </h5>
                          <p className="text-xs text-muted-foreground mb-3 italic">
                            {plant.scientific_name}
                          </p>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Link to={`/plants/${plant.id}`}>
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-3">
                <Button variant="outline" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTours;
