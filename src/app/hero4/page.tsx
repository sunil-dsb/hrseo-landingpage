"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

// Three.js Morphing Liquid Sphere Background
function MorphingSphereBackground({ side }: { side: 'left' | 'right' }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically import Three.js
    import('three').then((THREE) => {
      const container = containerRef.current;
      if (!container) return;

      // Setup scene with BLACK background
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.02); // Black fog

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 7;

      let renderer: any;
      try {
        renderer = new THREE.WebGLRenderer({ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight); // Full size animations
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 1); // Black background
        container.appendChild(renderer.domElement);
      } catch (e) {
        console.error("WebGL initialization failed:", e);
        return;
      }

      // FIBONACCI SPHERE GEOMETRY
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 6000;
      const positions = new Float32Array(count * 3);
      const randomness = new Float32Array(count);
      const scales = new Float32Array(count);

      const goldenRatio = (1 + Math.sqrt(5)) / 2;

      for (let i = 0; i < count; i++) {
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * (i + 0.5) / count);
        const radius = 2.5;

        const x = Math.cos(theta) * Math.sin(phi) * radius;
        const y = Math.sin(theta) * Math.sin(phi) * radius;
        const z = Math.cos(phi) * radius;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        randomness[i] = Math.random();
        scales[i] = Math.random();
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 1));
      particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

      // MORPHING LIQUID SHADER
      const vertexShader = `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aRandomness;
        attribute float aScale;
        varying vec3 vColor;
        varying float vNoise;

        // Pseudo-Noise Function
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        // Gradient Noise
        float noise(in vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(
              mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
              f.y
            ),
            mix(
              mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
              f.y
            ),
            f.z
          );
        }

        void main() {
          vec3 newPos = position;

          // Multiple layers of noise
          float noise1 = noise(position * 1.5 + uTime * 0.5);
          float noise2 = noise(position * 3.0 - uTime * 0.8);
          float combinedNoise = (noise1 + noise2) * 0.5;
          vNoise = combinedNoise;

          // Displace along normal
          vec3 normal = normalize(position);
          float displacement = 1.0 + combinedNoise * 0.5;
          newPos = normal * (length(position) * displacement);

          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          gl_PointSize = (22.0 * aScale * uPixelRatio) * (1.0 / -mvPosition.z);

          // Orange to Yellow gradient
          vec3 colorDark = vec3(0.91, 0.3, 0.0);   // Deep Orange
          vec3 colorBright = vec3(1.0, 0.8, 0.0);  // Bright Yellow
          vColor = mix(colorDark, colorBright, combinedNoise * 1.5 + 0.2);
        }
      `;

      const fragmentShader = `
        varying vec3 vColor;

        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 2.5);

          vec3 finalColor = vColor;

          if (strength < 0.1) discard;
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
        blending: THREE.AdditiveBlending // Additive for black background
      });

      const particles = new THREE.Points(particlesGeometry, material);
      scene.add(particles);

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      document.addEventListener('mousemove', handleMouseMove);

      // Animation loop
      const clock = new THREE.Clock();
      function animate() {
        const elapsedTime = clock.getElapsedTime();
        material.uniforms.uTime.value = elapsedTime;

        // Slow rotation - different direction for each side
        const rotationMultiplier = side === 'left' ? 1 : -1;
        particles.rotation.y = elapsedTime * 0.1 * rotationMultiplier;
        particles.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

        // Mouse tilt
        particles.rotation.x += mouseY * 0.005;
        particles.rotation.y += mouseX * 0.005;

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
        document.removeEventListener('mousemove', handleMouseMove);
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
        particlesGeometry.dispose();
        material.dispose();
      };
    });
  }, [side]);

  return <div ref={containerRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" />;
}

export default function Hero4() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-black overflow-hidden relative">
      {/* Three.js Morphing Sphere Backgrounds - Full Size, 50% Visible Each Side */}
      <div className="absolute -left-1/2 top-0 w-full h-full z-0">
        <MorphingSphereBackground side="left" />
      </div>
      <div className="absolute -right-1/2 top-0 w-full h-full z-0">
        <MorphingSphereBackground side="right" />
      </div>

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
          <span className="text-xl font-bold text-white group-hover:text-orange-400 transition-all duration-300">
            HRSEO
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/hero1" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
            Hero1
          </Link>
          <Link href="/hero2" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
            Hero2
          </Link>
          <Link href="/hero3" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
            Hero3
          </Link>
          <Link href="/hero4" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
            Hero4
          </Link>
        </div>

        <Link
          href="/signup"
          className="px-4 py-2 bg-gradient-to-r from-orange-600 to-yellow-500 text-white font-bold rounded-full hover:from-orange-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 hover:scale-105 text-sm flex items-center gap-2"
        >
          Initialize
          <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero Section - Centered Content with 50/50 Split */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center relative z-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 text-xs font-medium mb-6 backdrop-blur-md shadow-lg">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span className="font-semibold tracking-wide">NEURAL CORE INTELLIGENCE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[0.9]">
            <span className="block bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
              Enterprise SEO
            </span>
            <span className="block bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 bg-clip-text text-transparent">
              Neural System
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Scale your SEO efforts with enterprise-grade tools and dedicated support. 
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent font-semibold"> Powered by AI intelligence </span>
            for large organizations.
          </p>

          {/* CTA Buttons - Rounded */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group relative px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-500 text-white font-bold text-sm rounded-full overflow-hidden shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Contact Sales
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            
            <button className="group px-6 py-3 border-2 border-orange-500/50 text-orange-300 font-semibold text-sm rounded-full hover:border-orange-400 hover:bg-orange-500/10 transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95">
              Enterprise Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">500+</span>
              <span className="text-xs text-gray-400">Enterprise Clients</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">99.9%</span>
              <span className="text-xs text-gray-400">Uptime SLA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">24/7</span>
              <span className="text-xs text-gray-400">Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
