import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

interface Project {
  num: string;
  name: string;
  category: string;
  date: string;
  techStack: string;
  description: string[];
  imgLeftTop: string;
  imgLeftBottom: string;
  imgRight: string;
  link: string;
  hasLiveLink?: boolean;
  imageFit?: "cover" | "contain" | "fill";
}

const PROJECTS: Project[] = [
  {
    num: "01",
    name: "LLM Hallucination Detector",
    category: "Chrome Extension / NLP",
    date: "March 2026",
    techStack: "Python, LLMs, NLP, Chrome Extension APIs, FastAPI, React",
    description: [
      "Built end-to-end hallucination detection system for LLM responses, spanning model research, API design, frontend development, and browser extension deployment.",
      "Demonstrates model capabilities: Model selection → System architecture → API development → Frontend integration → Production deployment."
    ],
    imgLeftTop: "/hallucination.jpg",
    imgLeftBottom: "/hallucination.jpg",
    imgRight: "/hallucination.jpg",
    link: "https://github.com/eshaan-eshaan",
    imageFit: "fill"
  },
  {
    num: "02",
    name: "VoteSphere - Secure Voting System",
    category: "Full-Stack Development",
    date: "February 2025",
    techStack: "React.js, Node.js, Express.js, MySQL, RESTful APIs, Render",
    description: [
      "Designed RESTful API, architected and deployed a full-stack secure voting platform with end-to-end encryption and real-time vote tracking.",
      "Built responsive React frontend with an intuitive UI/UX for both voters and administrators, deployed on cloud platform (Render) with MySQL database integration and load balancing."
    ],
    imgLeftTop: "/votesphere.jpg",
    imgLeftBottom: "/votesphere.jpg",
    imgRight: "/votesphere.jpg",
    link: "https://votesphere-eshaan-guliani.onrender.com/",
    hasLiveLink: true,
    imageFit: "fill"
  },
  {
    num: "03",
    name: "Deepfake Detection System",
    category: "Computer Vision & Deep Learning",
    date: "March 2026",
    techStack: "Python, TensorFlow, Keras, CNNs, Google Colab, OpenCV",
    description: [
      "Designed and trained CNN-based deepfake detection model achieving 86% accuracy on manipulated video content.",
      "Built complete ML pipeline: Data preprocessing → Feature engineering → Model architecture design → Training optimization → Hyperparameter tuning.",
      "Implemented transfer learning and data augmentation strategies to improve model generalization.",
      "Created comprehensive technical documentation and demo presentations.",
      "Future roadmap: V2 (92% accuracy target), V3 (real-time deployment), demonstrating product thinking beyond just model training."
    ],
    imgLeftTop: "/deepfake.jpg",
    imgLeftBottom: "/deepfake.jpg",
    imgRight: "/deepfake.jpg",
    link: "https://github.com/eshaan-eshaan",
    imageFit: "fill"
  }
];

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  totalCards: number;
}> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the parent container to drive the scale down effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale down from 1.0 to targetScale as we scroll past it
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Keep track of responsive top offset for sticky positioning
  const [topOffset, setTopOffset] = useState(96);

  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth >= 768) {
        setTopOffset(128); // md:top-32 = 128px
      } else {
        setTopOffset(96);  // top-24 = 96px
      }
    };
    
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="min-h-[85vh] lg:h-[85vh] flex flex-col justify-start relative w-full mb-12 sm:mb-20 last:mb-0"
    >
      <motion.div
        style={{ 
          scale,
          top: `${topOffset + index * 28}px`,
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}
        className="sticky w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 lg:h-[72vh] overflow-hidden"
      >
        {/* Top Row */}
        <div className="flex flex-row items-center justify-between gap-4 w-full border-b border-[#D7E2EA]/15 pb-4">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Huge Number */}
            <div 
              className="font-black text-[#D7E2EA] select-none leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            >
              {project.num}
            </div>

            {/* Title & Category */}
            <div className="flex flex-col justify-center">
              <span className="text-[#D7E2EA] opacity-60 text-xs sm:text-sm uppercase tracking-widest font-light">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-semibold text-base sm:text-xl md:text-2xl uppercase tracking-wider">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Live Link Button */}
          {project.hasLiveLink && (
            <LiveProjectButton onClick={() => window.open(project.link, '_blank')} />
          )}
        </div>

        {/* Bottom Row - Responsive Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full flex-grow min-h-0 items-stretch overflow-hidden">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 flex flex-col justify-start h-full min-h-0 gap-3 pb-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-[#D7E2EA]/40 text-xs uppercase tracking-wider font-light">Timeline & Stack</span>
              <div className="text-sm font-medium tracking-wide text-[#D7E2EA]/85">
                {project.date} <span className="opacity-30 mx-2">|</span> {project.techStack}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-3 mt-2 overflow-y-auto pr-2 custom-scrollbar">
              {project.description.map((bullet, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="text-[#B600A8] font-bold mt-1.5 select-none text-[10px]">■</span>
                  <p className="text-[#D7E2EA]/75 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Single Image */}
          <div className="lg:col-span-7 h-full min-h-[220px] lg:min-h-0 relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#151515] flex items-center justify-center">
            <img 
              src={project.imgRight} 
              alt={project.name} 
              className={`w-full h-full ${
                project.imageFit === 'contain' 
                  ? 'object-contain p-2 sm:p-4' 
                  : project.imageFit === 'fill' 
                    ? 'object-fill' 
                    : 'object-cover'
              } select-none pointer-events-none rounded-[24px] sm:rounded-[32px] hover:scale-[1.03] transition-transform duration-500`}
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section 
      id="projects" 
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 pb-32 relative"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2 
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Projects
          </h2>
        </FadeIn>

        {/* Stacking Cards List */}
        <div className="flex flex-col mt-16 sm:mt-24 w-full">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.num}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
