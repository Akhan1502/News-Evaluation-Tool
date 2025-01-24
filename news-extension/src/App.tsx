import { Button } from './components/Button'
import { Card } from './components/ui/card'
import { Separator } from './components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'
import { InfoIcon, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { api } from './lib/api'

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

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
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

      // Send to backend for analysis
      try {
        const analysis = await api.analyzeContent({
          title: data.title,
          content: data.content,
          url: tab.url || ''
        });
        
        setTrustScore(analysis.rating);
        console.log('Analysis result:', analysis);
      } catch (error) {
        console.error('Backend analysis error:', error);
        setTrustScore(null);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setTrustScore(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card className="p-4">
        <div className="flex items-start gap-2">
          <InfoIcon size={20} className="text-blue-500 mt-1" />
          <div className="space-y-1">
            <h2 className="text-sm font-medium">Content Analysis</h2>
            <p className="text-xs text-zinc-400">
              Analyze the current page for content reliability and bias.
            </p>
            {trustScore !== null && (
              <div className="text-sm mt-2">
                Trust Score: {trustScore}%
              </div>
            )}
          </div>
        </div>
      </Card>

      <Separator className="my-4 bg-zinc-700" />

      <div className="space-y-4">
        <Button 
          className="w-full"
          onClick={analyzeContent}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Current Page'}
        </Button>

        {scrapedData && (
          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{scrapedData.title}</h3>
              <p className="text-xs text-zinc-400 line-clamp-3">
                {scrapedData.content}
              </p>
            </div>
          </Card>
        )}

        <Accordion type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger className="text-sm">
              Advanced Controls
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-2">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-yellow-500 mt-1" />
                  <p className="text-sm text-zinc-400">
                    Advanced analysis includes source verification, fact-checking against trusted databases, 
                    and sentiment analysis.
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Run Deep Analysis
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
