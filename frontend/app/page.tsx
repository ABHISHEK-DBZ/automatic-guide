"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Zap,
  MessageSquare,
  FileText,
  BarChart,
  Layers,
  ArrowRight,
  Github,
  Twitter
} from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/10 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Bot size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">ZenForge</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#demo" className="hover:text-primary transition-colors">Live Demo</a>
            <a href="#docs" className="hover:text-primary transition-colors">Docs</a>
          </div>

          <button onClick={() => router.push('/dashboard')} className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Operational
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Your Local <br />
              <span className="text-gradient">Cognitive OS</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Experience the future of personal AI. 100% local, privacy-first, and designed to augment your intelligence without leaving your machine.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => router.push('/dashboard')} className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2 group">
                Launch Dashboard
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="h-12 px-8 rounded-full bg-secondary/50 border border-border/50 hover:bg-secondary/80 transition-all font-medium backdrop-blur-sm">
                View Documentation
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Github size={16} />
                <span>Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} />
                <span>Local RAG</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={16} />
                <span>Multimodal</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-2xl blur-3xl" />
            <div className="relative glass-card rounded-2xl p-6 md:p-8 border-t border-l border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">terminal — zsh</div>
              </div>

              <div className="space-y-4 font-mono text-sm leading-relaxed">
                <div className="flex gap-2">
                  <span className="text-primary">❯</span>
                  <span className="text-foreground">zenforge init --mode=autonomous</span>
                </div>
                <div className="text-muted-foreground">Initializing cognitive subsystems...</div>

                <div className="pl-4 border-l-2 border-primary/20 space-y-2 py-2 my-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <span>Loading LLM (Mistral-7B)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <span>Connecting Vector Store</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <span>Mounting Local Filesystem</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <span className="text-primary">❯</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            {/* Floating Features */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -bottom-6 glass-card p-4 rounded-xl flex items-center gap-3"
            >
              <div className="p-2 bg-green-500/20 rounded-lg text-green-500">
                <Brain size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Memory Usage</div>
                <div className="text-sm font-bold">Optimized</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Architecture of Intelligence</h2>
            <p className="text-muted-foreground">Built on advanced local-first principles, giving you the power of cloud AI with the privacy of an air-gapped machine.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MessageSquare />}
              title="Natural RAG"
              description="Chat with your documents naturally using advanced Retrieval Augmented Generation."
            />
            <FeatureCard
              icon={<FileText />}
              title="Document Insights"
              description="Extract summaries, topics, and actionable insights from PDFs, Docs, and more."
            />
            <FeatureCard
              icon={<BarChart />}
              title="Cognitive Analytics"
              description="Track your learning progress and knowledge retention over time."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground">
            © 2026 ZenForge Team. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
