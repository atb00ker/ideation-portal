/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/src/views/__test__/mock/CssLoaderMock.jest.js',
    '^.+\\.(svg)$': '<rootDir>/src/views/__test__/mock/SVGLoaderMock.jest.js',
  },
  testMatch: [
    // "**/__tests__/Pern.test.js"
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};
