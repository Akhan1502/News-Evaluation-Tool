declare global {
  interface Window {
    browser: any;
    chrome: any;
  }
}

interface BrowserAPI {
  tabs: {
    query: (params: { active: boolean; currentWindow: true }) => Promise<any[]>;
    executeScript: (tabId: number, details: any) => Promise<any>;
  };
}

export default function getBrowserAPI(): BrowserAPI {
  // For Firefox
  if (typeof window !== 'undefined' && window.browser) {
    console.log('Using Firefox WebExtensions API');
    return {
      tabs: {
        query: window.browser.tabs.query,
        executeScript: async (tabId: number, details: any) => {
          return window.browser.tabs.executeScript(tabId, details);
        }
      }
    };
  }
  
  // For Chrome
  if (typeof window !== 'undefined' && window.chrome) {
    console.log('Using Chrome Extensions API');
    return {
      tabs: {
        query: window.chrome.tabs.query,
        executeScript: async (tabId: number, details: any) => {
          return window.chrome.scripting.executeScript({
            target: { tabId },
            ...details
          });
        }
      }
    };
  }

  // For development/testing
  console.warn('No browser extension API found, using mock API');
  return {
    tabs: {
      query: async () => [{
        id: 1,
        url: 'http://localhost:5173',
        title: 'Test Page'
      }],
      executeScript: async () => [{
        result: {
          title: 'Test Article',
          content: 'This is a test article content for development purposes.',
          url: 'http://localhost:5173/test-article'
        }
      }]
    }
  } as BrowserAPI;
}