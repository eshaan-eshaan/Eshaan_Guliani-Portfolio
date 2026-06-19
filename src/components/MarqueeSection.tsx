import React, { useEffect, useRef } from 'react';

interface MarqueeItem {
  url: string;
  glowColor: string;
}

const ITEMS: MarqueeItem[] = [
  {
    url: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    glowColor: "rgba(168, 85, 247, 0.6)" // Purple
  },
  {
    url: "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    glowColor: "rgba(34, 197, 94, 0.6)" // Green
  },
  {
    url: "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    glowColor: "rgba(6, 182, 212, 0.6)" // Cyan
  },
  {
    url: "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    glowColor: "rgba(236, 72, 153, 0.6)" // Pink
  },
  {
    url: "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    glowColor: "rgba(59, 130, 246, 0.6)" // Blue
  },
  {
    url: "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    glowColor: "rgba(249, 115, 22, 0.6)" // Orange
  },
  {
    url: "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    glowColor: "rgba(234, 179, 8, 0.6)" // Yellow
  },
  {
    url: "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    glowColor: "rgba(16, 185, 129, 0.6)" // Emerald
  },
  {
    url: "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    glowColor: "rgba(14, 165, 233, 0.6)" // Sky Blue
  },
  {
    url: "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    glowColor: "rgba(239, 68, 68, 0.6)" // Red
  },
  {
    url: "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    glowColor: "rgba(236, 72, 153, 0.6)" // Rose
  },
  {
    url: "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    glowColor: "rgba(139, 92, 246, 0.6)" // Indigo
  },
  {
    url: "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    glowColor: "rgba(251, 191, 36, 0.6)" // Gold
  },
  {
    url: "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    glowColor: "rgba(99, 102, 241, 0.6)" // Violet-blue
  },
  {
    url: "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    glowColor: "rgba(20, 184, 166, 0.6)" // Teal
  },
  {
    url: "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    glowColor: "rgba(99, 102, 241, 0.6)" // Indigo
  },
  {
    url: "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    glowColor: "rgba(168, 85, 247, 0.6)" // Purple
  },
  {
    url: "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    glowColor: "rgba(244, 63, 94, 0.6)" // Rose
  },
  {
    url: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    glowColor: "rgba(34, 197, 94, 0.6)" // Green
  },
  {
    url: "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    glowColor: "rgba(251, 146, 60, 0.6)" // Light Orange
  },
  {
    url: "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
    glowColor: "rgba(124, 58, 237, 0.6)" // Violet
  }
];

const ROW1_ITEMS = ITEMS.slice(0, 11);
const ROW2_ITEMS = ITEMS.slice(11);

// Triple the arrays for seamless scrolling cover
const TRIPLED_ROW1 = [...ROW1_ITEMS, ...ROW1_ITEMS, ...ROW1_ITEMS];
const TRIPLED_ROW2 = [...ROW2_ITEMS, ...ROW2_ITEMS, ...ROW2_ITEMS];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;
    let targetSkew = 0;
    let currentSkew = 0;
    let rafId: number;

    const handleScroll = () => {
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (!section || !row1 || !row2) return;

      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const currentTime = performance.now();

      // Update position metrics only when the section is in the viewport
      if (rect.top < winHeight && rect.bottom > 0) {
        // Velocity-based Skew calculation
        const deltaY = scrollY - lastScrollY;
        const deltaTime = Math.max(1, currentTime - lastTime);
        velocity = deltaY / deltaTime; // pixels per millisecond
        
        // Map velocity to target skew (clamp to max 12 degrees to keep it readable)
        targetSkew = Math.max(-12, Math.min(12, velocity * 6));
      }

      lastScrollY = scrollY;
      lastTime = currentTime;
    };

    const updateSkew = () => {
      // Lerp current skew towards target skew
      currentSkew += (targetSkew - currentSkew) * 0.08;
      
      // Decay target skew back to 0
      targetSkew *= 0.85;

      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (section && row1 && row2) {
        const rect = section.getBoundingClientRect();
        const winHeight = window.innerHeight;
        if (rect.top < winHeight && rect.bottom > 0) {
          const scrollY = window.scrollY;
          const sectionTop = rect.top + scrollY;
          const val = (scrollY - sectionTop + winHeight) * 0.3;
          const row1X = val - 200;
          const row2X = -(val - 200);
          
          row1.style.transform = `translate3d(${row1X}px, 0, 0) skewX(${currentSkew}deg)`;
          row2.style.transform = `translate3d(${row2X}px, 0, 0) skewX(${-currentSkew}deg)`;
        }
      }

      rafId = requestAnimationFrame(updateSkew);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial call
    handleScroll();
    rafId = requestAnimationFrame(updateSkew);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full flex flex-col gap-5 select-none"
    >
      {/* Row 1: Scrolls Right */}
      <div className="w-full overflow-hidden flex">
        <div 
          ref={row1Ref}
          className="flex gap-4 whitespace-nowrap py-4"
          style={{ willChange: 'transform' }}
        >
          {TRIPLED_ROW1.map((item, index) => (
            <div 
              key={`row1-${index}`} 
              className="flex-shrink-0 w-[420px] h-[270px] relative group"
            >
              {/* Glowing Backdrop behind the card */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none rounded-2xl z-0"
                style={{
                  background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 75%)`,
                  filter: 'blur(35px)'
                }}
              />

              {/* Foreground Card */}
              <div 
                className="relative w-full h-full overflow-hidden rounded-2xl bg-[#151516] border transition-all duration-500 hover:scale-[1.03] z-10"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.glowColor;
                  e.currentTarget.style.boxShadow = `0 0 15px ${item.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolls Left */}
      <div className="w-full overflow-hidden flex">
        <div 
          ref={row2Ref}
          className="flex gap-4 whitespace-nowrap py-4"
          style={{ willChange: 'transform' }}
        >
          {TRIPLED_ROW2.map((item, index) => (
            <div 
              key={`row2-${index}`} 
              className="flex-shrink-0 w-[420px] h-[270px] relative group"
            >
              {/* Glowing Backdrop behind the card */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none rounded-2xl z-0"
                style={{
                  background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 75%)`,
                  filter: 'blur(35px)'
                }}
              />

              {/* Foreground Card */}
              <div 
                className="relative w-full h-full overflow-hidden rounded-2xl bg-[#151516] border transition-all duration-500 hover:scale-[1.03] z-10"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.glowColor;
                  e.currentTarget.style.boxShadow = `0 0 15px ${item.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
