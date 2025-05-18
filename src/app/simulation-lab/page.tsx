"use client";

import React from "react";
import VoiceExplanation from "../../components/VoiceExplanation";

// Sample explanations - these would come from a database in production
const simulationExplanations = [
  {
    title: "Light Cones Explained",
    text: "Light cones represent the paths that light can travel through spacetime. The concept helps us understand causality in special relativity."
  },
  {
    title: "Special Relativity",
    text: "Einstein's special relativity states that the speed of light is constant for all observers, regardless of their relative motion or the motion of the light source."
  },
  {
    title: "Breaking Light Speed",
    text: "According to our current understanding of physics, nothing with mass can travel at or faster than light speed. This simulation lets you explore what happens when we challenge this limitation."
  }
];

export default function SimulationLab() {
  interface Visualization {
    timeDilation: number;
    lorentzFactor: number;
    lightConeAngle: number;
  }

  const [velocity, setVelocity] = React.useState(1);
  const [mass, setMass] = React.useState(1);
  const [isSimulating, setIsSimulating] = React.useState(false);
  const [visualization, setVisualization] = React.useState<Visualization | null>(null);

  // Handle simulation button click
  const handleSimulate = () => {
    setIsSimulating(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Generate visualization based on parameters
      const timeDilation = calculateTimeDilation(velocity);
      const lorentzFactor = 1 / Math.sqrt(1 - Math.min(0.99, velocity) * Math.min(0.99, velocity));
      
      setVisualization({
        timeDilation,
        lorentzFactor,
        lightConeAngle: Math.max(15, 45 - velocity * 15) // Visual effect: cone narrows as velocity increases
      });
      
      setIsSimulating(false);
    }, 800);
  };
  
  // Helper function to calculate time dilation
  const calculateTimeDilation = (v: number): number => {
    // t' = t / sqrt(1 - v²/c²) where we already normalized v to c (v/c)
    return 1 / Math.sqrt(1 - Math.min(0.99, v) * Math.min(0.99, v));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-blue-950 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans drop-shadow-lg">
        Simulation Lab
      </h1>
      <p className="text-lg md:text-2xl text-indigo-200 max-w-2xl mb-8 text-center font-sans">
        Explore, challenge and bend the boundaries of relativity and the speed of light. Here you can manipulate parameters and see how light speed, time and space are affected - and what happens when you try to "break" the theory!
      </p>
      
      {/* Interactive controls */}
      <div className="bg-white/10 rounded-xl p-6 shadow-lg flex flex-col gap-4 w-full max-w-xl">
        <label className="text-indigo-100 font-sans">
          Velocity (v/c): {velocity}
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.01" 
            value={velocity} 
            onChange={(e) => setVelocity(parseFloat(e.target.value))} 
            className="w-full accent-indigo-400" 
          />
        </label>
        <label className="text-indigo-100 font-sans">
          Mass (kg): {mass}
          <input 
            type="number" 
            min="1" 
            max="10000" 
            value={mass} 
            onChange={(e) => setMass(parseInt(e.target.value) || 1)} 
            className="w-full px-2 py-1 rounded bg-white/20 text-white border border-indigo-300" 
          />
        </label>
        <button 
          onClick={handleSimulate} 
          disabled={isSimulating}
          className={`mt-4 ${isSimulating ? 'bg-indigo-400' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-bold py-2 px-6 rounded-xl shadow transition font-sans flex items-center justify-center`}
        >
          {isSimulating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Simulating...
            </>
          ) : 'Simulate'}
        </button>
      </div>
      
      {/* Visualization with real output */}
      <div className="mt-10 w-full max-w-2xl h-64 bg-gradient-to-tr from-indigo-800/60 to-blue-700/40 rounded-2xl flex items-center justify-center text-indigo-100 font-sans relative overflow-hidden">
        {visualization ? (
          <div className="p-6 w-full h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl mb-1">Simulation Results</h3>
                <p className="text-indigo-200 text-sm">At {velocity}c velocity</p>
              </div>
              <div className="bg-indigo-900/50 p-2 rounded-lg">
                <p className="text-xs text-indigo-200">Time Dilation Factor</p>
                <p className="text-xl font-mono">{visualization.timeDilation.toFixed(2)}x</p>
              </div>
            </div>
            
            <div className="relative h-32 flex items-center justify-center">
              {/* Visual representation of light cone */}
              <div className="absolute w-0 h-0 
                border-l-[80px] border-l-transparent
                border-r-[80px] border-r-transparent
                border-b-[160px] border-indigo-400/30"
                style={{
                  transform: `scaleY(${1/Math.max(1, visualization.lightConeAngle/25)})`,
                  transition: 'transform 0.5s ease-out'
                }}>
              </div>
              
              {/* Observer line */}
              <div className="absolute h-[2px] w-full bg-white/40 top-1/2"></div>
              
              {/* Event point */}
              <div className="absolute h-3 w-3 rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
            </div>
            
            <div className="flex justify-between text-xs text-indigo-300">
              <div>Mass effect: {velocity > 1 ? 'Approaching infinite mass' : `${(mass * visualization.lorentzFactor).toFixed(2)} kg`}</div>
              <div>{velocity > 1 ? 'FTL TRAVEL THEORETICAL' : 'Simulation within physics model'}</div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl">Light cones and timelines visualization will appear here</p>
            <p className="text-sm mt-2 text-indigo-300">Click "Simulate" to see results</p>
          </div>
        )}
      </div>
      
      {/* Voice explanations */}
      <VoiceExplanation explanations={simulationExplanations} />
      
      {/* Information about voice technology */}
      <div className="mt-6 text-indigo-300 text-sm text-center">
        <p>Voice technology powered by <a href="https://github.com/nari-labs/dia" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-200">nari-labs/dia</a></p>
      </div>
    </main>
  );
}
