import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Gauge } from './components/ui/gauge'
import { SentimentChart } from './components/ui/sentiment-chart'
import { CriteriaCheck } from './components/ui/criteria-check'
import { BarChart2, ExternalLink, CheckCircle } from 'lucide-react'
import { api } from './lib/api'
import { getBrowserAPI } from './lib/browser'
import type { AnalysisState } from './types'
import type { ScrapedData, ContentScriptResult } from './types/browser'

const initialAnalysisState: AnalysisState = {
  trustScore: null,
  confidence: null,
  sentiment: null,
  criteria: [],
  analysisId: null,
}

interface SentimentDataPoint {
  time: string
  value: number
}

// Content script is now loaded from file

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisState>(initialAnalysisState)
  const [sentimentTrend, setSentimentTrend] = useState<SentimentDataPoint[]>([])

  const analyzeContent = async () => {
    setIsLoading(true)
    console.log('Starting content analysis...')
    
    try {
      let browserAPI
      try {
        browserAPI = getBrowserAPI()
        console.log('Browser API initialized successfully')
      } catch (e) {
        console.error('Browser API initialization failed:', e)
        throw new Error('Unable to access browser extension API')
      }
    
      console.log('Querying active tab...')
      const [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true })
      
      if (!tab?.id) {
        throw new Error('No active tab found')
      }
      console.log('Active tab found:', tab.url)
    
      // Execute content scraping script
      console.log('Executing content script...');
      console.log('Tab ID:', tab.id);
      console.log('Content script path:', 'content-script.js');
      
      let result: ContentScriptResult[];
      try {
        result = await browserAPI.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const scrapeContent = () => {
              console.log('Content script started executing');
              try {
                console.log('Attempting to extract title...');
                const title = document.querySelector('h1')?.textContent || 
                             document.title || 
                             'Unknown Title';
                console.log('Extracted title:', title);

                console.log('Attempting to extract paragraphs...');
                const paragraphs = Array.from(document.querySelectorAll('p'))
                  .map(p => p.textContent?.trim())
                  .filter(Boolean)
                  .join('\n\n');
                console.log('Extracted content length:', paragraphs.length);

                return { 
                  title, 
                  content: paragraphs || 'No content found',
                  url: window.location.href 
                };
              } catch (error) {
                console.error('Content scraping failed:', error);
                return {
                  title: 'Error',
                  content: 'Failed to scrape content',
                  url: window.location.href
                };
              }
            };
            return scrapeContent();
          }
        });
        console.log('Content script execution completed successfully');
        console.log('Execution result:', result);
      } catch (error) {
        const scriptError = error as Error;
        console.error('Content script execution failed:', scriptError);
        console.error('Error details:', scriptError.message);
        throw scriptError;
      }

      const scrapedData: ScrapedData = result[0].result;
      if (!scrapedData) {
        throw new Error('Content script execution failed');
      }
      console.log('Content scraped:', {
        title: scrapedData.title,
        url: scrapedData.url,
        contentLength: scrapedData.content.length
      });
    
      // Send to backend for analysis
      const analysisResult = await api.analyzeContent({
        title: scrapedData.title,
        content: scrapedData.content,
        url: scrapedData.url
      });
    
      setAnalysis(analysisResult);
      
      // Fetch sentiment trend data
      try {
        const trendData = await api.getSentimentHistory(scrapedData.url);
        setSentimentTrend(trendData.history.map(item => ({
          time: item.timestamp,
          value: item.value
        })));
      } catch (error) {
        console.error('Failed to fetch sentiment trend:', error);
        setSentimentTrend([]);
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openAnalysisDashboard = () => {
    const dashboardUrl = 'http://localhost:5174';
    window.open(dashboardUrl, '_blank');
  };

  return (
    <div className="min-h-[fit-content] max-h-[600px] overflow-y-auto bg-zinc-900 text-white">
      <div className="p-3 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-zinc-900 py-2 z-10">
          <h1 className="text-lg font-bold">Content Analysis</h1>
          <Button
            onClick={analyzeContent}
            disabled={isLoading}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>
    
        {/* Main Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 bg-zinc-800/50 border-zinc-700 flex items-center justify-center">
            <Gauge
              value={analysis.trustScore ?? 0}
              label="Trust Score"
              size="sm"
              type="trust"
            />
          </Card>
          <Card className="p-3 bg-zinc-800/50 border-zinc-700 flex items-center justify-center">
            <Gauge
              value={analysis.confidence ?? 0}
              label="Confidence"
              size="sm"
              type="confidence"
            />
          </Card>
          <Card className="p-3 bg-zinc-800/50 border-zinc-700 flex items-center justify-center">
            <Gauge
              value={(analysis.sentiment?.score ?? 0) * 100}
              label="Sentiment"
              size="sm"
              type="sentiment"
            />
          </Card>
        </div>
    
        {/* Journalistic Criteria */}
        <Card className="p-3 bg-zinc-800/50 border-zinc-700">
          <div className="mb-2">
            <h2 className="text-xs font-medium flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Journalistic Criteria
            </h2>
          </div>
          <CriteriaCheck criteria={analysis.criteria} />
        </Card>
    
        {/* Sentiment Trend */}
        {sentimentTrend.length > 0 && (
          <Card className="p-3 bg-zinc-800/50 border-zinc-700">
            <div className="mb-2">
              <h2 className="text-xs font-medium flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5" />
                Historical Sentiment Trend
              </h2>
            </div>
            <SentimentChart data={sentimentTrend} />
          </Card>
        )}
    
        {/* View Full Analysis Button */}
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 transition-colors sticky bottom-0"
          onClick={() => openAnalysisDashboard()}
          disabled={!analysis.analysisId}
        >
          View Full Analysis
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
        <div className="text-blue-500">
          <p className="mb-2">{analysis.summary}</p>
        </div>
      </div>
    </div>
  )
}
