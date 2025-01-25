import type { BrowserAPI } from '../types/browser';

declare global {
  interface Window {
    chrome?: any;
    browser?: any;
  }
}

export async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const api = window.chrome?.tabs || window.browser?.tabs;
  if (!api) throw new Error('Browser API not available');
  
  const [tab] = await api.query(queryOptions);
  return { id: tab.id || 0, url: tab.url };
}

export function getBrowserAPI(): BrowserAPI {
  // Firefox
  if (typeof window !== 'undefined' && window.browser) {
    return {
      tabs: {
        async query(queryInfo) {
          return await window.browser!.tabs.query(queryInfo);
        }
      },
      scripting: {
        async executeScript(details) {
          const result = await window.browser!.scripting.executeScript(details);
          return result;
        }
      }
    };
  }

  // Chrome
  if (typeof window !== 'undefined' && window.chrome) {
    return {
      tabs: {
        async query(queryInfo) {
          return await window.chrome!.tabs.query(queryInfo);
        }
      },
      scripting: {
        async executeScript(details) {
          const result = await window.chrome!.scripting.executeScript(details);
          return result;
        }
      }
    };
  }

  // Mock for development
  console.warn('No browser extension API found, using mock API');
  return {
    tabs: {
      async query() {
        return [{ id: 1, url: 'http://localhost:5173' }];
      }
    },
    scripting: {
      async executeScript() {
        console.log('Mock: Script execution');
        return [{ result: { title: 'Mock Title', content: 'Mock Content', url: 'http://localhost:5173' } }];
      }
    }
  };
}