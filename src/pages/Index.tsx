import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ImageCard } from "@/components/ImageCard";
import { ParticleExplosion } from "@/components/ParticleExplosion";
import { Model3D } from "@/components/Model3D";
import { Button } from "@/components/ui/button";

// Import demo images
import headphoneImg from "@/assets/demo-headphone.jpg";
import shoeImg from "@/assets/demo-shoe.jpg";
import chairImg from "@/assets/demo-chair.jpg";
import plantImg from "@/assets/demo-plant.jpg";
import watchImg from "@/assets/demo-watch.jpg";

const demoItems = [
  { image: headphoneImg, title: "Wireless Headphones" },
  { image: shoeImg, title: "Athletic Footwear" },
  { image: chairImg, title: "Modern Chair" },
  { image: plantImg, title: "Indoor Plant" },
  { image: watchImg, title: "Smart Watch" },
];

const Index = () => {
  const [scrollPhase, setScrollPhase] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const { scrollYProgress } = useScroll();

  // Track scroll progress and determine animation phase
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.2) {
        setScrollPhase(0); // Initial bento grid
      } else if (latest < 0.4) {
        setScrollPhase(1); // Cards moving to center
      } else if (latest < 0.6) {
        setScrollPhase(2); // Explosion
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 2000);
      } else {
        setScrollPhase(3); // Final 3D model
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Transform values for card animations
  const card1X = useTransform(scrollYProgress, [0, 0.4], [0, 200]);
  const card1Y = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
  const card2X = useTransform(scrollYProgress, [0, 0.4], [0, -200]);
  const card2Y = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
  const card3X = useTransform(scrollYProgress, [0, 0.4], [0, 0]);
  const card3Y = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const card4X = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const card4Y = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  const card5X = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const card5Y = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  const cardScale = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.3]);
  const cardOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);

  return (
    <div className="relative min-h-[400vh] bg-background overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-background opacity-20" />
      
      {/* Radial glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      {/* Sticky container for animations */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Scene 1 & 2: Bento Grid Cards */}
        {scrollPhase < 3 && (
          <div className="relative w-full max-w-7xl px-8 perspective-3d">
            {/* Hero text */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: scrollPhase < 1 ? 1 : 0, y: scrollPhase < 1 ? 0 : -50 }}
              className="text-center mb-16"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
                Image to 3D
              </h1>
              <p className="text-xl md:text-2xl text-foreground-secondary">
                Transform any image into reality
              </p>
            </motion.div>

            {/* Bento grid with scroll-triggered positioning */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                style={{ x: card1X, y: card1Y, scale: cardScale, opacity: cardOpacity }}
                className="md:col-span-1"
              >
                <ImageCard {...demoItems[0]} delay={0} />
              </motion.div>
              
              <motion.div
                style={{ x: card2X, y: card2Y, scale: cardScale, opacity: cardOpacity }}
                className="md:col-span-1"
              >
                <ImageCard {...demoItems[1]} delay={0.1} />
              </motion.div>
              
              <motion.div
                style={{ x: card3X, y: card3Y, scale: cardScale, opacity: cardOpacity }}
                className="md:col-span-1"
              >
                <ImageCard {...demoItems[2]} delay={0.2} />
              </motion.div>
              
              <motion.div
                style={{ x: card4X, y: card4Y, scale: cardScale, opacity: cardOpacity }}
                className="md:col-span-1 md:col-start-1"
              >
                <ImageCard {...demoItems[3]} delay={0.3} />
              </motion.div>
              
              <motion.div
                style={{ x: card5X, y: card5Y, scale: cardScale, opacity: cardOpacity }}
                className="md:col-span-1"
              >
                <ImageCard {...demoItems[4]} delay={0.4} />
              </motion.div>
            </div>

            {/* Particle explosion */}
            <ParticleExplosion isActive={showParticles} />
          </div>
        )}

        {/* Scene 3 & 4: 3D Model Reveal */}
        {scrollPhase >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-7xl px-8 text-center"
          >
            <Model3D />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                Transform Images Into Reality
              </h2>
              <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto">
                Our AI-powered technology converts any 2D image into a fully interactive 3D model with cinematic precision.
              </p>
              
              <Button
                className="group relative mt-8 px-8 py-6 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl transition-all duration-300 glow-mint hover:glow-mint-strong"
              >
                <span className="relative z-10">Try Demo →</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollPhase >= 3 ? 0 : 1 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-secondary"
      >
        <span className="text-sm uppercase tracking-wider">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
