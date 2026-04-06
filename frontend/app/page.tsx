"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Brain,
  BookOpen,
  Github,
  Twitter,
  Play,
  Pause,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  MessageCircle,
  BarChart3,
  Code2,
  Users,
  Calendar,
  Eye,
  Check,
  ChevronDown,
  Zap,
  Shield,
  Globe
} from "lucide-react";

// Import new components
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  if (!mounted) return null;

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
    { label: "Docs", href: "#docs" },
    { label: "GitHub", href: "https://github.com", external: true },
  ];

  return (
    <div className="min-h-screen bg-gc-base text-text-primary overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 gc-grid-bg opacity-40" />
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gc-base/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-text-primary hidden sm:block">
                GuruCortex
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gc-btn-primary px-5 py-2.5 text-sm font-medium hidden sm:flex items-center gap-2"
                >
                  Launch App
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-text-primary"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gc-surface border-t border-white/5"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Link href="/dashboard" className="block">
                  <button className="w-full gc-btn-primary px-4 py-3 text-sm font-medium mt-2">
                    Launch App
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Grid */}
      <div id="features">
        <FeaturesGrid />
      </div>

      {/* Video Demo Section */}
      <section id="demo" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gc-surface" />
        <div className="absolute inset-0 gc-grid-bg opacity-30" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-mono text-cyan-400 tracking-wider">LIVE DEMO</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-primary mt-4 mb-6">
              See it in <span className="gc-text-gradient">action</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Watch how GuruCortex transforms your study materials into an interactive learning experience.
            </p>
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-gc-card"
          >
            <div className="aspect-video bg-gc-base relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
              >
                <source src="/0405.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause Overlay */}
              {!isVideoPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  onClick={handleVideoPlay}
                >
                  <div className="absolute inset-0 bg-gc-base/60 backdrop-blur-sm" />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-gc-glow-lg"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  <span className="absolute bottom-8 text-text-primary font-medium text-lg">
                    Watch Demo
                  </span>
                </div>
              )}
              
              {/* Pause button when playing */}
              {isVideoPlaying && (
                <button
                  onClick={handleVideoPlay}
                  className="absolute bottom-4 right-4 p-3 bg-gc-base/80 backdrop-blur rounded-lg border border-white/10 hover:bg-gc-surface transition-colors"
                >
                  <Pause className="w-5 h-5 text-text-primary" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gc-base" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100%", label: "Local & Private", icon: Shield },
              { value: "7+", label: "AI Models Supported", icon: Brain },
              { value: "Real-time", label: "Focus Tracking", icon: Eye },
              { value: "Open", label: "Source Forever", icon: Github },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                  <stat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="font-display font-bold text-3xl text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-gc-base to-gc-surface" />
        <div className="absolute inset-0 gc-glow-cyan opacity-50" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-primary mb-6">
              Ready to transform your 
              <span className="gc-text-gradient"> learning?</span>
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of students who are already studying smarter with GuruCortex.
              Get started in under 2 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gc-btn-primary px-8 py-4 text-base font-semibold flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gc-btn-secondary px-8 py-4 text-base font-medium flex items-center justify-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gc-base" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-semibold text-text-primary">
                GuruCortex
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-text-secondary">
              <a href="#" className="hover:text-text-primary transition-colors">Documentation</a>
              <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-text-muted">
            © 2025 GuruCortex Team. Built with ❤️ for learners everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
}
