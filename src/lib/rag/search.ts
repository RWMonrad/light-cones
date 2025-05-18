import { knowledgeBase, KnowledgeDocument } from './data';

// Simplified embedding function that converts text to a vector representation
// In a real implementation, this would use a proper embedding model like OpenAI's embeddings API
function getEmbedding(text: string): number[] {
  // Create a simple bag-of-words representation
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const uniqueWords = Array.from(new Set(words));
  
  // Create a pseudo-vector for demonstration purposes
  // This is a very simple approximation just for demonstration
  // Real systems would use ML-based embeddings
  const vector: number[] = [];
  for (let i = 0; i < 128; i++) {
    // Generate a deterministic but seemingly random value based on the text
    let val = 0;
    for (const word of uniqueWords) {
      val += ((word.charCodeAt(0) * 11 + i * 7) % 100) / 100;
    }
    vector.push(val / (uniqueWords.length || 1));
  }
  
  return normalizeVector(vector);
}

// Normalize a vector to unit length
function normalizeVector(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map(val => val / (magnitude || 1));
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same dimensions');
  }
  
  let dotProduct = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
  }
  
  return dotProduct; // Vectors are already normalized
}

// Calculate BM25 score for keyword matching
function calculateBM25Score(query: string, document: KnowledgeDocument): number {
  const queryTerms = query.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const docTerms = document.content.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const docTitle = document.title.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  
  // Simple implementation of BM25-inspired scoring
  let score = 0;
  const k1 = 1.2;
  const b = 0.75;
  const avgDocLength = 300; // Estimated average document length
  
  // Combine terms from title (with higher weight) and content
  const allTerms = [...docTitle.map(t => t + '_title'), ...docTerms];
  const docLength = allTerms.length;
  
  for (const term of queryTerms) {
    // Count occurrences in document
    const termFrequency = allTerms.filter(t => 
      t === term || t === term + '_title'
    ).length;
    
    // Title matches get a boost
    const titleMatches = allTerms.filter(t => t === term + '_title').length;
    
    if (termFrequency > 0) {
      // BM25 formula (simplified)
      const tf = (termFrequency * (k1 + 1)) / 
                 (termFrequency + k1 * (1 - b + b * docLength / avgDocLength));
      
      // Add title boost
      score += tf + (titleMatches * 2);
    }
  }
  
  return score;
}

// Pre-compute and cache document embeddings
const documentEmbeddings = new Map<string, number[]>();

export function initializeRagSystem() {
  console.log('Initializing RAG system...');
  // Pre-compute document embeddings
  for (const doc of knowledgeBase) {
    // Create embedding for title and content combined
    const fullText = `${doc.title} ${doc.content}`;
    documentEmbeddings.set(doc.id, getEmbedding(fullText));
  }
  console.log('RAG system initialized with', documentEmbeddings.size, 'documents');
}

export interface SearchResult {
  document: KnowledgeDocument;
  score: number;
  relevanceExplanation: string;
}

export async function searchDocuments(query: string): Promise<SearchResult[]> {
  console.log(`Searching for: "${query}"`);
  
  // Ensure embeddings are initialized
  if (documentEmbeddings.size === 0) {
    initializeRagSystem();
  }
  
  // Get query embedding
  const queryEmbedding = getEmbedding(query);
  
  // Calculate semantic similarity scores
  const results = knowledgeBase.map(doc => {
    const docEmbedding = documentEmbeddings.get(doc.id) || getEmbedding(`${doc.title} ${doc.content}`);
    const semanticScore = cosineSimilarity(queryEmbedding, docEmbedding);
    
    // Calculate keyword matching score
    const keywordScore = calculateBM25Score(query, doc);
    
    // Combine scores (70% semantic, 30% keyword)
    const combinedScore = 0.7 * semanticScore + 0.3 * keywordScore;
    
    // Provide explanation of relevance
    let relevanceExplanation = '';
    if (combinedScore > 0.8) {
      relevanceExplanation = 'Highly relevant - Strong semantic and keyword match';
    } else if (combinedScore > 0.6) {
      relevanceExplanation = 'Relevant - Good semantic similarity to your query';
    } else if (combinedScore > 0.4) {
      relevanceExplanation = 'Somewhat relevant - Contains some related concepts';
    } else {
      relevanceExplanation = 'Marginally relevant - Limited connection to your query';
    }
    
    return {
      document: doc,
      score: combinedScore,
      relevanceExplanation
    };
  });
  
  // Sort by score (descending) and return top results
  return results
    .sort((a, b) => b.score - a.score)
    .filter(result => result.score > 0.2); // Only return somewhat relevant results
}

// Extract key concepts from a query for highlighting in results
export function extractKeyConcepts(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\W+/)
    .filter(word => 
      word.length > 3 && 
      !['what', 'when', 'where', 'which', 'with', 'would', 'could', 'should', 'about', 'these', 'those', 'their', 'there'].includes(word)
    );
}

// Highlight text based on key concepts
export function getHighlightedText(text: string, concepts: string[]): string {
  if (!concepts.length) return text;
  
  let highlightedText = text;
  const regex = new RegExp(`(${concepts.join('|')})`, 'gi');
  
  highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
  
  return highlightedText;
}

// Generate an AI response based on retrieved documents
export function generateResponse(query: string, topResults: SearchResult[]): string {
  if (topResults.length === 0) {
    return "I couldn't find specific information about that topic in our knowledge base. Would you like to try a different search query?";
  }
  
  // Extract content from top results
  const combinedContent = topResults.slice(0, 3).map(result => result.document.content).join(' ');
  
  // Very simplified "generation" - just extract relevant sentences
  const sentences = combinedContent.split(/[.!?]/).filter(s => s.trim().length > 0);
  const queryTerms = query.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  
  // Score sentences by relevance to query
  const scoredSentences = sentences.map(sentence => {
    const sentenceTerms = sentence.toLowerCase().split(/\W+/);
    let score = 0;
    for (const term of queryTerms) {
      if (sentenceTerms.includes(term)) {
        score += 1;
      }
    }
    return { sentence: sentence.trim() + '.', score };
  });
  
  // Sort by score and select top sentences
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.sentence);
  
  // Get current date and time for freshness indication
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Construct a response
  let response = `Based on our knowledge base: ${topSentences.join(' ')}`;
  
  // Add sources
  response += '\n\nSources:';
  for (let i = 0; i < Math.min(topResults.length, 3); i++) {
    const doc = topResults[i].document;
    if (doc.sources && doc.sources.length > 0) {
      response += `\n- ${doc.title}: ${doc.sources[0]}`;
    } else {
      response += `\n- ${doc.title}`;
    }
  }
  
  // Add context7 reference and timestamp
  response += `\n\nInformation retrieved via Context7 MCP on ${formattedDate}. All data is current as of the latest update.`;
  
  return response;
}
