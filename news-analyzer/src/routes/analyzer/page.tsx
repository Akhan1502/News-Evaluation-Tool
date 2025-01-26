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
      console.log('Fetched analyses data:', data);
      data.forEach((analysis, index) => {
        console.log(`Analysis ${index + 1} paragraphs:`, analysis.paragraphs);
      });
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
    console.log('Selected analysis data:', analysis);
    console.log('Paragraphs data:', analysis.paragraphs);
    analysis.paragraphs?.forEach((paragraph, index) => {
      console.log(`Paragraph ${index + 1} alternative views:`, paragraph.alternativeViews);
    });
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
        title: "Putin lauds the strength of Russia's war economy. Others see a mirage",
        content: "Since Moscow's full-scale invasion of Ukraine in 2022, Russia's economy has surpassed expectations, but experts debate the sustainability of this growth.",
        url: "https://example.com/putin-economy-analysis",
        trust_score: 82,
        source: "Global Economic Review",
        paragraphs: [
          {
            id: "p1",
            content: "Since Moscow's full-scale invasion of Ukraine in 2022, Russia's economy has surpassed expectations. Its figures are, if not rosy, not ruinous either. Last year, the war economy likely grew faster than the United States and all major European economies. Unemployment is at a record low. And if the ballooning defense budget has cramped other spending, that's only temporary.",
            source: "Economic Analysis Division",
            alternativeViews: [
              {
                content: "The apparent economic growth masks serious structural weaknesses, including unsustainable military spending and declining consumer sectors. The low unemployment rate reflects more about labor shortages due to mobilization than economic health.",
                source: "Independent Economic Forum"
              }
            ]
          },
          {
            id: "p2",
            content: "Throughout the war, the Kremlin has made extensive use of a strategy known as 'reflexive control,' aimed at shaping an adversary's perceptions in a way that leads the adversary – in this case, Ukraine's Western backers – to choose actions that benefit Russia. The economy is no different. The Kremlin wants to convince Ukraine's allies, particularly the United States, of Russia's economic strength.",
            source: "Strategic Studies Institute"
          },
          {
            id: "p3",
            content: "Economic growth and low unemployment have become Putin's 'trump cards,' but these headline numbers conceal concerning trends. Russia is hiding the true cost of its war by using a shadow 'off-budget financing scheme,' according to new research. While Russia's 'highly scrutinized' defense budget remains at sustainable levels, there has been a parallel and 'largely overlooked' surge in corporate borrowing.",
            source: "Financial Intelligence Unit",
            alternativeViews: [
              {
                content: "The off-budget financing scheme, while concerning, demonstrates Russia's ability to innovate and adapt its financial system under pressure. This flexibility could prove to be a long-term advantage.",
                source: "Eurasian Economic Review"
              }
            ]
          },
          {
            id: "p4",
            content: "Between the middle of 2022 and late 2024, Russia saw an 'anomalous' 71% surge in private credit, by an amount equal to 19.4% of its gross domestic product. Estimates suggest up to 60% of these loans have been made to war-related firms. These are loans that the state has compelled banks to extend to largely uncreditworthy, war-related businesses on concessionary terms.",
            source: "Banking Sector Analysis"
          },
          {
            id: "p5",
            content: "While signing a flurry of executive orders on his first day back in the White House, US President Donald Trump said Russia's economy was a sign that the country was in 'big trouble,' and that Putin was 'destroying Russia by not making a deal' on Ukraine. Evidence of that trouble includes the impact of new sanctions, persistent labor shortages and signs of a credit bubble.",
            source: "White House Press Pool",
            alternativeViews: [
              {
                content: "Trump's assessment of Russia's economic situation appears to contradict his previous statements praising Putin's leadership and economic management. The timing of this criticism raises questions about potential shifts in US-Russia relations under the new administration.",
                source: "Foreign Policy Institute"
              },
              {
                content: "The characterization of Russia's economy as troubled may be more reflective of domestic US political positioning than an accurate assessment of Russia's economic resilience and adaptability.",
                source: "International Affairs Quarterly"
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
              <div className="h-px bg-white/10 my-6"></div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <a 
                      href={selectedAnalysis.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block text-blue-400 hover:text-blue-300 transition-colors mb-2"
                    >
                      {selectedAnalysis.source}
                    </a>
                  </div>
                  
                  {/* Trust Score Gauge */}
                  <div className="flex items-center ml-4">
                    <span className="text-xs text-white/50 mr-3">Trust Score</span>
                    <div className="relative w-12 h-12">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#2a2a2a"
                          strokeWidth="10"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={`hsl(${selectedAnalysis.trust_score * 1.2}, 100%, 50%)`}
                          strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 45 * selectedAnalysis.trust_score / 100} ${2 * Math.PI * 45}`}
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-1000 ease-out"
                        />
                        {/* Trust score text */}
                        <text
                          x="50"
                          y="50"
                          textAnchor="middle"
                          dy=".3em"
                          className="text-base font-bold fill-white"
                        >
                          {selectedAnalysis.trust_score}%
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-6"></div>
                
                {/* Full Content Display */}
                <div className="prose prose-invert max-w-none">
                  <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                      <div className="text-lg font-bold mb-2 text-white/90">Original</div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-lg font-bold mb-2 text-white/90">Alternative Views</div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    {selectedAnalysis?.paragraphs?.map((paragraph, index) => (
                      <div key={paragraph.id || index} className="flex gap-4">
                        {/* Main paragraph content */}
                        <div className="w-1/2">
                          <div className="text-sm text-white/95 leading-relaxed">
                            {paragraph.content}
                          </div>
                        </div>

                        {/* Alternative views for this paragraph */}
                        <div className="w-1/2">
                          {paragraph.alternativeViews && paragraph.alternativeViews.length > 0 ? (
                            <div className="space-y-3">
                              {paragraph.alternativeViews.map((view, viewIndex) => (
                                <div
                                  key={`${paragraph.id || index}-${viewIndex}`}
                                  className="p-3 rounded-md bg-green-400/5 border border-green-400/20 hover:bg-green-400/10 transition-colors"
                                >
                                  <div className="text-sm text-white/95 leading-relaxed">
                                    {view.content}
                                  </div>
                                  {view.source && (
                                    <div className="text-xs text-white/70 mt-2 flex items-center gap-2">
                                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400/30"></span>
                                      {view.source}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-white/50 text-sm">
                              No alternative views for this paragraph
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