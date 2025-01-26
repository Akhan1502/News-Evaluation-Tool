import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { UserCircle } from 'lucide-react';

interface ParagraphView {
  id: string;
  content: string;
  source: string;
  alternativeViews: Array<{
    content: string;
    source: string;
  }>;
}

interface TextAnalysis {
  id: string;
  title: string;
  rating: number;
  summary: string;
  content: string;
  trust_score: number;
  source: string;
  url: string;
  paragraphs: ParagraphView[];
}

export function AnalyzerPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<TextAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<TextAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const fetchAnalyses = useCallback(async () => {
    const now = Date.now();
    // Rate limit to one request per second
    if (now - lastFetchTime < 1000) {
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.getAnalyses();
      setAnalyses(data);
      setLastFetchTime(now);
    } catch (error) {
      console.error('Failed to fetch analyses:', error);
    } finally {
      setIsLoading(false);
    }
  }, [lastFetchTime]);

  // Initial fetch
  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  const handleAnalysisSelect = useCallback((analysis: TextAnalysis) => {
    setSelectedAnalysis(analysis);
  }, []);

  const handleRefresh = () => {
    fetchAnalyses();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const analyzeArticle = async (articleData: ArticleData) => {
    try {
      setIsLoading(true);
      const result = await api.analyzeContent(articleData);
      console.log('Analysis result:', result);
      // Handle the analysis result as needed
      setIsLoading(false);
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsLoading(false);
    }
  };

  const fetchSentimentHistory = async (url: string) => {
    try {
      const history = await api.getSentimentHistory(url);
      console.log('Sentiment history:', history);
      // Handle the sentiment history as needed
    } catch (error) {
      console.error('Failed to fetch sentiment history:', error);
    }
  };

  const testAnalysis = async () => {
    try {
      const testData = {
        title: "The Future of Space Exploration",
        content: "Recent developments in space exploration have opened new frontiers.",
        url: "https://example.com/space-exploration",
        trust_score: 85,
        source: "Space News Network",
        paragraphs: [
          {
            id: "p1",
            content: "Private companies are revolutionizing space travel with reusable rockets and ambitious plans for Mars colonization.",
            source: "Space Technology Review",
            alternativeViews: [
              {
                content: "While private space companies show promise, government space agencies remain crucial for deep space exploration and scientific research.",
                source: "Aerospace Institute Journal"
              },
              {
                content: "The commercialization of space raises concerns about environmental impact and space debris management.",
                source: "Environmental Science Quarterly"
              }
            ]
          },
          {
            id: "p2",
            content: "Lunar missions are becoming more frequent, with multiple countries planning Moon bases by 2030.",
            source: "Global Space Report",
            alternativeViews: [
              {
                content: "The cost of lunar bases might outweigh their scientific benefits, with robotic missions providing better value.",
                source: "Space Economics Review"
              }
            ]
          }
        ]
      };

      console.log('Sending test analysis request:', testData);
      const result = await api.analyzeContent(testData);
      console.log('Analysis result:', result);
      
      // Refresh the analyses list after adding new test data
      await fetchAnalyses();
    } catch (error) {
      console.error('Test analysis failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header with app name and user profile */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-white/90">News Analyzer</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleProfileClick}
            className="px-3 py-2 text-sm text-white/70 hover:text-white/90 hover:bg-white/5 transition-all rounded-full flex items-center gap-3"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
              {user?.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name || 'Profile'} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-white/70"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                    }
                  }}
                />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-white/70">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </div>
            <span className="font-medium">{user?.name || 'Guest User'}</span>
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Analyses Sidebar */}
        <div className={`transition-all duration-300 ease-in-out border-r border-white/10 overflow-y-auto ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
          <div className="flex flex-col h-full">
            {/* Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full p-2 border-b border-white/10 text-white/70 hover:text-white/90 hover:bg-white/5 transition-colors"
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
            {/* Analyses List */}
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {analyses.map((analysis, index) => (
                  <button
                    key={analysis.id}
                    onClick={() => handleAnalysisSelect(analysis)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      selectedAnalysis?.id === analysis.id 
                        ? 'bg-[#1a1a1a] border border-white/10' 
                        : 'hover:bg-[#161616]'
                    }`}
                  >
                    {isSidebarCollapsed ? (
                      <div className="text-center text-gray-200">
                        {index + 1}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-200 truncate">{analysis.title}</span>
                          <span className="text-xs text-gray-500/70">{analysis.source}</span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="w-full p-2 mt-auto border-t border-white/10 text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors"
            >
              {isSidebarCollapsed ? '↻' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedAnalysis ? (
            <div className="space-y-4">
              <h1 className="text-xl font-medium text-white/90">{selectedAnalysis.title}</h1>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Trust Score</span>
                    <span className="text-sm font-medium text-white/90">
                      {selectedAnalysis.trust_score}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Source</span>
                    <span className="text-sm font-medium text-white/90">
                      {selectedAnalysis.source}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">URL</span>
                    <a href={selectedAnalysis.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-400 hover:text-blue-300 truncate max-w-[300px]">
                      {selectedAnalysis.url}
                    </a>
                  </div>
                </div>
                
                {/* Full Content Display */}
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-sm font-medium text-white/70 mb-4">Article Analysis</h3>
                  <div className="space-y-6">
                    {selectedAnalysis.paragraphs?.map((paragraph, index) => (
                      <div key={paragraph.id} className="relative bg-[#1c1c1c] rounded-lg p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-white/50">Paragraph {index + 1}</span>
                          <span className="text-xs text-white/40">{paragraph.source}</span>
                        </div>
                        <div className="text-sm text-white/90 leading-relaxed mb-4">
                          <div className="prose prose-invert max-w-none">
                            {paragraph.content}
                          </div>
                        </div>
                        <div className="space-y-3 mt-4 pt-4 border-t border-white/5">
                          <h4 className="text-xs font-medium text-white/50">Alternative Perspectives</h4>
                          {paragraph.alternativeViews && paragraph.alternativeViews.length > 0 ? (
                            paragraph.alternativeViews.map((view, viewIndex) => (
                              <div
                                key={`${paragraph.id}-${viewIndex}`}
                                className={`p-3 rounded-md ${viewIndex === 0 ? 'bg-blue-900/10 border border-blue-500/20' : 'bg-purple-900/10 border border-purple-500/20'}`}
                              >
                                <div className="text-sm text-white/80 leading-relaxed">
                                  {view.content}
                                </div>
                                <div className="text-xs text-white/40 mt-2 flex items-center gap-2">
                                  <span className="inline-block w-2 h-2 rounded-full bg-white/20"></span>
                                  {view.source}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-white/50 italic">
                              No alternative perspectives available
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-white/30">
              Select an analysis to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}