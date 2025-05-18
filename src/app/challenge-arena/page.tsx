"use client";

import React from "react";
import VoiceClient from "../../voice/VoiceClient";

interface Challenge {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  votes: number;
}

// Sample challenges - these would come from a database in production
const sampleChallenges: Challenge[] = [
  {
    id: 1,
    title: "Faster-Than-Light Travel Possibilities",
    content: "What if we could manipulate spacetime fabric to create a wormhole that allows effective FTL travel without breaking local physics?",
    author: "SpaceTimeExplorer",
    date: "2025-05-15",
    votes: 42
  },
  {
    id: 2,
    title: "Time Dilation at Quantum Scale",
    content: "Does time dilation occur at quantum scales? If particles can exist in superposition, how does this affect their experience of time?",
    author: "QuantumThinker",
    date: "2025-05-16",
    votes: 37
  },
];

export default function ChallengeArena() {
  const [challengeTitle, setChallengeTitle] = React.useState('');
  const [challengeContent, setChallengeContent] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [challenges, setChallenges] = React.useState<Challenge[]>(sampleChallenges);
  
  const handlePostChallenge = () => {
    if (!challengeTitle.trim() || !challengeContent.trim()) {
      return;
    }
    
    setSubmitting(true);
    
    // Simulate server call delay
    setTimeout(() => {
      const newChallenge: Challenge = {
        id: challenges.length + 1,
        title: challengeTitle,
        content: challengeContent,
        author: 'CurrentUser',
        date: new Date().toISOString().split('T')[0],
        votes: 0
      };
      
      setChallenges([newChallenge, ...challenges]);
      setChallengeTitle('');
      setChallengeContent('');
      setSubmitting(false);
    }, 800);
  };
  
  const handleVote = (id: number, direction: 'up' | 'down') => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === id) {
        return {
          ...challenge,
          votes: challenge.votes + (direction === 'up' ? 1 : -1)
        };
      }
      return challenge;
    }));
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-indigo-950 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-sans drop-shadow-lg">
            Challenge Arena
          </h1>
          <VoiceClient 
            text="Welcome to the Challenge Arena. Here you can discuss and debate fundamental questions about physics, spacetime, and the universe."
          />
        </div>
        
        <p className="text-lg md:text-2xl text-purple-200 max-w-3xl mb-8 font-sans">
          Post, debate and challenge established theories about time, space and relativity with other enthusiasts.
        </p>
        
        {/* Challenge form with voice input option */}
        <div className="bg-white/10 rounded-xl p-6 shadow-lg w-full max-w-3xl mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-purple-300 font-sans">Post a Challenge</h2>
            <VoiceClient 
              text="Click to dictate your challenge using voice input."
            />
          </div>
          <input 
            type="text"
            className="w-full bg-white/20 rounded p-3 text-white font-sans mb-3" 
            placeholder="Challenge title..."
            value={challengeTitle}
            onChange={(e) => setChallengeTitle(e.target.value)}
          />
          <textarea 
            className="w-full h-40 bg-white/20 rounded p-4 text-white font-sans mb-4" 
            placeholder="Enter your challenge or question..."
            value={challengeContent}
            onChange={(e) => setChallengeContent(e.target.value)}
          />
          <button 
            className={`${submitting ? 'bg-purple-500' : 'bg-purple-600 hover:bg-purple-700'} text-white font-bold py-2 px-6 rounded-xl shadow transition font-sans flex items-center justify-center`}
            onClick={handlePostChallenge}
            disabled={submitting || !challengeTitle.trim() || !challengeContent.trim()}
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : 'Post Challenge'}
          </button>
        </div>
        
        {/* Challenges list */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-purple-300 mb-6 font-sans">Recent Challenges</h2>
          
          {sampleChallenges.map(challenge => (
            <div key={challenge.id} className="bg-gradient-to-tr from-purple-800/60 to-purple-700/40 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white mb-2 font-sans">{challenge.title}</h3>
                <VoiceClient text={challenge.content} />
              </div>
              <p className="text-purple-100 font-sans mb-4">{challenge.content}</p>
              <div className="flex justify-between items-center text-sm text-purple-300">
                <span>{challenge.author} • {challenge.date}</span>
                <div className="flex items-center">
                  <button 
                    className="mr-2 p-1 hover:bg-purple-600/30 rounded transition"
                    onClick={() => handleVote(challenge.id, 'up')}
                    aria-label="Upvote"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                    </svg>
                  </button>
                  <span className="font-bold">{challenge.votes}</span>
                  <button 
                    className="ml-2 p-1 hover:bg-purple-600/30 rounded transition"
                    onClick={() => handleVote(challenge.id, 'down')}
                    aria-label="Downvote"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
