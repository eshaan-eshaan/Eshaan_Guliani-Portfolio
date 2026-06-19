import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Server, Zap } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface SkillItem {
  num: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

const SKILLS: SkillItem[] = [
  {
    num: "01",
    name: "AI/ML Development",
    description: "Deep Learning (CNNs, Transfer Learning) | LLM Applications (RAG, CAG, NLP, Supervised Learning Prompt Engineering) | Model Training & Optimization | TensorFlow, Keras, PyTorch | Google Colab",
    icon: <Brain size={32} strokeWidth={2.5} />,
    gradient: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
    delay: 0.1
  },
  {
    num: "02",
    name: "Full-Stack Development",
    description: "React.js, Node.js, Threejs etc. | Python (Flask, FastAPI) | RESTful API Design | Database Design (MySQL, Firebase), Android Studio",
    icon: <Code size={32} strokeWidth={2.5} />,
    gradient: "linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)",
    delay: 0.2
  },
  {
    num: "03",
    name: "Deployment & Infrastructure",
    description: "Cloud Platforms (Render, Vercel) | Production Deployment | System Architecture | Performance Optimization | 99.2% Uptime Management",
    icon: <Server size={32} strokeWidth={2.5} />,
    gradient: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
    delay: 0.3
  },
  {
    num: "04",
    name: "AI Product Thinking",
    description: "End-to-End System Design | Model-to-Production Workflows | Business Impact Analysis | Technical Documentation | N8N Automation",
    icon: <Zap size={32} strokeWidth={2.5} />,
    gradient: "linear-gradient(137deg, #A855F7 0%, #F472B6 45%, #F59E0B 100%)",
    delay: 0.4
  }
];

const FeatureCard: React.FC<{
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}> = ({ num, title, description, icon, gradient, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="relative flex flex-col justify-start items-stretch w-full group mx-auto mb-8 last:mb-0 z-10"
    >
      {/* Glow Background (Crucial) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60 rounded-[32px] sm:rounded-[40px] pointer-events-none transition-opacity duration-300 group-hover:opacity-80 z-0"
        style={{ 
          background: gradient,
          filter: "blur(45px)"
        }}
      />

      {/* Foreground Card with Gradient Border (Crucial) */}
      <div 
        className="relative self-stretch rounded-[32px] sm:rounded-[40px] z-10 overflow-hidden"
        style={{
          border: '8px solid transparent',
          background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box`
        }}
      >
        {/* Content Inner Layout: Row on desktop, column on mobile */}
        <div className="w-full p-6 sm:p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          {/* Left Block: Number & Icon */}
          <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
            {/* Large Number */}
            <div className="font-black text-white/20 select-none leading-none text-4xl sm:text-5xl font-mono">
              {num}
            </div>
            
            {/* Divider */}
            <div className="h-8 w-px bg-white/10 hidden md:block" />

            {/* Icon Wrapper */}
            <div className="text-white/90 p-2.5 sm:p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
              {icon}
            </div>
          </div>

          {/* Right Block: Title & Description */}
          <div className="flex-grow flex flex-col gap-1.5 md:pl-2">
            <h3 className="text-white font-medium text-lg sm:text-xl tracking-tight uppercase">
              {title}
            </h3>
            <p className="text-gray-400 text-[14px] leading-[1.6] font-normal selection:bg-white/20">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
  return (
    <section 
      id="skills" 
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 overflow-hidden"
    >
      <div className="max-w-[936px] mx-auto flex flex-col">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-24">
          <h2 
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Skills
          </h2>
        </FadeIn>

        {/* Feature Cards List (Vertical stack) */}
        <div className="flex flex-col w-full relative z-10">
          {SKILLS.map((item) => (
            <FeatureCard 
              key={item.num}
              num={item.num}
              title={item.name}
              description={item.description}
              icon={item.icon}
              gradient={item.gradient}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
