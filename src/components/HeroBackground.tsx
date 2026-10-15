import React, { useState, useEffect } from 'react';

interface HeroBackgroundProps {
  imageSrc: string;
  mobileImageSrc?: string;
  fallbackSrc?: string;
  mobileFallbackSrc?: string;
  accent?: 'emerald' | 'blue' | 'gold' | 'mint' | 'none';
  overlayOpacity?: 'none' | 'subtle' | 'light' | 'visible' | 'dark';
  imageOpacity?: string;
  className?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageSrc,
  mobileImageSrc,
  fallbackSrc,
  mobileFallbackSrc,
  accent = 'none',
  overlayOpacity = 'subtle',
  imageOpacity = 'opacity-100',
  className = ''
}) => {
  const [currentSrc, setCurrentSrc] = useState(imageSrc);
  const [currentMobileSrc, setCurrentMobileSrc] = useState(mobileImageSrc || imageSrc);

  useEffect(() => {
    setCurrentSrc(imageSrc);
  }, [imageSrc]);

  useEffect(() => {
    setCurrentMobileSrc(mobileImageSrc || imageSrc);
  }, [mobileImageSrc, imageSrc]);

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* High-visibility responsive picture tag */}
      <picture className="w-full h-full block">
        {currentMobileSrc && (
          <source
            media="(max-width: 767px)"
            srcSet={currentMobileSrc}
          />
        )}
        <source
          media="(min-width: 768px)"
          srcSet={currentSrc}
        />
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
            if (mobileFallbackSrc && currentMobileSrc !== mobileFallbackSrc) {
              setCurrentMobileSrc(mobileFallbackSrc);
            }
          }}
        />
      </picture>

      {/* Non-obscuring readability gradient only when explicitly requested */}
      {overlayOpacity === 'subtle' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#071F18]/50 via-transparent to-[#071F18]/80 pointer-events-none" />
      )}
      {overlayOpacity === 'light' && (
        <div className="absolute inset-0 bg-[#071F18]/30 pointer-events-none" />
      )}
      {overlayOpacity === 'visible' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#071F18]/70 via-[#071F18]/45 to-[#071F18]/85 pointer-events-none" />
      )}
      {overlayOpacity === 'dark' && (
        <div className="absolute inset-0 bg-[#071F18]/80 pointer-events-none" />
      )}

      {/* Gentle bottom edge melt only when not in clear/none mode */}
      {overlayOpacity !== 'none' && (
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FAF9F5]/30 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
