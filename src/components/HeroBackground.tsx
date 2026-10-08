import React, { useState } from 'react';

interface HeroBackgroundProps {
  imageSrc: string;
  fallbackSrc?: string;
  accent?: 'emerald' | 'blue' | 'gold' | 'mint';
  overlayOpacity?: 'light' | 'medium' | 'soft';
  className?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageSrc,
  fallbackSrc,
  accent = 'emerald',
  overlayOpacity = 'medium',
  className = ''
}) => {
  const [currentSrc, setCurrentSrc] = useState(imageSrc);

  const accentGradients = {
    emerald: 'from-[#ECFDF5]/80 via-white/85 to-[#F8FAFC]/90',
    blue: 'from-[#EFF6FF]/80 via-white/85 to-[#F8FAFC]/90',
    gold: 'from-[#FEF9C3]/40 via-white/85 to-[#F8FAFC]/90',
    mint: 'from-[#E6FFFA]/80 via-white/85 to-[#F8FAFC]/90',
  };

  const overlayOpacities = {
    light: 'bg-white/65 backdrop-blur-[1px]',
    medium: 'bg-white/75 backdrop-blur-[2px]',
    soft: 'bg-white/80 backdrop-blur-[2px]',
  };

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Background Image Layer */}
      <img
        src={currentSrc}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000 opacity-30 md:opacity-35"
        loading="eager"
        decoding="async"
        onError={() => {
          if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }}
      />

      {/* Layer 1: Bright Base Scrim Overlay */}
      <div className={`absolute inset-0 ${overlayOpacities[overlayOpacity]}`} />

      {/* Layer 2: Editorial Directional Tint Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${accentGradients[accent]}`} />

      {/* Layer 3: Vertical Top-to-Bottom Readability Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90" />

      {/* Layer 4: Subtle Luxury Radial Atmosphere Glow */}
      <div
        className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          accent === 'blue'
            ? 'bg-[#2563EB]/10'
            : accent === 'gold'
            ? 'bg-[#F4B942]/10'
            : 'bg-[#00A878]/10'
        }`}
      />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#14B8A6]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Layer 5: Fine subtle architectural grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #17202A 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }}
      />
    </div>
  );
};
