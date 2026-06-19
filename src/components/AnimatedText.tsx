import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharProps {
  char: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
}

const Char: React.FC<CharProps> = ({ char, index, progress, total }) => {
  const start = (index / total) * 0.9;
  const end = Math.min(1, start + 0.1);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder */}
      <span className="opacity-0">{char}</span>
      {/* Absolute positioned animated span */}
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {char}
      </motion.span>
    </span>
  );
};

interface WordProps {
  word: string;
  startIndex: number;
  progress: MotionValue<number>;
  totalChars: number;
}

const Word: React.FC<WordProps> = ({ word, startIndex, progress, totalChars }) => {
  const chars = word.split("");
  return (
    <span className="inline-block whitespace-nowrap">
      {chars.map((char, charIdx) => (
        <Char
          key={charIdx}
          char={char}
          index={startIndex + charIdx}
          progress={progress}
          total={totalChars}
        />
      ))}
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "", style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");

  // Pre-calculate word start character indices to keep render pure
  const wordIndices = useMemo(() => {
    const indices: number[] = [];
    let current = 0;
    for (const w of words) {
      indices.push(current);
      current += w.length + 1; // length of word + 1 space
    }
    return indices;
  }, [words]);

  return (
    <p 
      ref={containerRef} 
      className={`block text-justify ${className}`}
      style={style}
    >
      {words.map((word, wordIdx) => (
        <React.Fragment key={wordIdx}>
          <Word
            word={word}
            startIndex={wordIndices[wordIdx]}
            progress={scrollYProgress}
            totalChars={text.length}
          />
          {wordIdx < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </p>
  );
};
