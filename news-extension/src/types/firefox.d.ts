declare namespace browser {
  export interface Tab {
    id?: number;
    url?: string;
    title?: string;
  }

  export namespace tabs {
    export function query(queryInfo: {
      active: boolean;
      currentWindow: boolean;
    }): Promise<browser.Tab[]>;

    export function executeScript(tabId: number, details: {
      code?: string;
      files?: string[];
    }): Promise<{ result: any }[]>;
  }

  export namespace scripting {
    export function executeScript(details: {
      target: { tabId: number };
      files?: string[];
      code?: string;
      injectImmediately?: boolean;
    }): Promise<{ frameId: number; result: any }[]>;
  }
}