interface BrowserAPI {
  tabs: {
    query: (queryInfo: { active: boolean; currentWindow: boolean }) => Promise<Array<{ id?: number; url?: string }>>;
    executeScript: (tabId: number, details: { code: string }) => Promise<Array<{ result: any }>>;
  };
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
        },
        async executeScript(tabId, details) {
          const result = await window.browser!.scripting.executeScript({
            target: { tabId },
            func: new Function(details.code) as () => void
          });
          return [{ result: result[0]?.result }];
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
        },
        async executeScript(tabId, details) {
          const result = await window.chrome!.scripting.executeScript({
            target: { tabId },
            func: new Function(details.code) as () => void
          });
          return [{ result: result[0]?.result }];
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
      },
      async executeScript() {
        console.log('Mock: Script execution');
        return [{ result: { title: 'Mock Title', content: 'Mock Content', url: 'http://localhost:5173' } }];
      }
    }
  };
}