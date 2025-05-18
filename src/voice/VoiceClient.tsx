'use client';

import React, { useState, useEffect } from 'react';

interface VoiceClientProps {
  text?: string;
  autoPlay?: boolean;
  onPlayComplete?: () => void;
}

/**
 * Client component for handling voice synthesis using the nari-labs/dia repository
 * This is a placeholder implementation that will be connected to the actual
 * voice synthesis API in the next phase.
 */
export default function VoiceClient({ 
  text = "Welcome to Light Cones. Explore, challenge and bend the boundaries of relativity.",
  autoPlay = false,
  onPlayComplete
}: VoiceClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Simulate API connection to dia voice synthesis
  useEffect(() => {
    // This would actually connect to the voice API
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log("Voice synthesis ready");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-play if requested
  useEffect(() => {
    if (autoPlay && isReady && !isPlaying) {
      handlePlay();
    }
  }, [autoPlay, isReady]);
  
  const handlePlay = () => {
    if (!isReady) return;
    
    setIsPlaying(true);
    console.log(`Playing voice: "${text}"`);
    
    // Simulate voice playback duration - would be actual playback in production
    setTimeout(() => {
      setIsPlaying(false);
      if (onPlayComplete) onPlayComplete();
      console.log("Voice playback complete");
    }, text.length * 80); // Estimate duration based on text length
  };
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePlay}
        disabled={!isReady || isPlaying}
        className={`flex items-center justify-center p-2 rounded-full transition ${
          isPlaying 
            ? 'bg-indigo-700 text-white animate-pulse' 
            : isReady 
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        title={isPlaying ? "Playing..." : isReady ? "Play voice" : "Loading voice system..."}
      >
        {isPlaying ? (
          <WaveformIcon className="w-5 h-5" />
        ) : (
          <SpeakerIcon className="w-5 h-5" />
        )}
      </button>
      {isPlaying && <span className="text-xs text-indigo-300 animate-pulse">Playing audio...</span>}
    </div>
  );
}

// SVG Icons
function SpeakerIcon({ className = "w-6 h-6" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  );
}

function WaveformIcon({ className = "w-6 h-6" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  );
}
