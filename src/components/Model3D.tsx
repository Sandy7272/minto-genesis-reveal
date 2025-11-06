import { motion } from "framer-motion";

export const Model3D = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
      animate={{ opacity: 1, scale: 1, rotateY: 360 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto perspective-3d will-change-transform"
    >
      {/* 3D Model Container */}
      <div className="relative aspect-square">
        {/* Volumetric haze layers */}
        <div className="absolute inset-0 volumetric-haze" />
        
        {/* Glowing background with breathing animation */}
        <motion.div 
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main 3D model representation */}
        <motion.div
          className="relative z-10 w-full h-full rounded-3xl bg-gradient-to-br from-card to-secondary border-2 border-primary/30 overflow-hidden model-glow"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: "0 0 80px hsl(158 100% 59% / 0.4), inset 0 0 40px hsl(158 100% 59% / 0.2)",
          }}
        >
          {/* Holographic scan line effect */}
          <motion.div 
            className="absolute inset-x-0 h-1 bg-primary/80 blur-sm z-20"
            animate={{ 
              top: ["-10%", "110%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
          />
          
          {/* RGB Glitch effect overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-green-500/10 to-blue-500/10"
            animate={{
              x: [0, 2, -2, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 5
            }}
          />
          
          {/* Holographic effect with Fresnel */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10" />
          <div className="absolute inset-0 bg-gradient-to-bl from-primary/30 via-transparent to-transparent opacity-50" />
          
          {/* 3D Grid overlay */}
          <div className="absolute inset-0 grid-background opacity-30" />
          
          {/* Floating data matrix effect */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`data-${i}`}
              className="absolute text-primary/40 text-xs font-mono"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            >
              {Math.random() > 0.5 ? "01" : "10"}
            </motion.div>
          ))}
          
          {/* Center glow with enhanced pulse */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/40 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Rotating rings with depth */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 border-2 rounded-full"
              style={{
                width: `${60 + i * 30}%`,
                height: `${60 + i * 30}%`,
                transform: "translate(-50%, -50%)",
                borderColor: `hsl(158 100% 59% / ${0.4 - i * 0.1})`,
                boxShadow: `0 0 20px hsl(158 100% 59% / ${0.3 - i * 0.1})`
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          
          {/* Particle trails with enhanced motion */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{
                top: "50%",
                left: "50%",
                boxShadow: "0 0 10px hsl(158 100% 59% / 0.8)",
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 8) * 120],
                y: [0, Math.sin((i * Math.PI * 2) / 8) * 120],
                opacity: [1, 0.5, 0],
                scale: [1, 0.5, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Rim light effect */}
          <div className="absolute inset-0 rounded-3xl border-4 border-primary/20 rim-light" />
        </motion.div>
        
        {/* Enhanced reflection with gradient */}
        <div className="absolute -bottom-10 left-0 right-0 h-40 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-xl opacity-60" />
        
        {/* Light rays emanating from center */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-primary/0 to-primary/30 blur-sm"
            style={{
              transformOrigin: "bottom center",
              transform: `translate(-50%, -100%) rotate(${i * 90}deg)`,
            }}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
