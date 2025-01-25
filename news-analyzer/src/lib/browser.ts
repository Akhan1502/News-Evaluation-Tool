export const browser = {
  async init() {
    console.log('Initializing mock browser API');
    return Promise.resolve();
  },

  async getActiveTab() {
    const mockUrl = 'http://localhost:5173/test-page';
    console.log('Mock getActiveTab:', { url: mockUrl });
    return {
      url: mockUrl,
      title: 'Test Page'
    };
  },

  async scrapeContent() {
    const mockData = {
      title: 'Test Article',
      content: 'This is a test article content for development purposes.',
      url: 'http://localhost:5173/test-page'
    };
    console.log('Mock scrapeContent:', mockData);
    return mockData;
  }
}; 