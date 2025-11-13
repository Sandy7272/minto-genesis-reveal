interface ImageCardProps {
  image: string;
  title: string;
  index: number;
  angle?: string;
}

export const ImageCard = ({ image, title, index, angle }: ImageCardProps) => {
  // Get transform style based on angle
  const getAngleStyle = (): React.CSSProperties => {
    switch(angle) {
      case 'side':
        return { transform: 'scaleX(-1)' };
      case 'top':
        return { 
          transform: 'perspective(500px) rotateX(45deg)',
          transformOrigin: 'center center'
        };
      case 'angle':
        return { 
          transform: 'perspective(800px) rotateY(25deg)',
          transformOrigin: 'center center'
        };
      case 'back':
        return { 
          transform: 'scaleX(-1)',
          filter: 'brightness(0.95)'
        };
      default:
        return {};
    }
  };
  

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-card border-2 transition-all duration-500 hover:scale-105 will-change-transform"
      style={{
        width: "100%",
        height: "100%",
        borderColor: "hsl(var(--primary))",
        boxShadow: "0 0 15px hsl(var(--primary) / 0.5)",
        animation: `float ${6 + index * 0.2}s ease-in-out infinite`,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={getAngleStyle()}
        />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
