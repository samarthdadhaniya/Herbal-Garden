
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Leaf, Route } from "lucide-react";

// Sample tour data
const toursList = [
  {
    id: 1,
    name: "Ayurvedic Herbs Tour",
    description: "Explore the fundamental herbs used in Ayurvedic medicine and their healing properties.",
    thumbnail: "https://images.unsplash.com/photo-1615485291926-85b21f3cc1e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "30 min",
    plantCount: 8,
    featured: true,
    category: "Ayurveda"
  },
  {
    id: 2,
    name: "Stress Relief Plants",
    description: "Discover medicinal plants known for their ability to alleviate stress and anxiety.",
    thumbnail: "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "20 min",
    plantCount: 5,
    featured: true,
    category: "Wellness"
  },
  {
    id: 3,
    name: "Digestive Health Plants",
    description: "Learn about plants that improve digestion and support gut health according to traditional medicine.",
    thumbnail: "https://images.unsplash.com/photo-1511993226957-cd166aba52d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80",
    duration: "25 min",
    plantCount: 6,
    featured: false,
    category: "Health"
  },
  {
    id: 4,
    name: "Medicinal Flowers Tour",
    description: "Explore the healing properties of medicinal flowers from various traditional systems.",
    thumbnail: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2052&q=80",
    duration: "15 min",
    plantCount: 4,
    featured: false,
    category: "Botanical"
  },
  {
    id: 5,
    name: "Unani Medicine Exploration",
    description: "Discover plants used in the Unani system of medicine and their traditional applications.",
    thumbnail: "https://images.unsplash.com/photo-1466692476655-ab0c26c69cbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "35 min",
    plantCount: 7,
    featured: false,
    category: "Unani"
  },
  {
    id: 6,
    name: "Homeopathic Plants Guide",
    description: "Learn about plants that form the basis of homeopathic remedies and their principles.",
    thumbnail: "https://images.unsplash.com/photo-1523867574998-1a336b6ded04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80",
    duration: "25 min",
    plantCount: 5,
    featured: false,
    category: "Homeopathy"
  }
];

// Extract unique categories
const categories = ["All", ...new Set(toursList.map(tour => tour.category))];

const VirtualTours = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter tours based on selected category
  const filteredTours = selectedCategory === "All" 
    ? toursList 
    : toursList.filter(tour => tour.category === selectedCategory);
  
  // Get featured tours
  const featuredTours = toursList.filter(tour => tour.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
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
                      src={tour.thumbnail} 
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
              {filteredTours.map((tour) => (
                <div 
                  key={tour.id} 
                  className="bg-white rounded-lg shadow-sm border border-herbal-sage/20 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={tour.thumbnail} 
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
                        {tour.plantCount} plants
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/tours/${tour.id}`}>
                          View Tour
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualTours;
