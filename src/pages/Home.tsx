import { StarBackground } from "@/components/StarBackground";
import { Navbar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background Effects */}
      <StarBackground />

      {/* Main Content */}
      <HeroSection />

      {/* Footer */}
    </div>
  );
};
