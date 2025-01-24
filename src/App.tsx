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
      const analysis = await api.analyzeContent(data);
      setTrustScore(analysis.rating);
      console.log('Analysis result:', analysis);
    } catch (error) {
      console.error('Backend analysis error:', error);
      // Fallback to mock score if backend fails
      const mockScore = Math.floor(Math.random() * 30) + 70;
      setTrustScore(mockScore);
    }
  } catch (error) {
    console.error('Analysis error:', error);
  } finally {
    setIsLoading(false);
  }
}; 