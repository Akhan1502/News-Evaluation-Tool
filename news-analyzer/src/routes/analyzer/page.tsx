import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { UserCircle } from 'lucide-react';

interface TextAnalysis {
  id: string;
  title: string;
  rating: number;
  summary: string;
  content: string;
  // Add other fields that might be needed
}

export function AnalyzerPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<TextAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<TextAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);

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
            className="text-sm text-white/70 hover:text-white/90 transition-colors flex items-center gap-2"
          >
            {user?.picture ? (
              <img 
                src={user.picture} 
                alt={user.name || 'Profile'} 
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <UserCircle className="w-6 h-6" />
            )}
            <span>{user?.name || 'Guest User'}</span>
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Analyses Sidebar */}
        <div className="w-64 border-r border-white/10 overflow-y-auto">
          {/* Refresh Button Section */}
          <div className="p-2 border-b border-white/10">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={`w-full px-3 py-2 rounded text-sm font-medium flex items-center justify-center gap-2 
                ${isLoading 
                  ? 'bg-green-600/50 text-white/50' 
                  : 'bg-green-600 text-white hover:bg-green-500 transition-colors'
                }`}
            >
              {isLoading ? 'Updating...' : 'Refresh Analyses'}
            </button>
          </div>

          {/* Analyses List */}
          <div className="p-2">
            <div className="space-y-1">
              {analyses.map(analysis => (
                <button
                  key={analysis.id}
                  onClick={() => handleAnalysisSelect(analysis)}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    selectedAnalysis?.id === analysis.id 
                      ? 'bg-[#1a1a1a] border border-white/10' 
                      : 'hover:bg-[#161616]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 truncate">{analysis.title}</span>
                    <span className="text-xs text-gray-400 ml-2">{analysis.rating}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedAnalysis ? (
            <div className="space-y-4">
              <h1 className="text-xl font-medium text-white/90">{selectedAnalysis.title}</h1>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/50">Trust Score</span>
                  <span className="text-sm font-medium text-white/90">
                    {selectedAnalysis.rating}%
                  </span>
                </div>
                
                {/* Full Content Display */}
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-sm font-medium text-white/70 mb-2">Full Article Content:</h3>
                  <div className="text-sm text-white/70 whitespace-pre-wrap">
                    {selectedAnalysis.content}
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