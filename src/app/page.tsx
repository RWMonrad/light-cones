import Link from "next/link";
import VideoBanner from './VideoBanner';

// Use the simplified video file name
const heroVideo = '/videos/hero.mp4';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 flex flex-col items-center justify-center p-8">
      <main className="max-w-5xl w-full text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-sans tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            <span className="text-indigo-300">Light</span> Cones
          </span>
        </h1>
        
        <VideoBanner 
          videoSrc={heroVideo}
          overlayText="Bend the boundaries of physics"
          voiceText="Welcome to Light Cones. Where we explore the fabric of spacetime and challenge the established theories of physics."
        />
        
        <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl mx-auto mb-12 font-sans">
          Explore, challenge and bend the boundaries of relativity and the speed of light. Dare to challenge established truths?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Simulation Lab Card */}
          <Link href="/simulation-lab" className="group">
            <div className="bg-gradient-to-br from-indigo-950/40 to-indigo-900/20 p-8 rounded-2xl border border-indigo-700/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-800/20 h-full flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-indigo-300 mb-4 font-sans group-hover:text-white transition-colors">
                Simulation Lab
              </h2>
              <p className="text-indigo-200/70 mb-8 font-sans">
                Experiment with physics simulations and see what happens when you try to "break" theoretical limits.
              </p>
              <span className="text-indigo-400 font-sans text-sm font-bold group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Explore now →</span>
            </div>
          </Link>
          
          {/* Challenge Arena Card */}
          <Link href="/challenge-arena" className="group">
            <div className="bg-gradient-to-br from-purple-950/40 to-purple-900/20 p-8 rounded-2xl border border-purple-700/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-800/20 h-full flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-purple-300 mb-4 font-sans group-hover:text-white transition-colors">
                Challenge Arena
              </h2>
              <p className="text-purple-200/70 mb-8 font-sans">
                Post, debate and challenge established theories about time, space and relativity with other enthusiasts.
              </p>
              <span className="text-purple-400 font-sans text-sm font-bold group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Join now →</span>
            </div>
          </Link>
          
          {/* Knowledge Portal Card */}
          <Link href="/knowledge-portal" className="group">
            <div className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 p-8 rounded-2xl border border-blue-700/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-800/20 h-full flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-blue-300 mb-4 font-sans group-hover:text-white transition-colors">
                Knowledge Portal
              </h2>
              <p className="text-blue-200/70 mb-8 font-sans">
                Search scientific knowledge and documentation with AI-generated summaries and real-time facts.
              </p>
              <span className="text-blue-400 font-sans text-sm font-bold group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Search now →</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
