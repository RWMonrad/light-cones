'use client';

import React, { useEffect, useRef, useState } from 'react';
import VoiceClient from '../voice/VoiceClient';

interface VideoBannerProps {
  videoSrc: string;
  overlayText?: string;
  voiceText?: string;
}

export default function VideoBanner({ 
  videoSrc, 
  overlayText = "Explore the boundaries of physics",
  voiceText = "Welcome to Light Cones. Where we challenge the established theories of spacetime and relativity."
}: VideoBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Handle video loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoaded = () => {
      setIsLoaded(true);
    };
    
    video.addEventListener('loadeddata', handleLoaded);
    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
    };
  }, []);
  
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onCanPlay={() => setIsLoaded(true)}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans">{overlayText}</h2>
        
        {/* Voice narration button */}
        <div className="flex items-center mt-6">
          <VoiceClient text={voiceText} />
          <span className="ml-3 text-xs text-indigo-300">Click for narration</span>
        </div>
      </div>
    </div>
  );
}
