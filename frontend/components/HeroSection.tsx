'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Github, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Terminal animation sequence
const TERMINAL_SEQUENCE = [
  { type: 'command', text: 'gurucortex init --mode=autonomous', delay: 0 },
  { type: 'status', text: '▸ Booting neural pathways...', delay: 400 },
  { type: 'check', text: '✓ Loading LLM (Mistral-7B-v0.2)', delay: 600 },
  { type: 'check', text: '✓ Initializing Vector Store (ChromaDB)', delay: 200 },
  { type: 'check', text: '✓ Establishing Local Data Stream', delay: 200 },
  { type: 'ready', text: '▸ System ready. Awaiting input', delay: 800 },
];

// Typewriter component for terminal animation
function TypewriterText({ 
  text, 
  onComplete, 
  speed = 80,
  className = '' 
}: { 
  text: string; 
  onComplete?: () => void; 
  speed?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span className={className}>{displayText}</span>;
}

// Terminal Line Component
function TerminalLine({ 
  item, 
  onComplete,
  isActive = false 
}: { 
  item: typeof TERMINAL_SEQUENCE[0]; 
  onComplete?: () => void;
  isActive?: boolean;
}) {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (item.type === 'ready') {
      const interval = setInterval(() => setShowCursor(prev => !prev), 500);
      return () => clearInterval(interval);
    }
  }, [item.type]);

  const baseStyles = 'font-mono text-[13px] leading-relaxed';
  
  const typeStyles = {
    command: 'text-cyan-400',
    status: 'text-purple-400/70 italic',
    check: 'text-emerald-400',
    ready: 'text-cyan-400',
  };

  if (item.type === 'command') {
    return (
      <div className={`${baseStyles} ${typeStyles[item.type]}`}>
        <span className="text-purple-400">$ </span>
        {isActive ? (
          <TypewriterText text={item.text} onComplete={onComplete} />
        ) : (
          <span>{item.text}</span>
        )}
        {isActive && <span className="animate-cursor-blink ml-0.5">▌</span>}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`${baseStyles} ${typeStyles[item.type]}`}
      onAnimationComplete={onComplete}
    >
      {item.text}
      {item.type === 'ready' && (
        <span className={`ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
      )}
    </motion.div>
  );
}

// Animated Terminal Component
function AnimatedTerminal() {
  const [lines, setLines] = useState<typeof TERMINAL_SEQUENCE>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [key, setKey] = useState(0);

  const addNextLine = useCallback(() => {
    if (currentIndex < TERMINAL_SEQUENCE.length) {
      const currentItem = TERMINAL_SEQUENCE[currentIndex];
      setTimeout(() => {
        setLines(prev => [...prev, currentItem]);
        setCurrentIndex(prev => prev + 1);
        if (currentItem.type === 'command') {
          setIsTyping(true);
        } else {
          setIsTyping(false);
        }
      }, currentItem.delay);
    } else {
      // Restart after 3 seconds
      setTimeout(() => {
        setLines([]);
        setCurrentIndex(0);
        setIsTyping(true);
        setKey(prev => prev + 1);
      }, 3000);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === 0) {
      addNextLine();
    }
  }, [currentIndex, addNextLine, key]);

  const handleLineComplete = () => {
    setIsTyping(false);
    addNextLine();
  };

  return (
    <div className="gc-terminal w-full max-w-[540px] shadow-gc-card">
      {/* Window chrome */}
      <div className="gc-terminal-header">
        <div className="gc-terminal-dot gc-terminal-dot-red" />
        <div className="gc-terminal-dot gc-terminal-dot-yellow" />
        <div className="gc-terminal-dot gc-terminal-dot-green" />
        <span className="ml-auto text-xs text-text-muted font-mono">
          gurucortex@localhost
        </span>
      </div>
      
      {/* Terminal body */}
      <div className="gc-terminal-body min-h-[200px] space-y-2">
        <AnimatePresence mode="wait">
          {lines.map((line, index) => (
            <TerminalLine
              key={`${key}-${index}`}
              item={line}
              isActive={index === lines.length - 1 && isTyping}
              onComplete={index === lines.length - 1 ? handleLineComplete : undefined}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Trust Badge Component
function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-text-muted">
      <span className="text-cyan-500/60">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

// Main Hero Section
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gc-base" />
      <div className="absolute inset-0 gc-grid-bg" />
      <div className="absolute inset-0 gc-glow-purple" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-emerald-400">SYSTEM ACTIVE</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight">
                <span className="text-text-primary">The Ultimate</span>
                <br />
                <span className="gc-text-gradient">Cognitive OS</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed">
                Transform how you learn with AI-powered study sessions, 
                adaptive quizzes, and real-time attention monitoring — all running locally.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gc-btn-primary w-full sm:w-auto px-8 py-4 text-base font-semibold flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="gc-btn-secondary w-full sm:w-auto px-8 py-4 text-base font-medium flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <TrustBadge 
                icon={<Github className="w-4 h-4" />} 
                text="Open Source" 
              />
              <TrustBadge 
                icon={<Sparkles className="w-4 h-4" />} 
                text="Local RAG" 
              />
              <TrustBadge 
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                } 
                text="Zero Cloud" 
              />
            </div>
          </motion.div>

          {/* Right Side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow behind terminal */}
            <div className="absolute inset-0 bg-glow-purple scale-150 opacity-50" />
            
            <AnimatedTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
