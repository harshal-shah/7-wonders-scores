// Mock html2canvas for testing
global.html2canvas = jest.fn(() => 
  Promise.resolve({
    toDataURL: jest.fn(() => 'data:image/png;base64,mock'),
    toBlob: jest.fn((callback) => callback(new Blob(['mock'], { type: 'image/png' })))
  })
);

// Mock navigator.share for testing
Object.defineProperty(global.navigator, 'share', {
  writable: true,
  value: jest.fn(() => Promise.resolve())
});

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock window.alert
global.alert = jest.fn();
window.alert = jest.fn();

