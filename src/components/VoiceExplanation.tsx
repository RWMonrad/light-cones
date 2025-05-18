'use client';

import React, { useState } from 'react';
import VoiceClient from '../voice/VoiceClient';

interface VoiceExplanationProps {
  explanations: {
    title: string;
    text: string;
  }[];
}

/**
 * Component for simulation explanations with voice playback
 */
export default function VoiceExplanation({ explanations }: VoiceExplanationProps) {
  const [selectedExplanation, setSelectedExplanation] = useState(0);

  const handleNext = () => {
    setSelectedExplanation((prev) => 
      prev < explanations.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setSelectedExplanation((prev) => prev > 0 ? prev - 1 : prev);
  };

  return (
    <div className="mt-8 w-full max-w-2xl">
      <div className="bg-gradient-to-tr from-indigo-800/60 to-blue-700/40 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">
            {explanations[selectedExplanation].title}
          </h3>
          <VoiceClient text={explanations[selectedExplanation].text} />
        </div>
        
        <p className="text-indigo-100 font-sans mb-6">
          {explanations[selectedExplanation].text}
        </p>
        
        <div className="flex justify-between">
          <button 
            onClick={handlePrev}
            disabled={selectedExplanation === 0}
            className={`px-4 py-2 rounded ${
              selectedExplanation === 0 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {explanations.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === selectedExplanation ? 'bg-indigo-400' : 'bg-indigo-800'
                }`}
                onClick={() => setSelectedExplanation(index)}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            disabled={selectedExplanation === explanations.length - 1}
            className={`px-4 py-2 rounded ${
              selectedExplanation === explanations.length - 1 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
