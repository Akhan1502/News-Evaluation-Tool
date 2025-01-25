/** @type {import('./types/browser').ScrapedData} */
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

scrapeContent();