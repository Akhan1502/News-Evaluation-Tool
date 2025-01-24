/// <reference types="vite/client" />

declare namespace browser {
  export const tabs: typeof chrome.tabs;
  export const scripting: typeof chrome.scripting;
}
