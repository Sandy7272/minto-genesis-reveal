import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export const ParticleExplosion = ({ isActive }: { isActive: boolean }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generate particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        size: Math.random() * 8 + 2,
        duration: Math.random() * 1 + 1,
      }));
      setParticles(newParticles);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 rounded-full bg-primary"
          style={{
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 10px hsl(158 100% 59% / 0.8)",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: particle.x * 5,
            y: particle.y * 5,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
