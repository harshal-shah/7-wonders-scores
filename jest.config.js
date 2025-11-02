module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '7wonders-score-calculator.html',
    '!**/node_modules/**',
    '!**/coverage/**'
  ],
  testMatch: [
    '**/*.test.js'
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

