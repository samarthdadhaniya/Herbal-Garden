
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ExternalLink, Search } from "lucide-react";

// Sample plant data for the database
const plantDatabase = [
  {
    id: 1,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    system: "ayurveda",
    category: "herb",
    image: "https://images.unsplash.com/photo-1625178551411-62eea1351c37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1062&q=80",
    description: "Known for its adaptogenic properties that help the body resist physiological and psychological stress."
  },
  {
    id: 2,
    name: "Tulsi",
    scientificName: "Ocimum sanctum",
    system: "ayurveda",
    category: "herb",
    image: "https://images.unsplash.com/photo-1622210445677-7ec164723bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    description: "Called 'Holy Basil', it's revered for its healing properties and religious significance in Hinduism."
  },
  {
    id: 3,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    system: "ayurveda",
    category: "succulent",
    image: "https://images.unsplash.com/photo-1596046216241-305f0df82b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
    description: "Known for its soothing, healing, and rejuvenating effects, especially for skin conditions."
  },
  {
    id: 4,
    name: "Turmeric",
    scientificName: "Curcuma longa",
    system: "ayurveda",
    category: "root",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "A powerful anti-inflammatory and antioxidant, used in cooking and medicine for centuries."
  },
  {
    id: 5,
    name: "Brahmi",
    scientificName: "Bacopa monnieri",
    system: "ayurveda",
    category: "herb",
    image: "https://images.unsplash.com/photo-1550236520-7050f3582da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
    description: "Used to improve memory, reduce anxiety, and treat epilepsy. It's a staple in Ayurvedic medicine."
  },
  {
    id: 6,
    name: "Arjuna",
    scientificName: "Terminalia arjuna",
    system: "ayurveda",
    category: "tree",
    image: "https://images.unsplash.com/photo-1590646199204-7a38c4d14275?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
    description: "The bark is used for heart health, including treating coronary artery disease, heart failure, and high cholesterol."
  },
  {
    id: 7,
    name: "Gymnema",
    scientificName: "Gymnema sylvestre",
    system: "siddha",
    category: "herb",
    image: "https://images.unsplash.com/photo-1645553059919-138395ee2284?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    description: "Known as 'sugar destroyer,' it's used in traditional medicine for diabetes and metabolic syndrome."
  },
  {
    id: 8,
    name: "Senna",
    scientificName: "Cassia angustifolia",
    system: "unani",
    category: "herb",
    image: "https://images.unsplash.com/photo-1628015081036-0747ec8f077a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    description: "Used as a natural laxative and for treating constipation in traditional medicine systems."
  }
];

const systemNames = {
  "ayurveda": "Ayurveda",
  "yoga": "Yoga & Naturopathy",
  "unani": "Unani",
  "siddha": "Siddha",
  "homeopathy": "Homeopathy"
};

const PlantsDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter plants based on search term and filters
  const filteredPlants = plantDatabase.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSystem = selectedSystem === "" || plant.system === selectedSystem;
    const matchesCategory = selectedCategory === "" || plant.category === selectedCategory;
    
    return matchesSearch && matchesSystem && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(plantDatabase.map((plant) => plant.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-herbal-cream py-10">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Medicinal Plants Database</h1>
            <p className="text-muted-foreground mb-8">
              Explore our collection of AYUSH medicinal plants and their healing properties
            </p>
            
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search" className="mb-2">Search Plants</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* System Filter */}
                <div>
                  <Label htmlFor="system" className="mb-2">AYUSH System</Label>
                  <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                    <SelectTrigger id="system">
                      <SelectValue placeholder="All Systems" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Systems</SelectItem>
                      <SelectItem value="ayurveda">Ayurveda</SelectItem>
                      <SelectItem value="yoga">Yoga & Naturopathy</SelectItem>
                      <SelectItem value="unani">Unani</SelectItem>
                      <SelectItem value="siddha">Siddha</SelectItem>
                      <SelectItem value="homeopathy">Homeopathy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Category Filter */}
                <div>
                  <Label htmlFor="category" className="mb-2">Plant Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Plants Grid */}
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPlants.map((plant) => (
                  <div key={plant.id} className="plant-card group">
                    <div className="relative h-[220px] overflow-hidden rounded-t-lg">
                      <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`ayush-pill ${plant.system}`}>
                          {systemNames[plant.system]}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{plant.name}</h3>
                      <p className="text-sm text-muted-foreground italic mb-2">{plant.scientificName}</p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{plant.description}</p>
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/plants/${plant.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/garden?plant=${plant.id}`}>
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View in Garden</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">No plants found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
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
