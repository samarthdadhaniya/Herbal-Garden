
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedPlants from "@/components/FeaturedPlants";
import AyushSystems from "@/components/AyushSystems";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedPlants />
        <AyushSystems />
        {/* <CTA /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
