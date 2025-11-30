import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSystem from '@/components/AboutSystem';
import Features from '@/components/Features';
// import { AuroraBackground } from '@/components/ui/aurora-background';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <HeroSection />
        
             <Features />
        <AboutSystem />
   
      </main>

      <Footer />
    </div>
  );
}
