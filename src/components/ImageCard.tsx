interface ImageCardProps {
  image: string;
  title: string;
  index: number;
}

export const ImageCard = ({ image, title, index }: ImageCardProps) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-card border-2 transition-all duration-500 hover:scale-105"
      style={{
        width: "250px",
        height: "250px",
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
        />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
