
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const systems = [
  {
    id: "ayurveda",
    name: "Ayurveda",
    description: "Traditional Indian system of medicine dating back over 5,000 years, focusing on balance between mind, body, and spirit.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-herbal-green-dark">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
      </svg>
    ),
    color: "bg-herbal-green-light/10 border-herbal-green-light/30"
  },
  {
    id: "yoga",
    name: "Yoga & Naturopathy",
    description: "A holistic system promoting health through physical postures, breathing exercises, and natural healing methods.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-blue-700">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2-.5-4-.5-6 0C8 2 7 2 7 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 6 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
      </svg>
    ),
    color: "bg-blue-50 border-blue-100"
  },
  {
    id: "unani",
    name: "Unani",
    description: "A Greco-Arabic traditional medicine system based on the teachings of Hippocrates and Galen.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-purple-700">
        <path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"></path>
        <path d="M21 12H8"></path>
        <path d="M17 16v-8"></path>
        <path d="M13 16v-8"></path>
      </svg>
    ),
    color: "bg-purple-50 border-purple-100"
  },
  {
    id: "siddha",
    name: "Siddha",
    description: "One of the oldest systems of medicine originating in South India, emphasizing the balance of body elements.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-amber-700">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
        <path d="M12 8v4"></path>
        <path d="M12 16h.01"></path>
      </svg>
    ),
    color: "bg-amber-50 border-amber-100"
  },
  {
    id: "homeopathy",
    name: "Homeopathy",
    description: "A medical system based on the belief that the body can heal itself, using highly diluted substances.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-teal-700">
        <path d="M19 15c-1.39-1.98-3.5-3.5-6-3.5"></path>
        <path d="M5 15a9 9 0 0 1 13-5.5"></path>
        <path d="M12 3a2 2 0 0 1 0 4 9 9 0 0 1-9 9 2 2 0 0 1 0-4 9 9 0 0 1 9-9Z"></path>
      </svg>
    ),
    color: "bg-teal-50 border-teal-100"
  }
];

const AyushSystems = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AYUSH Medical Systems</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the five traditional medical systems that form AYUSH: Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {systems.map((system) => (
            <Card key={system.id} className={`border ${system.color} hover:shadow-md transition-shadow`}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">
                  {system.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{system.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{system.description}</p>
                <Link 
                  to={`/plants?system=${system.id}`} 
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Plants
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AyushSystems;
