import { motion } from "framer-motion";

interface ImageCardProps {
  image: string;
  title: string;
  delay?: number;
}

export const ImageCard = ({ image, title, delay = 0 }: ImageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/50"
      style={{
        animation: `float ${6 + delay}s ease-in-out infinite`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-mint" />
      </div>
      
      <div className="p-4 relative z-10">
        <h3 className="text-sm font-medium text-foreground-secondary group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};
