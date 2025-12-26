"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import FooterHero1 from '@/components/layout/FooterHero1';
import GradientSection from '@/components/sections/GradientSection';

export default function Page2() {
  useEffect(() => {
    // Initialize Unicorn Studio
    const initUnicornStudio = () => {
      if ((window as any).UnicornStudio) return;

      (window as any).UnicornStudio = { isInitialized: false };

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.onload = function () {
        if (!(window as any).UnicornStudio.isInitialized) {
          (window as any).UnicornStudio.init();
          (window as any).UnicornStudio.isInitialized = true;
        }
      };
      document.head.appendChild(script);
    };

    initUnicornStudio();

    // Effect switcher function
    (window as any).switchEffect = function (id: number) {
      document.querySelectorAll('.btn').forEach((btn, index) => {
        if (index + 1 === id) btn.classList.add('active');
        else btn.classList.remove('active');
      });

      document.querySelectorAll('.effect-container').forEach(el => {
        el.classList.remove('active');
      });

      const effectElement = document.getElementById('effect-' + id);
      if (effectElement) {
        effectElement.classList.add('active');
      }
    };

    return () => {
      delete (window as any).switchEffect;
    };
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section with Yellow Background Effects */}
        <section id="hero" className="relative h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Yellow Animated Background Effects */}
        <div className="absolute inset-0">
          {/* Floating Yellow Orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-yellow-500/15 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-300/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-yellow-400/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, yellow 1px, transparent 0)`,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite'
            }}></div>
          </div>
        </div>

        {/* EFFECT 1: UNICORN STUDIO WAVE - MODIFIED FILTER FOR YELLOW */}
        <div id="effect-1" className="effect-container active absolute inset-0 opacity-60">
          <div className="wave-filter absolute inset-0" style={{
            // Sepia neutralizes the original colors, hue-rotate shifts it to gold, saturate boosts it
            filter: 'sepia(100%) hue-rotate(20deg) saturate(400%) brightness(1.2)',
            mixBlendMode: 'screen'
          }}>
            <div
              data-us-project="4gmCpqXwufNrQNMqVM2L"
              className="absolute w-full h-full"
            />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-300 text-xs font-medium mb-4 backdrop-blur-md shadow-lg"
            >
              <div className="relative">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping absolute"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
              </div>
              <span className="font-semibold tracking-wide">AI-POWERED SEO PLATFORM</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-[1.1] font-brand"
            >
              <span className="block mb-1">Revolutionize Your</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                SEO Strategy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed"
            >
              Transform your digital presence with HRSEO's cutting-edge AI technology.
              <span className="text-yellow-300 font-medium"> Track, analyze, and dominate </span>
              search results like never before.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm rounded-lg overflow-hidden shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Get Started Free
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-6 py-3 border-2 border-yellow-400/50 text-yellow-300 font-semibold text-sm rounded-lg hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2 justify-center">
                  Watch Demo
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-6 text-center"
            >
              <div className="flex flex-col">
                <span className="text-lg font-bold text-yellow-400">50K+</span>
                <span className="text-xs text-gray-400">Active Users</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-yellow-400">99.9%</span>
                <span className="text-xs text-gray-400">Uptime</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-yellow-400">24/7</span>
                <span className="text-xs text-gray-400">Support</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Custom CSS for grid animation */}
        <style>{`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
        `}</style>
      </section>
    </div>
    <FooterHero1 />
    </>
  );
}