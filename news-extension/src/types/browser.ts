export interface ScrapedData {
  title: string;
  content: string;
  url: string;
}

export interface ContentScriptResult {
  result: ScrapedData;
}

export interface BrowserAPI {
  tabs: {
    query: (queryInfo: { active: boolean; currentWindow: boolean }) => Promise<Array<{ id?: number; url?: string }>>;
  };
  scripting: {
    executeScript: (details: { target: { tabId: number }; files?: string[]; func?: () => ScrapedData }) => Promise<ContentScriptResult[]>;
  };
}