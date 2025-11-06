import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  glowIntensity: number;
  blurAmount: number;
}

export const ParticleExplosion = ({ isActive }: { isActive: boolean }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isConverging, setIsConverging] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Detect mobile device for reduced particle count
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 50 : 150;
      
      // Generate particles with varied properties
      const newParticles = Array.from({ length: particleCount }, (_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = Math.random() * 150 + 100;
        
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: Math.random() * 8 + 2,
          duration: Math.random() * 1.2 + 0.8,
          delay: Math.random() * 0.3,
          glowIntensity: Math.random() * 0.6 + 0.4,
          blurAmount: Math.random() * 3 + 1,
        };
      });
      setParticles(newParticles);
      
      // Start convergence after explosion
      setTimeout(() => setIsConverging(true), 600);
    } else {
      setIsConverging(false);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 will-change-transform">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 rounded-full bg-primary particle-blur"
          style={{
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 ${10 * particle.glowIntensity}px hsl(158 100% 59% / ${particle.glowIntensity})`,
            filter: `blur(${particle.blurAmount}px)`,
            mixBlendMode: "screen",
            willChange: "transform, opacity",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={
            isConverging
              ? {
                  x: [particle.x, 0],
                  y: [particle.y, 0],
                  opacity: [0.8, 0],
                  scale: [0.6, 0],
                  rotate: [0, 360],
                }
              : {
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: 0,
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: isConverging ? "easeInOut" : "easeOut",
          }}
        />
      ))}
      
      {/* Additive light burst */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/30 blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 0], opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};
