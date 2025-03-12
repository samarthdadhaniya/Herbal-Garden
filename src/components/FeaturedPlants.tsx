
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Sample data for our featured plants
const featuredPlants = [
  {
    id: 1,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    system: "Ayurveda",
    image: "https://images.unsplash.com/photo-1625178551411-62eea1351c37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1062&q=80",
    description: "Known for its adaptogenic properties that help the body resist physiological and psychological stress."
  },
  {
    id: 2,
    name: "Tulsi",
    scientificName: "Ocimum sanctum",
    system: "Ayurveda",
    image: "https://images.unsplash.com/photo-1622210445677-7ec164723bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    description: "Called 'Holy Basil', it's revered for its healing properties and religious significance in Hinduism."
  },
  {
    id: 3,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    system: "Ayurveda",
    image: "https://images.unsplash.com/photo-1596046216241-305f0df82b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
    description: "Known for its soothing, healing, and rejuvenating effects, especially for skin conditions."
  }
];

const FeaturedPlants = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPlants.map((plant) => (
            <div key={plant.id} className="plant-card group">
              <div className="relative h-[280px] overflow-hidden rounded-t-lg">
                <img 
                  src={plant.image} 
                  alt={plant.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <span className="ayush-pill ayurveda">{plant.system}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold">{plant.name}</h3>
                <p className="text-sm text-muted-foreground italic mb-3">{plant.scientificName}</p>
                <p className="text-sm text-muted-foreground mb-4">{plant.description}</p>
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/plants/${plant.id}`}>
                      View Details
                    </Link>
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
      </div>
    </section>
  );
};

export default FeaturedPlants;
