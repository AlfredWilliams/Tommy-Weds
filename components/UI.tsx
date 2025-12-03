import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- Typography ---

export const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-16 relative z-10">
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-sm uppercase tracking-[0.3em] mb-3 font-sans font-medium ${light ? 'text-champagne-200' : 'text-champagne-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-5xl lg:text-6xl font-serif ${light ? 'text-white' : 'text-champagne-900'}`}
    >
      {title}
    </motion.h2>
    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-champagne-400 to-transparent mx-auto mt-6 opacity-60"></div>
  </div>
);

// --- Buttons ---

export const GoldButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean }> = ({ children, onClick, className = '', disabled = false }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    disabled={disabled}
    className={`
      px-8 py-3 bg-gradient-to-r from-champagne-400 via-champagne-300 to-champagne-400 
      text-champagne-900 font-serif font-medium tracking-wide uppercase text-sm
      shadow-lg shadow-champagne-200/50 rounded-sm hover:shadow-xl hover:shadow-champagne-300/60
      transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
      border border-white/20 relative overflow-hidden group ${className}
    `}
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
  </motion.button>
);

export const OutlineButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`
      px-8 py-3 border border-champagne-900/20 text-champagne-900 
      font-sans text-sm tracking-widest uppercase hover:bg-champagne-900 hover:text-white
      transition-colors duration-300 ${className}
    `}
  >
    {children}
  </button>
);

// --- Cards ---

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass-panel p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-500 ${className}`}>
    {children}
  </div>
);

// --- Particles ---

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 30 : 60;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedY: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198, 159, 94, ${p.opacity})`; // Champagne Gold
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};