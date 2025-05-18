'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import VoiceClient from '../../voice/VoiceClient';

// Define technology categories and items
interface TechItem {
  name: string;
  description: string;
  url: string;
  category: string;
}

const technologies: TechItem[] = [
  // Frontend Technologies
  {
    name: 'Next.js 14',
    description: 'React framework with server-side rendering, file-based routing, and automatic code splitting',
    url: 'https://nextjs.org/',
    category: 'frontend'
  },
  {
    name: 'React 18',
    description: 'JavaScript library for building user interfaces with concurrent rendering and automatic batching',
    url: 'https://reactjs.org/',
    category: 'frontend'
  },
  {
    name: 'TypeScript',
    description: 'Strongly typed superset of JavaScript that provides better tooling and error prevention',
    url: 'https://www.typescriptlang.org/',
    category: 'frontend'
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapidly building custom designs',
    url: 'https://tailwindcss.com/',
    category: 'frontend'
  },
  
  // Voice Technologies
  {
    name: 'nari-labs/dia',
    description: 'Voice technology platform for generating natural-sounding speech with emotion and persona control',
    url: 'https://github.com/nari-labs/dia',
    category: 'voice'
  },
  {
    name: 'Context7 MCP',
    description: 'Model Context Protocol integration for connecting AI systems with voice technologies',
    url: 'https://upstash.com/context7-mcp',
    category: 'voice'
  },
  
  // Backend Technologies
  {
    name: 'Neon Serverless Postgres',
    description: 'Fully managed Postgres database with branching capabilities and serverless scaling',
    url: 'https://neon.tech/',
    category: 'backend'
  },
  {
    name: 'Drizzle ORM',
    description: 'TypeScript ORM for SQL databases with type-safe queries and schema declarations',
    url: 'https://orm.drizzle.team/',
    category: 'backend'
  },
  {
    name: 'Vercel Edge Functions',
    description: 'Serverless functions that run at the edge, closer to users for improved performance',
    url: 'https://vercel.com/features/edge-functions',
    category: 'backend'
  },
  
  // AI Technologies
  {
    name: 'RAG (Retrieval Augmented Generation)',
    description: 'AI methodology that combines information retrieval with text generation to provide accurate, contextual responses',
    url: 'https://research.facebook.com/publications/retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks/',
    category: 'ai'
  },
  {
    name: 'Sora',
    description: 'AI video generation model for creating realistic and imaginative scenes from text descriptions',
    url: 'https://openai.com/sora',
    category: 'ai'
  },
  {
    name: 'Windsurf MCP',
    description: 'Configuration standard for connecting AI assistants with external tools and data sources',
    url: 'https://windsurf.io/docs',
    category: 'ai'
  }
];

// Define methodology steps
interface MethodologyStep {
  title: string;
  description: string;
}

const methodology: MethodologyStep[] = [
  {
    title: 'User-Centered Design',
    description: 'We start with the user experience, designing interfaces that are intuitive and accessible while presenting complex physics concepts in understandable ways.'
  },
  {
    title: 'Component-Based Architecture',
    description: 'We build reusable components (like VoiceClient) that can be used across different parts of the application, ensuring consistency and reducing code duplication.'
  },
  {
    title: 'Voice-First Interaction',
    description: 'We integrate voice technology throughout the application to provide a natural and accessible way to interact with complex scientific concepts.'
  },
  {
    title: 'Data-Driven Simulations',
    description: 'Our simulation models are based on actual physics equations, providing educational value while remaining visually engaging and interactive.'
  },
  {
    title: 'RAG-Based Knowledge System',
    description: 'Our Knowledge Portal uses Retrieval Augmented Generation to provide accurate information from reliable sources, combining the benefits of a search engine with natural language generation.'
  },
  {
    title: 'Continuous Integration',
    description: 'We use CI/CD pipelines to automatically test, build, and deploy changes, ensuring a stable and reliable application.'
  }
];

export default function TechnologyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter technologies based on category and search query
  const filteredTechnologies = technologies.filter(tech => 
    (selectedCategory === 'all' || tech.category === selectedCategory) &&
    (tech.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     tech.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Group by category for better organization
  const groupedTechnologies: Record<string, TechItem[]> = {
    frontend: [],
    voice: [],
    backend: [],
    ai: []
  };
  
  filteredTechnologies.forEach(tech => {
    if (groupedTechnologies[tech.category]) {
      groupedTechnologies[tech.category].push(tech);
    }
  });
  
  const categoryLabels: Record<string, string> = {
    frontend: 'Frontend Technologies',
    voice: 'Voice Technologies',
    backend: 'Backend Infrastructure',
    ai: 'AI & Machine Learning'
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-blue-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold font-sans drop-shadow-lg">
            Technology Behind Light Cones
          </h1>
          <VoiceClient text="Welcome to the Technology page. Here we explain all the technologies powering the Light Cones project." />
        </div>
        
        <p className="text-lg text-indigo-200 mb-12 max-w-4xl">
          Light Cones combines cutting-edge web technologies with advanced voice synthesis and physics simulations. 
          This page documents our technical stack, methodologies, and the science behind our project.
        </p>
        
        {/* Technology Filter Controls */}
        <div className="mb-10 bg-indigo-900/20 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold font-sans">Technology Stack</h2>
            
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search technologies..."
                className="px-4 py-2 bg-indigo-900/50 border border-indigo-700 rounded-lg text-white mr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="flex space-x-2">
                {['all', 'frontend', 'voice', 'backend', 'ai'].map(cat => (
                  <button
                    key={cat}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === cat 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/60'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Technology Grid */}
          <div className="space-y-8">
            {Object.keys(groupedTechnologies).map(category => {
              if (groupedTechnologies[category].length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="text-xl font-bold text-indigo-300 mb-4">{categoryLabels[category]}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedTechnologies[category].map(tech => (
                      <div key={tech.name} className="bg-indigo-900/30 border border-indigo-800/50 p-5 rounded-lg hover:bg-indigo-800/20 transition">
                        <h4 className="text-xl font-bold mb-2">{tech.name}</h4>
                        <p className="text-indigo-200 mb-3 text-sm">{tech.description}</p>
                        <a 
                          href={tech.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center"
                        >
                          Learn more
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Methodology Section */}
        <section className="mb-10 bg-blue-900/20 p-6 rounded-xl">
          <h2 className="text-2xl font-bold font-sans mb-6">Our Methodology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodology.map((step, index) => (
              <div key={index} className="bg-blue-900/30 border border-blue-800/50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-blue-700 text-white text-xl font-bold w-10 h-10 rounded-full flex items-center justify-center mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-blue-200 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* RAG System Explanation */}
        <section className="mb-10 bg-purple-900/20 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-sans">RAG Search System</h2>
            <VoiceClient text="Our Retrieval Augmented Generation system combines the power of information retrieval with natural language generation to provide accurate and contextual information." />
          </div>
          
          <div className="bg-purple-900/30 border border-purple-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">How RAG Works in Light Cones</h3>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <ol className="list-decimal pl-5 space-y-3 text-purple-100">
                  <li><strong>Information Retrieval:</strong> When you search for a topic in our Knowledge Portal, our system retrieves relevant documents from our database of physics information.</li>
                  <li><strong>Contextual Understanding:</strong> The system analyzes the semantic meaning of your query to find the most relevant information, not just matching keywords.</li>
                  <li><strong>Generation:</strong> The retrieved information is then provided in a natural, conversational format, with voice synthesis available for accessibility.</li>
                  <li><strong>Citation:</strong> All information is properly sourced and cited, allowing you to explore original references.</li>
                </ol>
                
                <div className="mt-6 bg-purple-800/30 p-4 rounded-lg">
                  <h4 className="text-lg font-bold mb-2">Try it yourself:</h4>
                  <p className="text-sm text-purple-200 mb-4">Enter physics topics like "light cones", "time dilation", or "special relativity" in the Knowledge Portal to see RAG in action.</p>
                  
                  <Link href="/knowledge-portal" className="inline-flex items-center bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition">
                    Go to Knowledge Portal
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 bg-purple-900/40 rounded-lg p-5">
                <h4 className="text-lg font-bold mb-3">Technical Implementation</h4>
                <pre className="bg-black/30 p-4 rounded text-xs text-purple-100 overflow-x-auto">
{`// Simplified RAG system architecture
async function performRagSearch(query: string) {
  // 1. Vector embedding of the query
  const queryEmbedding = await embedText(query);
  
  // 2. Semantic search against our document store
  const relevantDocs = await vectorDb.similaritySearch(
    queryEmbedding, 
    { limit: 5 }
  );
  
  // 3. Format retrieved context for the LLM
  const context = formatDocsAsContext(relevantDocs);
  
  // 4. Generate response with context
  const response = await generateWithContext(
    query, 
    context
  );
  
  // 5. Return both the response and sources
  return {
    answer: response.text,
    sources: extractSourceCitations(relevantDocs)
  };
}`}
                </pre>
                
                <div className="mt-4 text-sm text-purple-200">
                  <p>Our implementation uses:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Embedding models for semantic search</li>
                    <li>Vector database for efficient document retrieval</li>
                    <li>Specialized physics corpus with curated content</li>
                    <li>Context window optimization techniques</li>
                    <li>Integration with voice synthesis for spoken responses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Project Links */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-sans mb-6">Project Resources</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="https://github.com/nari-labs/dia" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-lg hover:from-gray-700 hover:to-gray-800 transition flex flex-col items-center text-center">
              <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <h3 className="font-bold">Voice Technology</h3>
              <p className="text-sm text-gray-400 mt-1">nari-labs/dia repository</p>
            </a>
            
            <a href="https://neon.tech/docs" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-emerald-900 to-emerald-950 p-5 rounded-lg hover:from-emerald-800 hover:to-emerald-900 transition flex flex-col items-center text-center">
              <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                <path d="M18 6H6v12h12V6z" stroke="currentColor" strokeWidth="2" />
                <path d="M14 9h-4v6h4V9z" fill="currentColor" />
              </svg>
              <h3 className="font-bold">Database</h3>
              <p className="text-sm text-emerald-400/70 mt-1">Neon Serverless Documentation</p>
            </a>
            
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-lg hover:from-slate-700 hover:to-slate-800 transition flex flex-col items-center text-center">
              <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
              </svg>
              <h3 className="font-bold">Framework</h3>
              <p className="text-sm text-slate-400 mt-1">Next.js Documentation</p>
            </a>
            
            <a href="https://openai.com/research/rag" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-indigo-900 to-indigo-950 p-5 rounded-lg hover:from-indigo-800 hover:to-indigo-900 transition flex flex-col items-center text-center">
              <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.428 12.475c.028-.295.042-.562.042-.8 0-1.555-.336-2.716-1.008-3.483-.672-.767-1.648-1.15-2.928-1.15-1.28 0-2.257.383-2.929 1.15-.672.767-1.008 1.928-1.008 3.483 0 1.563.336 2.726 1.008 3.492.672.767 1.648 1.15 2.929 1.15 1.28 0 2.256-.383 2.928-1.15a4.31 4.31 0 0 0 .863-1.752l.103-.94zm-3.553-4.133c.485 0 .848.202 1.088.608.24.405.36 1.023.36 1.853 0 .831-.12 1.449-.36 1.853-.24.405-.603.608-1.088.608-.485 0-.848-.203-1.088-.608-.24-.404-.36-1.022-.36-1.853 0-.83.12-1.448.36-1.853.24-.406.603-.608 1.088-.608z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M22.924 6.045A11.945 11.945 0 0 0 19.5 3.6a11.945 11.945 0 0 0-15 0A11.94 11.94 0 0 0 1.05 6.045 11.945 11.945 0 0 0 .75 12c0 2.116.562 4.121 1.65 5.955a11.945 11.945 0 0 0 4.5 4.5A11.945 11.945 0 0 0 12 24a11.944 11.944 0 0 0 6.955-2.295 11.946 11.946 0 0 0 4.5-4.5A11.945 11.945 0 0 0 23.25 12c0-2.116-.562-4.121-1.65-5.955h1.324zm-2.32 4.33A9.55 9.55 0 0 0 21 12c0 1.693-.45 3.304-1.286 4.705a9.564 9.564 0 0 0-3.41 1.777 9.556 9.556 0 0 0-8.608 0 9.565 9.565 0 0 0-3.41-1.777A9.557 9.557 0 0 0 3 12c0-.56.05-1.117.144-1.67a9.565 9.565 0 0 0 3.41-1.778 9.556 9.556 0 0 0 8.61 0 9.565 9.565 0 0 0 3.41 1.778 9.514 9.514 0 0 0 2.032-.955z" />
              </svg>
              <h3 className="font-bold">RAG Research</h3>
              <p className="text-sm text-indigo-400/70 mt-1">Learn about RAG architecture</p>
            </a>
          </div>
        </section>
        
        <div className="text-center mt-12 text-sm text-indigo-300">
          <p>Voice technology powered by <a href="https://github.com/nari-labs/dia" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-200">nari-labs/dia</a></p>
          <Link href="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
