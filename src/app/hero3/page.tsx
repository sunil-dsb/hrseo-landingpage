"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, TrendingUp, Zap, Target, BarChart3, Eye, Shield } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Three.js particle background component
function ThreeJSBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically import Three.js to avoid SSR issues
    import('three').then((THREE) => {
      const container = containerRef.current;
      if (!container) return;

      // Setup scene
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.02);

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 8;
      camera.position.y = 2;
      camera.lookAt(0, 0, 0);

      let renderer: any;
      try {
        renderer = new THREE.WebGLRenderer({ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
      } catch (e) {
        console.error("WebGL initialization failed:", e);
        return;
      }

      // Create particle geometry
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 4000;
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const randomness = new Float32Array(count);

      let i = 0;
      for (let ix = 0; ix < 50; ix++) {
        for (let iy = 0; iy < 80; iy++) {
          const u = ix / 50;
          const v = iy / 80;
          const radius = 3.8;
          const theta = u * Math.PI * 2;
          const y = (v - 0.5) * 10;
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;

          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
          scales[i] = Math.random();
          randomness[i] = Math.random();
          i++;
        }
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
      particlesGeometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 1));

      // Shader material
      const vertexShader = `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aScale;
        attribute float aRandomness;
        varying vec3 vColor;
        
        void main() {
          vec3 newPos = position;
          
          float wave = sin(newPos.y * 0.5 + uTime * 1.5);
          float displacement = 1.0 + wave * 0.3;
          newPos.x *= displacement;
          newPos.z *= displacement;
          
          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          gl_PointSize = (25.0 * aScale * uPixelRatio) * (1.0 / -mvPosition.z);
          gl_PointSize *= (1.0 + sin(uTime * 3.0 + aRandomness * 10.0) * 0.2);
          
          vec3 color1 = vec3(1.0, 0.6, 0.1);
          vec3 color2 = vec3(0.9, 0.1, 0.0);
          vColor = mix(color2, color1, wave * 0.5 + 0.5);
        }
      `;

      const fragmentShader = `
        varying vec3 vColor;
        
        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 2.0);
          
          vec3 finalColor = vColor * strength;
          
          if (strength < 0.05) discard;
          gl_FragColor = vec4(finalColor, strength);
        }
      `;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(particlesGeometry, material);
      scene.add(particles);

      // Animation loop
      const clock = new THREE.Clock();
      function animate() {
        const elapsedTime = clock.getElapsedTime();
        material.uniforms.uTime.value = elapsedTime;
        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
        particlesGeometry.dispose();
        material.dispose();
      };
    });
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100vh' }} />;
}

export default function Hero3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");

      // Scroll-triggered animations
      gsap.utils.toArray('.feature-card').forEach((card: any, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black overflow-hidden relative">
      {/* Hero Section with Three.js Background */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Three.js Background - Only in Hero Section */}
        <ThreeJSBackground />

        {/* Navigation */}
        <nav className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="HRSEO" 
                width={32} 
                height={32} 
                className="w-8 h-8 transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300">
              HRSEO
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/hero1" className="text-gray-300 hover:text-white transition-colors relative group text-sm">
              Hero1
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/hero2" className="text-gray-300 hover:text-white transition-colors relative group text-sm">
              Hero2
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/hero3" className="text-gray-300 hover:text-white transition-colors relative group text-sm">
              Hero3
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/hero4" className="text-gray-300 hover:text-white transition-colors relative group text-sm">
              Hero4
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          <Link
            href="/signup"
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-full hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 hover:scale-105 text-sm"
          >
            Get Started
          </Link>
        </nav>
    
        {/* Hero Content */}
        <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-300 text-xs font-medium mb-6 backdrop-blur-md shadow-lg">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span className="font-semibold tracking-wide">ADVANCED SEO ANALYTICS</span>
            </div>

            {/* Main Title */}
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[0.9]"
            >
              <span className="block bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                Unlock Your
              </span>
              <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                SEO Potential
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Experience the future of SEO with our AI-powered analytics platform. 
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold"> Transform data into dominance </span>
              and watch your rankings soar.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="group relative px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-sm rounded-full overflow-hidden shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Start Analytics Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              
              <button className="group px-6 py-3 border-2 border-[#FFDCB5] text-orange-300 font-semibold text-sm rounded-full hover:border-orange-400 hover:bg-orange-500/10 transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95">
                <span className="flex items-center gap-2 justify-center">
                  Watch Demo
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[5px] border-l-white border-y-[3px] border-y-transparent ml-0.5" />
                  </div>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">500K+</span>
                <span className="text-xs text-gray-400">Keywords Tracked</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">99.9%</span>
                <span className="text-xs text-gray-400">Accuracy Rate</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">24/7</span>
                <span className="text-xs text-gray-400">Monitoring</span>
              </div>
            </div>
          </div>
        </section>
      </div>   
       {/* Features Section - No Background */}
      <section className="relative z-10 py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Powerful
              </span>
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                {" "}Analytics
              </span>
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              Advanced tools that transform complex SEO data into actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="feature-card group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  Real-time Tracking
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  Monitor your SEO performance with live data updates and instant notifications when rankings change.
                </p>
                <div className="flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  Advanced Reports
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  Generate comprehensive reports with actionable insights and beautiful visualizations.
                </p>
                <div className="flex items-center text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  Competitor Intel
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  Spy on your competitors' strategies and discover opportunities they're missing.
                </p>
                <div className="flex items-center text-red-400 font-semibold group-hover:text-red-300 transition-colors text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="feature-card group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-orange-600/30 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  AI Optimization
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  Let AI analyze your content and suggest optimizations for better search rankings.
                </p>
                <div className="flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="feature-card group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-red-600/30 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  Visibility Score
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  Track your overall search visibility with our proprietary scoring algorithm.
                </p>
                <div className="flex items-center text-red-400 font-semibold group-hover:text-red-300 transition-colors text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="feature-card group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-yellow-600/30 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  Risk Monitoring
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  Get alerts about potential SEO risks before they impact your rankings.
                </p>
                <div className="flex items-center text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}