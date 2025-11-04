import { motion } from "framer-motion";

export const Model3D = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
      animate={{ opacity: 1, scale: 1, rotateY: 360 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto perspective-3d"
    >
      {/* 3D Model Container */}
      <div className="relative aspect-square">
        {/* Glowing background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl animate-pulse" />
        
        {/* Main 3D model representation */}
        <motion.div
          className="relative z-10 w-full h-full rounded-3xl bg-gradient-to-br from-card to-secondary border-2 border-primary/30 overflow-hidden"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: "0 0 80px hsl(158 100% 59% / 0.4)",
          }}
        >
          {/* Holographic effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10" />
          
          {/* 3D Grid overlay */}
          <div className="absolute inset-0 grid-background opacity-30" />
          
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/40 blur-2xl animate-glow-pulse" />
          
          {/* Rotating rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 border-2 border-primary/40 rounded-full"
              style={{
                width: `${60 + i * 30}%`,
                height: `${60 + i * 30}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          
          {/* Particle trails */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 8) * 100],
                y: [0, Math.sin((i * Math.PI * 2) / 8) * 100],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
        
        {/* Reflection */}
        <div className="absolute -bottom-10 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent blur-xl opacity-50" />
      </div>
    </motion.div>
  );
};
