import { lazy, Suspense } from "react";
import { Navbar } from "@/components/NavBar";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "@/components/HeroSection";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";


const AboutSection = lazy(() => import("@/components/AboutSection").then(module => ({ default: module.AboutSection })));
const SkillsSection = lazy(() => import("@/components/SkillsSection").then(module => ({ default: module.SkillsSection })));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection").then(module => ({ default: module.ProjectsSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(module => ({ default: module.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));


const SectionLoader = () => (
  <div className="py-24 px-4">
    <div className="container mx-auto max-w-5xl">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Toggle */}
      {/* <ThemeToggle /> */}
      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <SkillsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>

      {/* Performance Monitor (Development Only) */}
      <PerformanceMonitor />
    </div>
  );
};
