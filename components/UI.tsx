import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';
import { motion } from 'framer-motion';

// --- Typography ---

export const SectionTitle: FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light = false }) => (
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

// --- Images ---

export const RevealImage: FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className = '', onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-champagne-100 ${className}`} onClick={onClick}>
      {/* Loading Pulse Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 bg-champagne-200 animate-pulse" />
      )}
      
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05 
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 relative z-10`}
      />
    </div>
  );
};

// --- Effects ---

export const Confetti = () => {
  // Generate random particles
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // vw
    y: -10 - Math.random() * 20, // start above screen
    size: Math.random() * 8 + 4,
    color: ['#dbc18b', '#c69f5e', '#fce7e7', '#ffffff'][Math.floor(Math.random() * 4)],
    rotation: Math.random() * 360,
    delay: Math.random() * 0.5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ top: `${p.y}%`, left: `${p.x}%`, rotate: p.rotation, opacity: 1 }}
          animate={{ 
            top: '110%', 
            rotate: p.rotation + 360 + Math.random() * 180,
            opacity: 0
          }}
          transition={{ 
            duration: Math.random() * 2 + 2, 
            delay: p.delay, 
            ease: "easeOut" 
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size * 0.6, // confetti shape
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};

// --- Buttons ---

export const GoldButton: FC<{ children: ReactNode; onClick?: () => void; className?: string; disabled?: boolean }> = ({ children, onClick, className = '', disabled = false }) => (
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

export const OutlineButton: FC<{ children: ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className = '' }) => (
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

export const GlassCard: FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
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

    let particles: { x: number; y: number; size: number; speedY: number; opacity: number; sway: number; swayOffset: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 15 : 30; // Fewer particles for hearts as they are detailed
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 8 + 6, // Slightly larger for hearts
          speedY: Math.random() * 0.4 + 0.1,
          opacity: Math.random() * 0.4 + 0.1,
          sway: Math.random() * 0.5 + 0.2, // Amplitude of sway
          swayOffset: Math.random() * Math.PI * 2
        });
      }
    };

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      // Draw heart path centered
      const s = size / 2;
      ctx.moveTo(0, -s * 0.5); 
      ctx.bezierCurveTo(-s, -s * 1.5, -s * 2, s * 0.5, 0, s * 1.5);
      ctx.bezierCurveTo(s * 2, s * 0.5, s, -s * 1.5, 0, -s * 0.5);
      
      ctx.fillStyle = `rgba(198, 159, 94, ${opacity})`; // Champagne Gold
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.y -= p.speedY;
        // Horizontal sway movement
        p.x += Math.sin(p.y * 0.01 + p.swayOffset) * p.sway;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        drawHeart(ctx, p.x, p.y, p.size, p.opacity);
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
