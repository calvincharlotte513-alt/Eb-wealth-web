import React, { useState, useEffect } from 'react';

interface HeroBackgroundProps {
  imageSrc: string;
  fallbackSrc?: string;
  accent?: 'emerald' | 'blue' | 'gold' | 'mint' | 'none';
  overlayOpacity?: 'none' | 'subtle' | 'light' | 'visible' | 'dark';
  imageOpacity?: string;
  className?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageSrc,
  fallbackSrc,
  accent = 'none',
  overlayOpacity = 'subtle',
  imageOpacity = 'opacity-100',
  className = ''
}) => {
  const [currentSrc, setCurrentSrc] = useState(imageSrc);

  useEffect(() => {
    setCurrentSrc(imageSrc);
  }, [imageSrc]);

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        backgroundImage: `url("${currentSrc}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* High-visibility direct image tag with eager loading and fallback */}
      <img
        src={currentSrc}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover object-center ${imageOpacity}`}
        loading="eager"
        decoding="async"
        onError={() => {
          if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }}
      />

      {/* Gentle, non-obscuring readability gradient only when explicitly requested */}
      {overlayOpacity === 'subtle' && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent pointer-events-none" />
      )}
      {overlayOpacity === 'light' && (
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      )}
      {overlayOpacity === 'visible' && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent pointer-events-none" />
      )}
      {overlayOpacity === 'dark' && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none" />
      )}

      {/* Bottom edge melt only when not in clear/none mode */}
      {overlayOpacity !== 'none' && (
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#FAF9F5]/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
