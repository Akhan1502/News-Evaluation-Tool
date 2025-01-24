import { Button } from './components/Button'
import { Card } from './components/ui/card'
import { Separator } from './components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'
import { InfoIcon, AlertCircle, FileText } from 'lucide-react'
import { useState } from 'react'

interface ScrapedData {
  title: string;
  content: string;
}

// Helper to get the browser API
const getBrowserAPI = () => {
  if (typeof chrome !== 'undefined') {
    return chrome;
  }
  if (typeof browser !== 'undefined') {
    return browser;
  }
  throw new Error('No browser API found');
};

function App() {
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [trustScore, setTrustScore] = useState<number | null>(null);

  const analyzeContent = async () => {
    setIsLoading(true);
    try {
      const browserAPI = getBrowserAPI();
      const [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.id) return;

      const result = await browserAPI.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const title = document.querySelector('h1')?.textContent || 
                       document.title || 
                       'Unknown Title';

          const paragraphs = Array.from(document.querySelectorAll('p'))
            .map(p => p.textContent?.trim())
            .filter(Boolean)
            .join('\n\n');

          return { title, content: paragraphs };
        }
      });

      const data = result[0].result;
      setScrapedData(data);
      
      // Simulate trust score calculation
      const mockScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      setTrustScore(mockScore);
      
      console.log('Analyzed Data:', data);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-zinc-900 min-h-[500px]">
      {/* Trust Score Card */}
      <Card className="p-4 bg-zinc-800 border-zinc-700 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Trust Score</h2>
          {trustScore && (
            <div className="flex flex-col items-end">
              <span className={`text-2xl font-bold ${
                trustScore > 80 ? 'text-green-400' : 
                trustScore > 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {trustScore}%
              </span>
              <span className="text-xs text-zinc-400">Confidence Level</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-900/30 p-2 rounded">
          <InfoIcon size={16} className="text-blue-400" />
          <span>AI-powered content analysis and verification</span>
        </div>
      </Card>

      <Separator className="my-4 bg-zinc-700" />

      {/* Content Preview Card */}
      {scrapedData && (
        <>
          <Card className="p-4 bg-zinc-800 border-zinc-700 shadow-lg">
            <div className="space-y-3">
              <h3 className="font-medium text-zinc-200 flex items-center gap-2">
                <FileText size={16} className="text-blue-400" />
                Article Content
              </h3>
              <div className="space-y-2">
                <div className="text-sm font-medium text-zinc-300 bg-zinc-900/30 p-2 rounded">
                  {scrapedData.title}
                </div>
                <div className="max-h-[120px] overflow-y-auto text-sm text-zinc-400 bg-zinc-900/30 p-2 rounded">
                  {scrapedData.content.slice(0, 300)}...
                </div>
              </div>
            </div>
          </Card>
          <Separator className="my-4 bg-zinc-700" />
        </>
      )}

      {/* Analysis Section */}
      <div className="space-y-3 flex-grow">
        <Button 
          className="w-full h-10 text-sm font-medium shadow-lg"
          onClick={analyzeContent}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⚡</span> 
              Analyzing...
            </span>
          ) : (
            'Analyze Current Page'
          )}
        </Button>

        {/* Advanced Controls */}
        <Accordion type="single" collapsible className="shadow-lg">
          <AccordionItem value="advanced">
            <AccordionTrigger className="text-sm hover:bg-zinc-800/50 px-4">
              Advanced Controls
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-4 bg-zinc-800/30 rounded-b">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-yellow-400 mt-1 shrink-0" />
                  <p className="text-sm text-zinc-400">
                    Access complete article content and detailed analysis metrics
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full h-9 text-sm font-medium"
                    onClick={() => {
                      if (scrapedData) {
                        navigator.clipboard.writeText(
                          `Title: ${scrapedData.title}\n\nContent:\n${scrapedData.content}`
                        );
                      }
                    }}
                    disabled={!scrapedData}
                  >
                    Copy Full Content
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-9 text-sm font-medium"
                    onClick={() => {
                      if (scrapedData) {
                        console.log('Full Analysis:', {
                          title: scrapedData.title,
                          content: scrapedData.content,
                          trustScore,
                          metrics: {
                            wordCount: scrapedData.content.split(' ').length,
                            paragraphCount: scrapedData.content.split('\n\n').length,
                            averageWordsPerParagraph: Math.round(
                              scrapedData.content.split(' ').length / 
                              scrapedData.content.split('\n\n').length
                            )
                          }
                        });
                      }
                    }}
                    disabled={!scrapedData}
                  >
                    View Detailed Analysis
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Footer Info */}
        <div className="text-center text-xs text-zinc-500 mt-4">
          Powered by AI Content Analysis
        </div>
      </div>
    </div>
  )
}

export default App
