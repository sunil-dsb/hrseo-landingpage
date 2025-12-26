'use client';

import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Optimization: alpha: false prompts the browser to optimize for opaque backgrounds
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let beams: Beam[] = [];
    let time = 0;

    // Track logical size separately from physical canvas size (for High DPI support)
    let logicalWidth = 0;
    let logicalHeight = 0;

    const CONFIG = {
      beamDensity: 15, // Higher = fewer beams, Lower = more beams
      bg: '#ffffff',
      colors: {
        beamPrimary: '251, 146, 60', // Orange-400
        beamSecondary: '249, 115, 22', // Orange-500
        glowstart: 'rgba(249, 115, 22, 0.105)', // Reduced from 0.15
        glowMid: 'rgba(251, 146, 60, 0.035)', // Reduced from 0.05
        ringColor: '249, 115, 22',
        coreStart: 'rgba(255, 247, 237, 0.63)', // Reduced from 0.9
        coreMid: 'rgba(253, 186, 116, 0.21)', // Reduced from 0.3
      },
      rings: {
        count: 6, // Reduced from 7 to remove one line
        maxRadiusScale: 0.6, // Slightly reduced from 0.65 to crop the "upper" lines
        spacing: 25,
      },
    };

    class Beam {
      x: number;
      y: number;
      speed: number;
      height: number;
      width: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.height = 0;
        this.width = 0;
        this.opacity = 0;
        this.color = '';
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * logicalWidth;
        // If initial, scatter across screen. If resetting, start above top.
        this.y = initial ? Math.random() * logicalHeight : -Math.random() * 100;
        this.speed = Math.random() * 1.5 + 0.5;
        this.height = Math.random() * 80 + 20;
        this.width = Math.random() * 2 + 0.5;
        this.opacity = (Math.random() * 0.5 + 0.1) * 0.7; // Reduced by 30%
        this.color =
          Math.random() > 0.8 ? CONFIG.colors.beamPrimary : CONFIG.colors.beamSecondary;
      }

      update() {
        this.y += this.speed;
        if (this.y - this.height > logicalHeight) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        // Calculate alpha based on height (fade out at bottom)
        const alpha = Math.max(0, this.opacity * ((logicalHeight - this.y) / logicalHeight));
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${this.color}, ${alpha})`;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.stroke();
      }
    }

    const initBeams = () => {
      beams = [];
      const numBeams = Math.floor(logicalWidth / CONFIG.beamDensity);
      for (let i = 0; i < numBeams; i++) {
        beams.push(new Beam());
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      // Update logical dimensions
      logicalWidth = window.innerWidth;
      logicalHeight = window.innerHeight;

      // Set physical dimensions (scaled for DPI)
      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;

      // Set CSS dimensions (visible size)
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;

      // Scale context to match logical coordinate system
      ctx.scale(dpr, dpr);

      // Re-initialize beams for new width
      initBeams();
    };

    const drawAura = (cx: number, cy: number) => {
      if (!ctx) return;
      const { colors, rings } = CONFIG;

      // 1. Wide Ambient Glow
      // Using logicalWidth ensures consistency across DPIs
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, logicalWidth * 1.2);
      gradient.addColorStop(0, colors.glowstart);
      gradient.addColorStop(0.4, colors.glowMid);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      // 2. The Bright "Portal" Arch
      const maxRadius = Math.min(logicalWidth, logicalHeight) * rings.maxRadiusScale;
      ctx.save();
      ctx.translate(cx, cy);

      // Pulse animation
      const pulse = Math.sin(time * 0.02) * 10;

      // Outer glow styling
      ctx.shadowBlur = 60;
      ctx.shadowColor = `rgba(${colors.ringColor}, 0.28)`; // Reduced from 0.4

      // Draw concentric arcs - TOP semi-circle
      for (let i = 0; i < rings.count; i++) {
        const radius = maxRadius - i * rings.spacing + pulse;
        const opacity = Math.max(0.1, 1 - i * 0.14) * 0.7; // Reduced by 30%
        ctx.beginPath();
        ctx.arc(0, -50, radius, 0, Math.PI); // TOP semi-circle (changed from Math.PI, 0)
        ctx.lineWidth = 4 - i * 0.5;
        ctx.strokeStyle = `rgba(${colors.ringColor}, ${opacity * 0.5})`;
        ctx.stroke();
      }

      // 3. The Core Center Haze - positioned at top
      const coreGradient = ctx.createRadialGradient(0, -50, 0, 0, -50, maxRadius * 0.6);
      coreGradient.addColorStop(0, colors.coreStart);
      coreGradient.addColorStop(0.4, colors.coreMid);
      coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(0, -50, maxRadius * 0.8, 0, Math.PI); // TOP semi-circle
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!ctx) return;
      time++;

      // Clear canvas
      ctx.fillStyle = CONFIG.bg;
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      // Update & Draw Beams
      // Using a standard for loop is slightly faster than forEach for animation loops
      for (let i = 0; i < beams.length; i++) {
        beams[i].update();
        beams[i].draw();
      }

      // Draw Aura at TOP instead of bottom
      drawAura(logicalWidth / 2, 0);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    // Initial setup
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default AnimatedBackground;
