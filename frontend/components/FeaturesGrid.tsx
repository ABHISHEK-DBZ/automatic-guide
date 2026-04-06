'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MessageCircle, 
  Brain, 
  BarChart3, 
  Code2, 
  Users, 
  Calendar, 
  Eye,
  Check,
  Play
} from 'lucide-react';

// Mini Preview Components
function ChatPreview() {
  const [showResponse, setShowResponse] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullResponse = "Quantum entanglement is a phenomenon where particles become correlated...";
  
  useEffect(() => {
    const timer = setTimeout(() => setShowResponse(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showResponse && typedText.length < fullResponse.length) {
      const timer = setTimeout(() => {
        setTypedText(fullResponse.slice(0, typedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [showResponse, typedText]);

  return (
    <div className="space-y-3 p-3 bg-gc-base/50 rounded-lg border border-white/5">
      {/* User message */}
      <div className="flex justify-end">
        <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg px-3 py-2 max-w-[80%]">
          <p className="text-xs text-cyan-300">What is quantum entanglement?</p>
        </div>
      </div>
      
      {/* AI response */}
      {showResponse && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2 max-w-[90%]">
            <p className="text-xs text-text-secondary">
              {typedText}
              {typedText.length < fullResponse.length && (
                <span className="animate-pulse">▌</span>
              )}
            </p>
            {typedText.length >= fullResponse.length && (
              <span className="inline-flex items-center mt-2 px-2 py-0.5 bg-cyan-500/20 rounded text-[10px] text-cyan-400">
                [1] Physics Notes
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function QuizPreview() {
  const [selected, setSelected] = useState<number | null>(null);
  
  const options = [
    { text: "Speed of light", correct: false },
    { text: "Gravitational constant", correct: false },
    { text: "Planck's constant", correct: true },
    { text: "Boltzmann constant", correct: false },
  ];

  return (
    <div className="p-3 bg-gc-base/50 rounded-lg border border-white/5 space-y-3">
      <p className="text-xs text-text-primary font-medium">Which constant defines quantum scales?</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left text-xs px-3 py-2 rounded-md border transition-all duration-200 ${
              selected === i
                ? opt.correct
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-500/20 border-red-500/50 text-red-300'
                : 'bg-white/5 border-white/10 text-text-secondary hover:border-cyan-500/30'
            }`}
          >
            {opt.text}
            {selected === i && opt.correct && <Check className="inline w-3 h-3 ml-2" />}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center pt-2">
        <span className="text-[10px] text-text-muted">Question 8 of 10</span>
        <span className="px-2 py-1 bg-emerald-500/20 rounded text-[10px] text-emerald-400">8/10 ✓</span>
      </div>
    </div>
  );
}

function MasteryPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const subjects = [
    { name: "Physics", progress: 87, color: "cyan" },
    { name: "Math", progress: 62, color: "purple" },
    { name: "Chemistry", progress: 91, color: "emerald" },
    { name: "Biology", progress: 45, color: "amber" },
    { name: "History", progress: 78, color: "blue" },
  ];

  return (
    <div ref={ref} className="flex justify-center gap-4 p-4">
      {subjects.map((subject, i) => (
        <div key={subject.name} className="flex flex-col items-center gap-2">
          <div className="relative w-12 h-12">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke={`var(--color-${subject.color})`}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={125.6}
                initial={{ strokeDashoffset: 125.6 }}
                animate={isInView ? { strokeDashoffset: 125.6 * (1 - subject.progress / 100) } : {}}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  '--color-cyan': '#00D4FF',
                  '--color-purple': '#7C3AED',
                  '--color-emerald': '#10B981',
                  '--color-amber': '#F59E0B',
                  '--color-blue': '#3B82F6',
                } as React.CSSProperties}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-text-primary">
              {subject.progress}%
            </span>
          </div>
          <span className="text-[9px] text-text-muted">{subject.name}</span>
        </div>
      ))}
    </div>
  );
}

function CodePreview() {
  const [output, setOutput] = useState<string | null>(null);
  
  const code = [
    { text: 'def fibonacci(n):', indent: 0 },
    { text: '    a, b = 0, 1', indent: 1 },
    { text: '    for _ in range(n):', indent: 1 },
    { text: '        yield a', indent: 2 },
    { text: '        a, b = b, a+b', indent: 2 },
  ];

  return (
    <div className="p-3 bg-gc-base/50 rounded-lg border border-white/5 space-y-3">
      <div className="font-mono text-[11px] space-y-0.5">
        {code.map((line, i) => (
          <div key={i} style={{ paddingLeft: `${line.indent * 12}px` }}>
            <span className="text-purple-400">
              {line.text.match(/^(def|for|yield)/)?.[0]}
            </span>
            <span className="text-text-secondary">
              {line.text.replace(/^(def|for|yield)/, '')}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setOutput('[1, 1, 2, 3, 5, 8]')}
          className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-400 hover:bg-amber-500/30 transition-colors"
        >
          <Play className="w-3 h-3" /> Run
        </button>
        {output && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 px-2 py-1 bg-white/5 rounded text-[10px] text-emerald-400 font-mono"
          >
            Output: {output}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TeachBackPreview() {
  return (
    <div className="relative flex flex-col items-center gap-3 p-4">
      {/* CSS-only confused student face */}
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full border-2 border-white/10" />
        {/* Eyes */}
        <div className="absolute top-5 left-4 w-2 h-2 bg-text-primary rounded-full" />
        <div className="absolute top-5 right-4 w-2 h-2 bg-text-primary rounded-full" />
        {/* Confused mouth */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-text-secondary rounded-full rotate-12" />
        {/* Question marks */}
        <span className="absolute -top-2 -right-2 text-lg text-cyan-400">?</span>
        <span className="absolute top-0 -left-3 text-sm text-purple-400">?</span>
      </div>
      
      {/* Speech bubble */}
      <div className="relative bg-white/10 rounded-lg px-3 py-2 border border-white/10">
        <p className="text-[10px] text-text-secondary">&quot;So photosynthesis converts...&quot;</p>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-l border-t border-white/10" />
      </div>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[11px] text-emerald-400 font-medium"
      >
        Grade: A-
      </motion.div>
    </div>
  );
}

function SpacedRepPreview() {
  const weeks = 4;
  const days = 7;
  
  // Generate random heat values
  const heatmap = Array.from({ length: weeks * days }, () => Math.random());
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-1">
        {heatmap.map((heat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className="w-5 h-5 rounded-sm"
            style={{
              backgroundColor: heat < 0.2 
                ? 'rgba(0,212,255,0.1)'
                : heat < 0.5
                ? 'rgba(0,212,255,0.3)'
                : heat < 0.8
                ? 'rgba(0,212,255,0.5)'
                : 'rgba(0,212,255,0.8)',
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-3 text-[9px] text-text-muted">
        <span>Less</span>
        <div className="flex gap-1">
          {[0.1, 0.3, 0.5, 0.8].map((opacity) => (
            <div
              key={opacity}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: `rgba(0,212,255,${opacity})` }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

function AttentionPreview() {
  const [attention, setAttention] = useState(94);
  const chartRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAttention(prev => Math.max(75, Math.min(100, prev + (Math.random() - 0.5) * 4)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simple line chart
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const data = Array.from({ length: 20 }, () => 75 + Math.random() * 25);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#7C3AED';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * canvas.width;
      const y = canvas.height - ((val - 70) / 35) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    
    ctx.stroke();
    
    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(124,58,237,0.3)');
    gradient.addColorStop(1, 'rgba(124,58,237,0)');
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        {/* Webcam frame */}
        <div className="w-16 h-12 bg-gc-base border border-white/10 rounded-lg flex items-center justify-center">
          <Eye className="w-5 h-5 text-purple-400" />
        </div>
        
        {/* Attention gauge */}
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-text-muted">Focus Level</span>
            <span className="text-sm font-mono text-purple-400">{Math.round(attention)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              animate={{ width: `${attention}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
      
      {/* Mini chart */}
      <canvas ref={chartRef} width={200} height={50} className="w-full h-12" />
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    category: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
    preview: React.ReactNode;
  };
  colSpan: number;
  index: number;
}

function FeatureCard({ feature, colSpan, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = feature.icon;
  const colorStyles: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    coral: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative col-span-12 md:col-span-${colSpan} gc-card overflow-hidden group`}
      style={{
        gridColumn: `span ${colSpan} / span ${colSpan}`,
      }}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-60"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,212,255,0.06), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-20 p-6 h-full flex flex-col">
        {/* Category label */}
        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded border ${colorStyles[feature.color]} w-fit mb-4`}>
          <Icon className="w-3 h-3" />
          <span className="text-xs font-mono">{feature.category}</span>
        </div>

        {/* Title & Description */}
        <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          {feature.description}
        </p>

        {/* Mini Preview */}
        <div className="mt-auto">
          {feature.preview}
        </div>
      </div>
    </motion.div>
  );
}

// Features data
const features = [
  {
    title: "RAG-Powered Chat",
    description: "Ask anything about your study materials. Get instant answers with citations from your uploaded documents.",
    category: "AI CHAT",
    color: "cyan",
    icon: MessageCircle,
    preview: <ChatPreview />,
    colSpan: 7,
  },
  {
    title: "Adaptive Quizzes",
    description: "AI-generated questions that adapt to your knowledge level. Master concepts through active recall.",
    category: "ASSESSMENT",
    color: "purple",
    icon: Brain,
    preview: <QuizPreview />,
    colSpan: 5,
  },
  {
    title: "Mastery Tracking",
    description: "Visual progress across all your subjects. Know exactly where to focus.",
    category: "ANALYTICS",
    color: "emerald",
    icon: BarChart3,
    preview: <MasteryPreview />,
    colSpan: 4,
  },
  {
    title: "Code Sandbox",
    description: "Write, run, and test code with AI assistance. Perfect for CS students.",
    category: "DEVELOPMENT",
    color: "amber",
    icon: Code2,
    preview: <CodePreview />,
    colSpan: 4,
  },
  {
    title: "Teach-Back Mode",
    description: "Explain concepts back to AI and get graded. Teaching is the best way to learn.",
    category: "PEDAGOGY",
    color: "coral",
    icon: Users,
    preview: <TeachBackPreview />,
    colSpan: 4,
  },
  {
    title: "Spaced Repetition",
    description: "Never forget what you learn. Smart scheduling based on memory science.",
    category: "MEMORY",
    color: "blue",
    icon: Calendar,
    preview: <SpacedRepPreview />,
    colSpan: 5,
  },
  {
    title: "Attention Monitor",
    description: "Real-time focus tracking using your webcam. Stay in the zone with AI assistance.",
    category: "BIOMETRICS",
    color: "violet",
    icon: Eye,
    preview: <AttentionPreview />,
    colSpan: 7,
  },
];

// Main Features Grid
export default function FeaturesGrid() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gc-base" />
      <div className="absolute inset-0 gc-grid-bg opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-cyan-400 tracking-wider">FEATURES</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-primary mt-4 mb-6">
            Everything you need to
            <span className="gc-text-gradient"> learn smarter</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A complete learning ecosystem powered by local AI. No cloud dependencies, 
            full privacy, maximum performance.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              colSpan={feature.colSpan}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
