import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn 
        delay={0} 
        y={-20} 
        as="nav" 
        className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8 z-20 relative"
      >
        <a href="#about" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
          About
        </a>
        <a href="#skills" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
          Skills
        </a>
        <a href="#projects" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
          Projects
        </a>
        <a href="#contact" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
          Contact
        </a>
      </FadeIn>

      {/* 2. Hero Heading in Overflow-Hidden Container */}
      <div className="flex-grow flex items-start sm:items-center justify-center w-full overflow-hidden relative select-none pt-16 sm:pt-0">
        <FadeIn delay={0.15} y={40} className="w-full text-center">
          <h1 className="hero-heading font-black uppercase tracking-normal leading-none whitespace-nowrap w-full text-[9vw] sm:text-[9.5vw] md:text-[10vw] lg:text-[10.5vw] mt-6 sm:mt-4 md:-mt-2">
            Hi, i&apos;m eshaan
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Centered Absolutely in Wrapper to prevent Framer Motion translate conflicts) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[160px] sm:w-[240px] md:w-[300px] lg:w-[360px] max-h-[42vh] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none flex items-center justify-center">
        <FadeIn
          delay={0.6}
          y={30}
          className="w-full h-full pointer-events-auto flex items-center justify-center"
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src="/portrait.png"
              alt="Eshaan Portrait"
              className="w-full h-auto max-h-[42vh] object-contain select-none pointer-events-none"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-5 sm:gap-0 pb-8 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 relative w-full text-center sm:text-left">
        <FadeIn delay={0.35} y={20}>
          <p 
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[280px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            an ai generalist driven by crafting intelligent and high-impact systems
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="w-full sm:w-auto flex justify-center sm:block">
          <ContactButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
        </FadeIn>
      </div>
    </section>
  );
};
