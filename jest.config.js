module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/__tests__/$1',
  },
};
