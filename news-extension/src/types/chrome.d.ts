declare namespace chrome {
  export namespace tabs {
    export function query(queryInfo: {
      active: boolean;
      currentWindow: boolean;
    }): Promise<chrome.tabs.Tab[]>;
  }

  export namespace scripting {
    export function executeScript<T>(details: {
      target: { tabId: number };
      func: () => T;
    }): Promise<{ result: T }[]>;
  }

  export interface Tab {
    id?: number;
    url?: string;
    title?: string;
  }
} 