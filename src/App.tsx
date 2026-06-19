import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { TechBadge } from './components/TechBadge';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip selection:bg-[#B600A8]/30">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Section */}
      <SkillsSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* 6. Video Contact Section */}
      <ContactSection />

      {/* Floating Tech Badge */}
      <TechBadge />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
