import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
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

gsap.registerPlugin(ScrollTrigger);

const demoItems = [
  { image: headphoneImg, title: "Wireless Headphones" },
  { image: shoeImg, title: "Athletic Footwear" },
  { image: chairImg, title: "Modern Chair" },
  { image: plantImg, title: "Indoor Plant" },
  { image: watchImg, title: "Smart Watch" },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const cards = cardsRef.current;
    const heroText = heroTextRef.current;
    const model = modelRef.current;
    const finalText = finalTextRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!hero || cards.length !== 5) return;

    // Create GSAP timeline with ScrollTrigger
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Trigger particle explosion at specific point
          if (self.progress > 0.4 && self.progress < 0.6 && !showParticles) {
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 2000);
          }
        },
      },
    });

    // Scene 1 -> Scene 2: Cards converge to center (0-40%)
    timeline
      .to(
        heroText,
        {
          opacity: 0,
          y: -50,
          duration: 0.2,
        },
        0
      )
      .to(
        cards,
        {
          x: (i) => {
            // Calculate convergence to center
            const centerOffset = [200, 100, 0, -100, -200];
            return -centerOffset[i];
          },
          y: 0,
          scale: 0.6,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      )
      // Scene 2 -> Scene 3: Cards fade out for explosion (40-50%)
      .to(
        cards,
        {
          opacity: 0,
          scale: 0.3,
          duration: 0.1,
        },
        0.4
      )
      // Scene 3 -> Scene 4: 3D Model appears (50-80%)
      .fromTo(
        model,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        0.5
      )
      // Scene 4 -> Scene 5: Final text reveal (80-100%)
      .fromTo(
        finalText,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        0.8
      )
      .to(
        scrollIndicator,
        {
          opacity: 0,
          duration: 0.1,
        },
        0.9
      );

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [showParticles]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-background to-background-secondary" />
      
      {/* Grid background with mint green */}
      <div className="fixed inset-0 grid-background-mint opacity-10" />
      
      {/* Volumetric haze layers */}
      <div className="fixed inset-0 volumetric-haze-bg opacity-60" />
      
      {/* Radial glow with breathing effect */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-glow-pulse" />

      {/* Main hero section - pinned */}
      <div
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Hero text - fades out on scroll */}
        <div
          ref={heroTextRef}
          className="text-center mb-16 z-10 px-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 gradient-text leading-tight">
            Image to 3D
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground-secondary">
            Transform any image into reality
          </p>
        </div>

        {/* Responsive grid - 5 columns desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl px-4 sm:px-8">
          {demoItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <ImageCard {...item} index={index} />
            </div>
          ))}
        </div>

        {/* Particle explosion overlay */}
        <ParticleExplosion isActive={showParticles} />

        {/* 3D Model - initially hidden */}
        <div
          ref={modelRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <Model3D />
        </div>

        {/* Final text and CTA - initially hidden */}
        <div
          ref={finalTextRef}
          className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 text-center space-y-4 sm:space-y-6 opacity-0 max-w-3xl px-4 sm:px-8 w-full"
        >
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Transform Images Into Reality
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground-secondary">
            AI-powered Image to 3D Model Generator
          </p>
          
          <Button
            className="group relative mt-4 sm:mt-8 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl transition-all duration-300 glow-mint hover:glow-mint-strong cta-magnetic"
          >
            <span className="relative z-10">Try Demo →</span>
            {/* Bloom effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            {/* Pulsing ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-primary"
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-secondary z-50"
      >
        <span className="text-sm uppercase tracking-wider">Scroll</span>
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-float" />
        </div>
      </div>
      
      {/* Spacer to create scroll distance */}
      <div className="h-[3000px]" />
    </div>
  );
};

export default Index;
