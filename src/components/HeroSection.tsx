
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-herbal-cream to-white py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533038590840-1f704af5abb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-[0.03]"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-2 bg-herbal-green-light/10 rounded-full mb-4">
            <Leaf className="h-5 w-5 text-herbal-leaf mr-2" />
            <span className="text-sm font-medium text-herbal-green-dark">Interactive AYUSH Herbal Garden</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl animate-fade-in">
            Explore the World of <span className="text-herbal-green-dark">Medicinal Plants</span> in 3D
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Discover the healing properties of AYUSH medicinal plants through an immersive 3D experience and detailed database.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/garden">
                Enter Virtual Garden
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/plants">Browse Plant Database</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
            <div className="w-12 h-12 bg-herbal-green-light/20 rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-herbal-green-dark" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Explore AYUSH Systems</h3>
            <p className="text-muted-foreground">
              Discover plants from Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
            <div className="w-12 h-12 bg-herbal-green-light/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-herbal-green-dark">
                <path d="M21 9V3H15"></path>
                <path d="M3 15v6h6"></path>
                <path d="M21 3l-9 9"></path>
                <path d="M3 21l9-9"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive 3D Models</h3>
            <p className="text-muted-foreground">
              Rotate, zoom, and explore detailed 3D models of medicinal plants.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-herbal-sage/20">
            <div className="w-12 h-12 bg-herbal-green-light/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-herbal-green-dark">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
                <path d="M8 7h6"></path>
                <path d="M8 11h8"></path>
                <path d="M8 15h6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Database</h3>
            <p className="text-muted-foreground">
              Access detailed information about medicinal properties, uses, and cultivation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
