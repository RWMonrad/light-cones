"use client";

import React, { useState, useEffect } from "react";
import VoiceClient from "../../voice/VoiceClient";
import { searchDocuments, initializeRagSystem, extractKeyConcepts, getHighlightedText, generateResponse, SearchResult } from "../../lib/rag/search";
import { KnowledgeDocument } from "../../lib/rag/data";

interface KnowledgeResource {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
}

// Sample knowledge resources - these would come from a database in production
const sampleResources: KnowledgeResource[] = [
  {
    id: 1,
    title: "Understanding Light Cones in Spacetime",
    summary: "A comprehensive overview of how light cones define causality in relativity",
    content: "Light cones are fundamental concepts in relativity that represent the paths that light takes through spacetime from any given event. The light cone of an event consists of a future light cone and a past light cone. The future light cone encompasses all events that can be reached by light signals emitted from the given event, while the past light cone contains all events from which light signals could have reached the given event. Events outside the light cone are causally disconnected from the given event, meaning they cannot influence or be influenced by it. This causal structure is essential for understanding the physics of special and general relativity.",
    category: "Relativity",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Time Dilation: From Theory to Experimental Evidence",
    summary: "How time passes differently depending on relative motion and gravitational fields",
    content: "Time dilation is a difference in the elapsed time measured by two observers, either due to a relative velocity between them (special relativistic time dilation) or due to a difference in gravitational potential between their locations (general relativistic time dilation). The effects of time dilation have been confirmed through numerous experiments, including atomic clocks on airplanes and GPS satellite corrections. At everyday speeds and gravitational fields, these effects are minimal, but they become significant at speeds approaching the speed of light or in strong gravitational fields.",
    category: "Relativity",
    readTime: "7 min"
  },
];

export default function KnowledgePortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<KnowledgeDocument | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [keyConcepts, setKeyConcepts] = useState<string[]>([]);
  
  // Initialize RAG system on component mount
  useEffect(() => {
    initializeRagSystem();
  }, []);
  
  // Function to perform the search
  const performSearch = async (overrideQuery?: string) => {
    const query = overrideQuery || searchQuery;
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Extract key concepts for highlighting
      const concepts = extractKeyConcepts(query);
      setKeyConcepts(concepts);
      
      // Perform RAG search
      const results = await searchDocuments(query);
      setSearchResults(results);
      
      // Generate AI response from top results
      const response = generateResponse(query, results);
      setAiResponse(response);
      
      // Clear selected document
      setSelectedDocument(null);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setAiResponse('Sorry, an error occurred during search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-indigo-950 flex flex-col items-center p-8">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-sans drop-shadow-lg">
            Knowledge Portal
          </h1>
          <VoiceClient 
            text="Welcome to the Knowledge Portal. Explore our curated resources about relativity, light cones, and the fundamentals of physics."
          />
        </div>
        
        <p className="text-lg md:text-2xl text-blue-200 max-w-3xl mb-8 font-sans">
          Dive deep into the fundamentals of relativity, time dilation, light speed and more. Search or browse through our comprehensive library of resources.
        </p>
        
        {/* Search functionality with voice search option */}
        <div className="bg-white/10 rounded-xl p-6 shadow-lg w-full max-w-3xl mb-10">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-blue-300 font-sans">Search Knowledge Base</h2>
            <VoiceClient 
              text="Click to search using voice commands."
            />
          </div>
          <div className="flex items-center border border-blue-300 rounded-lg overflow-hidden">
            <input 
              type="text" 
              className="flex-1 p-3 bg-white/20 text-white border-none outline-none font-sans" 
              placeholder="Search for topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  performSearch();
                }
              }}
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 shadow transition font-sans"
              onClick={() => performSearch()}
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          <div className="flex gap-2 mt-3">
            {['Relativity', 'Light Speed', 'Time Dilation', 'Quantum', 'Black Holes', 'Causality'].map(tag => (
              <button 
                key={tag} 
                className="px-3 py-1 text-xs rounded-full bg-blue-700/30 text-blue-200 hover:bg-blue-700/50 transition"
                onClick={() => {
                  setSearchQuery(tag);
                  performSearch(tag);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Search Results and AI Response */}
        {searchResults.length > 0 && (
          <div className="w-full max-w-4xl mb-10">
            <div className="bg-indigo-900/30 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-blue-300 mb-4 font-sans">AI Response</h2>
                <VoiceClient text={aiResponse} />
              </div>
              <div className="prose prose-invert prose-blue max-w-none">
                <div 
                  className="text-blue-100"
                  dangerouslySetInnerHTML={{ 
                    __html: aiResponse
                      .split('\n\nSources:')[0]
                      .split(' ')
                      .map(word => {
                        // Clean the word for matching
                        const cleanWord = word.replace(/[.,;:!?()\[\]{}'"`]/g, '');
                        return keyConcepts.some(concept => 
                          cleanWord.toLowerCase().includes(concept.toLowerCase())
                        ) 
                          ? `<mark class="bg-blue-700/30 text-blue-100 px-1 rounded">${word}</mark>` 
                          : word;
                      })
                      .join(' ')
                  }} 
                />
                
                {aiResponse.includes('\n\nSources:') && (
                  <div className="mt-4 pt-4 border-t border-blue-800/50">
                    <h4 className="text-sm font-bold text-blue-300 mb-2">Sources:</h4>
                    <ul className="text-sm text-blue-200">
                      {aiResponse
                        .split('\n\nSources:')[1]
                        .split('\n')
                        .filter(source => source.trim())
                        .map((source, index) => (
                          <li key={index} className="mb-1">{source.replace(/^- /, '')}</li>
                        ))
                      }
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-blue-300 mb-4 font-sans">Relevant Documents</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {searchResults.map((result, index) => (
                <div 
                  key={result.document.id}
                  className={`bg-indigo-900/30 rounded-xl overflow-hidden shadow-lg hover:bg-indigo-800/40 transition cursor-pointer ${selectedDocument?.id === result.document.id ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => setSelectedDocument(result.document)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs bg-blue-700/50 text-blue-100 px-2 py-1 rounded">
                          Match Score: {(result.score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <span className="text-xs text-blue-300">{result.relevanceExplanation}</span>
                    </div>
                    <h3 className="text-xl font-bold mt-3 mb-2 text-white font-sans">
                      <span dangerouslySetInnerHTML={{ 
                        __html: getHighlightedText(result.document.title, keyConcepts)
                      }} />
                    </h3>
                    <p className="text-blue-200">
                      <span dangerouslySetInnerHTML={{ 
                        __html: getHighlightedText(
                          result.document.content.substring(0, 200) + '...', 
                          keyConcepts
                        )
                      }} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* No results message */}
        {searchQuery && searchResults.length === 0 && !isSearching && (
          <div className="w-full max-w-4xl mb-10 bg-indigo-900/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-blue-300 mb-2">No results found</h3>
            <p className="text-blue-200">Try a different search term or explore our featured resources below.</p>
          </div>
        )}
        
        {/* Featured Resources when no search is active */}
        {(!searchQuery || searchResults.length === 0) && (
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-blue-300 mb-6 font-sans">Featured Topics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Light Cones', 'Time Dilation', 'Special Relativity', 'General Relativity', 'Speed of Light', 'Twin Paradox'].map(topic => (
                <div 
                  key={topic}
                  className="bg-indigo-900/30 rounded-xl overflow-hidden shadow-lg hover:bg-indigo-800/40 transition cursor-pointer p-6"
                  onClick={() => setSearchQuery(topic)}
                >
                  <h3 className="text-xl font-bold text-white font-sans">{topic}</h3>
                  <button 
                    className="mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery(topic);
                      performSearch(topic);
                    }}
                  >
                    Explore this topic
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Selected document modal */}
        {selectedDocument && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-indigo-950 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white font-sans">
                    <span dangerouslySetInnerHTML={{ 
                      __html: getHighlightedText(selectedDocument.title, keyConcepts)
                    }} />
                  </h2>
                  <button 
                    className="text-blue-300 hover:text-white transition"
                    onClick={() => setSelectedDocument(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-3 mb-4">
                  {selectedDocument.tags.map(tag => (
                    <span key={tag} className="text-xs bg-blue-700/50 text-blue-100 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                <div className="prose prose-invert prose-blue max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: getHighlightedText(selectedDocument.content, keyConcepts)
                  }} />
                </div>
                <div className="mt-6 flex justify-between">
                  <VoiceClient text={selectedDocument.content} />
                  {selectedDocument.sources && selectedDocument.sources.length > 0 && (
                    <div className="text-sm text-blue-300">
                      <strong>Source:</strong> {selectedDocument.sources[0]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
