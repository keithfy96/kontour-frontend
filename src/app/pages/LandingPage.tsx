import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { HowItWorks } from '../components/HowItWorks';
import { CoreIdeas } from '../components/CoreIdeas';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F1115]">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <CoreIdeas />
    </div>
  );
}
