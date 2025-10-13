import type { Metadata } from "next";
import Navigation from '@/components/Navigation';
import LoginForm from '@/components/LoginForm';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { AuroraBackground } from '@/components/ui/aurora-background';

export const metadata: Metadata = {
  title: "Login | DPR Quality Assessment System | MDoNER",
  description: "Login to access the AI-powered DPR assessment portal for project evaluation and risk prediction.",
};

export default function LoginPage() {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="min-h-screen relative overflow-hidden">
        {/* Flickering Grid Background */}
        <div className="fixed inset-0 z-0">
          <FlickeringGrid
            className="w-full h-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.1}
            flickerChance={0.05}
          />
        </div>
        
        <Navigation />
      
        {/* Main Content Area */}
        <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-8 relative z-20">
          <div className="max-w-md w-full bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 relative z-30 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Login to Portal
              </h1>
              <p className="text-gray-400">
                Access the DPR Assessment System
              </p>
            </div>

            <LoginForm />
          </div>
        </main>
      </div>
    </AuroraBackground>
  );
}